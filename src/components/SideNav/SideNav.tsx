import type { ReactNode } from "react";

export interface SideNavItem {
  id: string;
  /** Libellé texte affiché sur la ligne. */
  label: string;
  /** Icône optionnelle (svg 18×18 conseillé), à gauche du libellé. */
  icon?: ReactNode;
  /** Seconde ligne discrète sous le libellé (optionnelle). */
  hint?: string;
}

export interface SideNavProps {
  items: SideNavItem[];
  /** Id de l'élément actif (composant contrôlé). */
  activeId: string;
  onSelect: (id: string) => void;
  /** Libellé du groupe pour les lecteurs d'écran. */
  label: string;
  /** Classes appliquées à la racine (largeur/placement par l'appelant). */
  className?: string;
}

/** Barre de navigation **verticale** à libellés texte : une colonne d'onglets
 *  empilés (façon menu latéral de réglages) qui pointent chacun vers une page.
 *  Contrôlée : l'appelant relie `activeId`/`onSelect` à son routeur. Pour un
 *  rail d'icônes étroit, voir `PanelTabs` ; pour des onglets horizontaux,
 *  `Tabs`. */
export function SideNav({ items, activeId, onSelect, label, className }: SideNavProps) {
  return (
    <nav aria-label={label} className={"flex flex-col gap-1 " + (className ?? "")}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onSelect(item.id)}
            className={
              "flex w-full cursor-pointer items-center gap-2.5 rounded-nora-ctl border-l-2 px-3 py-2 text-left text-sm " +
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nora-accent " +
              (active
                ? "border-nora-accent-text bg-nora-accent-soft font-medium text-nora-accent-text "
                : "border-transparent text-nora-muted hover:bg-nora-surface hover:text-nora-ink ")
            }
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span className="min-w-0">
              <span className="block truncate">{item.label}</span>
              {item.hint && (
                <span className="block truncate text-xs text-nora-muted">{item.hint}</span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
