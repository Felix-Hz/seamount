import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger, SpecList } from "../../../src/react";

const meta: Meta<typeof Popover> = {
  title: "Components/Overlays/Popover",
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverContent, PopoverClose },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button>Rates ›</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Exchange rates">
        <SpecList
          items={[
            ["EUR", "1.8241"],
            ["USD", "1.6802"],
            ["Fetched", "Fri 20 Nov, 21:40"],
          ]}
        />
        <PopoverClose asChild>
          <Button size="sm">Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {};
export const Opens: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Rates ›" }));
    const body = within(canvasElement.ownerDocument.body);
    const rate = await body.findByText("1.8241");
    await waitFor(() => expect(rate).toBeVisible());
  },
};
