import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Textarea, Select } from "./Input";

const meta = {
  title: "Composants/Champs",
  component: Input,
  args: {
    label: "Adresse email",
    placeholder: "capitaine@nora.dev",
    hint: "On ne partage jamais votre adresse.",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const Erreur: Story = {
  args: {
    error: "Cette adresse n'est pas valide.",
    defaultValue: "capitaine@nora",
  },
};

export const ZoneDeTexte: Story = {
  name: "Textarea",
  render: () => (
    <Textarea
      label="Description de la mission"
      placeholder="Objectifs, contraintes, équipage…"
      hint="Markdown accepté."
    />
  ),
};

export const Selection: Story = {
  name: "Select",
  render: () => (
    <Select label="Environnement" hint="L'environnement cible du déploiement.">
      <option>Production</option>
      <option>Staging</option>
      <option>Développement</option>
    </Select>
  ),
};

export const Formulaire: Story = {
  name: "Formulaire complet",
  render: () => (
    <div style={{ display: "grid", gap: 20, maxWidth: 380 }}>
      <Input label="Nom de la mission" placeholder="Apollo" />
      <Input
        label="Adresse email"
        placeholder="capitaine@nora.dev"
        hint="On ne partage jamais votre adresse."
      />
      <Select label="Environnement">
        <option>Production</option>
        <option>Staging</option>
      </Select>
      <Textarea label="Notes" rows={3} />
    </div>
  ),
};
