# SpotMe

Dashboard pessoal de estatísticas do Spotify: coleta automaticamente o que eu
ouço, importa o histórico completo e mostra horas ouvidas, rankings e evolução
— um "Wrapped" que não espera dezembro.

> Projeto pessoal. Não contorna bloqueios de rede: o dashboard roda num domínio
> próprio e a coleta acontece na nuvem, a partir das reproduções feitas
> normalmente no Spotify.

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [`PRODUCT.md`](PRODUCT.md) | Usuária, propósito, escopo, **definições de métrica**, personalidade, princípios |
| [`DESIGN.md`](DESIGN.md) | Tokens, tipografia, componentes do domínio, telas, checklist |
| [`docs/STACK.md`](docs/STACK.md) | Stack escolhida, alternativas avaliadas e por quê |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Diagrama, monorepo, fluxos (login, coleta, import, enriquecimento, player, sync), segurança, env vars |
| [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md) | Tabelas, views, regras de estimativa e deduplicação |
| [`docs/SPOTIFY_PLATFORM.md`](docs/SPOTIFY_PLATFORM.md) | Limites do modo dev (2026), endpoints, scopes, riscos, spikes |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Fases 0–3 ligadas às issues do Linear |
| [`bruno/`](bruno) | Coleção Bruno: rotas do SpotMe, Edge Functions e Web API do Spotify |

## Stack (resumo)

pnpm + Turborepo · Next.js 16 (RSC) · Tailwind v4 + shadcn/Base UI + HugeIcons +
Recharts · Supabase (Postgres, Auth, Vault, Storage, Queues, pg_cron, Edge
Functions) · Drizzle · zod · Vitest + Playwright · Bruno · Vercel.
Visual: linguagem do Spotify desktop, tema único escuro ([`DESIGN.md`](DESIGN.md)).

## Rodar localmente

Pré-requisitos: Node.js 22 (`.nvmrc`), pnpm 10 (`corepack enable`), Docker
(para o Supabase local). Deno e Supabase CLI vêm como dependências do projeto.

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Suba o Supabase local (Postgres em `127.0.0.1:54322`, API em `:54321`):

   ```bash
   pnpm supabase start
   ```

3. Crie os arquivos de ambiente a partir dos exemplos e preencha as chaves que
   `pnpm supabase status` mostrar:

   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

   ```bash
   cp packages/db/.env.example packages/db/.env
   ```

   ```bash
   cp supabase/functions/.env.example supabase/functions/.env
   ```

4. Rode o app:

   ```bash
   pnpm dev
   ```

5. Confira `http://localhost:3000/api/health` (ou `bruno/00 Saude/Health`):
   `200` com `database.status = "ok"`.

### Scripts

| Script | O que faz |
|---|---|
| `pnpm dev` | Next.js em modo dev (Turbopack) |
| `pnpm build` | Build de produção |
| `pnpm typecheck` | `tsc` em todos os pacotes (+ `next typegen` no web) |
| `pnpm test` | Vitest em `packages/core` e `packages/spotify` |
| `pnpm lint` / `pnpm format` | Biome (checar / corrigir) |
| `pnpm check:deno` | `deno check` + `deno test` em `supabase/functions` (garante que `core` e `spotify` rodam no Deno) |
| `pnpm db:generate` | Gera migration do schema Drizzle em `supabase/migrations/` |
| `pnpm db:reset` | Recria o banco local aplicando migrations + `seed.sql` |
| `pnpm db:migrate` | Aplica migrations pendentes no banco local |
| `pnpm supabase …` | Supabase CLI do projeto |

### Estrutura

```
apps/web            Next.js 16 (App Router, Cache Components, Tailwind v4)
packages/core       regras de métrica — TS puro, roda em Node, navegador e Deno
packages/spotify    cliente da Web API — TS puro, roda em Node e Deno
packages/db         schema Drizzle + cliente postgres-js
packages/ui         design system (tokens, cn, componentes)
packages/config     tsconfigs compartilhados
supabase/           config.toml, migrations, Edge Functions, seed
bruno/              coleção de requisições
```

## Pré-requisitos

- Conta Spotify **Premium** (exigida para apps em modo dev e para o player).
- App criado no Spotify for Developers com redirect para o callback do
  Supabase Auth.

## Linear

[SpotMe — projeto](https://linear.app/madev/project/spotme-dcb226780da0/overview)
