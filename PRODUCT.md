# Product

## Register

product

## Users

Uso pessoal e individual (só a dona do projeto usa). Ela ouve Spotify no
celular, em casa e em qualquer rede própria; no trabalho o Spotify é bloqueado
pela rede corporativa e **o projeto não tenta contornar isso**.

Contextos de uso:

- **Principal — olhar os números no desktop.** Abrir o dashboard (inclusive do
  PC do trabalho, já que o SpotMe é um site próprio e não um domínio do
  Spotify) e ver quanto ouviu hoje, na semana, no mês e no ano, e quem/o que
  dominou o período.
- **Secundário — retrospectiva.** Sentar com calma no fim do mês/ano e explorar
  o histórico: evolução, picos, artistas que entraram e saíram da rotação.
- **Fase 2 — tocar música pelo próprio SpotMe** (Web Playback SDK) quando os
  domínios do Spotify estiverem acessíveis na rede em que ela estiver.

## Product Purpose

Um "Wrapped que não espera dezembro": coleta automaticamente o que ela ouve no
Spotify, guarda num banco próprio e transforma isso em métricas que ela pode
consultar a qualquer momento, com histórico completo (incluindo o passado
importado do Extended Streaming History).

Sucesso = ela abre o SpotMe e em poucos segundos sabe **quantas horas ouviu no
período** e **o que mais ouviu**, sem ter feito nada além de usar o Spotify
normalmente.

### O que o produto faz (v1)

1. Login com a conta Spotify dela (e só dela).
2. Coleta automática das reproduções recentes, em segundo plano, fora da rede
   corporativa.
3. Importação do Extended Streaming History (JSONs do pedido de privacidade do
   Spotify) para reconstruir anos de histórico.
4. Dashboard com tempo ouvido por dia/semana/mês/ano, rankings de músicas e
   artistas, média diária e evolução no ano.

### Fases seguintes

- **Fase 2 — Player integrado.** O SpotMe vira um dispositivo Spotify Connect
  no navegador; o que toca por ele alimenta as métricas com duração exata.
- **Fase 3 — Espelho no YouTube Music.** Playlists do Spotify (fonte da
  verdade) espelhadas no YouTube Music, com fila de revisão para faixas sem
  correspondência — alternativa de reprodução quando o Spotify não está
  acessível.

### Fora de escopo

- Contornar bloqueio de rede, proxy de áudio, VPN ou qualquer coisa do tipo.
- Multiusuário, perfis públicos, features sociais, comparação com amigos.
- Recomendação de músicas.
- Download/cache de áudio.
- App mobile nativo (o web responsivo basta para consultar no celular).

## Métricas — definições

Definições fixas para que todo gráfico conte do mesmo jeito.

| Métrica | Definição |
|---|---|
| **Tempo ouvido** | Soma de `ms_played` das reproduções de **músicas** no período. Podcasts/audiobooks ficam fora do total (aparecem em seção própria, se um dia existir). |
| **Reprodução contabilizada** | Reprodução com `ms_played >= 30s` (mesmo critério de "stream" do Spotify). Reproduções menores entram no tempo ouvido, mas não em contagem/ranking. |
| **Tempo estimado** | A API de "tocadas recentemente" não informa quanto foi ouvido. Para essas reproduções o tempo é **estimado** e marcado como tal (regra em [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)). A UI deixa claro quando um número contém estimativa. |
| **Dia** | Dia civil no fuso configurado (padrão `America/Sao_Paulo`). Uma música que termina 00:02 conta no dia em que terminou. |
| **Semana** | Segunda a domingo (ISO 8601). |
| **Média por dia** | Tempo ouvido no período ÷ dias corridos do período (dias sem música contam como zero). |
| **Top artistas** | Ranking por tempo ouvido; desempate por número de reproduções. Faixa com vários artistas credita o tempo integral a cada um (como o Wrapped). |
| **Top músicas** | Ranking por número de reproduções contabilizadas; desempate por tempo ouvido. |

## Brand Personality

Pessoal, curioso, um pouco nerd de música. Tem cara de **caderno de escuta** —
um diário que se escreve sozinho — e não de painel corporativo. Os números são
o centro, mas a capa dos álbuns traz a cor e a emoção.

**Identidade própria, não um clone do Spotify**: sem verde Spotify como cor de
marca, sem imitar o layout do app oficial. O Spotify aparece só onde as regras
de uso da plataforma exigem (atribuição, logo ao lado de conteúdo, link
"Abrir no Spotify").

> Nota de nome: "SpotMe" serve para uso pessoal. Se o projeto um dia for
> público/distribuído, rever o nome — as diretrizes do Spotify vetam nomes que
> possam ser confundidos com a marca.

## Anti-references

- **Clone do Spotify**: fundo `#121212`, verde `#1DB954`, sidebar de
  biblioteca. É outra coisa, e copiar a marca deles viola as diretrizes.
- **Spotify Wrapped em versão SaaS**: slides animados de "story" para tudo,
  confete, gradiente em texto. Retrospectiva é para explorar, não para assistir.
- **Painel de analytics genérico**: grid de cards idênticos com ícone + número
  + "+12% vs. último mês" em verde para tudo.
- **Planilha disfarçada**: tabelas cruas com 50 linhas sem hierarquia.

## Design Principles

1. **Número primeiro, capa em seguida.** O dado responde à pergunta; a
   arte do álbum dá contexto e cor. Decoração nunca compete com os dois.
2. **Honestidade sobre o dado.** Estimativa é sinalizada, lacuna de coleta é
   mostrada, importação parcial aparece como parcial. Nunca inventar precisão.
3. **Funciona onde o Spotify não funciona.** O dashboard só fala com o
   backend do SpotMe; nada na tela de estatísticas depende de o navegador
   alcançar domínios do Spotify (capas inclusive — ver
   [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)).
4. **Zero manutenção diária.** Depois do login e da importação inicial, o
   produto se mantém sozinho. Qualquer ação manual recorrente é bug de produto.
5. **Um design system, não uma vitrine.** Reusa os componentes/tokens de
   `packages/ui`; dark e light com o mesmo cuidado.

## Accessibility & Inclusion

Contraste mínimo AA (WCAG) em texto e em séries de gráfico. Status e
estimativas nunca comunicados só por cor (ícone ou rótulo junto). Respeita
`prefers-reduced-motion` (contadores animados viram número estático). Gráficos
têm resumo textual/tabela alternativa acessível.
