import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Row, Switch } from "../../../src/react";

const meta: Meta<typeof Row> = {
  title: "Components/Layout/Row",
  component: Row,
  args: {
    name: "Sync exchange rates",
    help: "Fetch rates once a day for the 12 currencies in use.",
    htmlFor: "sync",
    children: <Switch id="sync" defaultChecked />,
  },
  argTypes: { children: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "40rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Row>;

export const Default: Story = {};
export const WithState: Story = { args: { state: "Last fetched 4 min ago" } };
export const Warning: Story = {
  args: {
    name: "Reverted by another device",
    help: "Shows how a warning state reads.",
    state: "Your phone set this back to Week 2 min ago.",
    warning: true,
    htmlFor: undefined,
    children: <Button size="sm">Set again</Button>,
  },
};
