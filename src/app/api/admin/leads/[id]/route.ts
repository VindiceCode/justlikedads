import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { logEvent } from "@/lib/events";
import { leads } from "../../../../../../drizzle/schema";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === process.env.ADMIN_SESSION_SECRET;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await request.json();

    const validStatuses = ["new", "contacted", "booked", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Get current status for logging
    const currentLead = await getDb()
      .select({ status: leads.status })
      .from(leads)
      .where(eq(leads.id, id))
      .limit(1);

    const oldStatus = currentLead[0]?.status || "unknown";

    await getDb()
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id));

    // Log status change event
    await logEvent("lead_status_change", {
      oldStatus,
      newStatus: status,
    }, id);

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}
