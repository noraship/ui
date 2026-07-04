import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading, Text, Link } from "./Typography";

const meta = {
  title: "Composants/Typographie",
  component: Heading,
  args: { children: "Ce qui traverse les tempêtes se patine" },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hierarchie: Story = {
  name: "Hiérarchie complète",
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <Heading level={1}>Ce qui traverse les tempêtes se patine</Heading>
      <Heading level={2}>Un titre de section porté par le serif</Heading>
      <Heading level={3}>Un sous-titre plus discret</Heading>
      <Heading level={4}>Un intertitre de carte</Heading>
      <Text>
        Le texte courant est en Public Sans, limité à 65 caractères de large pour rester
        confortable. La voix éditoriale vient du contraste entre le serif des titres et la
        neutralité du corps — jamais d'effets.
      </Text>
      <Text size="sm" muted>
        Le petit texte atténué sert aux légendes et aux métadonnées, comme ici.
      </Text>
      <Text>
        Les liens utilisent l'accent prune : <Link href="#">suivre la progression</Link>.
      </Text>
    </div>
  ),
};
