import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { logEvent } from "@/lib/events";
import { leads } from "../../../../drizzle/schema";

interface LeadRequest {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  guestCount?: number;
  eventType?: string;
  details?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadRequest = await request.json();

    // Validate required field
    if (!body.firstName || body.firstName.trim() === "") {
      return NextResponse.json(
        { error: "First name is required" },
        { status: 400 }
      );
    }

    // Generate a unique ID
    const id = crypto.randomUUID();

    // Insert into Turso database
    await getDb().insert(leads).values({
      id,
      firstName: body.firstName,
      lastName: body.lastName || null,
      email: body.email || null,
      phone: body.phone || null,
      eventDate: body.eventDate || null,
      guestCount: body.guestCount || null,
      eventType: body.eventType || null,
      details: body.details || null,
      source: body.source || "direct",
      status: "new",
    });

    // Push to Bonzo CRM if configured
    let bonzoProspectId: string | null = null;
    const bonzoApiKey = process.env.BONZO_API_KEY;
    const bonzoPipelineStageId = process.env.BONZO_PIPELINE_STAGE_ID;

    if (bonzoApiKey && bonzoPipelineStageId) {
      try {
        const bonzoResponse = await fetch(
          `https://app.getbonzo.com/api/v3/prospects/pipeline/${bonzoPipelineStageId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${bonzoApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: body.firstName,
              last_name: body.lastName || "",
              email: body.email || "",
              phone: body.phone || "",
              external_id: id,
            }),
          }
        );

        if (bonzoResponse.ok) {
          const bonzoData = await bonzoResponse.json();
          bonzoProspectId = bonzoData.id || bonzoData.prospect_id || null;

          // Update lead with Bonzo prospect ID
          if (bonzoProspectId) {
            await getDb()
              .update(leads)
              .set({ bonzoProspectId })
              .where(eq(leads.id, id));
          }
        } else {
          // Log Bonzo error but don't fail the request
          console.error(
            "Bonzo API error:",
            bonzoResponse.status,
            await bonzoResponse.text()
          );
        }
      } catch (bonzoError) {
        // Log Bonzo error but don't fail the request
        console.error("Bonzo API call failed:", bonzoError);
      }
    }

    // Log form submission event
    await logEvent("form_submit", {
      source: body.source || "direct",
      eventType: body.eventType,
      guestCount: body.guestCount,
    }, id);

    return NextResponse.json({
      success: true,
      id,
      bonzoProspectId,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
