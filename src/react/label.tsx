import type * as React from "react";
import { cn } from "./cn";

export type Tone = "ink" | "accent" | "ember";

/** Mono caps instrument label: section numbers, field names, nav. */
export function Label({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & { tone?: Exclude<Tone, "ember"> }): React.JSX.Element {
  return <span data-slot="label" data-tone={tone} className={cn("sm-label", className)} {...props} />;
}

/** Bracketed tag: `[ OK ]`, `[ ERROR ]`, `[ 01 ]`. The brackets are drawn by CSS, not read aloud. */
export function Tag({ className, tone, ...props }: React.ComponentProps<"span"> & { tone?: Tone }): React.JSX.Element {
  return <span data-slot="tag" data-tone={tone} className={cn("sm-tag", className)} {...props} />;
}

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">): React.JSX.Element {
  return <kbd data-slot="kbd" className={cn("sm-kbd", className)} {...props} />;
}

/** The 6 px square: bullets, live state, keys beside a name. Decorative unless given a label. */
export function Square({
  className,
  tone,
  color,
  style,
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone; color?: string }): React.JSX.Element {
  return (
    <span
      aria-hidden={props["aria-label"] ? undefined : true}
      data-slot="square"
      data-tone={tone}
      className={cn("sm-square", className)}
      style={color ? { background: color, ...style } : style}
      {...props}
    />
  );
}

/** `■ Live · every 5 s` */
export function Live({ className, children, ...props }: React.ComponentProps<"span">): React.JSX.Element {
  return (
    <span data-slot="live" className={cn("sm-live sm-label", className)} {...props}>
      <Square />
      {children}
    </span>
  );
}

/**
 * `[ T ]ype`: the shortcut letter shown in place. The first occurrence of `shortcut` (case-insensitive) is
 * bracketed; the shortcut itself must be bound by the app (see useHotkey).
 */
export function ShortcutLabel({
  label,
  shortcut,
  className,
}: {
  label: string;
  shortcut: string;
  className?: string;
}): React.JSX.Element {
  const i = label.toLowerCase().indexOf(shortcut.toLowerCase());
  if (i < 0)
    return (
      <span className={cn("sm-label", className)}>
        {label} <Kbd>{shortcut}</Kbd>
      </span>
    );
  return (
    <span className={cn("sm-label", className)} aria-keyshortcuts={shortcut}>
      {label.slice(0, i)}
      <span aria-hidden="true">[&nbsp;</span>
      <span data-tone="accent" className="sm-label">
        {label.slice(i, i + shortcut.length)}
      </span>
      <span aria-hidden="true">&nbsp;]</span>
      {label.slice(i + shortcut.length)}
    </span>
  );
}
