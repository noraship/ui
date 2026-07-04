import type { ReactNode } from "react";

export type TerminalLineKind =
  | "cmd" // commande tapée — ink, gras
  | "dim" // sortie de build discrète
  | "info" // firmware / infos machine (bleuté)
  | "out" // sortie de TON OS — vert clair, gras
  | "ok" // succès
  | "warn"
  | "err";

export interface TerminalLine {
  kind?: TerminalLineKind;
  text: string;
}

export interface TerminalProps {
  /** Titre mono du header (ex. « QEMU — qemu-system-aarch64 ») */
  title: string;
  /** Zone droite du header (badge d'état : « prêt », « ● actif »…) */
  badge?: ReactNode;
  lines: TerminalLine[];
  /** Curseur bloc clignotant après la dernière ligne */
  cursor?: boolean;
  /** Ligne vide de séparation entre kinds différents ? Non — géré par le consommateur via text: "" */
  className?: string;
}

const kinds: Record<TerminalLineKind, string> = {
  cmd: "text-nora-term-ink font-bold",
  dim: "text-nora-term-dim",
  info: "text-nora-term-info",
  out: "text-nora-term-out font-bold text-[15px]",
  ok: "text-nora-success-text",
  warn: "text-nora-warning-text",
  err: "text-nora-danger-text",
};

/**
 * Console série (moodboard-002/003) : header avec pastilles + titre mono +
 * badge, corps mono. Volontairement sombre dans les deux thèmes
 * (tokens --nora-term-*). Remplit son conteneur (flex column).
 */
export function Terminal({ title, badge, lines, cursor = false, className = "" }: TerminalProps) {
  return (
    <div className={`flex min-h-0 flex-col bg-nora-term-bg ${className}`}>
      <div className="flex h-8 flex-none items-center gap-2 border-b border-nora-term-line px-3.5">
        <span aria-hidden="true" className="size-2.5 rounded-nora-full bg-nora-danger" />
        <span aria-hidden="true" className="size-2.5 rounded-nora-full bg-nora-warning-text" />
        <span aria-hidden="true" className="size-2.5 rounded-nora-full bg-nora-success-text" />
        <span className="ml-2 font-nora-mono text-[11px] text-nora-term-muted">{title}</span>
        {badge && (
          <span className="ml-auto font-nora-mono text-[11px] text-nora-term-muted">{badge}</span>
        )}
      </div>
      <div
        role="log"
        aria-label={title}
        className="min-h-0 flex-1 overflow-auto px-4 py-3 font-nora-mono text-[12.5px] leading-[1.65] text-nora-term-ink"
      >
        {lines.map((line, i) =>
          line.text === "" ? (
            <div key={i} className="h-2.5" />
          ) : (
            <div key={i} className={kinds[line.kind ?? "dim"]}>
              {line.text}
            </div>
          ),
        )}
        {cursor && (
          <span
            aria-hidden="true"
            className="inline-block h-[15px] w-2 bg-nora-term-out align-middle"
            style={{ animation: "nora-blink 1s step-end infinite" }}
          />
        )}
      </div>
    </div>
  );
}
