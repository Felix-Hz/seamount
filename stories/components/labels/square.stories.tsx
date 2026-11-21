import { Square } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { line } from "../../shared";

const meta: Meta<typeof Square> = {
  title: "Components/Labels/Square",
  component: Square,
  argTypes: { tone: { control: "select", options: ["ink", "accent", "ember"] }, color: { control: "color" } },
  parameters: {
    docs: {
      description: {
        component: "The 6 px square for bullets, live state and keys beside a name. Decorative unless given a label.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Square>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div style={line}>
      <Square />
      <Square tone="accent" />
      <Square tone="ember" />
      <Square color="var(--sm-data-2)" />
    </div>
  ),
};
export const Labelled: Story = { args: { tone: "accent", role: "img", "aria-label": "Connected" } };
