import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioCards } from "./RadioCards";

const meta = {
  title: "Composants/RadioCards",
  component: RadioCards,
  args: { label: "Question", options: [], value: null, onChange: () => {} },
} satisfies Meta<typeof RadioCards>;

export default meta;
type Story = StoryObj<typeof meta>;

function QcmDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <p style={{ margin: 0, fontWeight: 600 }}>
        À quelle adresse QEMU charge-t-il ton binaire aarch64 ?
      </p>
      <RadioCards
        label="À quelle adresse QEMU charge-t-il ton binaire aarch64 ?"
        value={value}
        onChange={setValue}
        options={[
          { value: "a", label: "0x00000000", description: "L'adresse zéro" },
          { value: "b", label: "0x40080000", description: "Dans la RAM, après le firmware" },
          { value: "c", label: "0xFFFF0000", description: "La zone des vecteurs" },
        ]}
      />
    </div>
  );
}

export const Question: Story = {
  render: () => <QcmDemo />,
};

export const ApresCorrection: Story = {
  name: "Après correction (feedback)",
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <RadioCards
        label="Question corrigée"
        value="a"
        onChange={() => {}}
        disabled
        options={[
          {
            value: "a",
            label: "0x00000000",
            tone: "danger",
            note: "Non — l'adresse zéro n'est pas mappée sur la RAM en virt. Relis « Le boot », section 2.",
          },
          {
            value: "b",
            label: "0x40080000",
            tone: "success",
            note: "Exact : la RAM de la machine virt commence à 0x40000000.",
          },
          { value: "c", label: "0xFFFF0000" },
        ]}
      />
    </div>
  ),
};
