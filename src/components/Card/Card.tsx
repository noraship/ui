import type { ReactNode } from "react";

export interface CardProps {
  /** En-tête optionnel (titre + actions à droite) */
  title?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  /** Élévation : plat (bordure seule) ou surélevé (ombre) */
  raised?: boolean;
  children: ReactNode;
}

export function Card({ title, actions, footer, raised = false, children }: CardProps) {
  return (
    <section
      className={
        "grid gap-4 rounded-nora-card border border-nora-line bg-nora-surface p-6" +
        (raised ? " shadow-nora-2" : "")
      }
    >
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3">
          {title && (
            <h3 className="font-nora-display text-lg font-semibold text-nora-ink">
              {title}
            </h3>
          )}
          {actions}
        </header>
      )}
      <div className="text-sm text-nora-ink">{children}</div>
      {footer && (
        <footer className="border-t border-nora-line pt-4 text-sm text-nora-muted">
          {footer}
        </footer>
      )}
    </section>
  );
}
