/**
 * Regras fixas de métrica — tabela em PRODUCT.md › Métricas.
 * Qualquer cálculo de "tempo ouvido" ou "reprodução" parte daqui.
 */

/** Fuso padrão das agregações quando a conta não tem um configurado. */
export const DEFAULT_TIMEZONE = "America/Sao_Paulo";

/** Uma reprodução só conta em rankings/contagens a partir de 30 s (critério de stream do Spotify). */
export const MIN_COUNTED_PLAY_MS = 30_000;

/** Fontes de uma reprodução, da mais forte para a mais fraca na deduplicação. */
export const PLAY_SOURCES = ["extended_history", "web_player", "recent_api"] as const;

export type PlaySource = (typeof PLAY_SOURCES)[number];
