import { Checkbox as CheckboxPrimitive, Switch as SwitchPrimitive, ToggleGroup } from "radix-ui";
import type * as React from "react";
import { cn } from "./cn";
import { useFieldControlProps } from "./field";

/** Only for a true on and off; anything with more states is a segmented control. */
export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>): React.JSX.Element {
  const wired = useFieldControlProps(props);
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn("sm-switch", className)} {...props} {...wired}>
      <SwitchPrimitive.Thumb className="sm-switch-thumb" />
    </SwitchPrimitive.Root>
  );
}

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>): React.JSX.Element {
  const wired = useFieldControlProps(props);
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" className={cn("sm-checkbox", className)} {...props} {...wired}>
      <CheckboxPrimitive.Indicator className="sm-checkbox-indicator" />
    </CheckboxPrimitive.Root>
  );
}

export type SegmentedOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
};

export type SegmentedControlProps<T extends string> = {
  value: T;
  onValueChange: (value: T) => void;
  /** Up to four; more becomes a Select. */
  options: ReadonlyArray<SegmentedOption<T>>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
  disabled?: boolean;
};

/** One of up to four choices, always one selected: clicking the current choice keeps it. */
export function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  className,
  disabled,
  ...aria
}: SegmentedControlProps<T>): React.JSX.Element {
  return (
    <ToggleGroup.Root
      type="single"
      data-slot="segmented"
      className={cn("sm-segmented", className)}
      value={value}
      disabled={disabled}
      onValueChange={(next) => {
        // Radix clears a single group when the pressed item is pressed again
        if (next) onValueChange(next as T);
      }}
      {...aria}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="sm-segmented-item"
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
