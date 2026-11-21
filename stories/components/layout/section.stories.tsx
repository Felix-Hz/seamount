import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button, Section } from "../../../src/react";

const body = <p style={{ color: "var(--sm-ink-2)" }}>The heading toggles; the chevron turns 90°.</p>;
const meta: Meta<typeof Section> = {
  title: "Components/Layout/Section",
  component: Section,
  args: { title: "Dashboard", label: "Settings", children: body },
  argTypes: { children: { control: false }, aside: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "40rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {};
export const Numbered: Story = { args: { n: "01", label: undefined, title: "One ink, rationed" } };
export const WithAside: Story = { args: { aside: <Button size="sm">Edit</Button> } };
export const Collapsible: Story = { args: { collapsible: true, title: "Collapsible section", label: "Details" } };
export const Collapses: Story = {
  tags: ["!autodocs"],
  args: { collapsible: true, defaultOpen: true, title: "Collapsible section", label: "Details" },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: /Collapsible section/ });
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  },
};
