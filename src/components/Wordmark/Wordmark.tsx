export interface WordmarkProps {
  /** Libellé de contexte après un séparateur vertical (ex. « Atelier OS ») */
  context?: string;
  size?: "sm" | "md";
}

const sizes: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-lg",
  md: "text-[22px]",
};

/** Marque « Noraship » bicolore en display serif (moodboard-002). */
export function Wordmark({ context, size = "md" }: WordmarkProps) {
  return (
    <span className="flex items-center gap-4">
      <span className={`flex items-baseline font-nora-display tracking-tight ${sizes[size]}`}>
        <span className="font-bold text-nora-ink">Nora</span>
        <span className="font-normal text-nora-muted">ship</span>
      </span>
      {context && (
        <>
          <span aria-hidden="true" className="h-[22px] w-px bg-nora-line-strong" />
          <span className="text-[11px] font-semibold tracking-[0.16em] text-nora-muted uppercase">
            {context}
          </span>
        </>
      )}
    </span>
  );
}
