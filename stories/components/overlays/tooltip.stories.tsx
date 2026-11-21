import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button, Tooltip } from "../../../src/react";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Overlays/Tooltip",
  component: Tooltip,
  args: { content: "Average across the last 90 days.", children: <Button variant="ghost">Avg ?</Button> },
  argTypes: {
    children: { control: false },
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
  },
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};
export const Right: Story = { args: { side: "right" } };
export const ShowsOnFocus: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button")).toHaveFocus();
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole("tooltip")).toHaveTextContent("Average across the last 90 days.");
  },
};
