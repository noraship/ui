import type { ReactNode } from "react";

export interface StepBadgeProps {
  children: ReactNode;
}

/** Pilule d'étape avec point accent (« Étape 1 — on personnalise ton parcours »). */
export function StepBadge({ children }: StepBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-nora-full border border-nora-line px-3 py-[5px] text-xs text-nora-muted">
      <span aria-hidden="true" className="size-1.5 rounded-nora-full bg-nora-accent-text" />
      {children}
    </span>
  );
}
