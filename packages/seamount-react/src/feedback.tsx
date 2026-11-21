import * as React from "react";
import { Button } from "./button";
import { cn } from "./cn";
import { Square } from "./label";

export type BannerProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** One sentence naming the condition. */
  children: React.ReactNode;
  /** One action, e.g. "Close MSI Center". */
  action?: React.ReactNode;
  /** Shows a Dismiss control; the app remembers the dismissal. */
  onDismiss?: () => void;
  tone?: "accent" | "ember";
};

/** A lasting condition, across the top of the content. */
export function Banner({
  children,
  action,
  onDismiss,
  tone = "accent",
  className,
  ...props
}: BannerProps): React.JSX.Element {
  return (
    <div data-slot="banner" data-tone={tone} role="status" className={cn("sm-banner", className)} {...props}>
      <Square tone={tone === "ember" ? "ember" : undefined} />
      <p className="sm-banner-text" style={{ margin: 0 }}>
        {children}
      </p>
      {action}
      {onDismiss && (
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          Dismiss
        </Button>
      )}
    </div>
  );
}

export type EmptyStateProps = Omit<React.ComponentProps<"div">, "title" | "children"> & {
  title: React.ReactNode;
  /** Why it is empty and when it fills. */
  children?: React.ReactNode;
  /** One action. */
  action?: React.ReactNode;
};

export function EmptyState({ title, children, action, className, ...props }: EmptyStateProps): React.JSX.Element {
  return (
    <div data-slot="empty" className={cn("sm-empty", className)} {...props}>
      <p className="sm-empty-title">{title}</p>
      {children && <p className="sm-empty-text">{children}</p>}
      {action}
    </div>
  );
}

export function Skeleton({ className, ...props }: React.ComponentProps<"span">): React.JSX.Element {
  return <span data-slot="skeleton" aria-hidden="true" className={cn("sm-skeleton", className)} {...props} />;
}

export type LoadingStateProps = Omit<React.ComponentProps<"p">, "children"> & {
  /** Inline mono state: "Reading…", or a count past 2 s: "Reading 3 of 7 days". */
  children?: React.ReactNode;
  /** Nothing renders before this many milliseconds, so fast loads never flash. */
  delay?: number;
};

/** Shows nothing under 300 ms, then an inline state line. Never a spinner without words. */
export function LoadingState({
  children = "Loading…",
  delay = 300,
  className,
  ...props
}: LoadingStateProps): React.JSX.Element | null {
  const [visible, setVisible] = React.useState(delay <= 0);
  React.useEffect(() => {
    if (delay <= 0) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  if (!visible) return null;
  return (
    <p data-slot="loading" role="status" className={cn("sm-state", className)} style={{ margin: 0 }} {...props}>
      {children}
    </p>
  );
}

export function Table({ className, ...props }: React.ComponentProps<"table">): React.JSX.Element {
  return <table data-slot="table" className={cn("sm-table", className)} {...props} />;
}
