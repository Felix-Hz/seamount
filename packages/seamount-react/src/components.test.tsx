import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  ConfirmDialog,
  Field,
  Input,
  LoadingState,
  Meter,
  SegmentedControl,
  ShortcutLabel,
  SpecList,
  Switch,
  sparklineGeometry,
  useHotkey,
} from "./index";

function Harness({ onChange }: { onChange: (v: string) => void }): React.JSX.Element {
  const [value, setValue] = React.useState("week");
  return (
    <SegmentedControl
      aria-label="Period"
      value={value}
      onValueChange={(v) => {
        setValue(v);
        onChange(v);
      }}
      options={[
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  );
}

function Bound({ onKey }: { onKey: () => void }): React.JSX.Element {
  useHotkey("t", onKey);
  return <input aria-label="Search" />;
}

describe("Button", () => {
  it("defaults to type=button so it never submits a form by accident", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveProperty("type", "button");
  });

  it("styles its child with asChild", () => {
    render(
      <Button asChild variant="primary">
        <a href="/install">Install it</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Install it" });
    expect(link.className).toContain("sm-button");
    expect(link.dataset.variant).toBe("primary");
    expect(link.hasAttribute("type")).toBe(false);
  });
});

describe("Field", () => {
  it("labels the control and describes it with the help", () => {
    render(
      <Field label="Interval" help="1 to 3,600 seconds">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Interval");
    expect(input.getAttribute("aria-describedby")).toBe(screen.getByText("1 to 3,600 seconds").id);
    expect(input.hasAttribute("aria-invalid")).toBe(false);
  });

  it("swaps the help for the error and marks the control invalid", () => {
    render(
      <Field label="Interval" help="1 to 3,600 seconds" error="Enter 1 to 3,600 seconds">
        <Input defaultValue="0" />
      </Field>,
    );
    const input = screen.getByLabelText("Interval");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe(screen.getByRole("alert").id);
    expect(screen.queryByText("1 to 3,600 seconds")).toBeNull();
  });
});

describe("SegmentedControl", () => {
  it("changes choice and never clears it", async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("radio", { name: "Month" }));
    expect(onChange).toHaveBeenLastCalledWith("month");
    await user.click(screen.getByRole("radio", { name: "Month" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("radio", { name: "Month" }).getAttribute("data-state")).toBe("on");
  });
});

describe("Switch", () => {
  it("toggles and takes its name from a Field", async () => {
    const onChange = vi.fn();
    render(
      <Field label="Start at sign-in">
        <Switch onCheckedChange={onChange} />
      </Field>,
    );
    await userEvent.setup().click(screen.getByRole("switch", { name: "Start at sign-in" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("ConfirmDialog", () => {
  it("starts focus on Cancel and confirms with the verb", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        defaultOpen
        title="Delete this account?"
        consequences={["Its 214 transactions are deleted.", "Budgets that use it stop tracking."]}
        actionLabel="Delete"
        destructive
        onConfirm={onConfirm}
      />,
    );
    const cancel = await screen.findByRole("button", { name: "Cancel" });
    expect(document.activeElement).toBe(cancel);
    const del = screen.getByRole("button", { name: "Delete" });
    expect(del.dataset.variant).toBe("destructive");
    await userEvent.setup().click(del);
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});

describe("SpecList", () => {
  it("renders label and value pairs, with a dash for a missing value", () => {
    render(
      <SpecList
        items={[
          ["Source", "github.com/Felix-Hz/cofr"],
          ["Site", null],
        ]}
      />,
    );
    expect(screen.getByText("Source").tagName).toBe("DT");
    expect(screen.getByText("–").tagName).toBe("DD");
  });
});

describe("ShortcutLabel", () => {
  it("brackets the shortcut letter in place", () => {
    const { container } = render(<ShortcutLabel label="Type" shortcut="t" />);
    expect(container.textContent).toBe("[ T ]ype");
    expect(container.firstElementChild?.getAttribute("aria-keyshortcuts")).toBe("t");
  });
});

describe("Meter", () => {
  it("exposes its value and flags going over", () => {
    render(<Meter label="Groceries budget used" value={540} max={500} valueText="$540 of $500" />);
    const meter = screen.getByRole("meter", { name: "Groceries budget used" });
    expect(meter.getAttribute("aria-valuetext")).toBe("$540 of $500");
    expect(meter.hasAttribute("data-over")).toBe(true);
  });
});

describe("sparklineGeometry", () => {
  it("breaks the line at a gap and ends on the last value", () => {
    const g = sparklineGeometry([1, 2, null, 3], 100, 20);
    expect(g?.path.match(/M/g)).toHaveLength(2);
    expect(g?.end?.[0]).toBeCloseTo(98);
  });

  it("returns nothing for an empty series and centres a flat one", () => {
    expect(sparklineGeometry([null, null], 100, 20)).toBeNull();
    expect(sparklineGeometry([5, 5], 100, 20)?.end?.[1]).toBe(10);
  });
});

describe("LoadingState", () => {
  it("shows nothing before its delay", () => {
    vi.useFakeTimers();
    render(<LoadingState>Reading…</LoadingState>);
    expect(screen.queryByRole("status")).toBeNull();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("status").textContent).toBe("Reading…");
    vi.useRealTimers();
  });
});

describe("useHotkey", () => {
  it("fires on the bare key but not while typing or with a modifier", async () => {
    const onKey = vi.fn();
    render(<Bound onKey={onKey} />);
    const user = userEvent.setup();
    await user.keyboard("t");
    expect(onKey).toHaveBeenCalledTimes(1);
    await user.keyboard("{Control>}t{/Control}");
    expect(onKey).toHaveBeenCalledTimes(1);
    await user.click(screen.getByLabelText("Search"));
    await user.keyboard("t");
    expect(onKey).toHaveBeenCalledTimes(1);
  });
});
