import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/* ---------- ChatBubble ---------- */

export interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
}

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const user = role === "user";
  return (
    <div className={`flex ${user ? "justify-end" : "justify-start"}`}>
      <div
        className={
          "max-w-[88%] rounded-[14px] px-3.5 py-[11px] text-sm leading-normal whitespace-pre-wrap " +
          (user
            ? "rounded-br-[3px] bg-nora-accent text-nora-on-accent"
            : "rounded-bl-[3px] bg-nora-surface-2 text-nora-ink")
        }
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- SuggestionChips ---------- */

export interface SuggestionChipsProps {
  suggestions: string[];
  onPick: (suggestion: string) => void;
  disabled?: boolean;
}

export function SuggestionChips({ suggestions, onPick, disabled }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onPick(s)}
          className={
            "cursor-pointer rounded-nora-full border border-nora-line bg-nora-surface-2 " +
            "px-[11px] py-1.5 font-nora-body text-xs text-nora-ink transition-colors duration-150 " +
            "hover:border-nora-accent-text hover:text-nora-accent-text " +
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
            "disabled:cursor-not-allowed disabled:opacity-50"
          }
        >
          {s}
        </button>
      ))}
    </div>
  );
}

/* ---------- ChatPanel ---------- */

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export interface ChatPanelProps {
  /** Nom de l'assistante (« Nora ») */
  name: string;
  /** Ligne de statut (« assistante · contexte : boot.s ») */
  status?: string;
  /** Avatar du header — étincelle accent par défaut */
  avatar?: ReactNode;
  messages: ChatMessage[];
  /** Indicateur « réflexion » (3 points animés) */
  thinking?: boolean;
  suggestions?: string[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: (text: string) => void;
  placeholder?: string;
}

const spark = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3l1.6 4.5L18 9l-4.4 1.5L12 15l-1.6-4.5L6 9l4.4-1.5L12 3Z"
      fill="var(--nora-accent-text)"
    />
    <circle cx="18.5" cy="16.5" r="1.4" fill="var(--nora-accent-text)" />
    <circle cx="6" cy="17" r="1" fill="var(--nora-accent-text)" />
  </svg>
);

/**
 * Panneau de discussion avec l'assistante (moodboard-002) : header avec
 * statut, fil de bulles auto-scrollé, chips de suggestions, zone de saisie.
 * Contrôlé : l'état (messages, input) vit chez le consommateur.
 */
export function ChatPanel({
  name,
  status,
  avatar = spark,
  messages,
  thinking = false,
  suggestions,
  input,
  onInputChange,
  onSend,
  placeholder = "Écris ton message…",
}: ChatPanelProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, thinking]);

  const canSend = input.trim().length > 0 && !thinking;

  function send() {
    if (canSend) onSend(input);
  }

  return (
    <div className="flex min-h-0 flex-col bg-nora-surface">
      {/* header */}
      <div className="flex flex-none items-center gap-2.5 border-b border-nora-line px-4 py-3.5">
        <span className="flex size-8 items-center justify-center rounded-nora-full bg-nora-accent-soft">
          {avatar}
        </span>
        <span className="flex flex-col">
          <span className="font-nora-display text-[15px] font-semibold text-nora-ink">{name}</span>
          {status && (
            <span className="flex items-center gap-1.5 text-[11px] text-nora-success-text">
              <span aria-hidden="true" className="size-1.5 rounded-nora-full bg-nora-success-text" />
              {status}
            </span>
          )}
        </span>
      </div>

      {/* feed */}
      <div
        ref={feedRef}
        role="log"
        aria-label={`Conversation avec ${name}`}
        className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-auto p-4"
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role}>
            {m.text}
          </ChatBubble>
        ))}
        {thinking && (
          <div className="flex items-center gap-1 self-start rounded-[12px] rounded-bl-[3px] bg-nora-surface-2 px-3.5 py-2.5">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                aria-hidden="true"
                className="size-1.5 animate-pulse rounded-nora-full bg-nora-muted"
                style={{ animationDelay: `${d * 0.2}s` }}
              />
            ))}
            <span className="sr-only">{name} réfléchit…</span>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="flex-none border-t border-nora-line p-3">
        {suggestions && suggestions.length > 0 && (
          <div className="mb-2.5">
            <SuggestionChips suggestions={suggestions} onPick={onSend} disabled={thinking} />
          </div>
        )}
        <div
          className={
            "flex items-end gap-2 rounded-[10px] border border-nora-line bg-nora-field " +
            "py-2 pr-2 pl-3 focus-within:border-nora-accent-text"
          }
        >
          <textarea
            rows={1}
            value={input}
            placeholder={placeholder}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            className={
              "max-h-[120px] flex-1 resize-none border-none bg-transparent font-nora-body " +
              "text-sm leading-normal text-nora-ink outline-none placeholder:text-nora-muted"
            }
          />
          <button
            type="button"
            disabled={!canSend}
            onClick={send}
            aria-label="Envoyer"
            className={
              "flex size-[34px] flex-none cursor-pointer items-center justify-center rounded-nora-ctl " +
              "border-none transition-colors duration-150 " +
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nora-accent " +
              (canSend
                ? "bg-nora-accent text-nora-on-accent hover:bg-nora-accent-hover"
                : "cursor-not-allowed bg-nora-line text-nora-muted")
            }
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 12h16M14 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
