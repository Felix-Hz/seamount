import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../../../src/react";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  args: { style: { width: "60%" } },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};
export const Lines: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.5rem", maxWidth: "24rem" }}>
      <Skeleton style={{ width: "60%" }} />
      <Skeleton style={{ width: "40%" }} />
    </div>
  ),
};
