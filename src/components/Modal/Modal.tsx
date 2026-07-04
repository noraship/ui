import { Dialog } from "radix-ui";
import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Actions en pied de modale (boutons) */
  footer?: ReactNode;
}

/** Modale contrôlée, basée sur Radix Dialog (focus trap, Échap, portail, ARIA). */
export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55" />
        <Dialog.Content
          className={
            "fixed top-1/2 left-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 " +
            "-translate-y-1/2 gap-4 rounded-nora-card border border-nora-line bg-nora-surface " +
            "p-6 text-nora-ink shadow-nora-2"
          }
        >
          <header className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-nora-display text-xl font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Fermer"
              className={
                "cursor-pointer rounded-nora-sm px-2 text-nora-muted hover:text-nora-ink " +
                "focus-visible:outline-2 focus-visible:outline-nora-accent"
              }
            >
              ✕
            </Dialog.Close>
          </header>
          <div className="text-sm">{children}</div>
          {footer && (
            <footer className="flex justify-end gap-3 border-t border-nora-line pt-4">
              {footer}
            </footer>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
