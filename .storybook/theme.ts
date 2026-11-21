import { create } from "storybook/theming";

const shared = {
  brandTitle:
    '<img src="./icon.svg" alt="" width="24" height="24" style="vertical-align:middle;margin-right:0.5rem">Seamount',
  appBorderRadius: 4,
  inputBorderRadius: 4,
  fontBase: '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, monospace',
};

export const lightTheme: ReturnType<typeof create> = create({
  ...shared,
  base: "light",
  colorPrimary: "#1d3ea8",
  colorSecondary: "#1d3ea8",
  appBg: "#f2f2ee",
  appContentBg: "#fafaf8",
  appPreviewBg: "#fafaf8",
  appBorderColor: "#dadbe2",
  textColor: "#15161b",
  textMutedColor: "#5f6270",
  barBg: "#fafaf8",
  inputBg: "#fafaf8",
  inputBorder: "#dadbe2",
  inputTextColor: "#15161b",
});

export const darkTheme: ReturnType<typeof create> = create({
  ...shared,
  base: "dark",
  colorPrimary: "#93a9ff",
  colorSecondary: "#93a9ff",
  appBg: "#121629",
  appContentBg: "#0e1120",
  appPreviewBg: "#0e1120",
  appBorderColor: "#262c45",
  textColor: "#e9ebf3",
  textInverseColor: "#0e1120",
  textMutedColor: "#8d93ab",
  barBg: "#121629",
  barTextColor: "#b6bbcf",
  barSelectedColor: "#93a9ff",
  inputBg: "#161b33",
  inputBorder: "#262c45",
  inputTextColor: "#e9ebf3",
  booleanBg: "#161b33",
  booleanSelectedBg: "#262c45",
});
