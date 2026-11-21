import {
  Field,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

const meta: Meta<typeof Select> = {
  title: "Components/Forms/Select",
  component: Select,
  subcomponents: { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator },
  args: { defaultValue: "everyday" },
  render: (args) => (
    <div style={{ maxWidth: "24rem" }}>
      <Field label="Account">
        <Select {...args}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyday">Everyday</SelectItem>
            <SelectItem value="savings">Savings</SelectItem>
            <SelectItem value="credit">Credit card</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Grouped: Story = {
  render: (args) => (
    <div style={{ maxWidth: "24rem" }}>
      <Field label="Account">
        <Select {...args}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Spending</SelectLabel>
              <SelectItem value="everyday">Everyday</SelectItem>
              <SelectItem value="credit">Credit card</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Saving</SelectLabel>
              <SelectItem value="savings">Savings</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  ),
};
export const Chooses: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox"));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole("option", { name: "Savings" }));
    await expect(canvas.getByRole("combobox")).toHaveTextContent("Savings");
  },
};
