/**
 * Ponto único de import dos pacotes do monorepo nas Edge Functions (Deno).
 * `packages/core` e `packages/spotify` são TS puro sem APIs de Node, com imports
 * relativos terminando em `.ts`, então o Deno lê o código-fonte direto.
 */
export * from "../../../packages/core/src/index.ts";
export * from "../../../packages/spotify/src/index.ts";
