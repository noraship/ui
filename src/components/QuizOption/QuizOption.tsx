import type { ReactNode } from "react";

export type QuizOptionState = "idle" | "selected" | "correct" | "wrong";

export interface QuizOptionProps {
  state?: QuizOptionState;
  disabled?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}

const rows: Record<QuizOptionState, string> = {
  idle: "border-nora-line bg-nora-surface hover:border-nora-muted",
  selected: "border-nora-accent bg-nora-accent-soft",
  correct: "border-nora-success-text bg-nora-success-soft",
  wrong: "border-nora-danger-text bg-nora-danger-soft",
};

const dots: Record<QuizOptionState, string> = {
  idle: "border-2 border-nora-line-strong",
  selected: "border-2 border-nora-accent text-nora-accent-text",
  correct: "bg-nora-success-text text-nora-bg",
  wrong: "bg-nora-danger-text text-nora-bg",
};

const marks: Record<QuizOptionState, string> = {
  idle: "",
  selected: "",
  correct: "✓",
  wrong: "✕",
};

/**
 * Rangée d'option de quiz (moodboard-002) : pastille + états
 * idle / selected / correct / wrong. À grouper dans un role="radiogroup".
 */
export function QuizOption({ state = "idle", disabled, onSelect, children }: QuizOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={state === "selected"}
      disabled={disabled}
      onClick={onSelect}
      className={
        "flex w-full cursor-pointer items-center gap-3 rounded-[10px] border-[1.5px] px-4 py-3.5 " +
        "text-left text-[15px] text-nora-ink transition-colors duration-150 " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
        "disabled:cursor-not-allowed " +
        rows[state]
      }
    >
      <span
        aria-hidden="true"
        className={
          "flex size-[22px] flex-none items-center justify-center rounded-nora-full text-[13px] font-bold " +
          dots[state]
        }
      >
        {marks[state]}
      </span>
      {children}
    </button>
  );
}
