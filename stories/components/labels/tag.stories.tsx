import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "../../../src/react";

const meta: Meta<typeof Tag> = {
  title: "Components/Labels/Tag",
  component: Tag,
  args: { children: "OK" },
  argTypes: { tone: { control: "select", options: ["ink", "accent", "ember"] } },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};
export const Accent: Story = { args: { tone: "accent", children: "3/7" } };
export const Ember: Story = { args: { tone: "ember", children: "ERROR" } };
