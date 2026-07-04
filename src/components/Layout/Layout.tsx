import type { AnchorHTMLAttributes, ReactNode } from "react";

/* ---------- Navbar ---------- */

export interface NavbarProps {
  /** Marque — rendue dans la display serif */
  brand: ReactNode;
  /** Liens de navigation (NavbarLink) */
  children?: ReactNode;
  /** Zone de droite (boutons, avatar…) */
  actions?: ReactNode;
}

export function Navbar({ brand, children, actions }: NavbarProps) {
  return (
    <header className="flex items-center gap-8 border-b border-nora-line bg-nora-surface px-6 py-3">
      <span className="font-nora-display text-lg font-semibold text-nora-ink">{brand}</span>
      {children && <nav className="flex items-center gap-5">{children}</nav>}
      {actions && <div className="ml-auto flex items-center gap-3">{actions}</div>}
    </header>
  );
}

export interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  children: ReactNode;
}

export function NavbarLink({ active = false, children, ...rest }: NavbarLinkProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={
        "rounded-nora-sm text-sm font-medium " +
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nora-accent " +
        (active ? "text-nora-ink" : "text-nora-muted hover:text-nora-ink")
      }
      {...rest}
    >
      {children}
    </a>
  );
}

/* ---------- Sidebar ---------- */

export interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
  badge?: ReactNode;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export function Sidebar({ sections, label = "Navigation" }: { sections: SidebarSection[]; label?: string }) {
  return (
    <nav
      aria-label={label}
      className="grid w-60 shrink-0 content-start gap-6 border-r border-nora-line bg-nora-surface p-4"
    >
      {sections.map((section, index) => (
        <div key={section.title ?? index} className="grid gap-1">
          {section.title && (
            <p className="px-3 pb-1 text-xs font-semibold tracking-wider text-nora-muted uppercase">
              {section.title}
            </p>
          )}
          {section.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={
                "flex items-center justify-between gap-2 rounded-nora-ctl px-3 py-2 text-sm font-medium " +
                "focus-visible:outline-2 focus-visible:outline-nora-accent " +
                (item.active
                  ? "bg-nora-accent-soft text-nora-ink"
                  : "text-nora-muted hover:bg-nora-field hover:text-nora-ink")
              }
            >
              {item.label}
              {item.badge}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}
