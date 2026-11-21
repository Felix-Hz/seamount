import type { Meta, StoryObj } from "@storybook/react-vite";
import { SpecItem, SpecList } from "../../../src/react";

const meta: Meta<typeof SpecList> = {
  title: "Components/Layout/SpecList",
  component: SpecList,
  subcomponents: { SpecItem },
  args: {
    items: [
      ["Source", "github.com/Felix-Hz/seamount"],
      ["Licence", "MIT"],
      ["Version", "0.1.0"],
    ],
  },
};
export default meta;
type Story = StoryObj<typeof SpecList>;

export const Default: Story = {};
export const Composed: Story = {
  args: { items: undefined },
  render: () => (
    <SpecList>
      <SpecItem label="Fetched">Fri 20 Nov, 21:40</SpecItem>
      <SpecItem label="Missing" />
    </SpecList>
  ),
};
