import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  StreamLanguage,
  syntaxHighlighting,
  HighlightStyle,
  bracketMatching,
  indentOnInput,
} from "@codemirror/language";
import { rust } from "@codemirror/legacy-modes/mode/rust";
import { c } from "@codemirror/legacy-modes/mode/clike";
import { lintGutter, setDiagnostics, type Diagnostic } from "@codemirror/lint";
import {
  autocompletion,
  completeAnyWord,
  completeFromList,
  completionKeymap,
} from "@codemirror/autocomplete";
import { tags as t } from "@lezer/highlight";

/**
 * A CodeMirror 6 editor themed entirely to the Noraship `--nora-*` design
 * tokens: syntax highlighting, line numbers, autocompletion, and inline
 * compiler diagnostics (gutter marker + underline + hover message). The host
 * app supplies the diagnostics (e.g. parsed from a compiler's output).
 */

export interface CmDiagnostic {
  /** 1-based line */
  line: number;
  /** 1-based column */
  col?: number;
  endCol?: number;
  message: string;
  severity?: "error" | "warning";
}

export interface CodeEditorProps {
  value: string;
  /** "rust" (default) or "c". */
  language?: string;
  diagnostics?: CmDiagnostic[];
  onChange?: (value: string) => void;
  /** Called on Cmd/Ctrl+S. */
  onSave?: () => void;
}

const noraTheme = EditorView.theme(
  {
    "&": {
      color: "var(--nora-code-ink)",
      backgroundColor: "transparent",
      height: "100%",
      fontSize: "13px",
    },
    ".cm-scroller": {
      fontFamily: "var(--nora-font-mono)",
      lineHeight: "1.55",
    },
    ".cm-content": { padding: "14px 0", caretColor: "var(--nora-code-ink)" },
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: "var(--nora-line-strong)",
      border: "none",
      paddingRight: "4px",
    },
    ".cm-activeLine": {
      backgroundColor: "color-mix(in srgb, var(--nora-accent) 7%, transparent)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent",
      color: "var(--nora-ink)",
    },
    ".cm-cursor": { borderLeftColor: "var(--nora-code-ink)" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: "color-mix(in srgb, var(--nora-accent) 26%, transparent)",
    },
    ".cm-lintRange-error": {
      textDecoration: "underline wavy var(--nora-danger-text, #e5484d)",
      textUnderlineOffset: "3px",
    },
  },
  { dark: true },
);

const noraHighlight = HighlightStyle.define([
  { tag: t.keyword, color: "var(--nora-code-keyword)" },
  { tag: [t.number, t.bool, t.atom], color: "var(--nora-code-number)" },
  {
    tag: [t.string, t.special(t.string), t.character],
    color: "var(--nora-code-string)",
  },
  { tag: t.comment, color: "var(--nora-muted)", fontStyle: "italic" },
  { tag: [t.typeName, t.className], color: "var(--nora-code-number)" },
  {
    tag: [t.function(t.variableName), t.macroName, t.meta],
    color: "var(--nora-code-directive)",
  },
  {
    tag: [t.operator, t.punctuation, t.separator],
    color: "var(--nora-code-ink)",
  },
]);

const langOf = (language: string) =>
  language === "c" ? StreamLanguage.define(c) : StreamLanguage.define(rust);

const rustKeywords =
  "fn let mut match if else for while loop impl struct enum trait pub use mod return where as ref move const static type unsafe async await dyn crate super self Self break continue".split(
    " ",
  );
const rustItems =
  "println! print! format! vec! Some None Ok Err Option Result String Vec Box HashMap u8 u16 u32 u64 usize i8 i16 i32 i64 isize f32 f64 bool char str to_string unwrap expect clone into iter map collect".split(
    " ",
  );
const rustCompletion = completeFromList([
  ...rustKeywords.map((label) => ({ label, type: "keyword" })),
  ...rustItems.map((label) => ({ label, type: "function" })),
]);

export function CodeEditor({
  value,
  language = "rust",
  diagnostics,
  onChange,
  onSave,
}: CodeEditorProps) {
  const host = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const onSaveRef = useRef(onSave);
  onChangeRef.current = onChange;
  onSaveRef.current = onSave;

  useEffect(() => {
    if (!host.current) return;
    const view = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          history(),
          bracketMatching(),
          indentOnInput(),
          langOf(language),
          syntaxHighlighting(noraHighlight),
          lintGutter(),
          autocompletion({ override: [rustCompletion, completeAnyWord] }),
          keymap.of([
            {
              key: "Mod-s",
              preventDefault: true,
              run: () => {
                onSaveRef.current?.();
                return true;
              },
            },
            ...completionKeymap,
            indentWithTab,
            ...defaultKeymap,
            ...historyKeymap,
          ]),
          noraTheme,
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onChangeRef.current?.(u.state.doc.toString());
          }),
        ],
      }),
    });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes (file switch, reset) without clobbering edits.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const cur = view.state.doc.toString();
    if (cur !== value) {
      view.dispatch({ changes: { from: 0, to: cur.length, insert: value } });
    }
  }, [value]);

  // Apply compiler diagnostics as inline underlines + gutter markers.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const doc = view.state.doc;
    const ds: Diagnostic[] = (diagnostics ?? []).flatMap((d) => {
      if (d.line < 1 || d.line > doc.lines) return [];
      const line = doc.line(d.line);
      const from =
        line.from + Math.min(line.length, Math.max(0, (d.col ?? 1) - 1));
      const to = d.endCol ? line.from + (d.endCol - 1) : line.to;
      return [
        {
          from,
          to: Math.max(from + 1, to),
          severity: d.severity ?? "error",
          message: d.message,
        },
      ];
    });
    view.dispatch(setDiagnostics(view.state, ds));
  }, [diagnostics]);

  return <div className="cm-host" ref={host} style={{ height: "100%" }} />;
}
