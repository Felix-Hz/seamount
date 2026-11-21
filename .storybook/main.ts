import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  staticDirs: [{ from: "../assets", to: "/" }],
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "@felix-hz/seamount-react": path.join(root, "packages/seamount-react/src/index.ts"),
          "@felix-hz/seamount/format": path.join(root, "packages/seamount/src/lib/format.ts"),
          "@felix-hz/seamount/theme": path.join(root, "packages/seamount/src/lib/theme.ts"),
        },
      },
    }),
  features: { backgrounds: false, sidebarOnboardingChecklist: false, menuOnboardingChecklist: false },
};

export default config;
