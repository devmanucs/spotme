# Stack — decisão

Status: **decidida** (2026-11-03) — alternativa B. Mudou de ideia? Edite este
arquivo e registre o porquê na seção "Histórico".

## O que o problema exige

Antes de escolher ferramenta, o que o SpotMe tem de diferente dos projetos
anteriores (flux-finance, goals-tracker):

1. **Um job que não pode dormir.** `GET /me/player/recently-played` devolve só
   as **últimas 50** reproduções. Ouvindo ~3,5 min por faixa, isso cobre
   ~3 horas. Se o coletor ficar parado mais que isso, **o dado se perde para
   sempre** (só volta com um novo pedido de Extended History). Host gratuito que
   hiberna (Render free, 15 min) não serve para o coletor.
2. **Uma fila lenta de enriquecimento.** Desde fev/2026 o modo dev da API não
   tem mais endpoints em lote (`/tracks?ids=`, `/artists?ids=`). Importar anos
   de histórico gera milhares de IDs para buscar **um por um**, respeitando
   rate limit. Precisa de fila com retry/backoff, não de um loop num request.
3. **Analytics em SQL.** Quase todo o produto é `GROUP BY` por dia/semana/
   artista sobre uma tabela de reproduções. SQL de verdade (Postgres, window
   functions, views materializadas) vale mais que um ORM esperto.
4. **Uma usuária só.** Não precisa de API pública, multi-tenant, RBAC. Uma
   camada de API separada (NestJS) é peso morto no v1.
5. **Dashboard acessível na rede corporativa.** Tudo que a tela mostra vem do
   domínio do SpotMe — inclusive capas, que precisam ser cacheadas por nós.

## Recomendação

> **Conforto onde já funciona (front, banco, monorepo) + aventura onde o
> problema pede algo novo (jobs, ORM).**

| Camada | Escolha | Familiar? | Por quê |
|---|---|---|---|
| Monorepo | **pnpm + Turborepo** | ✅ | Mesmo esqueleto do flux-finance. |
| Front + BFF | **Next.js 16** (App Router, RSC, Route Handlers, Server Actions) | ✅ | Dashboard é leitura de banco no servidor — RSC encaixa perfeito. OAuth callback, upload de import e endpoints do player cabem em Route Handlers. |
| UI | **Tailwind v4 + shadcn/Base UI + HugeIcons + Recharts** | ✅ | Mesmo design system dos outros projetos, em `packages/ui`. |
| Dados no cliente | **TanStack Query** (só onde precisa: player, progresso do import) + **nuqs** (estado do período na URL) | ✅ / 🆕 | O resto é RSC. |
| Banco | **Supabase Postgres** | ✅ | Já conhecem; e traz de brinde pg_cron, Vault, Queues e Storage. |
| ORM | **Drizzle** | 🆕 | SQL-first (agregações ficam legíveis), schema em TS compartilhado, roda igual em Node (Next) e Deno (Edge Functions). Prisma no Deno/edge é atrito. |
| Jobs | **Supabase Edge Functions (Deno) + pg_cron + Supabase Queues (pgmq)** | 🆕 | Cron confiável sem host extra que dorme; fila durável dentro do próprio Postgres; mesmo painel do banco. |
| Auth | **Supabase Auth com provider Spotify** + allowlist do próprio Spotify user ID | ✅/🆕 | Login de app pronto; o refresh token do Spotify é guardado no **Vault** para o coletor usar. |
| Arquivos | **Supabase Storage** | ✅ | Cache de capas e upload dos JSONs do Extended History. |
| Validação | **zod** | ✅ | Contratos entre web, jobs e parsers do import. |
| Testes | **Vitest** (core, parsers, agregações contra Postgres local) + **Playwright** (fluxos críticos) | ✅ | |
| Lint/format | **Biome** | 🆕 | Um binário só no lugar de ESLint + Prettier. O `create-next-app` 16 já oferece Biome com os domínios `next` e `react`, e o Next 16 não tem mais `next lint`. |
| Deploy | **Vercel** (web) + **Supabase** (banco, jobs, storage) | ✅ | Dois painéis, zero servidor para manter. |
| Local | **Supabase CLI** (`supabase start`, Docker) | ✅ | Postgres, Auth, Edge Functions e cron locais. |

### O que fica de fora (por ora) e por quê

- **NestJS / API separada:** volta se surgir um cliente que não seja o próprio
  web (ex.: app mobile ou extensão). Hoje seria só mais um deploy.
- **Prisma:** ótimo no Node, mas o código de agregação e os jobs em Deno
  sofreriam. Drizzle cobre os dois.
