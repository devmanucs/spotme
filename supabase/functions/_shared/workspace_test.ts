import {
  createSpotifyClient,
  DEFAULT_TIMEZONE,
  isCountedPlay,
  SpotifyApiError,
} from "./workspace.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

Deno.test("packages/core roda em Deno", () => {
  assert(DEFAULT_TIMEZONE === "America/Sao_Paulo", "fuso padrão");
  assert(isCountedPlay(30_000) && !isCountedPlay(29_999), "regra dos 30 s");
});

Deno.test("packages/spotify roda em Deno (fetch injetado)", async () => {
  const client = createSpotifyClient({
    getAccessToken: () => Promise.resolve("abc"),
    fetch: () =>
      Promise.resolve(
        Response.json(
          { error: { status: 429, message: "slow down" } },
          {
            status: 429,
            headers: { "Retry-After": "3" },
          },
        ),
      ),
  });

  const error = await client.get("/me").catch((e: unknown) => e);
  assert(error instanceof SpotifyApiError, "erro tipado");
  assert(error.retryAfterSeconds === 3, "Retry-After lido");
});
