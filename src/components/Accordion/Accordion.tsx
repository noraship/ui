import { Accordion as RadixAccordion } from "radix-ui";
import type { ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Item ouvert au chargement */
  defaultId?: string;
}

export function Accordion({ items, defaultId }: AccordionProps) {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      defaultValue={defaultId}
      className="overflow-hidden rounded-nora-card border border-nora-line bg-nora-surface"
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.id}
          value={item.id}
          className="border-b border-nora-line last:border-b-0"
        >
          <RadixAccordion.Header className="m-0">
            <RadixAccordion.Trigger
              className={
                "group flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 " +
                "text-left text-sm font-semibold text-nora-ink hover:bg-nora-field " +
                "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nora-accent"
              }
            >
              {item.title}
              <span
                aria-hidden="true"
                className="text-nora-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
              >
                ▾
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="px-4 pb-4 text-sm text-nora-ink">
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
