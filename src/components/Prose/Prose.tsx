import { useRef, useState } from "react";
import type { ComponentProps } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export interface ProseProps {
  /** Markdown brut (GFM : tableaux, listes de tâches, etc.) */
  markdown: string;
  /**
   * Rend aussi le HTML embarqué dans le markdown (<iframe>, <details>…).
   * À réserver au contenu de confiance (versionné avec l'app) : le HTML
   * passe alors sans échappement, comme un dangerouslySetInnerHTML.
   */
  allowHtml?: boolean;
}

/** Bloc de code avec bouton copier — utilisé par Prose pour chaque ``` du markdown. */
function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!ref.current) return;
    await navigator.clipboard.writeText(ref.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative my-4">
      <pre
        ref={ref}
        className={
          "overflow-x-auto rounded-nora-ctl border border-nora-line bg-nora-field p-4 " +
          "font-nora-mono text-[13px] leading-relaxed text-nora-ink " +
          "[&_code]:bg-transparent [&_code]:p-0"
        }
        {...props}
      />
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
    </div>
  );
}

/**
 * Rend du markdown avec les tokens NoraShip. Parser intégré (react-markdown) :
 * chaque nœud est un vrai composant React — stylable directement, sans
 * dangerouslySetInnerHTML ni risque XSS.
 */
export function Prose({ markdown, allowHtml = false }: ProseProps) {
  return (
    <div className="max-w-[70ch] text-[15px] leading-relaxed text-nora-ink">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={allowHtml ? [rehypeRaw] : []}
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
          blockquote: (props) => (
            <blockquote
              className="my-4 border-l-4 border-nora-accent pl-4 text-nora-muted italic"
              {...props}
            />
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
          iframe: (props) => (
            <iframe
              className="my-4 w-full rounded-nora-ctl border border-nora-line"
              {...props}
            />
          ),
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
