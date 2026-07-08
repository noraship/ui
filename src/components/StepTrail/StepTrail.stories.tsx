import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../Card/Card";
import { StepTrail } from "./StepTrail";

// Longs titres volontaires (module F01 réel) pour tester l'alignement du
// rail contre des libellés qui repassent à la ligne.
const items = [
  { label: "Compter avec deux chiffres", state: "done" as const },
  { label: "L'addition binaire (et ses limites)", state: "done" as const },
  { label: "L'octet et l'hexadécimal : la sténographie du binaire", state: "current" as const },
  { label: "Lire un dump mémoire", state: "todo" as const },
  { label: "ET, OU, XOR, décalages : bouger des bits", state: "todo" as const },
  { label: "Tester et modifier un bit", state: "todo" as const },
  { label: "Extraire un champ, lire un vrai driver", state: "todo" as const },
];

const meta = {
  title: "Composants/StepTrail",
  component: StepTrail,
  args: { title: "Dans ce module", items },
} satisfies Meta<typeof StepTrail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  name: "Verticale (aside leçon)",
  render: (args) => (
    <div style={{ maxWidth: 260 }}>
      <Card>
        <StepTrail {...args} />
      </Card>
    </div>
  ),
};

export const Horizontal: Story = {
  name: "Horizontale (bandeau en tête de leçon)",
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <StepTrail {...args} orientation="horizontal" />
    </div>
  ),
};
