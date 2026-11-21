import { StatTile } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof StatTile> = {
  title: "Components/Data/StatTile",
  component: StatTile,
  args: { label: "Savings rate", value: "37.9", unit: "%", change: "Up from 31.2% in October" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "16rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof StatTile>;

export const Default: Story = {};
export const WithSparkline: Story = {
  args: {
    label: "Spent · November",
    value: "$2,627.49",
    unit: undefined,
    change: "12% less than October",
    spark: [3100, 2890, 3240, 2980, 3010, 2760, 2950, 3120, 2870, 2990, 2985, 2627],
    sparkLabel: "Monthly spending over 12 months, lowest now",
  },
};
