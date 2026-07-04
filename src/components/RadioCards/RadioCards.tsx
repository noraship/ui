export interface RadioCardOption {
  value: string;
  label: string;
  description?: string;
  /** Coloration de feedback (ex. correction de QCM) */
  tone?: "success" | "danger";
  /** Note affichée sous l'option (ex. explication de la réponse) */
  note?: string;
}

export interface RadioCardsProps {
  /** Libellé du groupe, pour les lecteurs d'écran */
  label: string;
  options: RadioCardOption[];
  value: string | null;
  onChange: (value: string) => void;
  /** Verrouille le groupe (ex. après correction) */
  disabled?: boolean;
}

const tones = {
  success: {
    card: "border-nora-success-text bg-nora-success-soft",
    note: "text-nora-success-text",
  },
  danger: {
    card: "border-nora-danger-text bg-nora-danger-soft",
    note: "text-nora-danger-text",
  },
};

/** Options riches empilées — pensé pour les QCM (sélection puis feedback par option). */
export function RadioCards({ label, options, value, onChange, disabled }: RadioCardsProps) {
  return (
    <div role="radiogroup" aria-label={label} className="grid gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        const tone = option.tone ? tones[option.tone] : null;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={
              "grid cursor-pointer gap-1 rounded-nora-ctl border px-4 py-3 text-left " +
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
              "disabled:cursor-not-allowed " +
              (tone
                ? tone.card
                : selected
                  ? "border-nora-accent bg-nora-accent-soft"
                  : "border-nora-line bg-nora-surface hover:border-nora-muted")
            }
          >
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={
                  "grid size-4 shrink-0 place-items-center rounded-nora-full border " +
                  (selected ? "border-nora-accent" : "border-nora-line-strong")
                }
              >
                {selected && <span className="size-2 rounded-nora-full bg-nora-accent" />}
              </span>
              <span className="text-sm font-semibold text-nora-ink">{option.label}</span>
            </span>
            {option.description && (
              <span className="pl-6.5 text-sm text-nora-muted">{option.description}</span>
            )}
            {option.note && (
              <span className={`pl-6.5 text-sm font-medium ${tone?.note ?? "text-nora-muted"}`}>
                {option.note}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
