import { Meter } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Meter> = {
  title: "Components/Data/Meter",
  component: Meter,
  args: { label: "Groceries budget used", value: 412.8, max: 500, valueText: "$412.80 of $500" },
  argTypes: { value: { control: { type: "range", min: 0, max: 600, step: 1 } } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Meter>;

export const Default: Story = {};
export const OverLimit: Story = { args: { value: 560, valueText: "$560 of $500" } };
