# Project Agent Rules

## Contexto

- Produto, métricas e princípios: `PRODUCT.md`. Visual: `DESIGN.md`.
- Arquitetura e regras de dados: `docs/ARCHITECTURE.md`, `docs/DATA_MODEL.md`.
- Limites da API do Spotify: `docs/SPOTIFY_PLATFORM.md` — leia antes de mexer em
  qualquer chamada à Web API ou ao Web Playback SDK.
- Leia só o que a tarefa precisa; prefira buscas com `rg` a explorar tudo.

## Regras do domínio (não quebrar)

- Definições de métrica vivem em `packages/core` e seguem a tabela de
  `PRODUCT.md › Métricas`. Não recalcular "tempo ouvido" em componente.
- Toda escrita em `plays` passa pela regra de dedup (`dedupe_plays`).
- Tempo estimado sempre com `ms_played_estimated = true` e sinalizado na UI.
- O navegador nunca chama domínios do Spotify, exceto o player (Fase 2).
  Capas vêm do Storage do SpotMe.
- Refresh tokens só no Vault; nunca em tabela comum, log ou resposta HTTP.
- `packages/core` e `packages/spotify` não usam APIs de Node (rodam em Deno).
- Requests ao Spotify: um por ID (sem lote), respeitar `Retry-After` em `429`.
- `ip_addr` do Extended History nunca sai do navegador.
- Rota HTTP nova ou alterada → atualizar a coleção em `bruno/` no mesmo PR.
- Visual: tema único escuro estilo Spotify; verde (`--primary`) só em
  ação/ativo/progresso. Siga o checklist de `DESIGN.md`.
- `usePathname()` só dentro de `PathnameBoundary` (Cache Components quebra o
  build em rotas dinâmicas sem `<Suspense>`).
- Não edite `packages/ui/src/components/ui/*` à mão: customize em `ds/`.

## Verificação

- Não rode builds, typecheck, lint ou a suíte inteira de testes sem pedido
  explícito. Para edits pequenos, verifique com leituras/buscas direcionadas.
- Mudou regra de estimativa/dedup/agregação? Rode os testes de `packages/core`.

## Skills

- Use skills locais só quando a tarefa pedir ou tocar regras críticas do
  domínio. Supabase: `supabase` / `supabase-postgres-best-practices`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
