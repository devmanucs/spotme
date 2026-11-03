# DESIGN.md — SpotMe

Sistema visual do app. Qualquer tela nova deve nascer parecida com as que já
existem, sem garimpar componente por componente. Personalidade e princípios
estão em [`PRODUCT.md`](PRODUCT.md) — este arquivo é o "como".

## Conceito

**O Spotify desktop, só que de estatísticas.** A mesma linguagem despojada e
autêntica do app: moldura preta, painéis `#121212` com cantos arredondados,
texto branco em negrito, cinza `#B3B3B3` para o resto, verde só onde há ação
ou destaque, e a cor viva vindo das capas e fotos (cabeçalhos em degradê a
partir da cor dominante). Quem abre o SpotMe tem que se sentir "dentro do
Spotify" — vendo os próprios números.

> **Uso pessoal.** Essa identidade é intencional para um projeto privado. O logo
> do Spotify aparece só como atribuição, nunca como logo do SpotMe, e a fonte
> proprietária do Spotify é substituída por uma livre. Se um dia o projeto for
> público, revisar a identidade: a Developer Policy do Spotify veta apps que
> pareçam ser feitos pelo Spotify.

## Princípios visuais

1. **Escuro, como o Spotify.** Um tema só (escuro) no v1. Sem alternância
   claro/escuro — menos superfície para manter, mais autêntico.
2. **Cabeçalho de página = número herói.** Toda tela abre como uma página de
   artista/playlist do Spotify: degradê da cor dominante, rótulo pequeno em
   cima, número/título gigante em negrito, metadado em cinza embaixo.
3. **Capa e foto são a ilustração.** Nada de ilustração decorativa onde há
   dado. Álbuns quadrados, artistas redondos — como no Spotify.
4. **Verde é ação, não decoração.** `--primary` (verde) só em: botão de
   play/ação principal, item ativo, barra de progresso, série principal de
   gráfico. Nunca em texto corrido nem em fundo grande.
5. **Estimativa sempre marcada.** Todo número com tempo estimado leva o
   `EstimateBadge` (ícone + tooltip), nunca só uma cor diferente.

## Tokens

Definidos em `packages/ui/src/styles/globals.css`, em `oklch`, direto no
`:root` (tema único). **Nunca escreva cor literal em componente** — use os
tokens via classes Tailwind (`bg-card`, `text-muted-foreground`, ...).

### Cor

| Token | Valor | Ref. | Uso |
|---|---|---|---|
| `--background` | `oklch(0 0 0)` | `#000000` | Moldura do app (atrás dos painéis) |
| `--card` | `oklch(0.182 0 0)` | `#121212` | Painéis (sidebar, conteúdo, player) |
| `--elevated` | `oklch(0.239 0 0)` | `#1F1F1F` | Card em repouso, input de busca, menus |
| `--highlight` | `oklch(0.285 0 0)` | `#2A2A2A` | Hover de linha/card |
| `--pressed` | `oklch(0.364 0 0)` | `#3E3E3E` | Ativo/pressionado, trilho da barra de progresso |
| `--foreground` | `oklch(1 0 0)` | `#FFFFFF` | Títulos, texto principal, item ativo |
| `--muted-foreground` | `oklch(0.767 0 0)` | `#B3B3B3` | Texto de apoio, metadado, ícone inativo |
| `--primary` | `oklch(0.770 0.212 148.7)` | `#1ED760` | Botão de ação, ativo, progresso, série principal |
| `--primary-hover` | `oklch(0.82 0.2 148.7)` | — | Hover do botão verde (clareia + `scale-[1.04]`) |
| `--primary-foreground` | `oklch(0 0 0)` | `#000000` | Ícone/texto sobre o verde |
| `--destructive` | `oklch(0.708 0.159 15.8)` | `#F3727F` | Excluir dados / erro |
| `--warning` | `oklch(0.792 0.163 67.4)` | `#FFA42B` | Coletor atrasado, lacuna |
| `--info` | `oklch(0.688 0.150 254.2)` | `#539DF5` | Avisos neutros, links em texto longo |
| `--border` | `oklch(1 0 0 / 10%)` | — | Divisórias (raras — o Spotify separa por espaço, não por linha) |
| `--ring` | `oklch(1 0 0)` | — | Foco visível |
| `--chart-1` … `--chart-5` | verde, azul, laranja, rosa, lilás (`--primary`, `--info`, `--warning`, `--destructive`, `oklch(0.72 0.09 310)`) | — | Séries de gráfico |
| `--heat-0` … `--heat-4` | `--elevated` → `--primary` em 5 passos | — | Heatmap de calendário |

