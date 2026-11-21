import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultDuration, Toaster, toast } from "./toast";

afterEach(() => {
  act(() => toast.dismiss());
});

describe("toast", () => {
  it("shows one at a time, the newest replacing the old", () => {
    render(<Toaster />);
    act(() => {
      toast.success({ title: "Applied Gaming. 3 changes." });
      toast.info({ title: "Recorder restarted." });
    });
    expect(screen.queryByText("Applied Gaming. 3 changes.")).toBeNull();
    expect(screen.getByText("Recorder restarted.")).toBeTruthy();
    expect(screen.getByText(/INFO/)).toBeTruthy();
  });

  it("never replaces an error with a success", () => {
    render(<Toaster />);
    act(() => {
      toast.error({ title: "Couldn't import the statement." });
      toast.success({ title: "Saved." });
    });
    expect(screen.getByText("Couldn't import the statement.")).toBeTruthy();
    expect(screen.queryByText("Saved.")).toBeNull();
  });

  it("runs the action and turns a progress toast into its result", async () => {
    const undo = vi.fn();
    render(<Toaster />);
    let id = 0;
    act(() => {
      id = toast.progress({ title: "Importing 214 transactions.", step: "3/7" });
    });
    expect(screen.getByText(/3\/7/)).toBeTruthy();
    act(() =>
      toast.update(id, {
        kind: "success",
        title: "Imported 214 transactions.",
        action: { label: "Undo", onClick: undo },
      }),
    );
    expect(screen.getByText(/OK/)).toBeTruthy();
    await userEvent.setup().click(screen.getByRole("button", { name: "Undo" }));
    expect(undo).toHaveBeenCalledOnce();
  });

  it("stays longer when it can be undone, and errors stay until dismissed", () => {
    expect(defaultDuration("success", false)).toBe(4000);
    expect(defaultDuration("success", true)).toBe(8000);
    expect(defaultDuration("info", false)).toBe(6000);
    expect(defaultDuration("error", true)).toBe(Number.POSITIVE_INFINITY);
  });
});
