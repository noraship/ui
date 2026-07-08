export type ChecklistState = "done" | "current" | "todo";

export interface ChecklistItem {
  label: string;
  state: ChecklistState;
}

export interface ChecklistProps {
  /** Eyebrow optionnel (ex. « Dans ce module ») */
  title?: string;
  items: ChecklistItem[];
}

const stateLabels: Record<ChecklistState, string> = {
  done: "terminé",
  current: "en cours",
  todo: "à venir",
};

function StateDot({ state }: { state: ChecklistState }) {
  if (state === "done") {
    return (
      <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-nora-full bg-nora-success-text">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12l5 5L19 7"
            stroke="var(--nora-bg)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span
      className={
        "mt-px h-[18px] w-[18px] shrink-0 rounded-nora-full border-2 " +
        (state === "current" ? "border-nora-accent-text" : "border-nora-line-strong")
      }
    />
  );
}

/** Étapes d'un module : fait / en cours / à venir (moodboard-002). */
export function Checklist({ title, items }: ChecklistProps) {
  return (
    <div>
      {title && (
        <p className="m-0 mb-3 text-[11px] font-semibold tracking-[0.12em] text-nora-muted uppercase">
          {title}
        </p>
      )}
      <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
        {items.map((item) => (
          <li
            key={item.label}
            className={
              "flex items-start gap-2.5 text-sm " +
              (item.state === "current"
                ? "font-semibold text-nora-accent-text"
                : item.state === "todo"
                  ? "text-nora-muted"
                  : "text-nora-ink")
            }
          >
            <StateDot state={item.state} />
            {item.label}
            <span className="sr-only"> — {stateLabels[item.state]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
