import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  eventDate: text("event_date"),
  guestCount: integer("guest_count"),
  eventType: text("event_type"),
  details: text("details"),
  status: text("status").default("new"),
  bonzoProspectId: text("bonzo_prospect_id"),
  source: text("source"), // 'qr', 'direct', 'referral'
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  eventType: text("event_type").notNull(), // 'page_view', 'form_submit', 'qr_scan'
  leadId: text("lead_id"),
  metadata: text("metadata"), // JSON blob
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
