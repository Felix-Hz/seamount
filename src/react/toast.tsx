import { Toast as ToastPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "./cn";

export type ToastKind = "success" | "info" | "progress" | "error";

export type ToastInput = {
  /** The result in the past tense with its object: "Applied Gaming. 3 changes." */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** One action: Undo for a reversible change, the fix for an error (Retry, Open settings). */
  action?: { label: string; onClick: () => void };
  /** Progress only: "3/7"; omitted it prints "...". */
  step?: string;
  /** Milliseconds; Infinity stays until dismissed. Defaults follow the kind. */
  duration?: number;
};

export type ToastRecord = ToastInput & { id: number; kind: ToastKind };

const TAGS: Record<Exclude<ToastKind, "progress">, string> = {
  success: "OK",
  info: "INFO",
  error: "ERROR",
};

/** Success 4 s (8 s with Undo), info 6 s, progress and errors until done or dismissed. */
export function defaultDuration(kind: ToastKind, hasAction: boolean): number {
  if (kind === "success") return hasAction ? 8000 : 4000;
  if (kind === "info") return 6000;
  return Number.POSITIVE_INFINITY;
}

// One toast at a time: a new one replaces the old, except that an error is never replaced by a success.
let current: ToastRecord | null = null;
let nextId = 1;
const listeners = new Set<() => void>();
const emit = (): void => {
  for (const listener of listeners) listener();
};

function show(kind: ToastKind, input: ToastInput): number {
  if (current?.kind === "error" && kind === "success") return current.id;
  current = { ...input, kind, id: nextId++ };
  emit();
  return current.id;
}

export type ToastApi = {
  (input: ToastInput): number;
  success: (input: ToastInput) => number;
  info: (input: ToastInput) => number;
  error: (input: ToastInput) => number;
  /** Starts a progress toast; finish it with update(id, ...) as success or error. */
  progress: (input: ToastInput) => number;
  /** Changes the toast in place (progress steps, or finishing a progress toast). */
  update: (id: number, input: Partial<ToastInput> & { kind?: ToastKind }) => void;
  dismiss: (id?: number) => void;
};

export const toast: ToastApi = Object.assign((input: ToastInput) => show("success", input), {
  success: (input: ToastInput) => show("success", input),
  info: (input: ToastInput) => show("info", input),
  error: (input: ToastInput) => show("error", input),
  progress: (input: ToastInput) => show("progress", input),
  update: (id: number, input: Partial<ToastInput> & { kind?: ToastKind }) => {
    if (current?.id !== id) return;
    current = { ...current, ...input };
    emit();
  },
  dismiss: (id?: number) => {
    if (!current || (id !== undefined && current.id !== id)) return;
    current = null;
    emit();
  },
});

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The toast on screen, for apps that render their own. */
export function useToastState(): ToastRecord | null {
  return React.useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}

export type ToasterProps = {
  /** Bottom centre in apps, bottom left on the web. */
  position?: "bottom-center" | "bottom-left";
  /** Label of the viewport landmark; F8 moves focus to it. */
  label?: string;
  className?: string;
};

/**
 * Mount once near the root. Errors announce assertively, everything else politely. Timers pause on hover and
 * focus, Esc dismisses, and a toast never takes focus.
 */
export function Toaster({
  position = "bottom-center",
  label = "Notifications",
  className,
}: ToasterProps): React.JSX.Element {
  const record = useToastState();
  return (
    <ToastPrimitive.Provider swipeDirection={position === "bottom-left" ? "left" : "down"} label={label}>
      {record && <ToastView key={record.id} record={record} />}
      <ToastPrimitive.Viewport data-position={position} className={cn("sm-toast-viewport", className)} />
    </ToastPrimitive.Provider>
  );
}

function ToastView({ record }: { record: ToastRecord }): React.JSX.Element {
  const duration = record.duration ?? defaultDuration(record.kind, Boolean(record.action));
  const tag = record.kind === "progress" ? (record.step ?? "...") : TAGS[record.kind];
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-kind={record.kind}
      className="sm-toast"
      type={record.kind === "error" ? "foreground" : "background"}
      duration={duration}
      onOpenChange={(open) => {
        if (!open) toast.dismiss(record.id);
      }}
    >
      <span className="sm-toast-tag">[&nbsp;{tag}&nbsp;]</span>
      <div className="sm-toast-body">
        <ToastPrimitive.Title className="sm-toast-title">{record.title}</ToastPrimitive.Title>
        {record.description && (
          <ToastPrimitive.Description className="sm-toast-description">{record.description}</ToastPrimitive.Description>
        )}
      </div>
      {record.action && (
        <ToastPrimitive.Action asChild altText={record.action.label}>
          <button type="button" className="sm-toast-action" onClick={record.action.onClick}>
            {record.action.label}
          </button>
        </ToastPrimitive.Action>
      )}
    </ToastPrimitive.Root>
  );
}
