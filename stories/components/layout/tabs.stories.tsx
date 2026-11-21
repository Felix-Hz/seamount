import { Tabs, TabsContent, TabsList, TabsTrigger } from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta: Meta<typeof Tabs> = {
  title: "Components/Layout/Tabs",
  component: Tabs,
  subcomponents: { TabsList, TabsTrigger, TabsContent },
  args: { defaultValue: "month" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Period">
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
      <TabsContent value="month">
        <p>November so far.</p>
      </TabsContent>
      <TabsContent value="year">
        <p>2026 to date.</p>
      </TabsContent>
    </Tabs>
  ),
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};
export const Switches: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Year" }));
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("2026 to date.");
  },
};
