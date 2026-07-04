import { Tooltip as RadixTooltip } from "radix-ui";
import type { ReactElement } from "react";

export interface TooltipProps {
  label: string;
  /** L'élément déclencheur — doit accepter une ref (bouton, lien…) */
  children: ReactElement;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={6}
            className={
              "z-30 rounded-nora-sm bg-nora-ink px-2.5 py-1.5 text-xs font-medium " +
              "text-nora-bg shadow-nora-1"
            }
          >
            {label}
            <RadixTooltip.Arrow className="fill-nora-ink" width={10} height={5} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
