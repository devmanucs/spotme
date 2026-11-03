# Roadmap

Fases 0 e 1 estão como issues no
[SpotMe no Linear](https://linear.app/madev/project/spotme-dcb226780da0/overview)
(milestones "Fase 0" e "Fase 1", com dependências entre issues). Nas fases 2 e 3,
`item N` é o item do backlog na descrição do projeto.
Cada fase só começa quando a anterior cumpre o "pronto quando".

## Fase 0 — Fundações e spikes

| Item | Issue | Entrega |
|---|---|---|
| 0.0 Pedir o Extended Streaming History (leva até ~30 dias) | [MAD-14](https://linear.app/madev/issue/MAD-14) | Zip do histórico em mãos |
| 0.1 Spike OAuth + limites da Web API (via Bruno) | [MAD-15](https://linear.app/madev/issue/MAD-15) | Números em `SPOTIFY_PLATFORM.md` |
| 0.2 Spike semântica de tempo (`played_at` × `ts`) | [MAD-18](https://linear.app/madev/issue/MAD-18) | Regras confirmadas em `DATA_MODEL.md` |
| 0.3 Spike Supabase free (cron, pausa, pg_net, Queues) | [MAD-16](https://linear.app/madev/issue/MAD-16) | Decisão free × Pro |
| 0.4 Monorepo: pnpm + Turbo, `apps/web`, `packages/{core,db,spotify,ui,config}`, Supabase CLI local | [MAD-17](https://linear.app/madev/issue/MAD-17) | `pnpm dev` sobe web + Supabase local |
| 0.5 Design system estilo Spotify em `packages/ui` + shell | [MAD-19](https://linear.app/madev/issue/MAD-19) | Shell vazio com a cara do Spotify desktop |
| 0.6 CI (GitHub Actions): typecheck, lint, testes de `core` | [MAD-20](https://linear.app/madev/issue/MAD-20) | PR verde |

**Pronto quando:** os três spikes responderam e o shell vazio está no ar na Vercel.

## Fase 1 — MVP de estatísticas

| Item | Issue | Entrega |
|---|---|---|
| 1.1 Schema Drizzle + migrations + RLS | [MAD-21](https://linear.app/madev/issue/MAD-21) | Tabelas de `DATA_MODEL.md` |
| 1.2 Login Spotify + allowlist + refresh token no Vault | [MAD-22](https://linear.app/madev/issue/MAD-22) | `/api/me` responde só para a conta dela |
| 1.3 Regra de estimativa + dedup (`packages/core`, SQL) com testes | [MAD-23](https://linear.app/madev/issue/MAD-23) | Testes cobrindo pulos, pausas, sobreposição de fontes |
| 1.4 `collect-recent` + pg_cron + `collector_runs` | [MAD-24](https://linear.app/madev/issue/MAD-24) | Reproduções aparecendo sozinhas em `plays` |
| 1.5 Importador do Extended History (Web Worker + lotes + `import_jobs`) | [MAD-25](https://linear.app/madev/issue/MAD-25) | Anos de histórico importados, reimport idempotente |
| 1.6 Views materializadas + queries + `/api/stats` | [MAD-26](https://linear.app/madev/issue/MAD-26) | Hoje/semana/mês/ano em < 300 ms |
| 1.7 `enrich-worker` + fila + cache de capas + cor dominante | [MAD-27](https://linear.app/madev/issue/MAD-27) | Capas servidas pelo SpotMe |
| 1.8 Início: `PageHero`, `FilterChips`, `ListeningChart`, `Shelf`, `TrackTable` | [MAD-28](https://linear.app/madev/issue/MAD-28) | `/` completo |
| 1.9 Histórico, detalhe de artista/música, busca Ctrl K | [MAD-29](https://linear.app/madev/issue/MAD-29) | `/historico`, `/artistas/[id]`, `/musicas/[id]` |
| 1.10 Retrospectiva anual com heatmap | [MAD-30](https://linear.app/madev/issue/MAD-30) | `/retrospectiva/[ano]` |
| 1.11 `CollectorStatus` + alerta de lacuna | [MAD-31](https://linear.app/madev/issue/MAD-31) | `/coletor` + aviso no Início |
| 1.12 Deploy de produção + teste na rede corporativa | [MAD-32](https://linear.app/madev/issue/MAD-32) | Acessível do PC do trabalho |

**Pronto quando:** ela passa uma semana sem abrir nada além do Spotify e o
dashboard mostra a semana certa, com o histórico antigo importado.

## Fase 2 — Player integrado

| Item | Backlog | Entrega |
|---|---|---|
| 2.0 Spike Web Playback SDK em modo dev + domínios de rede | itens 8, 12 | Go/no-go |
| 2.1 Endpoint de token curto + registro do dispositivo "SpotMe" | item 9 | Aparece na lista de dispositivos do Spotify |
| 2.2 `NowPlayingBar` vira player (faixa, capa, play/pause, anterior/próxima, volume, progresso) | item 10 | Tocar e controlar pelo SpotMe |
| 2.3 Segmentos do player → `plays` com `source='web_player'` + dedup | item 11 | Tempo exato do que tocou no SpotMe |
| 2.4 Fallback: SDK indisponível → dock oculto com aviso | item 12 | Nada quebra na rede corporativa |

**Pronto quando:** uma tarde ouvindo pelo SpotMe aparece no dashboard com tempo
exato, sem duplicar com o coletor.

## Fase 3 — Espelho no YouTube Music

| Item | Backlog | Entrega |
|---|---|---|
| 3.0 Spike APIs (Data API v3 × `ytmusicapi`), quota, qualidade de match | item 13 | Go/no-go + decisão em `STACK.md` |
| 3.1 PoC: uma playlist Spotify → YouTube | item 14 | Playlist espelho criada |
| 3.2 Matching (nome normalizado, artista, duração ±3 s, score) | item 15 | `track_links` com confiança |
| 3.3 Sync incremental com orçamento de quota diária | item 16 | Novas faixas chegam sozinhas |
| 3.4 Tela de conflitos / sem correspondência | item 17 | Revisão manual em `/sync` |
| 3.5 Disponibilidade por serviço no dashboard | item 18 | Selo "também no YouTube Music" |

## Ideias soltas (sem fase)

- "Currently playing" a cada minuto para tempo mais preciso (custa invocações).
- Comparar top do SpotMe × `GET /me/top/*` do Spotify.
- Metas ("ouvir menos de 3 h/dia no trabalho"? "descobrir 20 artistas novos no mês").
- Export CSV/JSON dos próprios dados.
