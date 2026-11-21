import { AlertDialog as AlertDialogPrimitive, Dialog as DialogPrimitive } from "radix-ui";
import type * as React from "react";
import { Button } from "./button";
import { cn } from "./cn";

export const Dialog: typeof DialogPrimitive.Root = DialogPrimitive.Root;
export const DialogTrigger: typeof DialogPrimitive.Trigger = DialogPrimitive.Trigger;
export const DialogClose: typeof DialogPrimitive.Close = DialogPrimitive.Close;

export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  size?: "md" | "lg";
  /** On narrow screens, rise from the bottom as a sheet. */
  sheet?: boolean;
  /** Show an Esc close control in the corner. The Esc key works either way. */
  closeButton?: boolean;
};

export function DialogContent({
  className,
  children,
  size = "md",
  sheet = false,
  closeButton = true,
  ...props
}: DialogContentProps): React.JSX.Element {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="sm-overlay" />
      <DialogPrimitive.Content
        data-slot="dialog"
        data-size={size}
        data-sheet={sheet || undefined}
        className={cn("sm-dialog", className)}
        {...props}
      >
        {children}
        {closeButton && (
          <DialogPrimitive.Close asChild>
            <Button variant="ghost" size="sm" className="sm-dialog-close" aria-label="Close">
              Esc
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>): React.JSX.Element {
  return <DialogPrimitive.Title className={cn("sm-dialog-title", className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>): React.JSX.Element {
  return <DialogPrimitive.Description className={cn("sm-dialog-description", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element {
  return <div data-slot="dialog-footer" className={cn("sm-dialog-footer", className)} {...props} />;
}

export type ConfirmDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The element that opens it; focus returns here on close. */
  trigger?: React.ReactNode;
  /** The action as a question: "Delete this account?" */
  title: React.ReactNode;
  /** What happens, as a short list. */
  consequences?: ReadonlyArray<React.ReactNode>;
  description?: React.ReactNode;
  /** A verb: "Delete", "Uninstall". */
  actionLabel: string;
  cancelLabel?: string;
  /** Ember, for an action that destroys something. */
  destructive?: boolean;
  onConfirm: () => void;
};

/**
 * Only for what cannot be undone; anything reversible applies at once with Undo. Focus starts on Cancel
 * and returns to the trigger on close (Radix AlertDialog).
 */
export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  consequences,
  description,
  actionLabel,
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
}: ConfirmDialogProps): React.JSX.Element {
  const hasList = Boolean(consequences?.length);
  return (
    <AlertDialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="sm-overlay" />
        <AlertDialogPrimitive.Content data-slot="confirm-dialog" className="sm-dialog">
          <AlertDialogPrimitive.Title className="sm-dialog-title">{title}</AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description asChild>
            <div className="sm-dialog-description">
              {description && <p style={{ margin: hasList ? "0 0 0.5rem" : 0 }}>{description}</p>}
              {hasList && (
                <ul className="sm-list">
                  {consequences?.map((item, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list rendered once
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </AlertDialogPrimitive.Description>
          <div className="sm-dialog-footer">
            <AlertDialogPrimitive.Cancel asChild>
              <Button>{cancelLabel}</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button variant={destructive ? "destructive" : "primary"} onClick={onConfirm}>
                {actionLabel}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
