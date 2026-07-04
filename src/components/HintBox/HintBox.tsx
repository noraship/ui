import type { ReactNode } from "react";

export interface HintBoxProps {
  children: ReactNode;
}

/** Encart astuce discret à bordure pointillée (moodboard-002). */
export function HintBox({ children }: HintBoxProps) {
  return (
    <div className="rounded-nora-ctl border border-dashed border-nora-line-strong p-2.5 text-xs leading-normal text-nora-muted">
      {children}
    </div>
  );
}
