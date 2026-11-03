# Roadmap

Os números `#N` são os itens do backlog na descrição do projeto
[SpotMe no Linear](https://linear.app/madev/project/spotme-dcb226780da0/overview).
Cada fase só começa quando a anterior cumpre o "pronto quando".

## Fase 0 — Fundações e spikes

| Item | Linear | Entrega |
|---|---|---|
| 0.1 Spike OAuth + limites da Web API | #1 | Script + números em `SPOTIFY_PLATFORM.md` |
| 0.2 Spike semântica de tempo (`played_at` × `ts`) | #2 | Regras confirmadas em `DATA_MODEL.md` |
| 0.3 Spike Supabase free (cron, pausa, pg_net) | #7 | Decisão free × Pro |
| 0.4 Monorepo: pnpm + Turbo, `apps/web`, `packages/{core,db,spotify,ui,config}`, Supabase CLI local | — | `pnpm dev` sobe web + Supabase local |
| 0.5 Design system em `packages/ui`: tokens, fontes, shell (topbar + sidebar), tema | — | Tela vazia com shell nos dois temas |
| 0.6 CI (GitHub Actions): typecheck, lint, testes de `core` | — | PR verde |

**Pronto quando:** os três spikes responderam e o shell vazio está no ar na Vercel.

## Fase 1 — MVP de estatísticas

| Item | Linear | Entrega |
|---|---|---|
| 1.1 Schema Drizzle + migrations + RLS | #2 | Tabelas de `DATA_MODEL.md` |
| 1.2 Login Spotify + allowlist + refresh token no Vault | #1 | `/configuracoes` mostra conta conectada |
| 1.3 `collect-recent` + pg_cron + `collector_runs` | #4 | Reproduções aparecendo sozinhas em `plays` |
| 1.4 Regra de estimativa + dedup (`packages/core`, SQL) com testes | #5 | Testes cobrindo pulos, pausas, sobreposição de fontes |
| 1.5 Importador do Extended History (Web Worker + lotes + `import_jobs`) | #3 | Anos de histórico importados, reimport idempotente |
| 1.6 `enrich-worker` + fila + cache de capas + cor dominante | #3 | Capas servidas pelo SpotMe |
| 1.7 Views materializadas + queries de agregação | #5 | Hoje/semana/mês/ano em < 300 ms |
| 1.8 Dashboard: `StatHero`, `StatStrip`, `PeriodSwitcher`, `ListeningChart`, `RankList` | #6 | `/` completo |
| 1.9 Histórico, detalhe de artista/música, busca Ctrl K | #6 | `/historico`, `/artistas/[id]`, `/musicas/[id]` |
| 1.10 Retrospectiva anual com heatmap | #6 | `/retrospectiva/[ano]` |
| 1.11 `CollectorStatus` + alerta de lacuna | #7 | Aviso quando o coletor falhar |
| 1.12 Deploy de produção (Vercel + Supabase), domínio | #7 | Acessível do PC do trabalho |

**Pronto quando:** ela passa uma semana sem abrir nada além do Spotify e o
dashboard mostra a semana certa, com o histórico antigo importado.

## Fase 2 — Player integrado

| Item | Linear | Entrega |
|---|---|---|
| 2.0 Spike Web Playback SDK em modo dev + domínios de rede | #8, #12 | Go/no-go |
| 2.1 Endpoint de token curto + registro do dispositivo "SpotMe" | #9 | Aparece na lista de dispositivos do Spotify |
| 2.2 `PlayerDock` (faixa, capa, play/pause, anterior/próxima, volume, progresso) | #10 | Tocar e controlar pelo SpotMe |
| 2.3 Segmentos do player → `plays` com `source='web_player'` + dedup | #11 | Tempo exato do que tocou no SpotMe |
| 2.4 Fallback: SDK indisponível → dock oculto com aviso | #12 | Nada quebra na rede corporativa |

**Pronto quando:** uma tarde ouvindo pelo SpotMe aparece no dashboard com tempo
exato, sem duplicar com o coletor.

## Fase 3 — Espelho no YouTube Music

| Item | Linear | Entrega |
|---|---|---|
| 3.0 Spike APIs (Data API v3 × `ytmusicapi`), quota, qualidade de match | #13 | Go/no-go + decisão em `STACK.md` |
| 3.1 PoC: uma playlist Spotify → YouTube | #14 | Playlist espelho criada |
| 3.2 Matching (nome normalizado, artista, duração ±3 s, score) | #15 | `track_links` com confiança |
| 3.3 Sync incremental com orçamento de quota diária | #16 | Novas faixas chegam sozinhas |
| 3.4 Tela de conflitos / sem correspondência | #17 | Revisão manual em `/sync` |
| 3.5 Disponibilidade por serviço no dashboard | #18 | Selo "também no YouTube Music" |

## Ideias soltas (sem fase)

- "Currently playing" a cada minuto para tempo mais preciso (custa invocações).
- Comparar top do SpotMe × `GET /me/top/*` do Spotify.
- Metas ("ouvir menos de 3 h/dia no trabalho"? "descobrir 20 artistas novos no mês").
- Export CSV/JSON dos próprios dados.
