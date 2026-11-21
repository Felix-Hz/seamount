import { Live } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Live> = {
  title: "Components/Labels/Live",
  component: Live,
  args: { children: "Live · every 5 s" },
};
export default meta;
type Story = StoryObj<typeof Live>;

export const Default: Story = {};
