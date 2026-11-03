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
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Fases 0–3 ligadas ao backlog do Linear |

## Stack (resumo)

pnpm + Turborepo · Next.js 16 (RSC) · Tailwind v4 + shadcn/Base UI + HugeIcons +
Recharts · Supabase (Postgres, Auth, Vault, Storage, Queues, pg_cron, Edge
Functions) · Drizzle · zod · Vitest + Playwright · Vercel.

## Rodar localmente

_A preencher na Fase 0.4._ Prévia:

```bash
pnpm install
```

```bash
pnpm supabase start
```

```bash
pnpm dev
```

## Pré-requisitos

- Node.js 20+, pnpm 10, Docker (Supabase local).
- Conta Spotify **Premium** (exigida para apps em modo dev e para o player).
- App criado no Spotify for Developers com redirect para o callback do
  Supabase Auth.

## Linear

[SpotMe — projeto](https://linear.app/madev/project/spotme-dcb226780da0/overview)
