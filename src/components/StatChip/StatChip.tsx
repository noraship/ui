import type { ReactNode } from "react";

export type StatChipVariant = "outline" | "accent";

export interface StatChipProps {
  variant?: StatChipVariant;
  /** Icône optionnelle (svg 14px conseillé) */
  icon?: ReactNode;
  /** Info-bulle native (ex. « Série de jours ») */
  title?: string;
  children: ReactNode;
}

const variants: Record<StatChipVariant, string> = {
  outline: "border border-nora-line font-semibold text-nora-ink",
  accent: "bg-nora-accent-soft font-bold text-nora-accent-text",
};

/** Chip pilule de gamification : série de jours, XP… (moodboard-002). */
export function StatChip({ variant = "outline", icon, title, children }: StatChipProps) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1.5 rounded-nora-full px-3 py-[5px] text-[13px] ${variants[variant]}`}
    >
      {icon && (
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
