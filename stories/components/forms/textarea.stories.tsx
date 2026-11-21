import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Textarea } from "../../../src/react";

const meta: Meta<typeof Textarea> = {
  title: "Components/Forms/Textarea",
  component: Textarea,
  args: { placeholder: "Split with Sam" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "24rem" }}>
        <Field label="Note">
          <Story />
        </Field>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, defaultValue: "Locked", placeholder: undefined } };
