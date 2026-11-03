import { SpotifyApiError } from "./errors.ts";

export const SPOTIFY_API_URL = "https://api.spotify.com/v1";
export const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com";

export interface SpotifyClientOptions {
  /** Devolve um access token válido (quem chama cuida do refresh). */
  getAccessToken: () => Promise<string>;
  /** Injetável para testes; padrão = `fetch` global (Node, Deno e navegador). */
  fetch?: typeof fetch;
  baseUrl?: string;
}

export type Query = Record<string, string | number | undefined>;

/**
 * Cliente mínimo da Web API. Sem retry automático de propósito: um 429 vira
 * `SpotifyApiError` com `retryAfterSeconds`, e a fila/coletor decide o que fazer
 * (ver docs/SPOTIFY_PLATFORM.md).
 */
export function createSpotifyClient(options: SpotifyClientOptions) {
  const doFetch = options.fetch ?? fetch;
  const baseUrl = options.baseUrl ?? SPOTIFY_API_URL;

  async function get<T>(path: string, query?: Query): Promise<T> {
    const url = new URL(baseUrl + path);
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }

    const token = await options.getAccessToken();
    const res = await doFetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });

    if (!res.ok) throw await toError(res);
    return (await res.json()) as T;
  }

  return { get };
}

export type SpotifyClient = ReturnType<typeof createSpotifyClient>;

async function toError(res: Response): Promise<SpotifyApiError> {
  const body: unknown = await res.json().catch(() => null);
  const retryAfter = res.headers.get("Retry-After");
  const message =
    (body as { error?: { message?: string } } | null)?.error?.message ??
    `Spotify respondeu ${res.status}`;
  return new SpotifyApiError(
    res.status,
    message,
    body,
    retryAfter === null ? null : Number(retryAfter),
  );
}
