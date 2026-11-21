import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button, Toaster, toast } from "../../../src/react";
import { line } from "../../shared";

const meta: Meta<typeof Toaster> = {
  title: "Components/Feedback/Toast",
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component:
          "Mount `Toaster` once near the root, then call `toast`. Errors announce assertively, everything else politely. Timers pause on hover and focus, Esc dismisses, and a toast never takes focus.",
      },
    },
  },
  render: () => (
    <div style={line}>
      <Button
        onClick={() =>
          toast.success({
            title: "Applied Gaming. 3 changes.",
            action: { label: "Undo", onClick: () => toast.info({ title: "Restored Balanced." }) },
          })
        }
      >
        Success
      </Button>
      <Button onClick={() => toast.info({ title: "Recorder restarted after the update." })}>Info</Button>
      <Button
        onClick={() => {
          const id = toast.progress({ title: "Importing statement.", step: "1/3" });
          setTimeout(() => toast.update(id, { step: "2/3" }), 800);
          setTimeout(
            () => toast.update(id, { kind: "success", title: "Imported 214 transactions.", duration: 4000 }),
            1600,
          );
        }}
      >
        Progress
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: "Couldn't import the statement.",
            description: "Row 18 has no date. Fix the file and try again.",
            action: { label: "Retry", onClick: () => toast.dismiss() },
          })
        }
      >
        Error
      </Button>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {};
export const Shows: Story = {
  tags: ["!autodocs"],
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Info" }));
    const body = within(canvasElement.ownerDocument.body);
    const message = await body.findByText("Recorder restarted after the update.");
    await waitFor(() => expect(message).toBeVisible());
    toast.dismiss();
  },
};
