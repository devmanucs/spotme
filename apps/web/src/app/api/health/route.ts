import { pingDatabase } from "@spotme/db";
import { connection } from "next/server";
import { getDb } from "@/server/db";

type DatabaseCheck =
  | { status: "ok"; latencyMs: number }
  | { status: "error"; error: string }
  | { status: "unconfigured" };

/**
 * Status do app e do banco. Sem auth (coberto em bruno/00 Saude/Health).
 * 200 = tudo ok; 503 = banco fora ou não configurado.
 */
export async function GET() {
  // Com Cache Components, sem isso o handler seria pré-renderizado no build.
  await connection();

  const database = await checkDatabase();
  const ok = database.status === "ok";

  return Response.json(
    {
      status: ok ? "ok" : "degraded",
      checks: { app: "ok", database },
      time: new Date().toISOString(),
    },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}

async function checkDatabase(): Promise<DatabaseCheck> {
  const db = getDb();
  if (!db) return { status: "unconfigured" };

  const startedAt = performance.now();
  try {
    await pingDatabase(db);
    return { status: "ok", latencyMs: Math.round(performance.now() - startedAt) };
  } catch (error) {
    // O Drizzle embrulha o erro do driver ("Failed query…"); a causa real vem em `cause`.
    const cause = error instanceof Error && error.cause instanceof Error ? error.cause : error;
    return { status: "error", error: cause instanceof Error ? cause.message : String(cause) };
  }
}
