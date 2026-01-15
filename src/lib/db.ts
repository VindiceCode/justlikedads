import { drizzle } from "drizzle-orm/libsql";
import { createClient, Client } from "@libsql/client";

let client: Client | null = null;

function getClient(): Client {
  if (!client) {
    if (!process.env.TURSO_DATABASE_URL) {
      throw new Error("TURSO_DATABASE_URL environment variable is not set");
    }
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export function getDb() {
  return drizzle(getClient());
}
