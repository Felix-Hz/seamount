import { Collapsible } from "radix-ui";
import type * as React from "react";
import { cn } from "./cn";
import { Label } from "./label";

export type SectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode;
  /** `01` renders `[ 01 ]`; only when sections are a real sequence. */
  n?: string;
  /** A plain mono label instead of a number. */
  label?: string;
  /** Heading level of the title. */
  as?: "h2" | "h3" | "h4";
  /** Collapsible sections toggle from the heading with a `›` that turns 90°. */
  collapsible?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Right-aligned content in the heading row (a count, an action). */
  aside?: React.ReactNode;
};

/** Mono label, display serif title, ink rule above. */
export function Section({
  title,
  n,
  label,
  as: Heading = "h2",
  collapsible = false,
  open,
  defaultOpen = true,
  onOpenChange,
  aside,
  className,
  children,
  ...props
}: SectionProps): React.JSX.Element {
  const marker = n ? <Label tone="accent">[&nbsp;{n}&nbsp;]</Label> : label ? <Label>{label}</Label> : null;

  if (!collapsible) {
    return (
      <section data-slot="section" className={cn("sm-section", className)} {...props}>
        <div className="sm-section-head">
          {marker}
          <Heading className="sm-section-title">{title}</Heading>
          {aside && <div style={{ marginLeft: "auto" }}>{aside}</div>}
        </div>
        {children}
      </section>
    );
  }

  return (
    <Collapsible.Root asChild open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <section data-slot="section" className={cn("sm-section", className)} {...props}>
        <Heading className="sm-section-head">
          <Collapsible.Trigger className="sm-section-trigger">
            {marker}
            <span className="sm-section-title">{title}</span>
            <span className="sm-chevron" aria-hidden="true">
              ›
            </span>
          </Collapsible.Trigger>
        </Heading>
        {aside}
        <Collapsible.Content>{children}</Collapsible.Content>
      </section>
    </Collapsible.Root>
  );
}
