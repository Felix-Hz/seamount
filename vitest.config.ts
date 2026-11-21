import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const aliases = {
  "@felix-hz/seamount-react": path.join(dirname, "packages/seamount-react/src/index.ts"),
  "@felix-hz/seamount/format": path.join(dirname, "packages/seamount/src/lib/format.ts"),
  "@felix-hz/seamount/theme": path.join(dirname, "packages/seamount/src/lib/theme.ts"),
};

const storybookProject = (theme: "light" | "dark") => ({
  resolve: { alias: aliases },
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
        resolve: { alias: aliases },
        test: {
          name: "unit",
          environment: "happy-dom",
          globals: true,
          setupFiles: ["./test/setup.ts"],
          include: ["packages/*/src/**/*.test.{ts,tsx}"],
        },
      },
      storybookProject("light"),
      storybookProject("dark"),
    ],
  },
});
