import { Field, Input, Kbd, Label, useHotkey } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";

function Demo(): React.JSX.Element {
  const [count, setCount] = React.useState(0);
  useHotkey("k", () => setCount((c) => c + 1));
  return (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
      <Label>
        Press <Kbd>K</Kbd>: <output aria-label="Presses">{count}</output>
      </Label>
      <Field label="Typing here is ignored">
        <Input />
      </Field>
    </div>
  );
}

const meta: Meta<typeof Demo> = { title: "Hooks/useHotkey", component: Demo, tags: ["!autodocs"] };
export default meta;
type Story = StoryObj<typeof Demo>;
export const Default: Story = {};
export const IgnoresFields: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.keyboard("k");
    await expect(canvas.getByLabelText("Presses")).toHaveTextContent("1");
    await userEvent.type(canvas.getByLabelText("Typing here is ignored"), "k");
    await expect(canvas.getByLabelText("Presses")).toHaveTextContent("1");
  },
};