- **Render/Railway:** só se precisarmos de um processo long-running (talvez na
  Fase 3, ver abaixo).

## Alternativas avaliadas

### A — "Conforto total" (Next + NestJS + Prisma + Supabase + Vercel/Render)

O stack do flux-finance, copiado.

- ➕ Zero curva de aprendizado; dá para copiar boilerplate.
- ➖ **Render free hiberna** → coletor perde reproduções. Resolver isso exige
  plano pago ou um cron externo (GitHub Actions) batendo na API.
- ➖ NestJS + DTOs + módulos para ~10 endpoints de uma pessoa só.
- ➖ Fila de enriquecimento teria que ser inventada (ou BullMQ + Redis = mais
  um serviço).

### B — "Recomendada" (acima)

- ➕ Cron e fila confiáveis sem servidor extra; tudo num painel Supabase.
- ➕ Aprende-se Deno, pg_cron, pgmq e Drizzle com um problema real e pequeno.
- ➖ Edge Functions têm limite de tempo (150 s no free) → jobs precisam ser
  pequenos e idempotentes (o que já é bom design aqui).
- ➖ Projeto Supabase free pausa após 1 semana sem atividade no banco. O cron
  gera atividade, mas **confirmar no Spike 0.3** se isso basta.

### C — "Aventura total" (Cloudflare: Hono em Workers + D1 + Cron Triggers + Queues + Next via OpenNext)

- ➕ Cron Triggers e Queues nativos e gratuitos, sem pausa por inatividade.
- ➕ Hono é leve e divertido.
- ➖ D1 é SQLite: dá conta do volume, mas perde Postgres (window functions mais
  limitadas, sem views materializadas, sem pg_cron/Vault).
- ➖ Next em Workers via OpenNext ainda tem arestas; ou troca o front inteiro.
- ➖ Tudo novo ao mesmo tempo — o projeto vira estudo de infra, não de produto.

### D — "Outra linguagem no backend" (worker em Python/FastAPI ou Go)

- ➕ Python tem `ytmusicapi` (Fase 3) e ótimas libs de dados.
- ➖ Dois ecossistemas, dois deploys, tipos não compartilhados, para um
  projeto de uma pessoa. Só faz sentido se a Fase 3 exigir (ver abaixo).

## Decisões adiadas (com gatilho)

| Decisão | Quando decidir | Opções |
|---|---|---|
| Como falar com o YouTube Music | Spike da Fase 3 | **YouTube Data API v3** (oficial; YouTube Music usa playlists do YouTube; ~10 000 unidades/dia, `playlistItems.insert` = 50 e `search.list` = 100 → ~200 inserções ou ~100 buscas por dia) vs. `ytmusicapi` (não oficial, Python, sem quota mas pode quebrar/violar termos). Se for `ytmusicapi`, aí sim entra um worker Python (alternativa D) num host pago pequeno. |
| Precisa de Redis/cache? | Se o dashboard ficar lento | Primeiro: views materializadas + índices. Redis só com evidência. |

## Histórico

- 2026-11-03 — proposta inicial.
- 2026-11-03 — **alternativa B aprovada**: pnpm + Turborepo, Next.js 16,
  Tailwind v4 + shadcn/Base UI + HugeIcons + Recharts, Supabase Postgres, zod,
  Vercel; novos: Drizzle, Supabase Edge Functions + pg_cron + Queues; sem
  NestJS. Testes de API manuais com **Bruno** (coleção em `bruno/`).
  Identidade visual: estilo Spotify, tema único escuro (ver `DESIGN.md`) —
  `next-themes` sai do stack.
- 2026-11-03 — MAD-17 (monorepo): **Biome** escolhido (vem no template do
  Next 16, regras `next`/`react`). Versões fixadas: Next 16.4.4, React 19.3,
  TypeScript 5.x (o 7.x nativo ainda não foi validado com o Next), Vitest 4,
  Drizzle 0.45 + drizzle-kit 0.31, postgres-js 3.4, Turbo 2.11, Deno 2.9 e
  Supabase CLI 3.0 como devDependencies. Pacotes internos são consumidos como
  código-fonte TS (sem build), com imports relativos terminando em `.ts` para
  o Deno também conseguir ler.
- 2026-11-05 — MAD-19 (design system): primitivos Base UI do registry do
  shadcn (estilo `base-nova`, ícones HugeIcons) em `packages/ui`, Figtree via
  `next/font/google`. O registry `ui.shadcn.com` está bloqueado na rede desta
  sessão de nuvem, então os primitivos vieram do `packages/ui` do flux-finance
  (mesma origem) com o alias trocado; `pnpm --filter @spotme/ui shadcn add …`
  funciona normalmente fora daqui.
