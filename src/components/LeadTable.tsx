"use client";

import { useState } from "react";

interface Lead {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  eventDate: string | null;
  guestCount: number | null;
  eventType: string | null;
  details: string | null;
  status: string | null;
  source: string | null;
  createdAt: string | null;
}

const STATUS_OPTIONS = ["new", "contacted", "booked", "closed"];
const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  booked: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

export default function LeadTable({ leads }: { leads: Lead[] }) {
  const [leadData, setLeadData] = useState(leads);
  const [updating, setUpdating] = useState<string | null>(null);

  async function updateStatus(leadId: string, newStatus: string) {
    setUpdating(leadId);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeadData((prev) =>
          prev.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(null);
    }
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Event
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Submitted
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leadData.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">
                  {lead.firstName} {lead.lastName || ""}
                </div>
                {lead.source && (
                  <span className="text-xs text-gray-500">via {lead.source}</span>
                )}
              </td>
              <td className="px-6 py-4">
                {lead.email && (
                  <div className="text-sm text-gray-600">
                    <a href={`mailto:${lead.email}`} className="hover:underline">
                      {lead.email}
                    </a>
                  </div>
                )}
                {lead.phone && (
                  <div className="text-sm text-gray-600">
                    <a href={`tel:${lead.phone}`} className="hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  {lead.eventType && (
                    <span className="capitalize">{lead.eventType}</span>
                  )}
                  {lead.eventDate && (
                    <span className="text-gray-500">
                      {" "}
                      on {formatDate(lead.eventDate)}
                    </span>
                  )}
                </div>
                {lead.guestCount && (
                  <div className="text-xs text-gray-500">
                    {lead.guestCount} guests
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <select
                  value={lead.status || "new"}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  disabled={updating === lead.id}
                  className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${
                    STATUS_COLORS[lead.status || "new"] || STATUS_COLORS.new
                  } ${updating === lead.id ? "opacity-50" : ""}`}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {formatDate(lead.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
