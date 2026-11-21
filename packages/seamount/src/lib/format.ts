// Seamount's rules for numbers and time: a space before units except %, thousands separators, an en dash
// for a missing value, relative time inside the last hour and the day with the time beyond it. Pure
// functions with no React, so they also run on a server and in vanilla pages.

export const MISSING = "–";

type Maybe<T> = T | null | undefined;

const isMissing = (value: Maybe<number>): value is null | undefined =>
  value === null || value === undefined || Number.isNaN(value);

/** `4812` → `4,812`; `null` → `–`. */
export function formatNumber(value: Maybe<number>, options: Intl.NumberFormatOptions = {}, locale = "en-NZ"): string {
  if (isMissing(value)) return MISSING;
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2, ...options }).format(value);
}

/** `88.4, "°C"` → `88.4 °C`; `60, "%"` → `60%`. A non-breaking space keeps the unit with its figure. */
export function formatUnit(
  value: Maybe<number>,
  unit: string,
  options: Intl.NumberFormatOptions = {},
  locale = "en-NZ",
): string {
  if (isMissing(value)) return MISSING;
  const figure = formatNumber(value, options, locale);
  return unit === "%" ? `${figure}%` : `${figure} ${unit}`;
}

/** Money with an explicit sign, so state never rests on colour: `−42.10`, `+4,230.00`. */
export function formatSigned(value: Maybe<number>, options: Intl.NumberFormatOptions = {}, locale = "en-NZ"): string {
  if (isMissing(value)) return MISSING;
  const figure = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
    signDisplay: "never",
  }).format(value);
  if (value === 0) return figure;
  return `${value < 0 ? "−" : "+"}${figure}`;
}

/** Currency amount; pass `signed` to show the sign before the symbol: `−$42.10`. */
export function formatMoney(
  value: Maybe<number>,
  currency: string,
  { signed = false, locale = "en-NZ" }: { signed?: boolean; locale?: string } = {},
): string {
  if (isMissing(value)) return MISSING;
  const figure = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    signDisplay: "never",
  }).format(value);
  if (!signed || value === 0) return value < 0 ? `−${figure}` : figure;
  return `${value < 0 ? "−" : "+"}${figure}`;
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

/** Inside the last hour: `just now`, `4 min ago`. Beyond it: `Fri 20 Nov, 21:40`, with the year when it differs. */
export function formatWhen(date: Maybe<Date | number | string>, now: Date = new Date(), locale = "en-NZ"): string {
  if (date === null || date === undefined) return MISSING;
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return MISSING;
  const diff = now.getTime() - d.getTime();
  if (diff >= 0 && diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE);
    return minutes < 1 ? "just now" : `${minutes} min ago`;
  }
  return formatDay(d, now, locale, true);
}

/** `Fri 20 Nov`, or `Fri 20 Nov 2025` outside the current year; `withTime` adds `, 21:40`. */
export function formatDay(
  date: Maybe<Date | number | string>,
  now: Date = new Date(),
  locale = "en-NZ",
  withTime = false,
): string {
  if (date === null || date === undefined) return MISSING;
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return MISSING;
  const parts = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: d.getFullYear() === now.getFullYear() ? undefined : "numeric",
  }).formatToParts(d);
  const get = (type: Intl.DateTimeFormatPartTypes): string => parts.find((p) => p.type === type)?.value ?? "";
  const year = get("year");
  const day = `${get("weekday")} ${get("day")} ${get("month")}${year ? ` ${year}` : ""}`;
  if (!withTime) return day;
  const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d);
  return `${day}, ${time}`;
}

/** `6, 21` → `6 of 21`, the counter for a position in a set. */
export function formatCounter(position: number, total: number): string {
  return `${position} of ${total}`;
}

/** `0` → `01`: section and plate numbers. */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
