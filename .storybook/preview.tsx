import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { TooltipProvider } from "../src/react/overlay";
import { Toaster } from "../src/react/toast";
import { ThemedDocsContainer } from "./docs-container";
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
  tags: ["autodocs"],
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
    a11y: { test: "error" },
    docs: { container: ThemedDocsContainer },
    controls: { expanded: true, sort: "requiredFirst" },
    viewport: {
      options: {
        phone: { name: "Phone", styles: { width: "390px", height: "844px" }, type: "mobile" },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        laptop: { name: "Laptop", styles: { width: "1280px", height: "800px" }, type: "desktop" },
      },
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Introduction", "Colour", "Type"],
          "Components",
          ["Actions", "Forms", "Labels", "Layout", "Overlays", "Feedback", "Data"],
          "Hooks",
        ],
      },
    },
  },
};

export default preview;
