import { Children, isValidElement, useRef, useState } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { highlightCode, isCodeLang } from "./highlight";

export interface ProseProps {
  /** Markdown brut (GFM : tableaux, listes de tâches, etc.) */
  markdown: string;
}

/* Fouille le nœud hast du <pre> pour récupérer la chaîne meta de la fence
   (```asm boot.s — l'essentiel  →  meta = « boot.s — l'essentiel »). */
interface HastCodeNode {
  children?: { data?: { meta?: string } }[];
}

function fenceMeta(node: unknown): string | undefined {
  return (node as HastCodeNode | undefined)?.children?.[0]?.data?.meta;
}

/* Concatène le texte brut d'un nœud hast (récursif) — sert à repérer l'emoji
   de tête d'un blockquote pour le promouvoir en callout. */
interface HastText {
  type?: string;
  tagName?: string;
  value?: string;
  children?: HastText[];
}
function nodeText(node: unknown): string {
  const n = node as HastText | undefined;
  if (!n) return "";
  if (n.type === "text") return n.value ?? "";
  return (n.children ?? []).map(nodeText).join("");
}

/* Un blockquote qui commence par un de ces signaux devient un ENCART structuré
   (« callout ») au lieu de l'aparté grisé/italique. Device pédagogique
   récurrent : « ⚡ Surprise », « 💡 Astuce », « ⚠️ Piège ». */
const calloutSignal = /^\s*(⚡|💡|⚠️|📌)/u;
const signalStrip = /^\s*[⚡💡⚠️📌]\s*/u;
const takeawaySignal = /^\s*(→|👉)/u;

/* Sortie compilateur mise en scène : en-tête « ● rustc » + `error:` en rouge.
   Rendu à partir du texte d'une fence de code à l'intérieur d'un callout. */
function CompilerOutput({ text }: { text: string }) {
  const lines = text.replace(/\n+$/, "").split("\n");
  return (
    <div className="my-4 overflow-hidden rounded-nora-card border border-nora-line bg-nora-field">
      <div className="flex items-center gap-2 border-b border-nora-line px-3.5 py-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--nora-danger-text, #e5484d)" }}
        />
        <span className="font-nora-mono text-xs text-nora-muted">rustc</span>
      </div>
      <pre className="overflow-x-auto p-4 font-nora-mono text-[13px] leading-relaxed text-nora-code-ink">
        {lines.map((ln, i) => {
          const m = /^(\s*)(error(?:\[[^\]]*\])?:)(.*)$/.exec(ln);
          return (
            <span key={i}>
              {m ? (
                <>
                  {m[1]}
                  <span style={{ color: "var(--nora-danger-text, #e5484d)" }}>{m[2]}</span>
                  {m[3]}
                </>
              ) : (
                ln
              )}
              {i < lines.length - 1 ? "\n" : ""}
            </span>
          );
        })}
      </pre>
    </div>
  );
}

/* Encart « Surprise » : bord dégradé accent, eyebrow « ● LABEL », titre en
   serif, corps, sortie compilateur, puis la reprise fléchée « → ». On lit la
   structure du blockquote (nœud hast) et on réutilise le rendu inline de
   react-markdown (`children`) pour le corps et la reprise. */
