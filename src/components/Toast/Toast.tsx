import { Toast as RadixToast } from "radix-ui";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

export type ToastVariant = "neutral" | "success" | "danger" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

type PushToast = (message: string, variant?: ToastVariant) => void;

const ToastContext = createContext<PushToast | null>(null);

export function useToast(): PushToast {
  const push = useContext(ToastContext);
  if (!push) throw new Error("useToast doit être utilisé sous <ToastProvider>");
  return push;
}

const stripes: Record<ToastVariant, string> = {
  neutral: "border-l-nora-line-strong",
  success: "border-l-nora-success-text",
  danger: "border-l-nora-danger-text",
  info: "border-l-nora-info-text",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback<PushToast>((message, variant = "neutral") => {
    setToasts((list) => [...list, { id: Date.now() + Math.random(), message, variant }]);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      <RadixToast.Provider duration={5000} swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <RadixToast.Root
            key={toast.id}
            onOpenChange={(open) => {
              if (!open) setToasts((list) => list.filter((t) => t.id !== toast.id));
            }}
            className={
              "rounded-nora-ctl border border-l-4 border-nora-line bg-nora-surface " +
              "px-4 py-3 text-sm text-nora-ink shadow-nora-2 " +
              stripes[toast.variant]
            }
          >
            <RadixToast.Description>{toast.message}</RadixToast.Description>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport
          className="fixed right-4 bottom-4 z-50 grid w-80 max-w-[calc(100vw-2rem)] gap-2"
        />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
