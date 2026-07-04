import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChoiceChips } from "./ChoiceChips";

const meta = {
  title: "Composants/ChoiceChips",
  component: ChoiceChips,
  args: {
    label: "Environnement",
    options: [],
    value: null,
    onChange: () => {},
  },
} satisfies Meta<typeof ChoiceChips>;

export default meta;
type Story = StoryObj<typeof meta>;

function EnvironnementsDemo() {
  const [value, setValue] = useState<string | null>("prod");
  return (
    <ChoiceChips
      label="Environnement"
      value={value}
      onChange={setValue}
      options={[
        { value: "prod", label: "Production" },
        { value: "staging", label: "Staging" },
        { value: "dev", label: "Développement" },
      ]}
    />
  );
}

export const Simple: Story = {
  render: () => <EnvironnementsDemo />,
};

function CouleursDemo() {
  const [value, setValue] = useState<string | null>("#6e3b5c");
  return (
    <ChoiceChips
      label="Couleur d'accent"
      value={value}
      onChange={setValue}
      options={[
        { value: "#6e3b5c", label: "Prune", dot: "#6e3b5c" },
        { value: "#8a3242", label: "Lie-de-vin", dot: "#8a3242" },
        { value: "#302c4e", label: "Encre violette", dot: "#302c4e" },
        { value: "#3d7068", label: "Vert-de-gris", dot: "#3d7068" },
      ]}
    />
  );
}

export const AvecPastilles: Story = {
  name: "Avec pastilles de couleur",
  render: () => <CouleursDemo />,
};

function NiveauxDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <ChoiceChips
      label="Niveau en assembleur"
      variant="outline"
      value={value}
      onChange={setValue}
      options={[
        { value: "debutant", label: "Débutant" },
        { value: "intermediaire", label: "Intermédiaire" },
        { value: "avance", label: "Avancé" },
      ]}
    />
  );
}

export const NiveauxOutline: Story = {
  name: "Variante outline (évaluation)",
  render: () => <NiveauxDemo />,
};
