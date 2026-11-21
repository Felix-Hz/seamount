import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from "../../../src/react";

const onExport = fn();

function Demo(props: React.ComponentProps<typeof Menu>): React.JSX.Element {
  const [sort, setSort] = React.useState("date");
  const [archived, setArchived] = React.useState(false);
  return (
    <Menu {...props}>
      <MenuTrigger asChild>
        <Button>Sort ›</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuLabel>Sort by</MenuLabel>
        <MenuRadioGroup value={sort} onValueChange={setSort}>
          <MenuRadioItem value="date">Date</MenuRadioItem>
          <MenuRadioItem value="amount">Amount</MenuRadioItem>
        </MenuRadioGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuCheckboxItem checked={archived} onCheckedChange={setArchived}>
            Show archived
          </MenuCheckboxItem>
          <MenuItem shortcut="E" onSelect={onExport}>
            Export…
          </MenuItem>
          <MenuItem variant="destructive">Delete selected</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}

const meta: Meta<typeof Menu> = {
  title: "Components/Overlays/Menu",
  component: Menu,
  subcomponents: {
    MenuTrigger,
    MenuContent,
    MenuGroup,
    MenuLabel,
    MenuItem,
    MenuCheckboxItem,
    MenuRadioGroup,
    MenuRadioItem,
    MenuSeparator,
  },
  render: (args) => <Demo {...args} />,
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {};
export const SelectsItem: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    onExport.mockClear();
    await userEvent.click(canvas.getByRole("button", { name: "Sort ›" }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole("menuitem", { name: /Export/ }));
    await expect(onExport).toHaveBeenCalledOnce();
  },
};
