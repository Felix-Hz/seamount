import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Switch } from "../../../src/react";

const meta: Meta<typeof Switch> = {
  title: "Components/Forms/Switch",
  component: Switch,
  args: { "aria-label": "Sync exchange rates", onCheckedChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Toggles: Story = {
  tags: ["!autodocs"],
  play: async ({ args, canvas, userEvent }) => {
    const control = canvas.getByRole("switch");
    await userEvent.click(control);
    await expect(control).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
