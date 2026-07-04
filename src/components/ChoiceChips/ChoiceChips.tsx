export interface ChoiceChipOption {
  value: string;
  label: string;
  /** Point de couleur optionnel à gauche du label (hex ou var CSS) */
  dot?: string;
}

export interface ChoiceChipsProps {
  /** Libellé du groupe, pour les lecteurs d'écran */
  label: string;
  options: ChoiceChipOption[];
  value: string | null;
  onChange: (value: string) => void;
}

/**
 * Sélection d'une option dans une petite liste visuelle — le pattern
 * « presets cliquables » de l'atelier couleur du moodboard.
 */
export function ChoiceChips({ label, options, value, onChange }: ChoiceChipsProps) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={
              "inline-flex cursor-pointer items-center gap-2 rounded-nora-full border text-sm font-medium " +
              "transition-colors duration-150 " +
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
              (option.dot ? "py-1.5 pr-3.5 pl-1.5 " : "px-3.5 py-1.5 ") +
              (selected
                ? "border-nora-accent bg-nora-accent-soft text-nora-ink"
                : "border-nora-line bg-nora-surface text-nora-ink hover:border-nora-muted")
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
