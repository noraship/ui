import type { ElementType } from "react";

export interface BreadcrumbItem {
  label: string;
  /** Sans href, l'item est la page courante */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /**
   * Composant de lien injectable (ex. adaptateur react-router) — reçoit
   * href/className/children. Par défaut : <a>, plein rechargement.
   */
  linkComponent?: ElementType<{ href: string; className?: string }>;
}

export function Breadcrumb({ items, linkComponent: LinkComp = "a" }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <LinkComp
                  href={item.href}
                  className={
                    "rounded-nora-sm text-nora-muted hover:text-nora-ink hover:underline " +
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent"
                  }
                >
                  {item.label}
                </LinkComp>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-nora-ink">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-nora-muted">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
