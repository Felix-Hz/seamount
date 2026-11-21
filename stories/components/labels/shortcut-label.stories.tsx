import { ShortcutLabel } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ShortcutLabel> = {
  title: "Components/Labels/ShortcutLabel",
  component: ShortcutLabel,
  args: { label: "Books", shortcut: "b" },
};
export default meta;
type Story = StoryObj<typeof ShortcutLabel>;

export const Default: Story = {};
export const NotInWord: Story = { args: { label: "Type", shortcut: "x" } };
