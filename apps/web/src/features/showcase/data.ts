import type { MediaCardProps } from "@/components/media-card";
import type { LastPlayed } from "@/components/shell/now-playing-bar";
import type { TrackRow } from "@/components/track-table";

/**
 * Dados FICTÍCIOS para a vitrine do design system (MAD-19).
 * Artistas, álbuns e faixas inventados — some quando o dashboard real entrar (MAD-28).
 */

const MIN = 60_000;
const H = 60 * MIN;

// Cores dominantes já no intervalo L 0.35–0.55 (DESIGN.md › Cor dominante).
const COLORS = {
  vinho: "oklch(0.42 0.14 15)",
  oceano: "oklch(0.45 0.12 245)",
  musgo: "oklch(0.47 0.11 140)",
  ambar: "oklch(0.52 0.12 65)",
  lilas: "oklch(0.45 0.13 300)",
  grafite: "oklch(0.38 0.02 260)",
  coral: "oklch(0.5 0.15 30)",
  petroleo: "oklch(0.42 0.08 200)",
} as const;

export const SHOWCASE_SUMMARY = {
  label: "Tempo ouvido · novembro de 2026",
  msPlayed: 42 * H + 18 * MIN,
  plays: 1204,
  tracks: 312,
  artists: 98,
  estimated: true,
  color: COLORS.vinho,
};

export const SHOWCASE_ARTISTS: MediaCardProps[] = [
  { title: "Lua Ciano", subtitle: "9 h 41 min", cover: { color: COLORS.oceano } },
  { title: "Os Satélites de Papel", subtitle: "7 h 02 min", cover: { color: COLORS.ambar } },
  { title: "Marisa Neon", subtitle: "5 h 37 min", cover: { color: COLORS.lilas } },
  { title: "Baile do Farol", subtitle: "4 h 50 min", cover: { color: COLORS.coral } },
  { title: "Trio Maré Alta", subtitle: "3 h 12 min", cover: { color: COLORS.petroleo } },
  { title: "Quarto Escuro", subtitle: "2 h 58 min", cover: { color: COLORS.grafite } },
  { title: "Dona Ventania", subtitle: "2 h 11 min", cover: { color: COLORS.musgo } },
].map((artist, i) => ({ ...artist, href: `/artistas/exemplo-${i + 1}`, shape: "round" as const }));

export const SHOWCASE_ALBUMS: MediaCardProps[] = [
  { title: "Órbita Baixa", subtitle: "Lua Ciano", cover: { color: COLORS.oceano } },
  { title: "Cartas que Não Mandei", subtitle: "Marisa Neon", cover: { color: COLORS.lilas } },
  { title: "Luz de Emergência", subtitle: "Baile do Farol", cover: { color: COLORS.coral } },
  { title: "Papel Machê", subtitle: "Os Satélites de Papel", cover: { color: COLORS.ambar } },
  { title: "Correnteza", subtitle: "Trio Maré Alta", cover: { color: COLORS.petroleo } },
  { title: "Abajur", subtitle: "Quarto Escuro", cover: { color: COLORS.grafite } },
  { title: "Vento Norte", subtitle: "Dona Ventania", cover: { color: COLORS.musgo } },
].map((album, i) => ({ ...album, href: `/musicas/album-exemplo-${i + 1}` }));

export const SHOWCASE_TRACKS: TrackRow[] = [
  ["Gravidade Zero", "Lua Ciano", "Órbita Baixa", 48, 2 * H + 51 * MIN, 213_000, COLORS.oceano],
  ["Rascunho", "Marisa Neon", "Cartas que Não Mandei", 41, 2 * H + 22 * MIN, 205_000, COLORS.lilas],
  [
    "Sinal Fechado de Novo",
    "Baile do Farol",
    "Luz de Emergência",
    36,
    2 * H + 4 * MIN,
    238_000,
    COLORS.coral,
  ],
  [
    "Avião de Papel",
    "Os Satélites de Papel",
    "Papel Machê",
    33,
    1 * H + 49 * MIN,
    199_000,
    COLORS.ambar,
  ],
  ["Maré de Março", "Trio Maré Alta", "Correnteza", 29, 1 * H + 58 * MIN, 246_000, COLORS.petroleo],
  ["Luz Acesa", "Quarto Escuro", "Abajur", 27, 1 * H + 31 * MIN, 187_000, COLORS.grafite],
  ["Poeira de Estrela", "Lua Ciano", "Órbita Baixa", 24, 1 * H + 26 * MIN, 222_000, COLORS.oceano],
  ["Redemoinho", "Dona Ventania", "Vento Norte", 22, 1 * H + 9 * MIN, 194_000, COLORS.musgo],
].map(([title, artist, album, plays, msPlayed, durationMs, color], i) => ({
  id: `exemplo-${i + 1}`,
  title: title as string,
  artist: artist as string,
  album: album as string,
  plays: plays as number,
  msPlayed: msPlayed as number,
  durationMs: durationMs as number,
  estimated: i % 3 === 0,
  cover: { color: color as string },
}));

export const SHOWCASE_LAST_PLAYED: LastPlayed = {
  trackId: "exemplo-1",
  title: "Gravidade Zero",
  artist: "Lua Ciano",
  playedAgo: "há 12 min",
  cover: { color: COLORS.oceano },
};
