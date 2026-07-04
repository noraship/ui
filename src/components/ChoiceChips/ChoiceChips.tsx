export interface ChoiceChipOption {
  value: string;
  label: string;
  /** Point de couleur optionnel à gauche du label (hex ou var CSS) */
  dot?: string;
}

export type ChoiceChipsVariant = "soft" | "outline";

export interface ChoiceChipsProps {
  /** Libellé du groupe, pour les lecteurs d'écran */
  label: string;
  options: ChoiceChipOption[];
  value: string | null;
  onChange: (value: string) => void;
  /**
   * `soft` (défaut) : pilule arrondie, sélection en accent-soft.
   * `outline` : rectangle radius ctl bordure line-strong, sélection en
   * accent plein — les pilules de niveau de l'évaluation (moodboard-002).
   */
  variant?: ChoiceChipsVariant;
}

/**
 * Sélection d'une option dans une petite liste visuelle — le pattern
 * « presets cliquables » de l'atelier couleur du moodboard.
 */
export function ChoiceChips({
  label,
  options,
  value,
  onChange,
  variant = "soft",
}: ChoiceChipsProps) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        const shape =
          variant === "outline"
            ? "rounded-nora-ctl px-[15px] py-[9px] text-[13px] font-semibold whitespace-nowrap "
            : "rounded-nora-full text-sm font-medium " +
              (option.dot ? "py-1.5 pr-3.5 pl-1.5 " : "px-3.5 py-1.5 ");
        const colors =
          variant === "outline"
            ? selected
              ? "border-nora-accent bg-nora-accent text-nora-on-accent"
              : "border-nora-line-strong bg-transparent text-nora-ink hover:border-nora-muted"
            : selected
              ? "border-nora-accent bg-nora-accent-soft text-nora-ink"
              : "border-nora-line bg-nora-surface text-nora-ink hover:border-nora-muted";
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={
              "inline-flex cursor-pointer items-center gap-2 border " +
              "transition-colors duration-150 " +
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
              shape +
              colors
            }
          >
            {option.dot && (
              <span
                aria-hidden="true"
                className="size-5 rounded-nora-full border border-nora-line"
                style={{ background: option.dot }}
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
