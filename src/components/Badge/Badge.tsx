import type { ReactNode } from "react";

export type BadgeVariant =
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  accent: "bg-nora-accent-soft text-nora-accent-text",
  success: "bg-nora-success-soft text-nora-success-text",
  warning: "bg-nora-warning-soft text-nora-warning-text",
  danger: "bg-nora-danger-soft text-nora-danger-text",
  info: "bg-nora-info-soft text-nora-info-text",
  neutral: "bg-nora-surface text-nora-muted border border-nora-line",
};

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-nora-full px-2.5 py-1 text-xs font-semibold tracking-wide ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
