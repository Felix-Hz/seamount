import * as React from "react";
import { cn } from "./cn";

type FieldContextValue = {
  id: string;
  helpId: string;
  errorId: string;
  hasHelp: boolean;
  invalid: boolean;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

/** The id and descriptions of the enclosing Field; inputs read it to wire label, help and error. */
export function useField(): FieldContextValue | null {
  return React.useContext(FieldContext);
}

export type FieldProps = Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode;
  help?: React.ReactNode;
  /** The fix, not just the fault: "Enter 1 to 3,600 seconds". Validate on blur or submit. */
  error?: React.ReactNode;
  /** Use an id the app already owns. */
  id?: string;
  children: React.ReactNode;
};

export function Field({ label, help, error, id, className, children, ...props }: FieldProps): React.JSX.Element {
  const auto = React.useId();
  const fieldId = id ?? `sm-field-${auto}`;
  const value: FieldContextValue = {
    id: fieldId,
    helpId: `${fieldId}-help`,
    errorId: `${fieldId}-error`,
    hasHelp: Boolean(help),
    invalid: Boolean(error),
  };
  return (
    <FieldContext.Provider value={value}>
      <div data-slot="field" className={cn("sm-field", className)} {...props}>
        <label className="sm-field-label" htmlFor={fieldId}>
          {label}
        </label>
        {children}
        {help && !error && (
          <p id={value.helpId} className="sm-field-help">
            {help}
          </p>
        )}
        {error && (
          <p id={value.errorId} className="sm-field-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
}

/** The aria wiring a control inside a Field needs; props the caller passes win. */
export function useFieldControlProps(props: {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
}): { id?: string; "aria-describedby"?: string; "aria-invalid"?: React.AriaAttributes["aria-invalid"] } {
  const field = useField();
  if (!field) return props;
  const describedBy = field.invalid ? field.errorId : field.hasHelp ? field.helpId : undefined;
  return {
    id: props.id ?? field.id,
    "aria-describedby": props["aria-describedby"] ?? describedBy,
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
  };
}

export type InputProps = React.ComponentProps<"input"> & {
  /** Mono tabular figures, for amounts and codes. */
  figures?: boolean;
};

export function Input({ className, figures, ...props }: InputProps): React.JSX.Element {
  const wired = useFieldControlProps(props);
  return (
    <input
      data-slot="input"
      data-figures={figures || undefined}
      className={cn("sm-input", className)}
      {...props}
      {...wired}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">): React.JSX.Element {
  const wired = useFieldControlProps(props);
  return <textarea data-slot="textarea" className={cn("sm-textarea", className)} {...props} {...wired} />;
}
