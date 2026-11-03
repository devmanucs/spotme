import { MIN_COUNTED_PLAY_MS, PLAY_SOURCES, type PlaySource } from "./constants.ts";

/** A reprodução entra em contagens e rankings? (tempo ouvido conta sempre) */
export function isCountedPlay(msPlayed: number): boolean {
  return msPlayed >= MIN_COUNTED_PLAY_MS;
}

/** Prioridade da fonte na deduplicação: maior vence. */
export function sourcePriority(source: PlaySource): number {
  return PLAY_SOURCES.length - PLAY_SOURCES.indexOf(source);
}
