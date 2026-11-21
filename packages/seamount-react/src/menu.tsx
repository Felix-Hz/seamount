import { DropdownMenu as MenuPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "./cn";

export const Menu: typeof MenuPrimitive.Root = MenuPrimitive.Root;
export const MenuTrigger: typeof MenuPrimitive.Trigger = MenuPrimitive.Trigger;
export const MenuGroup: typeof MenuPrimitive.Group = MenuPrimitive.Group;
export const MenuRadioGroup: typeof MenuPrimitive.RadioGroup = MenuPrimitive.RadioGroup;

export function MenuContent({
  className,
  sideOffset = 4,
  align = "start",
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Content>): React.JSX.Element {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        data-slot="menu"
        className={cn("sm-menu", className)}
        sideOffset={sideOffset}
        align={align}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
}

export type MenuItemProps = React.ComponentProps<typeof MenuPrimitive.Item> & {
  /** Printed right-aligned in mono; the app binds it. */
  shortcut?: string;
  variant?: "default" | "destructive";
};

export function MenuItem({
  className,
  shortcut,
  variant = "default",
  children,
  ...props
}: MenuItemProps): React.JSX.Element {
  return (
    <MenuPrimitive.Item data-variant={variant} className={cn("sm-menu-item", className)} {...props}>
      {children}
      {shortcut && <span className="sm-menu-shortcut">{shortcut}</span>}
    </MenuPrimitive.Item>
  );
}

export function MenuCheckboxItem({
  className,
  children,
  shortcut,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.CheckboxItem> & { shortcut?: string }): React.JSX.Element {
  return (
    <MenuPrimitive.CheckboxItem className={cn("sm-menu-item", className)} {...props}>
      <MenuPrimitive.ItemIndicator className="sm-menu-indicator">✓</MenuPrimitive.ItemIndicator>
      {children}
      {shortcut && <span className="sm-menu-shortcut">{shortcut}</span>}
    </MenuPrimitive.CheckboxItem>
  );
}

/** The current choice carries a cobalt ✓. */
export function MenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.RadioItem>): React.JSX.Element {
  return (
    <MenuPrimitive.RadioItem className={cn("sm-menu-item", className)} {...props}>
      <MenuPrimitive.ItemIndicator className="sm-menu-indicator">✓</MenuPrimitive.ItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

export function MenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Label>): React.JSX.Element {
  return <MenuPrimitive.Label className={cn("sm-menu-label", className)} {...props} />;
}

export function MenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Separator>): React.JSX.Element {
  return <MenuPrimitive.Separator className={cn("sm-menu-separator", className)} {...props} />;
}
