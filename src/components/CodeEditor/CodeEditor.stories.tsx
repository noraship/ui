import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeEditor } from "./CodeEditor";

const meta = {
  title: "Composants/CodeEditor",
  component: CodeEditor,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ height: "60vh", background: "var(--nora-surface-2)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const sample = `fn double(n: u32) -> u32 {
    n * 2;
}

fn main() {
    let resultat = double(21);
    println!("le double vaut {resultat}");
}
`;

/** Editable Rust editor themed to the design tokens. */
export const Default: Story = {
  render: () => {
    const [code, setCode] = useState(sample);
    return <CodeEditor value={code} language="rust" onChange={setCode} />;
  },
};

/** Inline compiler diagnostics: gutter marker + underline + hover message. */
export const WithDiagnostics: Story = {
  render: () => {
    const [code, setCode] = useState(sample);
    return (
      <CodeEditor
        value={code}
        language="rust"
        onChange={setCode}
        diagnostics={[
          {
            line: 1,
            col: 22,
            endCol: 25,
            severity: "error",
            message: "mismatched types: expected `u32`, found `()`",
          },
          {
            line: 6,
            col: 30,
            severity: "error",
            message: "cannot find value `resultat` in this scope",
          },
        ]}
      />
    );
  },
};
