import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from "@felix-hz/seamount-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { expect, waitFor, within } from "storybook/test";

function Body({ sheet, size }: { sheet?: boolean; size?: "md" | "lg" }): React.JSX.Element {
  return (
    <DialogContent sheet={sheet} size={size}>
      <DialogTitle>New budget</DialogTitle>
      <DialogDescription>Track one category against a monthly limit.</DialogDescription>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        <Field label="Category">
          <Input defaultValue="Groceries" />
        </Field>
        <Field label="Monthly limit" help="In NZD; other currencies convert at the day's rate.">
          <Input figures defaultValue="500.00" />
        </Field>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
        <Button variant="primary">Create budget</Button>
      </DialogFooter>
    </DialogContent>
  );
}

const meta: Meta<typeof Dialog> = {
  title: "Components/Overlays/Dialog",
  component: Dialog,
  subcomponents: { DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>New budget</Button>
      </DialogTrigger>
      <Body />
    </Dialog>
  ),
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};
export const Sheet: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>New budget</Button>
      </DialogTrigger>
      <Body sheet />
    </Dialog>
  ),
};
export const OpensAndCloses: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "New budget" }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole("dialog", { name: "New budget" });
    await waitFor(() => expect(dialog).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("dialog")).toBeNull());
  },
};