### Cor dominante (degradê de cabeçalho)

Ao cachear uma capa/foto, o backend extrai a cor dominante e salva em
`albums.dominant_color` / `artists.dominant_color` (já ajustada para
luminosidade L entre 0.35 e 0.55, para o texto branco ter contraste). O
cabeçalho de página usa:

```css
background: linear-gradient(to bottom, var(--hero) 0%, color-mix(in oklch, var(--hero) 40%, var(--card)) 60%, var(--card) 100%);
```

Sem cor (estado vazio/sem dado): `--hero` = `oklch(0.35 0 0)`.

### Raio

| Token | Valor | Uso |
|---|---|---|
| `--radius` | `8px` | Painéis, cards, menus, tooltips |
| `--radius-cover` | `4px` (≥ 160px: `6px`) | Capas de álbum |
| `rounded-full` | — | Botões (pílula), chips, fotos de artista, avatar, botão de play |

### Tipografia

- **Figtree** (Google Fonts, variável 300–900) para tudo — é a alternativa
  livre mais próxima da fonte do Spotify. `--font-sans`.
- Títulos em **700/800** com `tracking-tight` (≈ −0.04em nos tamanhos grandes).
- Escala:

| Papel | Tamanho / peso |
|---|---|
| Número/título herói de página | `clamp(48px, 7vw, 96px)` / 800 |
| Título de seção ("Seus artistas do mês") | 24px / 700 |
| Título de card | 16px / 700 |
| Corpo, linhas de tabela | 14–16px / 400–500 |
| Metadado, rótulo pequeno em cima do herói | 12–14px / 500, `text-muted-foreground` |

- **Todo número usa `tabular-nums`**, inclusive em rankings e eixos.

### Formatação de duração e datas

Uma função só (`formatDuration` em `packages/core`), usada em todo lugar:

| Valor | Exibição |
|---|---|
| < 1 min | `42 s` |
| < 1 h | `37 min` |
| < 100 h | `12 h 05 min` |
| ≥ 100 h | `1.284 h` (herói pode mostrar `1.284,5 h`) |

Duração de faixa em tabela no formato do Spotify: `3:42`. Datas em pt-BR
(`date-fns/locale/pt-BR`) no fuso configurado; relativo ("há 12 min") só para
menos de 24 h.

### Movimento

Discreto e rápido, como no app: hover de card troca o fundo (`--elevated` →
`--highlight`) em 150 ms e revela o botão verde subindo 8px; botões verdes
crescem 4% no hover. Nada de animação de entrada em lista. Com
`prefers-reduced-motion`: só troca de cor.

## Ícones

**HugeIcons** (`@hugeicons/react` + `@hugeicons/core-free-icons`), sempre via
`<HugeiconsIcon icon={X} strokeWidth={2} />`. Inativo em
`text-muted-foreground`, ativo/hover em `text-foreground` (como a navegação do
Spotify). Não misture outra biblioteca. O logo do Spotify vem do asset oficial
em `packages/ui/assets/spotify/` e é usado **só** em atribuição.

## Camadas de componente

**Reusar antes de criar**, nesta ordem:

```
packages/ui/src/components/ui/   → primitivos shadcn/Base UI (vêm do registry, não editar à mão)
packages/ui/src/components/ds/   → wrappers do design system, prefixo Ds
apps/web/src/components/         → componentes do app (shell, page-hero, media-card…)
apps/web/src/features/<x>/components/ → específicos de um módulo
```

