import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Composants/Button",
  component: Button,
  args: {
    children: "Lancer la mission",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Voir la doc" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Annuler" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Supprimer le projet" },
};

export const Chargement: Story = {
  args: { loading: true, children: "Déploiement…" },
};

export const Desactive: Story = {
  name: "Désactivé",
  args: { disabled: true },
};

export const ToutesLesVariantes: Story = {
  name: "Toutes les variantes",
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary">Lancer la mission</Button>
      <Button variant="secondary">Voir la doc</Button>
      <Button variant="ghost">Annuler</Button>
      <Button variant="danger">Supprimer</Button>
      <Button loading>Déploiement…</Button>
    </div>
  ),
};
