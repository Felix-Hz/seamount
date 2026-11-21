import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { Label, Section } from "../../src/react";

const meta: Meta = { title: "Foundations/Colour", tags: ["!autodocs"] };
export default meta;

type Story = StoryObj;

const INTERFACE: ReadonlyArray<readonly [token: string, use: string]> = [
  ["paper", "page ground"],
  ["surface", "app chrome only: sidebar, bars"],
  ["tint", "selected and hover grounds, code"],
  ["ink", "text, section rules, axes"],
  ["ink-2", "secondary text, leads"],
  ["ink-3", "labels, help, comparison series"],
  ["accent", "the interface ink: current, selected, primary, focus"],
  ["ember", "errors and destructive actions, always with their word"],
  ["rule", "hairlines, control borders, gridlines"],
];

function Swatch({ token, use }: { token: string; use: string }): React.JSX.Element {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "3rem 8rem 1fr", alignItems: "center", gap: "1rem" }}>
      <span
        style={{
          width: "3rem",
          height: "2rem",
          background: `var(--sm-${token})`,
          border: "1px solid var(--sm-rule)",
          borderRadius: "var(--sm-radius-sm)",
        }}
      />
      <code className="sm-label" style={{ color: "var(--sm-ink)" }}>
        --sm-{token}
      </code>
      <span style={{ color: "var(--sm-ink-2)" }}>{use}</span>
    </div>
  );
}

export const Palette: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "3.5rem", maxWidth: "48rem" }}>
      <Section n="01" title="One ink, rationed">
        <p style={{ color: "var(--sm-ink-2)", maxWidth: "40em" }}>
          Cobalt is the only interface colour, on one or two things per screen. Ember carries meaning: errors,
          destructive actions and data. State is told by words and a mark, never colour alone.
        </p>
        <div style={{ display: "grid", gap: "0.75rem", marginTop: "1.5rem" }}>
          {INTERFACE.map(([token, use]) => (
            <Swatch key={token} token={token} use={use} />
          ))}
        </div>
      </Section>
      <Section n="02" title="Data palette, charts only">
        <p style={{ color: "var(--sm-ink-2)", maxWidth: "40em" }}>
          Slots in fixed order, following the entity. A fifth series folds into Other. Worst adjacent colour-blind ΔE
          9.7 light and 11.1 dark.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} style={{ display: "grid", gap: "0.375rem" }}>
              <span style={{ width: "5rem", height: "2.5rem", background: `var(--sm-data-${n})` }} />
              <Label>Slot {n}</Label>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: "1.5rem" }}>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span key={n} style={{ flex: 1, height: "1.5rem", background: `var(--sm-seq-${n})` }} />
          ))}
        </div>
        <Label style={{ display: "block", marginTop: "0.375rem" }}>Sequential, least to most</Label>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span key={n} style={{ flex: 1, height: "1.5rem", background: `var(--sm-div-${n})` }} />
          ))}
        </div>
        <Label style={{ display: "block", marginTop: "0.375rem" }}>Diverging, below and above a baseline</Label>
      </Section>
    </div>
  ),
};