### Componentes do domínio

| Componente | Inspiração no Spotify | O que é |
|---|---|---|
| `PageHero` | Cabeçalho de artista/playlist | Degradê da cor dominante + rótulo ("Tempo ouvido · novembro") + número gigante + metadado ("1.204 reproduções · 312 músicas · 98 artistas"). Aceita `estimated`. |
| `ActionBar` | Barra abaixo do cabeçalho (play, shuffle, …) | Botão verde redondo da ação principal + ações secundárias em ícone. |
| `FilterChips` | Chips "Músicas · Artistas · Álbuns" | Pílulas `bg-elevated`; selecionada = `bg-foreground text-background`. Usado como seletor de período (Hoje · Semana · Mês · Ano · Personalizado). Estado na URL (`?p=month&d=2026-11`). |
| `Shelf` | Prateleiras da home | Título de seção + "Mostrar tudo" + linha de `MediaCard`s que vira grid/scroll horizontal. |
| `MediaCard` | Card de álbum/artista/playlist | Capa (quadrada) ou foto (redonda), título, subtítulo cinza; hover revela botão verde. Na Fase 1 o botão é "Abrir no Spotify"; na Fase 2, tocar. |
| `TrackTable` | Lista de faixas de playlist | `#` · capa 40px + título/artista · álbum · reproduções · tempo ouvido · duração. Hover `--highlight`; o `#` vira ícone de play no hover. Cabeçalho fixo com divisória. |
| `CoverArt` | Capas e fotos do app | Imagem servida pelo SpotMe (nunca hotlink do CDN do Spotify): álbum quadrado com `--radius-cover`, artista `rounded-full`, sem recorte, `alt` com o nome. |
| `ListeningChart` | — (minimalista no tom do app) | Barras/área verdes sobre o painel, eixos em cinza, sem grade pesada. Recharts. |
| `CalendarHeatmap` | — | Ano inteiro, quadrado por dia, rampa `--heat-*`. Clique leva ao dia no histórico. |
| `EstimateBadge` | — | Ícone + tooltip "inclui tempo estimado — veja como calculamos". |
| `CollectorStatus` | Banner de "você está offline" | Última coleta, próxima, e alerta em `--warning` se houver lacuna (> 2 h). |
| `NowPlayingBar` | Barra do player no rodapé | **Fase 1:** "Tocou por último" (capa, faixa, artista, há quanto tempo) lido do banco. **Fase 2:** vira o player real (controles, progresso, volume). |
| `SpotifyAttribution` | — | Logo oficial + link "Abrir no Spotify". |

## Shell da aplicação

Layout do Spotify desktop: moldura preta, painéis `--card` arredondados com
**8px de espaço** entre eles.

```
┌──────────────────────────────────────────────────────────────┐
│ TopBar: [⌂]  [🔍 O que você quer ver?  Ctrl K ]        [avatar] │  ← sobre a moldura preta
├───────────────┬──────────────────────────────────────────────┤
│ Sidebar       │ Conteúdo (rola)                              │
│ (painel)      │ ┌──────────────────────────────────────────┐ │
│ Início        │ │ PageHero (degradê)                        │ │
│ Histórico     │ ├──────────────────────────────────────────┤ │
│ Artistas      │ │ ActionBar · FilterChips                   │ │
│ Músicas       │ │ Shelf / TrackTable / gráficos             │ │
│ Retrospectiva │ └──────────────────────────────────────────┘ │
│ ─────         │                                              │
│ Importar      │                                              │
│ Coletor       │                                              │
├───────────────┴──────────────────────────────────────────────┤
│ NowPlayingBar (rodapé, altura 72px)                           │
└──────────────────────────────────────────────────────────────┘
```

- **TopBar:** botão Início redondo, busca em pílula (`bg-elevated`, Ctrl K)
  que procura músicas/artistas/álbuns **no banco do SpotMe**, avatar à
  direita com menu (Configurações, Sair).
