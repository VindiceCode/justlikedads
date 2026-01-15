import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

// Mock the db module before importing the route
vi.mock("@/lib/db", () => ({
  getDb: vi.fn(() => ({
    insert: vi.fn(() => ({
      values: vi.fn(() => Promise.resolve()),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => Promise.resolve()),
      })),
    })),
  })),
}));

vi.mock("@/lib/events", () => ({
  logEvent: vi.fn(() => Promise.resolve()),
}));

// Import after mocking
import { POST } from "@/app/api/leads/route";

describe("/api/leads POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 400 if firstName is missing", async () => {
    const request = new NextRequest("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ lastName: "Doe" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("First name is required");
  });

  it("should return 400 if firstName is empty", async () => {
    const request = new NextRequest("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ firstName: "   " }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("First name is required");
  });

  it("should create a lead successfully with minimal data", async () => {
    const request = new NextRequest("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ firstName: "John" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.id).toBeDefined();
  });

  it("should create a lead with full data", async () => {
    const leadData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "555-1234",
      eventDate: "2025-06-15",
      guestCount: 50,
      eventType: "wedding",
      details: "Outdoor ceremony",
      source: "qr-businesscard",
    };

    const request = new NextRequest("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify(leadData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.id).toBeDefined();
  });

  it("should handle JSON parse errors gracefully", async () => {
    const request = new NextRequest("http://localhost/api/leads", {
      method: "POST",
      body: "invalid json",
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
  });
});
