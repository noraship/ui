import type { ReactNode } from "react";

/**
 * Mini-coloration syntaxique sur la palette --nora-code-* (moodboard-002).
 * Volontairement rudimentaire : mots-clés / nombres / chaînes /
 * directives / commentaires, ligne par ligne. Suffisant pour les extraits
 * pédagogiques (asm aarch64, Rust no_std, linker script, Makefile, C).
 */

export type CodeLang = "asm" | "rust" | "c" | "ld" | "make";

export function isCodeLang(lang: string): lang is CodeLang {
  return ["asm", "rust", "c", "ld", "make"].includes(lang);
}

const keywords: Record<CodeLang, Set<string>> = {
  asm: new Set([
    "mov", "mrs", "msr", "and", "orr", "eor", "add", "sub", "cmp",
    "cbz", "cbnz", "b", "bl", "br", "ret", "ldr", "str", "wfe", "wfi",
    "adr", "adrp", "lsl", "lsr",
  ]),
  rust: new Set([
    "pub", "fn", "let", "mut", "const", "static", "extern", "unsafe",
    "loop", "while", "for", "if", "else", "match", "return", "mod",
    "use", "struct", "enum", "impl", "trait", "as", "in",
  ]),
  c: new Set([
    "void", "int", "char", "const", "for", "while", "if", "else",
    "return", "unsigned", "signed", "struct", "volatile", "static",
    "sizeof",
  ]),
  ld: new Set(["ENTRY", "SECTIONS", "MEMORY", "KEEP", "ALIGN"]),
  make: new Set([]),
};

const commentStart: Record<CodeLang, string> = {
  asm: "//",
  rust: "//",
  c: "//",
  ld: "/*",
  make: "#",
};

function line(text: string, lang: CodeLang, key: number): ReactNode {
  const marker = commentStart[lang];
  const ci = text.indexOf(marker);
  const code = ci >= 0 ? text.slice(0, ci) : text;
  const comment = ci >= 0 ? text.slice(ci) : "";
  const parts = code
    .split(/(\s+|[(){}:,=]|"[^"]*"|#?!?\[[^\]]*\])/)
    .filter(Boolean);
  return (
    <span key={key}>
      {parts.map((p, i) => {
        let cls = "";
        if (/^"/.test(p)) cls = "text-nora-code-string";
        else if (/^#?!?\[/.test(p)) cls = "text-nora-code-directive";
        else if (/^(0[xb][0-9a-fA-F_]+|\d[\d_]*)$/.test(p)) cls = "text-nora-code-number";
        else if (keywords[lang].has(p) || /^\.\w[\w.]*$/.test(p)) cls = "text-nora-code-keyword";
        return cls ? (
          <span key={i} className={cls}>
            {p}
          </span>
        ) : (
          p
        );
      })}
      {comment && <span className="text-nora-code-comment italic">{comment}</span>}
      {"\n"}
    </span>
  );
}

export function highlightCode(code: string, lang: CodeLang): ReactNode {
  // sans le \n final que markdown ajoute aux fences
  const lines = code.replace(/\n$/, "").split("\n");
  return <>{lines.map((l, i) => line(l, lang, i))}</>;
}
