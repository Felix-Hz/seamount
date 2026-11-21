import { Label } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Label> = {
  title: "Components/Labels/Label",
  component: Label,
  args: { children: "6 of 21" },
  argTypes: { tone: { control: "select", options: ["ink", "accent", "ember"] } },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
export const Accent: Story = { args: { tone: "accent", children: "[ 01 ]" } };
