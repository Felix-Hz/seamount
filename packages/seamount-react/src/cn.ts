import { type ClassValue, clsx } from "clsx";

/** Joins class names; the components need no Tailwind merge because their styles live in classes, not utilities. */
export function cn(...values: ClassValue[]): string {
  return clsx(values);
}
