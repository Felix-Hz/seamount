import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const storybookProject = (theme: "light" | "dark") => ({
  plugins: [storybookTest({ configDir: path.join(dirname, ".storybook"), initialGlobals: { theme } })],
  test: {
    name: `storybook-${theme}`,
    browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: "chromium" as const }] },
    setupFiles: [".storybook/vitest.setup.ts"],
  },
});

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],
        test: {
          name: "unit",
          environment: "happy-dom",
          globals: true,
          setupFiles: ["./test/setup.ts"],
          include: ["src/**/*.test.{ts,tsx}"],
        },
      },
      storybookProject("light"),
      storybookProject("dark"),
    ],
  },
});
