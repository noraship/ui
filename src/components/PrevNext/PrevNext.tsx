import type { ElementType } from "react";

export interface PrevNextLink {
  label: string;
  href: string;
}

export interface PrevNextProps {
  prev?: PrevNextLink;
  next?: PrevNextLink;
  /**
   * Verrouille la carte « suivant » : elle reste visible mais désactivée
   * (progression conditionnée, ex. valider le quiz avant de continuer).
   */
  nextLocked?: boolean;
  /** Infobulle affichée sur la carte « suivant » verrouillée. */
  lockedHint?: string;
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

/** Carte « suivant » verrouillée : même gabarit, non cliquable. */
function LockedNextCard({ link, hint }: { link: PrevNextLink; hint?: string }) {
  return (
    <div
      title={hint}
      aria-disabled="true"
      className={
        "grid gap-1 rounded-nora-card border border-nora-line bg-nora-surface px-4 py-3 " +
        "text-right opacity-55 cursor-not-allowed select-none"
      }
    >
      <span className="inline-flex items-center justify-end gap-1 text-xs text-nora-muted">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Suivant →
      </span>
      <span className="text-sm font-semibold text-nora-ink">{link.label}</span>
    </div>
  );
}

/** Navigation précédent/suivant en pied de page (leçons, articles…). */
export function PrevNext({ prev, next, nextLocked, lockedHint, linkComponent }: PrevNextProps) {
  return (
    <nav aria-label="Navigation entre pages" className="grid grid-cols-2 gap-3">
      {prev ? (
        <PrevNextCard link={prev} direction="prev" linkComponent={linkComponent} />
      ) : (
        <span />
      )}
      {next ? (
        nextLocked ? (
          <LockedNextCard link={next} hint={lockedHint} />
        ) : (
          <PrevNextCard link={next} direction="next" linkComponent={linkComponent} />
        )
      ) : (
        <span />
      )}
    </nav>
  );
}
