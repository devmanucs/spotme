# DESIGN.md — SpotMe

Sistema visual do app. Qualquer tela nova deve nascer parecida com as que já
existem, sem garimpar componente por componente. Personalidade, anti-referências
e princípios estão em [`PRODUCT.md`](PRODUCT.md) — este arquivo é o "como".

## Conceito

**Caderno de escuta.** Papel quente no tema claro, tinta profunda no escuro;
números grandes e tipografia com personalidade; a cor viva vem das **capas dos
álbuns** e de um único acento próprio (vermelhão). Nada de verde Spotify.

## Princípios visuais

1. **Um número herói por tela.** Cada tela responde uma pergunta principal com
   um número grande (`StatHero`); o resto é contexto.
2. **A capa é a ilustração.** Não usamos ilustração decorativa onde há dado:
   capas de álbum e fotos de artista fazem esse papel. Ilustração só em estado
   vazio.
3. **Estimativa sempre marcada.** Todo número que contém tempo estimado leva o
   `EstimateBadge` (ícone + tooltip), nunca só uma cor diferente.
4. **Densidade com hierarquia.** Desktop é o uso principal: pode mostrar
   bastante coisa, desde que a ordem de leitura seja óbvia.

## Tokens

Definidos em `packages/ui/src/styles/globals.css`, em `oklch`, com tema claro em
`:root` e escuro em `.dark`. **Nunca escreva cor literal em componente** — use
os tokens via classes Tailwind (`bg-card`, `text-muted-foreground`, ...).

### Cor

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--background` | `oklch(0.985 0.006 85)` papel | `oklch(0.165 0.012 275)` tinta | Fundo da página |
| `--foreground` | `oklch(0.22 0.015 275)` | `oklch(0.95 0.006 85)` | Texto principal |
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0.014 275)` | Superfícies elevadas |
| `--muted` / `--muted-foreground` | `oklch(0.955 0.008 85)` / `oklch(0.50 0.015 275)` | `oklch(0.25 0.014 275)` / `oklch(0.70 0.012 275)` | Fundo neutro, texto de apoio |
| `--primary` | `oklch(0.62 0.19 35)` vermelhão | `oklch(0.70 0.17 35)` | Ação principal, item ativo, série "você" nos gráficos |
| `--secondary` | `oklch(0.52 0.14 275)` índigo | `oklch(0.72 0.12 275)` | Destaque secundário, links |
| `--destructive` | `oklch(0.58 0.21 25)` | `oklch(0.68 0.19 25)` | Excluir dados / importação |
| `--warning` | `oklch(0.78 0.15 80)` | `oklch(0.80 0.14 80)` | Coletor atrasado, lacuna de dados |
| `--border` / `--input` / `--ring` | derivados do foreground com alpha | idem | Bordas, campos, foco |
| `--chart-1` … `--chart-5` | vermelhão, índigo, âmbar, verde-azulado, rosa | versões mais claras | Séries de gráfico |
| `--heat-0` … `--heat-4` | rampa do `--muted` ao `--primary` | idem | Heatmap de calendário |

Os valores acima são o ponto de partida; ajuste mantendo **contraste AA** e a
regra: neutros com croma ≤ 0.02, só `--primary`/`--chart-*` têm cor forte.

### Cor da capa (acento dinâmico)

Ao cachear a capa de um álbum, o backend extrai a cor dominante e salva em
`albums.dominant_color`. Componentes podem usá-la **só como tinta de fundo
suave** (ex.: `color-mix(in oklch, var(--album) 14%, var(--card))`) em cards
herói ("música do mês", "artista do ano"). Texto nunca vai em cima da cor pura.

### Raio

`--radius: 0.75rem` é a base; `--radius-sm` … `--radius-2xl` derivados por
multiplicação. **Exceção: capas de álbum** usam raio pequeno e fixo
(`--radius-cover: 4px`; até `8px` em capas grandes) por causa das diretrizes do
Spotify.

### Tipografia

- `--font-heading`: **Bricolage Grotesque** (variável) — títulos e números
  heróis. Classe `font-heading`.
- `--font-sans`: **Inter** — todo o resto.
- **Todo número usa `tabular-nums`**, inclusive em rankings e eixos.

Escala de números: `StatHero` 56–72px, `StatStrip` 28–32px, ranking 14px.

### Formatação de duração e datas

Uma função só (`formatDuration` em `packages/core`), usada em todo lugar:

| Valor | Exibição |
|---|---|
| < 1 min | `42 s` |
| < 1 h | `37 min` |
| < 100 h | `12 h 05 min` |
| ≥ 100 h | `1.284 h` (número herói pode mostrar `1.284,5 h`) |

Datas em pt-BR (`date-fns/locale/pt-BR`), sempre no fuso configurado pela
usuária. Relativo ("há 12 min") só para eventos de menos de 24 h.

## Ícones

**HugeIcons** (`@hugeicons/react` + `@hugeicons/core-free-icons`), sempre via
`<HugeiconsIcon icon={X} strokeWidth={2} />`. Não misture outra biblioteca.
Logo do Spotify **não** é um ícone da biblioteca: vem do asset oficial em
`packages/ui/assets/spotify/`, usado só em atribuição.

## Camadas de componente

**Reusar antes de criar**, nesta ordem:

