import { Button, EmptyState } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof EmptyState> = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  args: {
    title: "Nothing recorded this month.",
    children: "Transactions appear here as you add them or import a CSV from your bank.",
  },
  argTypes: { action: { control: false } },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
export const WithAction: Story = { args: { action: <Button variant="primary">Import a statement</Button> } };
