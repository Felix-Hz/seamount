import { afterEach, describe, expect, it, vi } from "vitest";
import { applyTheme, readThemeChoice, storeThemeChoice, THEME_STORAGE_KEY, themeScript } from "./theme";

const root = document.documentElement;

afterEach(() => {
  localStorage.clear();
  delete root.dataset.theme;
  root.className = "";
  vi.restoreAllMocks();
});

describe("theme", () => {
  it("reads System when nothing is stored or the value is unknown", () => {
    expect(readThemeChoice()).toBe("system");
    localStorage.setItem(THEME_STORAGE_KEY, "sepia");
    expect(readThemeChoice()).toBe("system");
  });

  it("stores a choice and clears it for System", () => {
    storeThemeChoice("dark");
    expect(readThemeChoice()).toBe("dark");
    storeThemeChoice("system");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("survives storage that throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readThemeChoice()).toBe("system");
  });

  it("writes the resolved theme, and the classes when asked", () => {
    expect(applyTheme("dark")).toBe("dark");
    expect(root.dataset.theme).toBe("dark");
    expect(root.classList.contains("dark")).toBe(false);
    applyTheme("light", { classes: true });
    expect(root.dataset.theme).toBe("light");
    expect(root.classList.contains("light")).toBe(true);
    expect(root.classList.contains("dark")).toBe(false);
  });

  it("produces a head script that applies the stored choice", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    new Function(themeScript(THEME_STORAGE_KEY, true))();
    expect(root.dataset.theme).toBe("dark");
    expect(root.classList.contains("dark")).toBe(true);
  });
});
