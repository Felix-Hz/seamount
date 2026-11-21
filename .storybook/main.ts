import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  staticDirs: [{ from: "../assets", to: "/" }],
  core: { disableTelemetry: true },
};

export default config;
