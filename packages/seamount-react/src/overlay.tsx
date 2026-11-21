import { Popover as PopoverPrimitive, Separator as SeparatorPrimitive, Tooltip as TooltipPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "./cn";

export const TooltipProvider: typeof TooltipPrimitive.Provider = TooltipPrimitive.Provider;

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
};

/** Help for a control with no room for it; never the only place essential information lives. Needs a TooltipProvider. */
export function Tooltip({ content, children, side = "top", delayDuration = 300 }: TooltipProps): React.JSX.Element {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content data-slot="tooltip" side={side} sideOffset={6} className="sm-tooltip">
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export const Popover: typeof PopoverPrimitive.Root = PopoverPrimitive.Root;
export const PopoverTrigger: typeof PopoverPrimitive.Trigger = PopoverPrimitive.Trigger;
export const PopoverClose: typeof PopoverPrimitive.Close = PopoverPrimitive.Close;

export function PopoverContent({
  className,
  sideOffset = 6,
  align = "start",
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>): React.JSX.Element {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover"
        className={cn("sm-popover", className)}
        sideOffset={sideOffset}
        align={align}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  tone,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & { tone?: "ink" }): React.JSX.Element {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-tone={tone}
      orientation={orientation}
      decorative={decorative}
      className={cn("sm-separator", className)}
      {...props}
    />
  );
}