```
packages/ui/src/components/ui/   → primitivos shadcn/Base UI (vêm do registry, não editar à mão)
packages/ui/src/components/ds/   → wrappers do design system, prefixo Ds
apps/web/src/components/         → componentes do app (shell, stat-hero, rank-list…)
apps/web/src/features/<x>/components/ → específicos de um módulo
```

### Componentes do domínio

| Componente | O que é |
|---|---|
| `StatHero` | Número grande do período + rótulo + comparação discreta com o período anterior. Aceita `estimated`. |
| `StatStrip` | Faixa de 4 métricas secundárias (reproduções, músicas distintas, artistas distintos, média/dia). `CountUp` desligado com `prefers-reduced-motion`. |
| `PeriodSwitcher` | Segmentado Hoje · Semana · Mês · Ano · Personalizado. Estado na URL (`?p=month&d=2026-11`). |
| `ListeningChart` | Área/barras de tempo por dia (ou por mês no ano). Recharts. Tooltip com duração formatada. |
| `CalendarHeatmap` | Ano inteiro, um quadrado por dia, rampa `--heat-*`. Clique leva ao dia no histórico. |
| `RankList` | Posição · capa 40px · nome/artista · barra proporcional · duração. Top 10 com "ver todos". |
| `CoverArt` | Imagem de capa servida pelo SpotMe (nunca hotlink do CDN do Spotify), sem crop, raio de capa, `alt` com nome do álbum. |
| `EstimateBadge` | Ícone + tooltip "inclui tempo estimado — veja como calculamos". |
| `CollectorStatus` | Última coleta, próxima, e alerta se houver lacuna (> 2 h sem coletar). |
| `SpotifyAttribution` | Logo + "Dados do Spotify" + link "Abrir no Spotify" quando aplicável. |
| `PlayerDock` *(Fase 2)* | Barra fixa no rodapé: capa, faixa, controles, volume, progresso. |

## Shell da aplicação

```
ThemeProvider
  DsSidebarProvider (coluna)
    AppTopbar        ← recolher sidebar · breadcrumb · busca (Ctrl K) · tema
    linha
      AppSidebar     ← collapsible="icon"
      DsSidebarInset → children
    PlayerDock       ← Fase 2, só aparece com SDK conectado
```

Sidebar em três grupos: **Visão geral** (Dashboard) · **Explorar** (Histórico,
Artistas, Músicas, Retrospectiva) · **Dados** (Importar, Coletor &
configurações). Fase 3 adiciona **Sync** (YouTube Music). Ctrl+B recolhe.

Busca (Ctrl K) procura músicas, artistas e álbuns **no banco do SpotMe** (não
na API do Spotify).

## Telas

| Rota | Pergunta que responde | Herói |
|---|---|---|
| `/` | Quanto e o que eu ouvi neste período? | Horas no período |
| `/historico` | O que tocou, quando? | Lista cronológica virtualizada, filtros por dia/artista/fonte |
| `/artistas/[id]` | Qual a minha relação com esse artista? | Horas totais + evolução + top músicas dele |
| `/musicas/[id]` | Quantas vezes ouvi isso? | Nº de reproduções + primeira/última vez |
| `/retrospectiva/[ano]` | Como foi meu ano? | Horas no ano + heatmap + mês a mês + top 10s |
| `/importar` | Meu histórico antigo está completo? | Upload, progresso, resumo (inseridas / duplicadas / ignoradas) |
| `/configuracoes` | O coletor está funcionando? | `CollectorStatus`, conta conectada, fuso |

Espinha de toda tela: **cabeçalho** (breadcrumb + título + no máximo uma ação)
→ **herói** → **contexto** (strip, gráfico, rankings) → **estado vazio** quando
não há dado (ilustração + frase + ação: "Conectar Spotify" ou "Importar
histórico").

## Regras do Spotify que afetam o design

(Conferir as Design Guidelines e os Developer Terms atuais antes de publicar
qualquer tela nova.)

- Capas: sem recorte, distorção, filtro ou texto por cima; raio pequeno.
- Conteúdo do Spotify (capas, metadados) acompanhado de atribuição e, quando
  houver ação, link de volta para o Spotify.
- Não usar logo/cores do Spotify como identidade do SpotMe.

## Tema claro/escuro

`next-themes`, padrão = sistema. Teste **os dois** em todo componente; tokens do
escuro com alpha quebram fundos opacos assumidos. Gráficos leem cor dos tokens,
nunca de constantes no JS.

## Acessibilidade

- Contraste AA para texto e séries de gráfico, nos dois temas.
- Foco sempre visível (`outline-ring/50` no reset).
- Estimativa/status nunca só por cor.
- Gráficos com `aria-label` resumindo o dado + tabela alternativa ("ver como
  tabela").
- `prefers-reduced-motion`: sem CountUp, sem transições de gráfico.

## Checklist de tela nova

- [ ] Reusou `Ds*`/componentes do domínio em vez de criar primitivo?
- [ ] Só token de cor, nada literal?
- [ ] Números com `tabular-nums` e `formatDuration`?
- [ ] Estimativas marcadas com `EstimateBadge`?
- [ ] Capas via `CoverArt` (servidas pelo SpotMe)?
- [ ] Estado vazio com ação?
- [ ] Funciona nos dois temas, com sidebar recolhida e em 375px?
