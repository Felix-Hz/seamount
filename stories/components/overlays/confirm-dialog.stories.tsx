import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Button, ConfirmDialog } from "../../../src/react";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/Overlays/ConfirmDialog",
  component: ConfirmDialog,
  args: {
    trigger: <Button variant="destructive">Delete account</Button>,
    title: "Delete Everyday?",
    consequences: ["Its 214 transactions are deleted.", "Budgets that use it stop tracking.", "This can't be undone."],
    actionLabel: "Delete",
    destructive: true,
    onConfirm: fn(),
  },
  argTypes: { trigger: { control: false } },
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {};
export const NotDestructive: Story = {
  args: {
    trigger: <Button>Apply preset</Button>,
    title: "Apply Gaming?",
    consequences: undefined,
    description: "This changes 3 settings.",
    actionLabel: "Apply",
    destructive: false,
  },
};
export const Confirms: Story = {
  tags: ["!autodocs"],
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Delete account" }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole("button", { name: "Delete" }));
    await expect(args.onConfirm).toHaveBeenCalledOnce();
  },
};
