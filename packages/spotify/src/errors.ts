/** Erro de qualquer resposta não-2xx da Web API ou do endpoint de token. */
export class SpotifyApiError extends Error {
  readonly status: number;
  /** Segundos a esperar antes de tentar de novo (header `Retry-After`, só em 429). */
  readonly retryAfterSeconds: number | null;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown, retryAfterSeconds: number | null) {
    super(message);
    this.name = "SpotifyApiError";
    this.status = status;
    this.body = body;
    this.retryAfterSeconds = retryAfterSeconds;
  }

  get isRateLimited(): boolean {
    return this.status === 429;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }
}
