import { describe, expect, it } from "vitest";
import {
  formatCounter,
  formatDay,
  formatMoney,
  formatNumber,
  formatSigned,
  formatUnit,
  formatWhen,
  MISSING,
  pad2,
} from "./format";

describe("numbers", () => {
  it("separates thousands and prints a dash for missing values", () => {
    expect(formatNumber(4812)).toBe("4,812");
    expect(formatNumber(null)).toBe(MISSING);
    expect(formatNumber(undefined)).toBe(MISSING);
    expect(formatNumber(Number.NaN)).toBe(MISSING);
  });

  it("puts a non-breaking space before units except %", () => {
    expect(formatUnit(88.4, "°C")).toBe("88.4 °C");
    expect(formatUnit(4812, "rpm")).toBe("4,812 rpm");
    expect(formatUnit(60, "%")).toBe("60%");
    expect(formatUnit(null, "rpm")).toBe(MISSING);
  });

  it("signs amounts with a true minus and an explicit plus", () => {
    expect(formatSigned(-42.1)).toBe("−42.10");
    expect(formatSigned(4230)).toBe("+4,230.00");
    expect(formatSigned(0)).toBe("0.00");
  });

  it("formats money with an optional sign before the symbol", () => {
    expect(formatMoney(-42.1, "NZD")).toBe("−$42.10");
    expect(formatMoney(4230, "NZD", { signed: true })).toBe("+$4,230.00");
    expect(formatMoney(12, "EUR")).toBe("€12.00");
  });
});

describe("time", () => {
  const now = new Date(2026, 10, 21, 21, 40);

  it("is relative inside the last hour", () => {
    expect(formatWhen(new Date(now.getTime() - 20_000), now)).toBe("just now");
    expect(formatWhen(new Date(now.getTime() - 4 * 60_000), now)).toBe("4 min ago");
  });

  it("gives the day and time beyond it, with the year only when it differs", () => {
    expect(formatWhen(new Date(2026, 10, 20, 21, 40), now)).toBe("Fri 20 Nov, 21:40");
    expect(formatDay(new Date(2025, 10, 20), now)).toBe("Thu 20 Nov 2025");
  });

  it("treats bad input as missing", () => {
    expect(formatWhen("not a date", now)).toBe(MISSING);
    expect(formatDay(null, now)).toBe(MISSING);
  });
});

describe("counters", () => {
  it("counts and pads", () => {
    expect(formatCounter(6, 21)).toBe("6 of 21");
    expect(pad2(3)).toBe("03");
    expect(pad2(12)).toBe("12");
  });
});
