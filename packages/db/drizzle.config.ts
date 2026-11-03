import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL não definida — veja packages/db/.env.example");

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  // Migrations vão direto para a pasta do Supabase CLI, com prefixo de timestamp
  // compatível (`supabase migration up` / `supabase db reset` aplicam).
  out: "../../supabase/migrations",
  migrations: { prefix: "supabase" },
  schemaFilter: ["public"],
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
