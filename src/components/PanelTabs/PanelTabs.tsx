import { Tabs as RadixTabs } from "radix-ui";
import type { ReactNode } from "react";

export interface PanelTabItem {
  id: string;
  /** Libellé court affiché sous l'icône dans la barre verticale. */
  label: string;
  /** Icône (svg 20×20 conseillé). */
  icon?: ReactNode;
  content: ReactNode;
}

export interface PanelTabsProps {
  tabs: PanelTabItem[];
  defaultId?: string;
  /** Onglet actif contrôlé (avec `onValueChange`). Laisser vide pour un
   *  fonctionnement non contrôlé piloté par `defaultId`. */
  value?: string;
  /** Notifié quand l'onglet actif change (contrôlé ou non). */
  onValueChange?: (id: string) => void;
  /** Libellé du groupe d'onglets pour les lecteurs d'écran. */
  label: string;
  /** Classes appliquées à la racine (placement/largeur par l'appelant). */
  className?: string;
}

/** Panneau à onglets **verticaux** : une barre d'icônes étroite sur le
 *  côté (façon barre d'activité d'IDE) et le contenu de l'onglet actif qui
 *  remplit le reste, en pleine hauteur. Pensé pour un panneau latéral
 *  (ex. atelier : Leçon + tuteur IA côte à côte de l'éditeur). Pour des
 *  onglets « document » horizontaux, voir `Tabs`. */
export function PanelTabs({
  tabs,
  defaultId,
  value,
  onValueChange,
  label,
  className,
}: PanelTabsProps) {
  return (
    <RadixTabs.Root
      orientation="vertical"
      {...(value != null
        ? { value }
        : { defaultValue: defaultId ?? tabs[0]?.id })}
      onValueChange={onValueChange}
      className={"flex h-full min-h-0 " + (className ?? "")}
    >
      <RadixTabs.List
        aria-label={label}
        className="flex shrink-0 flex-col gap-1 border-r border-nora-line bg-nora-surface-2 py-2"
      >
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.id}
            value={tab.id}
            className={
              "flex w-[54px] cursor-pointer flex-col items-center gap-1.5 border-l-2 border-transparent px-1.5 py-2.5 text-[10px] " +
              "text-nora-muted hover:text-nora-ink " +
              "data-[state=active]:border-nora-accent-text data-[state=active]:bg-nora-accent-soft data-[state=active]:text-nora-accent-text " +
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nora-accent"
            }
          >
            {tab.icon}
            <span>{tab.label}</span>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content
          key={tab.id}
          value={tab.id}
          className="flex min-h-0 min-w-0 flex-1 flex-col outline-none [&>*]:min-h-0 [&>*]:flex-1"
        >
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
