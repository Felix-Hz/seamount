import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { Section, SpecList } from "../../src/react";

const meta: Meta = { title: "Foundations/Type", tags: ["!autodocs"] };
export default meta;

type Story = StoryObj;

const FACES: ReadonlyArray<{ face: string; family: string; job: string; sample: string; style?: React.CSSProperties }> =
  [
    {
      face: "Newsreader",
      family: "var(--sm-font-display)",
      job: "running text, headings, big figures",
      sample: "Where did all my money go?",
      style: { fontSize: "2.5rem", fontWeight: 350, letterSpacing: "-0.025em", lineHeight: 1.1 },
    },
    {
      face: "Instrument Sans",
      family: "var(--sm-font-sans)",
      job: "interface text: names, help, values, captions",
      sample: "Stop charging at this level. 60% suits a laptop that stays plugged in.",
      style: { fontSize: "1rem" },
    },
    {
      face: "JetBrains Mono",
      family: "var(--sm-font-mono)",
      job: "labels in capitals, buttons, nav, figures, code",
      sample: "[ 01 ] OUT 2,627.49 · 4,812 RPM",
      style: { fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.04em" },
    },
    {
      face: "Departure Mono",
      family: "var(--sm-font-pixel)",
      job: "the wordmark, and nothing else",
      sample: "seamount",
      style: { fontSize: "1.75rem" },
    },
  ];

export const Faces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2.5rem", maxWidth: "48rem" }}>
      {FACES.map((f, i) => (
        <Section key={f.face} n={String(i + 1).padStart(2, "0")} title={f.face}>
          <p style={{ fontFamily: f.family, margin: "1rem 0", color: "var(--sm-ink)", ...f.style }}>{f.sample}</p>
          <SpecList
            items={[
              ["Job", f.job],
              ["Licence", "OFL-1.1"],
            ]}
          />
        </Section>
      ))}
    </div>
  ),
};