function SurpriseCallout({ node, children }: { node?: unknown; children?: ReactNode }) {
  const els = ((node as HastText | undefined)?.children ?? []).filter(
    (c) => c.type === "element",
  );
  const rendered = Children.toArray(children).filter(isValidElement);

  let label: string | null = null;
  // Only the ⚡ Surprise (the long one, with its compiler block) folds away by
  // default — 💡/⚠️/📌 are short notes and stay open. Keeps the lesson light
  // while the deep « pourquoi » is one click away.
  let collapsible = false;
  let title: ReactNode = null;
  const body: ReactNode[] = [];
  let takeaway: ReactNode = null;

  els.forEach((el, i) => {
    const txt = nodeText(el);
    if (label === null && calloutSignal.test(txt)) {
      label = txt.replace(signalStrip, "").trim() || "Surprise";
      collapsible = /^\s*⚡/u.test(txt);
      return;
    }
    if (title === null && /^h[1-6]$/.test(el.tagName ?? "")) {
      // Reuse the heading's inline content, not the <h4> itself, so its own
      // (small) heading classes can't win over the serif callout title.
      const h = rendered[i];
      title = isValidElement(h)
        ? (h as ReactElement<{ children?: ReactNode }>).props.children
        : h;
      return;
    }
    if (el.tagName === "pre") {
      body.push(<CompilerOutput key={i} text={nodeText(el)} />);
      return;
    }
    if (el.tagName === "p" && takeawaySignal.test(txt)) {
      takeaway = rendered[i];
      return;
    }
    body.push(rendered[i]);
  });

  const [open, setOpen] = useState(false);
  const showBody = !collapsible || open;
  // Collapsed, a ⚡ Surprise must read as a slim clickable strip — small padding,
  // small inline title next to the eyebrow — not a full card. Expanded, it grows
  // to the display-serif title + body.
  const compact = collapsible && !open;
  const titleBase = "font-nora-display leading-snug font-semibold text-balance text-nora-ink";

  const chevron = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={
        "mt-0.5 shrink-0 text-nora-accent-text transition-transform duration-200 " +
        (open ? "rotate-180" : "")
      }
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Compact (collapsed): a single clickable line — « ● SURPRISE  <titre court> ⌄ ».
  if (compact) {
    return (
      <aside className="relative my-4 overflow-hidden rounded-nora-card border border-nora-line bg-nora-surface py-2.5 pr-4 pl-6 text-[14px]">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{ background: "linear-gradient(to bottom, var(--nora-accent-text), var(--nora-accent))" }}
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          className="flex w-full cursor-pointer items-center gap-2.5 text-left"
        >
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-nora-accent-text" />
            {label && (
              <span className="text-[10px] font-semibold tracking-[0.15em] text-nora-accent-text uppercase">
                {label}
              </span>
            )}
          </span>
          <span className={titleBase + " min-w-0 flex-1 truncate text-[14px] font-medium text-nora-muted"}>
            {title}
          </span>
          {chevron}
        </button>
      </aside>
    );
  }

  return (
    <aside className="relative my-5 overflow-hidden rounded-nora-card border border-nora-line bg-nora-surface py-5 pr-6 pl-7 text-[14px]">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{
          background: "linear-gradient(to bottom, var(--nora-accent-text), var(--nora-accent))",
        }}
      />
      {label && (
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-nora-accent-text" />
          <span className="text-xs font-semibold tracking-[0.15em] text-nora-accent-text uppercase">
            {label}
          </span>
        </div>
      )}
      {title &&
        (collapsible ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mb-3 flex w-full cursor-pointer items-start justify-between gap-3 text-left"
          >
            <span className={titleBase + " text-xl"}>{title}</span>
            {chevron}
          </button>
        ) : (
          <p className={titleBase + " mb-3 text-xl"}>{title}</p>
        ))}
      {showBody && (
        <>
          <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">{body}</div>
          {takeaway && (
            <div className="mt-4 border-t border-nora-line pt-4 [&>p]:my-0">{takeaway}</div>
          )}
        </>
      )}
    </aside>
  );
}

/**
 * Bloc de code avec bouton copier — utilisé par Prose pour chaque ``` du
 * markdown. Si la fence porte un langage connu (asm, rust, c, ld, make),
 * le bloc gagne un header (meta de la fence + langage) et la coloration
 * sur la palette --nora-code-* (moodboard-002).
 */
