// Every sm- class a React component emits must exist in components.css, so a rename in one place cannot
// leave the components unstyled.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(import.meta.dirname, "..", "..", "seamount", "src", "css", "components.css"), "utf8");
const defined = new Set([...css.matchAll(/\.(sm-[a-z0-9-]+)/g)].map((m) => m[1]));

const reactDir = import.meta.dirname;
const used = new Map<string, string>();
for (const file of readdirSync(reactDir).filter((f) => f.endsWith(".tsx") && !f.includes(".test."))) {
  const source = readFileSync(join(reactDir, file), "utf8");
  for (const m of source.matchAll(/["\s(](sm-[a-z0-9-]+)/g)) {
    const name = m[1] as string;
    // Generated ids, not classes
    if (name === "sm-field") continue;
    used.set(name, file);
  }
}

describe("component classes", () => {
  it("are all defined in components.css", () => {
    const missing = [...used].filter(([name]) => !defined.has(name)).map(([name, file]) => `${name} (${file})`);
    expect(missing).toEqual([]);
  });

  it("are found at all", () => {
    expect(used.size).toBeGreaterThan(30);
  });
});
