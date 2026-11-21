import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "./cn";

export type ButtonVariant = "default" | "primary" | "ghost" | "destructive" | "link";
export type ButtonSize = "md" | "sm" | "icon" | "icon-sm";

export type ButtonProps = React.ComponentProps<"button"> & {
  /** One primary per view. Destructive is Ember and always says what it destroys ("Delete account"). */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders the child element (a link, say) with the button's styling. */
  asChild?: boolean;
};

export function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  type,
  ...props
}: ButtonProps): React.JSX.Element {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn("sm-button", className)}
      // A bare <button> inside a form submits; default to "button" so only an explicit submit does
      type={asChild ? type : (type ?? "button")}
      {...props}
    />
  );
}
