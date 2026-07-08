export type StepState = "done" | "current" | "todo";

export interface StepItem {
  label: string;
  state: StepState;
}

export interface StepTrailProps {
  /** Eyebrow optionnel (ex. « Dans ce module »). Ignoré en horizontal. */
  title?: string;
  items: StepItem[];
  /** Vertical : puces reliées + libellé complet. Horizontal : puces
   *  numérotées reliées, sans libellé (une légende externe donne le titre
   *  de l'étape courante — voir LessonPage). */
  orientation?: "vertical" | "horizontal";
}

// Doit correspondre au gap Tailwind utilisé entre les puces ci-dessous :
// c'est ce qui permet au rail de rejoindre exactement la puce suivante
// sans mesurer quoi que ce soit en JS.
const GAP_PX = 11;

function railClass(state: StepState): string {
  if (state === "done") return "bg-nora-success-text";
  if (state === "current") return "bg-nora-accent-text";
  return "bg-nora-line-strong";
}

function Dot({
  state,
  index,
  showNumber,
}: {
  state: StepState;
  index: number;
  showNumber: boolean;
}) {
  if (state === "done") {
    return (
      <span className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-nora-full bg-nora-success-text">
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
        "relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-nora-full border-2 bg-nora-bg text-[10px] font-semibold " +
        (state === "current"
          ? "border-nora-accent-text text-nora-accent-text"
          : "border-nora-line-strong text-nora-muted")
      }
    >
      {showNumber && index + 1}
    </span>
  );
}

function Vertical({ title, items }: { title?: string; items: StepItem[] }) {
  return (
    <div>
      {title && (
        <p className="m-0 mb-3 text-[11px] font-semibold tracking-[0.12em] text-nora-muted uppercase">
          {title}
        </p>
      )}
      <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
        {items.map((item, i) => (
          <li
            key={item.label}
            className="relative flex items-start gap-2.5 text-sm"
          >
            {/* Rail anchored to the <li> (not the 18px dot wrapper) so it
                spans the item's full height and reaches into the gap to
                the next dot, even when the label wraps to several lines.
                top: below this dot (19 = 1px mt-px + 18px dot); bottom:
                -GAP_PX = into the flex gap, up to the next dot. */}
            {i < items.length - 1 && (
              <span
                className={"absolute left-[8px] w-[2px] " + railClass(item.state)}
                style={{ top: 19, bottom: -GAP_PX }}
                aria-hidden="true"
              />
            )}
            <span className="mt-px shrink-0">
              <Dot state={item.state} index={i} showNumber={false} />
            </span>
            <span
              className={
                item.state === "current"
                  ? "font-semibold text-nora-accent-text"
                  : item.state === "todo"
                    ? "text-nora-muted"
                    : "text-nora-ink"
              }
            >
              {item.label}
            </span>
            <span className="sr-only">
              {" "}
              — {item.state === "done" ? "terminé" : item.state === "current" ? "en cours" : "à venir"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Horizontal({ items }: { items: StepItem[] }) {
  return (
    <ol className="m-0 flex list-none items-start gap-[11px] p-0">
      {items.map((item, i) => (
        <li key={item.label} className="relative flex-1">
          <Dot state={item.state} index={i} showNumber />
          {i < items.length - 1 && (
            <span
              className={"absolute top-[8px] h-[2px] " + railClass(item.state)}
              style={{ left: 18, right: -GAP_PX }}
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {item.label} —{" "}
            {item.state === "done" ? "terminé" : item.state === "current" ? "en cours" : "à venir"}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Étapes d'un module, reliées par un rail qui se remplit au fil de la
 * progression (moodboard-002). Deux mises en page : verticale (aside de
 * leçon, avec libellé) ou horizontale (bandeau compact en tête de leçon,
 * numéroté — la légende de l'étape courante est affichée à côté par
 * l'appelant). */
export function StepTrail({ title, items, orientation = "vertical" }: StepTrailProps) {
  return orientation === "horizontal" ? (
    <Horizontal items={items} />
  ) : (
    <Vertical title={title} items={items} />
  );
}
