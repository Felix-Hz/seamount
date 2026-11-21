import { Tabs as TabsPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "./cn";

export const Tabs: typeof TabsPrimitive.Root = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>): React.JSX.Element {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn("sm-tabs-list", className)} {...props} />;
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>): React.JSX.Element {
  return <TabsPrimitive.Trigger data-slot="tabs-trigger" className={cn("sm-tabs-trigger", className)} {...props} />;
}

export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>): React.JSX.Element {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("sm-tabs-content", className)} {...props} />;
}
