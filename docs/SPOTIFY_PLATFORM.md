# Plataforma Spotify — regras, limites e riscos

As regras da Web API mudaram bastante em 2024–2026. **Este arquivo resume o que
sabemos em 2026-11-03 a partir de fontes secundárias**; antes de cada fase,
confira a documentação oficial (Spotify for Developers → Quota modes, Web API
changelog, Developer Terms, Design Guidelines) e atualize aqui.

## Modo de desenvolvimento (o nosso caso)

O SpotMe é pessoal, então fica em **Development Mode** para sempre. Desde
fev/2026 (apps novos em 11/02, existentes migrados em 09/03):

| Regra | Impacto no SpotMe |
|---|---|
| Dono do app precisa ter **Premium** | Ok se a conta dela é Premium. Também é requisito do Web Playback SDK. Planos Mini/Lite/mobile-only não servem para o SDK. |
| Até **5 usuários** autorizados por app | Irrelevante (1 usuária). |
| **Sem endpoints em lote** (`/tracks?ids=`, `/artists?ids=`, `/albums?ids=`) | Enriquecimento é 1 request por ID → fila com rate limit (ver ARCHITECTURE › Enriquecimento). |
| **Busca limitada a 10 resultados** | Não usamos busca do Spotify no v1 (Ctrl K busca no nosso banco). |
| Alguns endpoints removidos (ex.: top tracks de artista; antes, em nov/2024: audio features, recomendações, artistas relacionados) | Nada de "energia/dançabilidade" nem "artistas parecidos". Não planejar features em cima disso. |
| `/playlists/{id}/tracks` → `/playlists/{id}/items` | Usar o novo na Fase 3. |
| Quota de requisições por conta (respostas `429`, às vezes com motivo de quota) | Sempre respeitar `Retry-After`; backoff exponencial; nunca loop apertado. |
| Extended Quota só para organizações grandes | Não é caminho. Se algo exigir Extended Quota, a feature sai do escopo. |

## Endpoints que usamos

| Fase | Endpoint | Para quê | Risco |
|---|---|---|---|
| 1 | `POST /api/token` (accounts) | refresh do access token | — |
| 1 | `GET /me` | user ID, `product` | — |
| 1 | `GET /me/player/recently-played` | coleta (máx. 50, cursor `after`/`before`) | **Confirmar no Spike 0.1 que segue disponível no modo dev.** |
| 1 | `GET /tracks/{id}`, `/albums/{id}`, `/artists/{id}` | enriquecimento | campos podem ter sido enxugados (ex.: `popularity`, `genres`) |
| 1 (opcional) | `GET /me/top/{artists,tracks}` | comparar "nosso top" com "top do Spotify" | baixo |
| 2 | Web Playback SDK + `PUT /me/player`, `/me/player/play`… | player | **Relatos (mar/2026) de `player.connect()` nunca resolvendo em modo dev** — Spike 2.0 decide se a Fase 2 é viável. |
| 3 | `GET /me/playlists`, `GET /playlists/{id}/items` | ler playlists para espelhar | baixo |

## Scopes

Pedidos já no primeiro login (uma usuária só; evita re-login a cada fase):

| Scope | Fase |
|---|---|
| `user-read-recently-played` | 1 |
| `user-read-private` | 1 (saber se é Premium) |
| `user-top-read` | 1 (opcional) |
| `streaming`, `user-read-playback-state`, `user-modify-playback-state`, `user-read-currently-playing` | 2 |
| `playlist-read-private`, `playlist-read-collaborative` | 3 |

## Extended Streaming History

- Pedido em spotify.com → Conta → Privacidade → "Histórico de streaming
  estendido". Chega em até ~30 dias, cobre a conta toda.
- Arquivos `Streaming_History_Audio_<anos>_<n>.json` (e `..._Video_...`).
- Campos usados: `ts` (fim da reprodução, UTC), `ms_played`,
  `spotify_track_uri`, `master_metadata_track_name`,
  `master_metadata_album_artist_name`, `master_metadata_album_album_name`,
  `platform`, `reason_start`, `reason_end`, `shuffle`, `skipped`, `offline`.
- Campos **descartados no navegador**: `ip_addr`, `conn_country` (v1),
  `offline_timestamp`, `incognito_mode` (linhas incógnitas: ignorar? — decidir
  no spike), campos de episódio/audiobook.
- Não traz IDs de artista/álbum → tudo depende do enriquecimento.
- Dá para pedir de novo periodicamente (ex.: todo ano) para "fechar" lacunas do
  coletor — a dedup garante que reimportar é seguro.

## Rede corporativa

O Spotify é bloqueado na rede da empresa. O SpotMe **não contorna isso**:

- Dashboard: funciona porque só fala com Vercel/Supabase. Capas vêm do nosso
  Storage, não de `i.scdn.co`.
- Coletor: roda na nuvem; não depende de onde ela está.
- Player (Fase 2): só funciona onde os domínios do Spotify forem acessíveis.
  O Spike 2.0 lista os domínios que o SDK usa, para saber onde ele roda — não
  para burlar bloqueio. Se estiver bloqueado, o `PlayerDock` simplesmente não
  aparece (detectar falha do SDK e esconder com mensagem clara).

## Diretrizes de uso de conteúdo

- Mostrar atribuição do Spotify junto de metadados/capas; link de volta
  ("Abrir no Spotify") onde houver ação.
- Capas sem recorte/filtro/sobreposição de texto.
- Sem uso comercial do Web Playback SDK sem autorização (não é o caso).
- Cachear capas/metadados para uso pessoal: **conferir a Developer Policy
  atual** sobre armazenamento de conteúdo antes de implementar o cache de capas.

## Spikes (fazer antes de escrever feature)

| Spike | Pergunta | Saída |
|---|---|---|
| **0.1 OAuth + endpoints** | Com um app em modo dev e conta Premium: login, refresh, `recently-played`, `GET /tracks/{id}` funcionam? Qual o rate limit prático em `GET /tracks/{id}` sequencial? | Script em `scripts/spikes/` + números anotados aqui |
| **0.2 Semântica de tempo** | `played_at` é início ou fim? Como bate com o `ts` do Extended History num mesmo dia? | Confirmação/ajuste das regras em DATA_MODEL |
| **0.3 Supabase free** | pg_cron a cada 20 min mantém o projeto acordado? Edge Function chamada por `pg_net` com segredo funciona local e remoto? | Decisão: free basta ou precisa Pro |
| **2.0 Web Playback SDK** | `connect()` funciona em modo dev hoje? Quais domínios usa? | Go/no-go da Fase 2 |
| **3.0 YouTube** | Data API v3 cobre criar/editar playlists que aparecem no YouTube Music? Quantos matches/dia cabem na quota? Qualidade do match por busca? | Go/no-go e escolha Data API vs `ytmusicapi` |
