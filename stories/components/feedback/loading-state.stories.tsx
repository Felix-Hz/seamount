import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingState } from "../../../src/react";

const meta: Meta<typeof LoadingState> = {
  title: "Components/Feedback/LoadingState",
  component: LoadingState,
  args: { delay: 0, children: "Reading 3 of 7 days…" },
};
export default meta;
type Story = StoryObj<typeof LoadingState>;

export const Default: Story = {};
