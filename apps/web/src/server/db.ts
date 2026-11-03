import "server-only";
import { createDb, type Db } from "@spotme/db";

const globalForDb = globalThis as unknown as { spotmeDb?: Db };

/**
 * Cliente Drizzle único por processo (reaproveitado entre hot reloads no dev).
 * Devolve `null` se `DATABASE_URL` não estiver configurada.
 */
export function getDb(): Db | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  globalForDb.spotmeDb ??= createDb(url, { max: 3 }).db;
  return globalForDb.spotmeDb;
}
