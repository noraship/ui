import type { ButtonHTMLAttributes, ReactNode } from "react";

/* ---------- TopBar ---------- */

export interface TopBarProps {
  /** Marque, à gauche (Wordmark, lien maison…) */
  brand: ReactNode;
  /** Navigation centrale (TopBarNav) */
  nav?: ReactNode;
  /** Zone de droite (StatChip, avatar…) */
  actions?: ReactNode;
}

/** Barre d'application 60 px, sticky, fond translucide + blur (moodboard-002). */
export function TopBar({ brand, nav, actions }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-nora-line bg-nora-bg/90 px-6 backdrop-blur-[8px]">
      <div className="flex items-center gap-4">{brand}</div>
      {nav}
      <div className="flex items-center gap-3.5">{actions}</div>
    </header>
  );
}

/* ---------- TopBarNav ---------- */

export interface TopBarNavProps {
  label?: string;
  children: ReactNode;
}

export function TopBarNav({ label = "Navigation principale", children }: TopBarNavProps) {
  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {children}
    </nav>
  );
}

export interface TopBarNavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

/** Pilule de navigation ; bouton pour laisser le routage au consommateur (SPA). */
export function TopBarNavItem({ active = false, children, ...rest }: TopBarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={
        "rounded-nora-ctl border-none px-[15px] py-[7px] font-nora-body text-sm font-semibold " +
        "cursor-pointer transition-colors duration-200 " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
        (active
          ? "bg-nora-accent-soft text-nora-accent-text"
          : "bg-transparent text-nora-muted hover:text-nora-ink")
      }
      {...rest}
    >
      {children}
    </button>
  );
}
