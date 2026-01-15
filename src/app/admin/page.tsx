import { getDb } from "@/lib/db";
import { leads } from "../../../drizzle/schema";
import { desc } from "drizzle-orm";
import LeadTable from "@/components/LeadTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getLeads() {
  const db = getDb();
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export default async function AdminDashboard() {
  const allLeads = await getLeads();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#8b0000] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-oswald text-2xl font-bold uppercase tracking-wider">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/qr"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              QR Codes
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-oswald text-xl font-bold uppercase text-gray-800">
              Leads ({allLeads.length})
            </h2>
          </div>

          {allLeads.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              No leads yet. Share the landing page to start collecting leads!
            </div>
          ) : (
            <LeadTable leads={allLeads} />
          )}
        </div>
      </main>
    </div>
  );
}
