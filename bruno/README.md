# Coleção Bruno — SpotMe

Abra a pasta `bruno/` no [Bruno](https://www.usebruno.com/) (Open Collection).

## Pastas

| Pasta | O que testa |
|---|---|
| `00 Saude` | `GET /api/health` |
| `01 Spotify OAuth` | Conseguir e renovar tokens do Spotify **sem** o app (para os spikes) |
| `02 Spotify Web API` | Chamadas diretas que o coletor e o enriquecimento fazem |
| `03 Sessao SpotMe` | Sessão do SpotMe (`/api/me`) e como pegar o token |
| `04 Coletor` | Edge Functions `collect-recent` e `enrich-worker` + status |
| `05 Importacao` | Fluxo do Extended History: abrir job → lote → finalizar → status |
| `06 Estatisticas` | `/api/stats/*` e `/api/plays` |
| `07 Erros esperados` | 401/400 que precisam continuar acontecendo |

Rotas descritas em [`docs/ARCHITECTURE.md` › API HTTP](../docs/ARCHITECTURE.md#api-http).

## Primeiro uso

1. Selecione o ambiente **Local**.
2. Preencha `spotifyClientId` e os segredos (`spotifyClientSecret`, `cronSecret`).
   Variáveis em `vars:secret` ficam guardadas **só na sua máquina** pelo Bruno —
   o arquivo do ambiente no git nunca tem o valor.
3. No app do Spotify for Developers, cadastre `http://127.0.0.1:8888/callback`
   como Redirect URI (além do callback do Supabase).
4. Siga `01 Spotify OAuth` na ordem (1 → 2). Depois disso a pasta `02` funciona;
   quando der 401, rode `3 Renovar access token`.
5. Para as rotas do SpotMe (`03`–`06`), faça login no app e copie o access
   token do Supabase para `supabaseAccessToken` (passo a passo em `03 Sessao SpotMe/Me`).

## Convenções

- Uma requisição por arquivo, nome em português, sem acento no nome do arquivo.
- Scripts `post-response` guardam IDs/tokens no ambiente para a próxima requisição.
- Toda rota nova do app ganha uma requisição aqui no mesmo PR, e erro esperado
  novo vai para `07 Erros esperados` com `assert`.
- Nunca commitar valor de segredo: só em `vars:secret`.
