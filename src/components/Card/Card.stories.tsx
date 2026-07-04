import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";

const meta = {
  title: "Composants/Card",
  component: Card,
  args: {
    title: "Déploiement v1.4",
    children:
      "Publié il y a 12 minutes depuis la branche principale. Tous les contrôles sont au vert.",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const Complete: Story = {
  name: "Avec badge, footer et action",
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card
        title="Déploiement v1.4"
        actions={<Badge variant="success">En orbite</Badge>}
        footer="Dernière vérification il y a 2 minutes."
      >
        <p style={{ margin: 0 }}>
          Publié depuis la branche principale. Tous les contrôles sont au vert.
        </p>
        <div style={{ marginTop: 16 }}>
          <Button size="sm" variant="secondary">
            Voir les logs
          </Button>
        </div>
      </Card>
    </div>
  ),
};

export const Surelevee: Story = {
  name: "Surélevée (ombre)",
  args: { raised: true },
};
