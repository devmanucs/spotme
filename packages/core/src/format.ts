/**
 * Formatação de duração — tabela em DESIGN.md › Formatação de duração e datas.
 * Uma função só para o app inteiro; componentes nunca formatam tempo à mão.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

const integer = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export interface FormatDurationOptions {
  /** Herói de página: acima de 100 h mostra uma casa decimal (`1.284,5 h`). */
  precise?: boolean;
}

/** Tempo ouvido: `42 s` · `37 min` · `12 h 05 min` · `1.284 h`. */
export function formatDuration(ms: number, options: FormatDurationOptions = {}): string {
  const safe = Math.max(0, ms);

  if (safe < MINUTE) return `${Math.floor(safe / 1000)} s`;
  if (safe < HOUR) return `${Math.floor(safe / MINUTE)} min`;

  const hours = safe / HOUR;
  if (hours < 100) {
    const h = Math.floor(hours);
    const min = Math.floor((safe - h * HOUR) / MINUTE);
    return `${h} h ${String(min).padStart(2, "0")} min`;
  }

  return options.precise
    ? `${oneDecimal.format(Math.floor(hours * 10) / 10)} h`
    : `${integer.format(Math.floor(hours))} h`;
}

/** Duração de faixa no formato do Spotify: `3:42` · `1:02:03`. */
export function formatTrackLength(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = String(totalSeconds % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

/** Contagens grandes com separador pt-BR: `1.204`. */
export function formatCount(value: number): string {
  return integer.format(value);
}
