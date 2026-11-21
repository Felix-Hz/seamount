import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "../../../src/react";
import { line } from "../../shared";

const meta: Meta<typeof Button> = {
  title: "Components/Actions/Button",
  component: Button,
  args: { children: "Export", onClick: fn() },
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["md", "sm", "icon", "icon-sm"] },
  },
  parameters: {
    docs: {
      description: { component: "One primary per view. Buttons name the action; Ember always says what it destroys." },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Primary: Story = { args: { variant: "primary", children: "Apply preset" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Reset" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Delete account" } };
export const LinkVariant: Story = { name: "Link", args: { variant: "link", children: "Details ›" } };
export const Small: Story = { args: { size: "sm", children: "Save" } };
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };
export const AllVariants: Story = {
  render: () => (
    <div style={line}>
      <Button variant="primary">Apply preset</Button>
      <Button>Export</Button>
      <Button variant="ghost">Reset</Button>
      <Button variant="destructive">Delete account</Button>
      <Button variant="link">Details ›</Button>
    </div>
  ),
};
export const Clicks: Story = {
  tags: ["!autodocs"],
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Export" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