function CodeBlock({ node, children, ...rest }: ComponentProps<"pre"> & { node?: unknown }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!ref.current) return;
    await navigator.clipboard.writeText(ref.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Langage + source bruts depuis l'unique enfant <code class="language-…">
  let lang: string | undefined;
  let source: string | undefined;
  if (isValidElement(children)) {
    const props = children.props as { className?: string; children?: ReactNode };
    lang = /language-(\w+)/.exec(props.className ?? "")?.[1];
    if (typeof props.children === "string") source = props.children;
  }
  const codeLang = lang !== undefined && isCodeLang(lang) ? lang : undefined;
  const highlighted = codeLang !== undefined && source !== undefined;
  const meta = fenceMeta(node);

  const hasHeader = Boolean(highlighted && (meta || lang));

  return (
    <div className="group relative my-4 overflow-hidden rounded-nora-card border border-nora-line bg-nora-field">
      {hasHeader && (
        <div className="flex items-center justify-between border-b border-nora-line-strong bg-nora-surface-2 px-3.5 py-1.5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-wide text-nora-muted uppercase">{lang}</span>
            {meta && <span className="font-nora-mono text-xs text-nora-muted">{meta}</span>}
          </div>
          <button
            type="button"
            onClick={copy}
            className={
              "cursor-pointer rounded-nora-sm px-1.5 py-0.5 text-xs font-semibold " +
              "text-nora-muted hover:text-nora-ink " +
              "focus-visible:outline-2 focus-visible:outline-nora-accent"
            }
          >
            {copied ? "Copié ✓" : "Copier"}
          </button>
        </div>
      )}
      <pre
        ref={ref}
        className={
          "overflow-x-auto p-4 " +
          "font-nora-mono text-[13px] leading-relaxed text-nora-code-ink " +
          "[&_code]:bg-transparent [&_code]:p-0"
        }
        {...rest}
      >
        {codeLang !== undefined && source !== undefined ? (
          <code>{highlightCode(source, codeLang)}</code>
        ) : (
          children
        )}
      </pre>
      {!hasHeader && (
        <button
          type="button"
          onClick={copy}
          className={
            "absolute top-2 right-2 cursor-pointer rounded-nora-sm border border-nora-line " +
            "bg-nora-surface px-2 py-1 text-xs font-semibold text-nora-muted opacity-0 " +
            "transition-opacity duration-150 group-hover:opacity-100 hover:text-nora-ink " +
            "focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-nora-accent"
          }
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>
      )}
    </div>
  );
}

/**
 * Rend du markdown avec les tokens NoraShip. Parser intégré (react-markdown) :
 * chaque nœud est un vrai composant React — stylable directement, sans
 * dangerouslySetInnerHTML ni risque XSS.
 */
export function Prose({ markdown }: ProseProps) {
  return (
    <div className="max-w-[70ch] text-[15px] leading-relaxed text-nora-ink">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1
              className="font-nora-display mt-8 mb-4 text-3xl font-semibold text-balance first:mt-0"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="font-nora-display mt-8 mb-3 text-2xl font-semibold text-balance first:mt-0"
              {...props}
            />
          ),
          h3: (props) => (
            <h3 className="font-nora-display mt-6 mb-2 text-xl font-semibold" {...props} />
          ),
          h4: (props) => <h4 className="mt-5 mb-2 text-base font-semibold" {...props} />,
          p: (props) => <p className="my-3" {...props} />,
          a: (props) => (
            <a
              className={
                "font-semibold text-nora-accent-text underline decoration-1 underline-offset-2 " +
                "hover:decoration-2 focus-visible:outline-2 focus-visible:outline-nora-accent"
              }
              {...props}
            />
          ),
          ul: (props) => <ul className="my-3 grid list-disc gap-1 pl-6" {...props} />,
          ol: (props) => <ol className="my-3 grid list-decimal gap-1 pl-6" {...props} />,
          blockquote: ({ node, children, ...props }) =>
            calloutSignal.test(nodeText(node)) ? (
              <SurpriseCallout node={node}>{children}</SurpriseCallout>
            ) : (
              <blockquote
                className="my-4 border-l-4 border-nora-accent pl-4 text-nora-muted italic"
                {...props}
              >
                {children}
              </blockquote>
            ),
          code: (props) => (
            <code
              className="rounded-nora-sm bg-nora-field px-1.5 py-0.5 font-nora-mono text-[0.9em]"
              {...props}
            />
          ),
          pre: CodeBlock,
          hr: () => <hr className="my-6 border-nora-line" />,
          img: (props) => <img className="my-4 max-w-full rounded-nora-ctl" {...props} />,
          table: (props) => (
            <div className="my-4 overflow-x-auto rounded-nora-ctl border border-nora-line">
              <table className="w-full text-sm" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="border-b border-nora-line bg-nora-surface px-3 py-2 text-left text-xs font-semibold tracking-wider text-nora-muted uppercase"
              {...props}
            />
          ),
          td: (props) => (
            <td className="border-b border-nora-line px-3 py-2 last:border-b-0" {...props} />
          ),
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
