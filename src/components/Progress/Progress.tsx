export interface ProgressBarProps {
  /** Valeur courante (entre 0 et max) */
  value: number;
  max?: number;
  label: string;
  /** Affiche le pourcentage à droite du label */
  showValue?: boolean;
  size?: "sm" | "md";
  /** Cache la ligne de libellé (le label reste porté par l'aria) */
  hideLabel?: boolean;
  /** Remplissage en dégradé accent → accent-text (barre d'XP) */
  gradient?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = "md",
  hideLabel = false,
  gradient = false,
}: ProgressBarProps) {
  const percent = Math.round(Math.max(0, Math.min(1, value / max)) * 100);
  return (
    <div className="grid gap-1.5">
      {!hideLabel && (
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="font-medium text-nora-ink">{label}</span>
          {showValue && <span className="text-nora-muted tabular-nums">{percent} %</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={
          "w-full overflow-hidden rounded-nora-full bg-nora-line " +
          (size === "sm" ? "h-1.5" : "h-2.5")
        }
      >
        <div
          className={
            "h-full rounded-nora-full transition-[width] duration-300 " +
            (gradient
              ? "bg-gradient-to-r from-nora-accent to-nora-accent-text"
              : "bg-nora-accent")
          }
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
