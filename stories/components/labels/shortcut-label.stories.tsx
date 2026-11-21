import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShortcutLabel } from "../../../src/react";

const meta: Meta<typeof ShortcutLabel> = {
  title: "Components/Labels/ShortcutLabel",
  component: ShortcutLabel,
  args: { label: "Books", shortcut: "b" },
};
export default meta;
type Story = StoryObj<typeof ShortcutLabel>;

export const Default: Story = {};
export const NotInWord: Story = { args: { label: "Type", shortcut: "x" } };
