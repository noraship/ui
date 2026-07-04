import { DropdownMenu } from "radix-ui";

export interface DropdownItem {
  label: string;
  onSelect: () => void;
  danger?: boolean;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

/** Menu déroulant basé sur Radix DropdownMenu (clavier, positionnement, ARIA). */
export function Dropdown({ label, items }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={
          "inline-flex cursor-pointer items-center gap-2 rounded-nora-ctl border border-nora-line-strong " +
          "px-4 py-2 text-sm font-semibold text-nora-ink hover:border-nora-muted " +
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent"
        }
      >
        {label}
        <span aria-hidden="true" className="text-xs text-nora-muted">
          ▾
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className={
            "z-20 grid min-w-44 gap-0.5 rounded-nora-ctl border border-nora-line " +
            "bg-nora-surface p-1 shadow-nora-2"
          }
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              onSelect={item.onSelect}
              className={
                "cursor-pointer rounded-nora-sm px-3 py-2 text-sm font-medium outline-none " +
                (item.danger
                  ? "text-nora-danger-text data-highlighted:bg-nora-danger-soft"
                  : "text-nora-ink data-highlighted:bg-nora-accent-soft")
              }
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
