import { describe, expect, it } from "vitest";
import { isCountedPlay, sourcePriority } from "./plays.ts";

describe("isCountedPlay", () => {
  it("conta a partir de 30 s", () => {
    expect(isCountedPlay(30_000)).toBe(true);
    expect(isCountedPlay(211_640)).toBe(true);
  });

  it("não conta abaixo de 30 s", () => {
    expect(isCountedPlay(29_999)).toBe(false);
    expect(isCountedPlay(0)).toBe(false);
  });
});

describe("sourcePriority", () => {
  it("extended_history > web_player > recent_api", () => {
    expect(sourcePriority("extended_history")).toBeGreaterThan(sourcePriority("web_player"));
    expect(sourcePriority("web_player")).toBeGreaterThan(sourcePriority("recent_api"));
  });
});
