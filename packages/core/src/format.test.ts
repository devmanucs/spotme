import { describe, expect, it } from "vitest";
import { formatCount, formatDuration, formatTrackLength } from "./format.ts";

const MIN = 60_000;
const H = 60 * MIN;

describe("formatDuration", () => {
  it("segundos abaixo de 1 min", () => {
    expect(formatDuration(42_900)).toBe("42 s");
    expect(formatDuration(0)).toBe("0 s");
    expect(formatDuration(-5)).toBe("0 s");
  });

  it("minutos abaixo de 1 h", () => {
    expect(formatDuration(MIN)).toBe("1 min");
    expect(formatDuration(37 * MIN + 59_000)).toBe("37 min");
  });

  it("horas e minutos abaixo de 100 h", () => {
    expect(formatDuration(H)).toBe("1 h 00 min");
    expect(formatDuration(12 * H + 5 * MIN)).toBe("12 h 05 min");
    expect(formatDuration(99 * H + 59 * MIN)).toBe("99 h 59 min");
  });

  it("só horas a partir de 100 h, com separador pt-BR", () => {
    expect(formatDuration(100 * H)).toBe("100 h");
    expect(formatDuration(1284 * H + 40 * MIN)).toBe("1.284 h");
  });

  it("modo herói mostra uma casa decimal sem arredondar para cima", () => {
    expect(formatDuration(1284 * H + 30 * MIN, { precise: true })).toBe("1.284,5 h");
    expect(formatDuration(1284 * H + 59 * MIN, { precise: true })).toBe("1.284,9 h");
  });
});

describe("formatTrackLength", () => {
  it("m:ss e h:mm:ss", () => {
    expect(formatTrackLength(222_000)).toBe("3:42");
    expect(formatTrackLength(5_000)).toBe("0:05");
    expect(formatTrackLength(3_723_000)).toBe("1:02:03");
  });
});

describe("formatCount", () => {
  it("separador de milhar pt-BR", () => {
    expect(formatCount(1204)).toBe("1.204");
  });
});
