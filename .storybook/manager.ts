import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Seamount",
    brandImage: "./icon.svg",
    colorPrimary: "#1d3ea8",
    colorSecondary: "#1d3ea8",
    appBg: "#f2f2ee",
    appContentBg: "#fafaf8",
    appBorderColor: "#dadbe2",
    appBorderRadius: 4,
    textColor: "#15161b",
    textMutedColor: "#5f6270",
    barBg: "#fafaf8",
    fontBase: '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"JetBrains Mono", ui-monospace, monospace',
  }),
});
