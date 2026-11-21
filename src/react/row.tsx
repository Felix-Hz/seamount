import type * as React from "react";
import { cn } from "./cn";

export type RowProps = Omit<React.ComponentProps<"div">, "children"> & {
  name: React.ReactNode;
  help?: React.ReactNode;
  /** Third line in mono for live state ("Reading…", "Reverted by MSI Center"); accent when it is a warning. */
  state?: React.ReactNode;
  warning?: boolean;
  /** The id of the control, so the name labels it. */
  htmlFor?: string;
  children?: React.ReactNode;
};

/** A setting: name in the sans 500, one line of help, control on the right, rule under. */
export function Row({
  name,
  help,
  state,
  warning,
  htmlFor,
  className,
  children,
  ...props
}: RowProps): React.JSX.Element {
  const Name = htmlFor ? "label" : "div";
  return (
    <div data-slot="row" className={cn("sm-row", className)} {...props}>
      <div className="sm-row-text">
        <Name className="sm-row-name" htmlFor={htmlFor}>
          {name}
        </Name>
        {help && <p className="sm-row-help">{help}</p>}
        {state && (
          <p className="sm-row-state" data-tone={warning ? "accent" : undefined}>
            {state}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
