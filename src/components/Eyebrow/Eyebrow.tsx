import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  /** md = 12px (sections), sm = 11px (groupes de liste) */
  size?: "sm" | "md";
  /** Filet horizontal après le libellé (ex. « Vérifie ta compréhension ») */
  rule?: boolean;
}

/** Sur-titre uppercase accent — le libellé de section des moodboards. */
export function Eyebrow({ children, size = "md", rule = false }: EyebrowProps) {
  const label = (
    <span
      className={
        "font-semibold tracking-[0.14em] text-nora-accent-text uppercase " +
        (size === "sm" ? "text-[11px]" : "text-xs")
      }
    >
      {children}
    </span>
  );
  if (!rule) return label;
  return (
    <span className="flex items-center gap-2.5">
      {label}
      <span aria-hidden="true" className="h-px flex-1 bg-nora-line" />
    </span>
  );
}
