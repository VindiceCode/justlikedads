import { vi } from "vitest";

// Mock environment variables
process.env.TURSO_DATABASE_URL = "libsql://test.turso.io";
process.env.TURSO_AUTH_TOKEN = "test-token";
process.env.ADMIN_PASSWORD = "test-password";
process.env.ADMIN_SESSION_SECRET = "test-session-secret";

// Mock crypto.randomUUID if needed
if (!global.crypto) {
  global.crypto = {
    randomUUID: () => "test-uuid-" + Math.random().toString(36).slice(2),
  } as Crypto;
}