- **Sidebar:** colapsável para só ícones (Ctrl+B), como "Sua Biblioteca".
  Dois grupos: **Explorar** (Início, Histórico, Artistas, Músicas,
  Retrospectiva) e **Dados** (Importar, Coletor). Fase 3 adiciona **Sync**.
- **Conteúdo:** painel com rolagem própria; o cabeçalho da página vira uma
  barra fixa com o título pequeno quando rola (como no Spotify).
- **Mobile (< 768px):** sem sidebar; navegação inferior com 4 ícones
  (Início, Histórico, Busca, Retrospectiva), `NowPlayingBar` compacta acima dela.

## Telas

| Rota | Pergunta | Cabeçalho (`PageHero`) | Corpo |
|---|---|---|---|
| `/` | Quanto e o que ouvi neste período? | Horas no período, degradê da capa mais ouvida | `FilterChips` de período · `ListeningChart` · `Shelf` top artistas · `TrackTable` top músicas · `Shelf` top álbuns |
| `/historico` | O que tocou, quando? | "Histórico" + total de reproduções | `TrackTable` virtualizada agrupada por dia, chips de fonte (API / Histórico importado) |
| `/artistas` · `/artistas/[id]` | Qual minha relação com esse artista? | Foto redonda + nome + "123 h ouvidas" | Evolução · `TrackTable` das músicas dele · primeira e última vez |
| `/musicas` · `/musicas/[id]` | Quantas vezes ouvi isso? | Capa + nome + "312 reproduções" | Evolução · onde tocou (contexto) · primeira/última vez |
| `/retrospectiva/[ano]` | Como foi meu ano? | Horas no ano | `CalendarHeatmap` · mês a mês · top 5s em formato "Wrapped" (blocos grandes de cor dominante) |
| `/importar` | Meu histórico antigo está completo? | "Importar histórico" | Área de soltar arquivo, progresso, resumo (inseridas / duplicadas / ignoradas) |
| `/coletor` | O coletor está funcionando? | Status | `CollectorStatus`, últimas execuções, conta conectada, fuso |

Estado vazio: cabeçalho cinza + frase + botão verde em pílula ("Conectar
Spotify" / "Importar histórico") — como as telas vazias de biblioteca do
Spotify.

## Regras do Spotify que valem mesmo assim

(Conferir as Design Guidelines e os Developer Terms atuais antes de publicar
qualquer tela nova.)

- Capas: sem recorte, distorção, filtro ou texto por cima; raio pequeno.
- Conteúdo do Spotify (capas, metadados) com atribuição e link de volta onde
  houver ação ("Abrir no Spotify").
- O logo do Spotify não vira logo do SpotMe; fonte proprietária não é usada.

## Acessibilidade

- Contraste AA: branco e `#B3B3B3` sobre `#121212`/`#1F1F1F` passam; nunca usar
  `--muted-foreground` sobre `--highlight` em texto pequeno.
- Degradê de cabeçalho com cor dominante limitada (L 0.35–0.55) para o texto
  branco manter AA.
- Foco sempre visível (`outline-2 outline-ring`).
- Estimativa/status nunca só por cor.
- Gráficos com `aria-label` resumindo o dado + "ver como tabela".
- `prefers-reduced-motion`: só troca de cor, sem deslocamentos.

## Checklist de tela nova

- [ ] Abre com `PageHero` e usa `Shelf`/`TrackTable`/`MediaCard` em vez de layout novo?
- [ ] Só token de cor, nada literal? Verde só em ação/ativo/progresso?
- [ ] Números com `tabular-nums` e `formatDuration`?
- [ ] Estimativas marcadas com `EstimateBadge`?
- [ ] Capas via `CoverArt` (servidas pelo SpotMe), artistas redondos?
- [ ] Estado vazio com botão em pílula?
- [ ] Funciona com sidebar recolhida e em 375px?
