import type * as React from "react";
import { cn } from "./cn";

/** Label and value pairs: mono caps label left, value right, ink rule on top, hairlines between. */
export function SpecList({
  className,
  items,
  children,
  ...props
}: React.ComponentProps<"dl"> & {
  items?: ReadonlyArray<readonly [label: React.ReactNode, value: React.ReactNode]>;
}): React.JSX.Element {
  return (
    <dl data-slot="spec" className={cn("sm-spec", className)} {...props}>
      {items?.map(([label, value], i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: rows are positional and never reorder
        <SpecItem key={i} label={label}>
          {value}
        </SpecItem>
      ))}
      {children}
    </dl>
  );
}

export function SpecItem({
  label,
  children,
}: {
  label: React.ReactNode;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div data-slot="spec-item">
      <dt>{label}</dt>
      <dd>{children ?? "–"}</dd>
    </div>
  );
}
