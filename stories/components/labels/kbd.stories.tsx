import { Kbd } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Kbd> = { title: "Components/Labels/Kbd", component: Kbd, args: { children: "Esc" } };
export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {};
export const InContext: Story = {
  render: () => (
    <span className="sm-label">
      Search <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>
    </span>
  ),
};
