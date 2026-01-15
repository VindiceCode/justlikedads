import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

// Mock cookies
const mockCookies = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookies)),
}));

// Mock the db module
vi.mock("@/lib/db", () => ({
  getDb: vi.fn(() => ({
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([{ status: "new" }])),
        })),
      })),
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
import { PATCH } from "@/app/api/admin/leads/[id]/route";

describe("/api/admin/leads/[id] PATCH", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ADMIN_SESSION_SECRET = "test-session-secret";
  });

  it("should return 401 if not authenticated", async () => {
    mockCookies.get.mockReturnValue(undefined);

    const request = new NextRequest("http://localhost/api/admin/leads/123", {
      method: "PATCH",
      body: JSON.stringify({ status: "contacted" }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: "123" }),
    });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("should return 401 if session is invalid", async () => {
    mockCookies.get.mockReturnValue({ value: "wrong-secret" });

    const request = new NextRequest("http://localhost/api/admin/leads/123", {
      method: "PATCH",
      body: JSON.stringify({ status: "contacted" }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: "123" }),
    });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("should return 400 for invalid status", async () => {
    mockCookies.get.mockReturnValue({ value: "test-session-secret" });

    const request = new NextRequest("http://localhost/api/admin/leads/123", {
      method: "PATCH",
      body: JSON.stringify({ status: "invalid-status" }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: "123" }),
    });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid status");
  });

  it("should update status successfully when authenticated", async () => {
    mockCookies.get.mockReturnValue({ value: "test-session-secret" });

    const request = new NextRequest("http://localhost/api/admin/leads/123", {
      method: "PATCH",
      body: JSON.stringify({ status: "contacted" }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: "123" }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.status).toBe("contacted");
  });

  it("should accept all valid statuses", async () => {
    mockCookies.get.mockReturnValue({ value: "test-session-secret" });

    const validStatuses = ["new", "contacted", "booked", "closed"];

    for (const status of validStatuses) {
      const request = new NextRequest("http://localhost/api/admin/leads/123", {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({ id: "123" }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.status).toBe(status);
    }
  });
});
