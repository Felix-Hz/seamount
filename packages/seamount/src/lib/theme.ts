// Theme choice: System, Light or Dark, persisted. The resolved theme is written to <html data-theme>, so CSS
// and Tailwind's dark: variant see one attribute; in System it follows the OS live. Without JavaScript the
// tokens' prefers-color-scheme rule gives the same result.

export type ThemeChoice = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "seamount.theme";

const isChoice = (value: unknown): value is ThemeChoice => value === "system" || value === "light" || value === "dark";

const media = (): MediaQueryList | undefined =>
  typeof window === "undefined" ? undefined : window.matchMedia("(prefers-color-scheme: dark)");

/** The stored choice; storage can be absent or throw (private windows), which reads as System. */
export function readThemeChoice(key: string = THEME_STORAGE_KEY): ThemeChoice {
  try {
    const value = localStorage.getItem(key);
    return isChoice(value) ? value : "system";
  } catch {
    return "system";
  }
}

export function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  if (choice !== "system") return choice;
  return media()?.matches ? "dark" : "light";
}

/** Writes the resolved theme to the root element. `classes` also toggles .dark and .light. */
export function applyTheme(
  choice: ThemeChoice,
  { root = document.documentElement, classes = false }: { root?: HTMLElement; classes?: boolean } = {},
): ResolvedTheme {
  const resolved = resolveTheme(choice);
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
  if (classes) {
    root.classList.toggle("dark", resolved === "dark");
    root.classList.toggle("light", resolved === "light");
  }
  return resolved;
}

export function storeThemeChoice(choice: ThemeChoice, key: string = THEME_STORAGE_KEY): void {
  try {
    if (choice === "system") localStorage.removeItem(key);
    else localStorage.setItem(key, choice);
  } catch {
    // Storage blocked: the choice lasts for this page only
  }
}

/** Re-applies on OS changes while the choice is System. Returns the unsubscribe. */
export function watchSystemTheme(onChange: (resolved: ResolvedTheme) => void): () => void {
  const mq = media();
  if (!mq) return () => {};
  const listener = (): void => onChange(mq.matches ? "dark" : "light");
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

/**
 * Inline this in <head> before any stylesheet so the first paint is in the right theme:
 * `<script>{themeScript()}</script>`, or dangerouslySetInnerHTML in React.
 */
export function themeScript(key: string = THEME_STORAGE_KEY, classes = false): string {
  return `(function(){try{var c=localStorage.getItem(${JSON.stringify(key)});}catch(e){}var d=c==="dark"||(c!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.dataset.theme=d?"dark":"light";r.style.colorScheme=d?"dark":"light";${
    classes ? 'r.classList.toggle("dark",d);r.classList.toggle("light",!d);' : ""
  }})();`;
}
