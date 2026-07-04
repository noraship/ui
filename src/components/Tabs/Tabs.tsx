import { Tabs as RadixTabs } from "radix-ui";
import type { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultId?: string;
  /** Libellé du groupe d'onglets pour les lecteurs d'écran */
  label: string;
}

export function Tabs({ tabs, defaultId, label }: TabsProps) {
  return (
    <RadixTabs.Root defaultValue={defaultId ?? tabs[0]?.id}>
      <RadixTabs.List aria-label={label} className="flex gap-1 border-b border-nora-line">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.id}
            value={tab.id}
            className={
              "-mb-px cursor-pointer border-b-2 border-transparent px-4 py-2 text-sm font-medium " +
              "text-nora-muted hover:text-nora-ink " +
              "data-[state=active]:border-nora-accent data-[state=active]:text-nora-ink " +
              "focus-visible:outline-2 focus-visible:outline-nora-accent"
            }
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content key={tab.id} value={tab.id} className="pt-4 text-sm text-nora-ink">
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
