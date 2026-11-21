import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  staticDirs: [{ from: "../assets", to: "/" }],
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  features: { backgrounds: false, sidebarOnboardingChecklist: false, menuOnboardingChecklist: false },
};

export default config;
