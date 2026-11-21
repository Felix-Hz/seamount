import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";
import { SegmentedControl } from "../../../src/react";

type Period = "week" | "month" | "quarter" | "year";
const options = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "quarter", label: "Quarter" },
  { value: "year", label: "Year" },
] as const;

function Demo({ disabled }: { disabled?: boolean }): React.JSX.Element {
  const [value, setValue] = React.useState<Period>("month");
  return (
    <SegmentedControl
      aria-label="Period"
      value={value}
      onValueChange={setValue}
      options={options}
      disabled={disabled}
    />
  );
}

const meta: Meta<typeof Demo> = {
  title: "Components/Forms/SegmentedControl",
  component: Demo,
  parameters: {
    docs: {
      description: {
        component: "One of up to four choices, always one selected. Clicking the current choice keeps it.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Demo>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const KeepsOneSelected: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    const year = canvas.getByRole("radio", { name: "Year" });
    await userEvent.click(year);
    await expect(year).toBeChecked();
    await userEvent.click(year);
    await expect(year).toBeChecked();
  },
};
