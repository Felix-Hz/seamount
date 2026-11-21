import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "../../../src/react";

const meta: Meta<typeof Separator> = {
  title: "Components/Layout/Separator",
  component: Separator,
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    tone: { control: "select", options: [undefined, "ink"] },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "4rem", maxWidth: "24rem", alignItems: "center" }}>
        <div style={{ flex: 1, alignSelf: "stretch", display: "flex", alignItems: "center" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {};
export const Ink: Story = { args: { tone: "ink" } };
export const Vertical: Story = { args: { orientation: "vertical" } };
