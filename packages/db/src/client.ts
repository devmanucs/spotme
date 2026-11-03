import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";

export interface CreateDbOptions {
  /** Conexões simultâneas. Serverless (Vercel) deve usar poucas. */
  max?: number;
}

/**
 * Cria o cliente Drizzle sobre postgres-js. `prepare: false` é obrigatório com o
 * pooler do Supabase em modo transação.
 */
export function createDb(url: string, options: CreateDbOptions = {}) {
  const client = postgres(url, { prepare: false, max: options.max ?? 5 });
  const db = drizzle(client, { schema });
  return { db, close: () => client.end() };
}

export type Db = ReturnType<typeof createDb>["db"];

/** `select 1` com timeout — usado pelo /api/health. */
export async function pingDatabase(db: Db, timeoutMs = 3_000): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`banco não respondeu em ${timeoutMs} ms`)),
      timeoutMs,
    );
  });
  try {
    await Promise.race([db.execute(sql`select 1`), timeout]);
  } finally {
    clearTimeout(timer);
  }
}
