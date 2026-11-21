import { Sparkline } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Sparkline> = {
  title: "Components/Data/Sparkline",
  component: Sparkline,
  args: {
    values: [3100, 2890, 3240, 2980, 3010, 2760, 2950, 3120, 2870, 2990, 2985, 2627],
    width: 160,
    height: 32,
    label: "Monthly spending over 12 months, lowest now",
  },
};
export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Default: Story = {};
export const WithGap: Story = { args: { values: [12, 18, null, 14, 22, 19], label: "Readings with one missing" } };
