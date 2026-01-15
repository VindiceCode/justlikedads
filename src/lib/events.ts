import { getDb } from "./db";
import { events } from "../../drizzle/schema";

type EventType = "page_view" | "form_submit" | "qr_scan" | "lead_status_change";

interface EventMetadata {
  source?: string;
  userAgent?: string;
  ip?: string;
  oldStatus?: string;
  newStatus?: string;
  [key: string]: unknown;
}

export async function logEvent(
  eventType: EventType,
  metadata?: EventMetadata,
  leadId?: string
) {
  try {
    await getDb().insert(events).values({
      id: crypto.randomUUID(),
      eventType,
      leadId: leadId || null,
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
  } catch (error) {
    // Log errors but don't fail the main request
    console.error("Failed to log event:", error);
  }
}
