import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { TooltipProvider } from "../src/react/overlay";
import { Toaster } from "../src/react/toast";
import "./preview.css";

// The toolbar's theme writes data-theme on <html>, the same contract apps use
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as string;
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);
  return (
    <TooltipProvider>
      <Story />
      <Toaster />
    </TooltipProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        title: "Theme",
        items: [
          { value: "system", title: "System" },
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    controls: { expanded: true },
    options: { storySort: { order: ["Foundations", "Components", "Patterns"] } },
  },
};

export default preview;
