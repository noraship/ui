import type { ReactNode } from "react";

export interface ProgressRingProps {
  /** Progression, 0..100 */
  pct: number;
  /** Diamètre en px */
  size?: number;
  /** Épaisseur de l'anneau en px */
  thickness?: number;
  /** Contenu de la pastille centrale */
  children?: ReactNode;
  /** Classes de la pastille centrale (fond…) — défaut : surface */
  innerClassName?: string;
  /** Libellé accessible ; sans lui l'anneau est décoratif (aria-hidden) */
  label?: string;
}

/**
 * Anneau de progression conique (accent sur line) — l'anneau d'XP du
 * moodboard-002, utilisé par LevelAvatar (34px) et la carte niveau (88px).
 */
export function ProgressRing({
  pct,
  size = 34,
  thickness = 2,
  children,
  innerClassName = "bg-nora-surface",
  label,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="inline-flex shrink-0 rounded-nora-full"
      style={{
        width: size,
        height: size,
        padding: thickness,
        background: `conic-gradient(var(--nora-accent) ${clamped}%, var(--nora-line) 0)`,
      }}
    >
      <span
        className={`flex size-full items-center justify-center overflow-hidden rounded-nora-full ${innerClassName}`}
      >
        {children}
      </span>
    </span>
  );
}
