import { describe, expect, it, vi } from "vitest";
import { createSpotifyClient } from "./client.ts";
import { SpotifyApiError } from "./errors.ts";

function fakeFetch(response: Response) {
  return vi.fn<typeof fetch>(async () => response);
}

describe("createSpotifyClient", () => {
  it("envia o bearer token e a query", async () => {
    const fetch = fakeFetch(Response.json({ items: [] }));
    const client = createSpotifyClient({ getAccessToken: async () => "abc", fetch });

    await client.get("/me/player/recently-played", { limit: 50, after: undefined });

    const [url, init] = fetch.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://api.spotify.com/v1/me/player/recently-played?limit=50");
    expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer abc");
  });

  it("transforma 429 em SpotifyApiError com Retry-After", async () => {
    const fetch = fakeFetch(
      Response.json(
        { error: { status: 429, message: "API rate limit exceeded" } },
        {
          status: 429,
          headers: { "Retry-After": "7" },
        },
      ),
    );
    const client = createSpotifyClient({ getAccessToken: async () => "abc", fetch });

    const error = await client.get("/tracks/x").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(SpotifyApiError);
    expect((error as SpotifyApiError).isRateLimited).toBe(true);
    expect((error as SpotifyApiError).retryAfterSeconds).toBe(7);
    expect((error as SpotifyApiError).message).toBe("API rate limit exceeded");
  });
});
