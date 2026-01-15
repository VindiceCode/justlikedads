import { vi } from "vitest";

// Mock database storage
let mockLeads: Array<{
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
  bonzoProspectId: string | null;
  source: string | null;
  createdAt: string | null;
}> = [];

let mockEvents: Array<{
  id: string;
  eventType: string;
  leadId: string | null;
  metadata: string | null;
  createdAt: string | null;
}> = [];

export function resetMockDb() {
  mockLeads = [];
  mockEvents = [];
}

export function getMockLeads() {
  return mockLeads;
}

export function getMockEvents() {
  return mockEvents;
}

// Mock the database module
export const mockInsert = vi.fn().mockImplementation(() => ({
  values: vi.fn().mockImplementation((data) => {
    if (data.firstName !== undefined) {
      mockLeads.push(data);
    } else if (data.eventType !== undefined) {
      mockEvents.push(data);
    }
    return Promise.resolve();
  }),
}));

export const mockSelect = vi.fn().mockImplementation(() => ({
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockImplementation(() => {
    return Promise.resolve(mockLeads);
  }),
  orderBy: vi.fn().mockImplementation(() => {
    return Promise.resolve(mockLeads);
  }),
}));

export const mockUpdate = vi.fn().mockImplementation(() => ({
  set: vi.fn().mockReturnThis(),
  where: vi.fn().mockImplementation(() => Promise.resolve()),
}));

export const mockDb = {
  insert: mockInsert,
  select: mockSelect,
  update: mockUpdate,
};

vi.mock("@/lib/db", () => ({
  getDb: () => mockDb,
}));

vi.mock("@/lib/events", () => ({
  logEvent: vi.fn().mockResolvedValue(undefined),
}));
