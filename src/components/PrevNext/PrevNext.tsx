import type { ElementType } from "react";

export interface PrevNextLink {
  label: string;
  href: string;
}

export interface PrevNextProps {
  prev?: PrevNextLink;
  next?: PrevNextLink;
  /**
   * Composant de lien injectable (ex. adaptateur react-router) — reçoit
   * href/className/children. Par défaut : <a>, plein rechargement.
   */
  linkComponent?: ElementType<{ href: string; className?: string }>;
}

function PrevNextCard({
  link,
  direction,
  linkComponent: LinkComp = "a",
}: {
  link: PrevNextLink;
  direction: "prev" | "next";
  linkComponent?: PrevNextProps["linkComponent"];
}) {
  const isNext = direction === "next";
  return (
    <LinkComp
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
    </LinkComp>
  );
}

/** Navigation précédent/suivant en pied de page (leçons, articles…). */
export function PrevNext({ prev, next, linkComponent }: PrevNextProps) {
  return (
    <nav aria-label="Navigation entre pages" className="grid grid-cols-2 gap-3">
      {prev ? (
        <PrevNextCard link={prev} direction="prev" linkComponent={linkComponent} />
      ) : (
        <span />
      )}
      {next ? (
        <PrevNextCard link={next} direction="next" linkComponent={linkComponent} />
      ) : (
        <span />
      )}
    </nav>
  );
}
