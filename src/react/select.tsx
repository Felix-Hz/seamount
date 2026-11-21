import { Select as SelectPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "./cn";
import { useFieldControlProps } from "./field";

export const Select: typeof SelectPrimitive.Root = SelectPrimitive.Root;
export const SelectGroup: typeof SelectPrimitive.Group = SelectPrimitive.Group;
export const SelectValue: typeof SelectPrimitive.Value = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>): React.JSX.Element {
  const wired = useFieldControlProps(props);
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn("sm-select-trigger", className)}
      {...props}
      {...wired}
    >
      {children}
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 4,
  style,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>): React.JSX.Element {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn("sm-menu", className)}
        position={position}
        sideOffset={sideOffset}
        style={position === "popper" ? { minWidth: "var(--radix-select-trigger-width)", ...style } : style}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>): React.JSX.Element {
  return (
    <SelectPrimitive.Item data-slot="select-item" className={cn("sm-menu-item", className)} {...props}>
      <SelectPrimitive.ItemIndicator className="sm-menu-indicator">✓</SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>): React.JSX.Element {
  return <SelectPrimitive.Label className={cn("sm-menu-label", className)} {...props} />;
}

export function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>): React.JSX.Element {
  return <SelectPrimitive.Separator className={cn("sm-menu-separator", className)} {...props} />;
}
