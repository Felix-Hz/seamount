import { Field, Input } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Input> = {
  title: "Components/Forms/Input",
  component: Input,
  args: { placeholder: "Countdown, groceries" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "24rem" }}>
        <Field label="Description">
          <Story />
        </Field>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Figures: Story = {
  args: { figures: true, inputMode: "decimal", defaultValue: "42.10", placeholder: undefined },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "Locked", placeholder: undefined } };
