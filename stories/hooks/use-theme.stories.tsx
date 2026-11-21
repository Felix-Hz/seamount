import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { Label, SegmentedControl, useTheme } from "../../src/react";

function Demo(): React.JSX.Element {
  const { choice, resolved, setChoice } = useTheme({ storageKey: "seamount-storybook-theme" });
  return (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      <SegmentedControl
        aria-label="Theme"
        value={choice}
        onValueChange={setChoice}
        options={[
          { value: "system", label: "System" },
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
        ]}
      />
      <Label>Resolved: {resolved}</Label>
    </div>
  );
}

const meta: Meta<typeof Demo> = { title: "Hooks/useTheme", component: Demo, tags: ["!autodocs"] };
export default meta;
export const Default: StoryObj<typeof Demo> = {};
