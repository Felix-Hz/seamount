import * as React from "react";
import {
  applyTheme,
  type ResolvedTheme,
  readThemeChoice,
  storeThemeChoice,
  type ThemeChoice,
  watchSystemTheme,
} from "../lib/theme";

const isTyping = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
};

export type HotkeyOptions = {
  enabled?: boolean;
  /** Also fire while focus is in a text field (default false, so typing a letter never triggers it). */
  inFields?: boolean;
};

/**
 * Binds a single key ("t", "Escape", "?") with no modifiers held, so the letter shown in a label works.
 * Combinations with Ctrl, Alt or Meta are left to the browser and the app's command menu.
 */
export function useHotkey(key: string, handler: (event: KeyboardEvent) => void, options: HotkeyOptions = {}): void {
  const { enabled = true, inFields = false } = options;
  const saved = React.useRef(handler);
  React.useEffect(() => {
    saved.current = handler;
  });
  React.useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
      if (!inFields && isTyping(event.target)) return;
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      saved.current(event);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, enabled, inFields]);
}

export type UseThemeOptions = {
  storageKey?: string;
  /** Also toggle .dark and .light on <html>, for apps whose CSS keys off a class. */
  classes?: boolean;
};

export type UseThemeResult = {
  choice: ThemeChoice;
  resolved: ResolvedTheme;
  setChoice: (choice: ThemeChoice) => void;
};

/** System, Light or Dark, persisted and applied to <html>; System follows the OS live. */
export function useTheme({ storageKey, classes = false }: UseThemeOptions = {}): UseThemeResult {
  const [choice, setChoiceState] = React.useState<ThemeChoice>("system");
  const [resolved, setResolved] = React.useState<ResolvedTheme>("light");

  React.useEffect(() => {
    setChoiceState(readThemeChoice(storageKey));
  }, [storageKey]);

  React.useEffect(() => {
    setResolved(applyTheme(choice, { classes }));
    if (choice !== "system") return;
    return watchSystemTheme(() => setResolved(applyTheme("system", { classes })));
  }, [choice, classes]);

  const setChoice = React.useCallback(
    (next: ThemeChoice) => {
      storeThemeChoice(next, storageKey);
      setChoiceState(next);
    },
    [storageKey],
  );

  return { choice, resolved, setChoice };
}
