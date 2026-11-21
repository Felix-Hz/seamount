import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Banner, Button } from "../../../src/react";

const meta: Meta<typeof Banner> = {
  title: "Components/Feedback/Banner",
  component: Banner,
  args: { children: "Exchange rates are 3 days old, so totals in other currencies may be off." },
  argTypes: { action: { control: false }, tone: { control: "inline-radio", options: ["accent", "ember"] } },
};
export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {};
export const WithAction: Story = { args: { action: <Button size="sm">Set a rate</Button>, onDismiss: fn() } };
export const Ember: Story = { args: { tone: "ember", children: "Couldn't reach the rates service." } };
export const Dismisses: Story = {
  tags: ["!autodocs"],
  args: { onDismiss: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /dismiss/i }));
    await expect(args.onDismiss).toHaveBeenCalledOnce();
  },
};
