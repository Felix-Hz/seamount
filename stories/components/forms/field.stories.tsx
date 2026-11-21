import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";
import { Field, Input } from "../../../src/react";

const meta: Meta<typeof Field> = {
  title: "Components/Forms/Field",
  component: Field,
  args: {
    label: "Description",
    help: "Shown in the transaction list.",
    children: <Input placeholder="Countdown, groceries" />,
  },
  argTypes: { children: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "24rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {};
export const WithError: Story = {
  args: {
    label: "Sample interval",
    help: undefined,
    error: "Enter 1 to 3,600 seconds.",
    children: <Input figures inputMode="numeric" defaultValue="0" />,
  },
};

function Validated(): React.JSX.Element {
  const [value, setValue] = React.useState("0");
  const number = Number(value);
  const error = !Number.isInteger(number) || number < 1 || number > 3600 ? "Enter 1 to 3,600 seconds." : undefined;
  return (
    <Field label="Sample interval" error={error}>
      <Input figures inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value)} />
    </Field>
  );
}
export const Validation: Story = {
  render: () => <Validated />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Sample interval");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await userEvent.clear(input);
    await userEvent.type(input, "60");
    await expect(input).not.toHaveAttribute("aria-invalid", "true");
  },
};
