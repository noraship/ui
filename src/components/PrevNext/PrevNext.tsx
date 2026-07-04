export interface PrevNextLink {
  label: string;
  href: string;
}

export interface PrevNextProps {
  prev?: PrevNextLink;
  next?: PrevNextLink;
}

function PrevNextCard({
  link,
  direction,
}: {
  link: PrevNextLink;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <a
      href={link.href}
      className={
        "grid gap-1 rounded-nora-card border border-nora-line bg-nora-surface px-4 py-3 " +
        "hover:border-nora-muted focus-visible:outline-2 focus-visible:outline-nora-accent " +
        (isNext ? "text-right" : "text-left")
      }
    >
      <span className="text-xs text-nora-muted">
        {isNext ? "Suivant →" : "← Précédent"}
      </span>
      <span className="text-sm font-semibold text-nora-ink">{link.label}</span>
    </a>
  );
}

/** Navigation précédent/suivant en pied de page (leçons, articles…). */
export function PrevNext({ prev, next }: PrevNextProps) {
  return (
    <nav aria-label="Navigation entre pages" className="grid grid-cols-2 gap-3">
      {prev ? <PrevNextCard link={prev} direction="prev" /> : <span />}
      {next ? <PrevNextCard link={next} direction="next" /> : <span />}
    </nav>
  );
}
