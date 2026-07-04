import type { ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}

const styles: Record<AlertVariant, { stripe: string; bg: string; title: string }> = {
  info: {
    stripe: "border-l-nora-info-text",
    bg: "bg-nora-info-soft",
    title: "text-nora-info-text",
  },
  success: {
    stripe: "border-l-nora-success-text",
    bg: "bg-nora-success-soft",
    title: "text-nora-success-text",
  },
  warning: {
    stripe: "border-l-nora-warning-text",
    bg: "bg-nora-warning-soft",
    title: "text-nora-warning-text",
  },
  danger: {
    stripe: "border-l-nora-danger-text",
    bg: "bg-nora-danger-soft",
    title: "text-nora-danger-text",
  },
};

/** Message inline (erreur, note, paywall…) — pour l'éphémère, voir Toast. */
export function Alert({ variant = "info", title, children }: AlertProps) {
  const s = styles[variant];
  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      className={`grid gap-1 rounded-nora-ctl border-l-4 px-4 py-3 ${s.stripe} ${s.bg}`}
    >
      {title && <p className={`m-0 text-sm font-semibold ${s.title}`}>{title}</p>}
      <div className="text-sm text-nora-ink">{children}</div>
    </div>
  );
}
