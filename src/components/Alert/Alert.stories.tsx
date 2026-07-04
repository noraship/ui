import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta = {
  title: "Composants/Alert",
  component: Alert,
  args: {
    variant: "info",
    children: "Une mise à jour du cours est disponible.",
  },
  argTypes: {
    variant: { control: "radio", options: ["info", "success", "warning", "danger"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const ToutesLesVariantes: Story = {
  name: "Toutes les variantes",
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <Alert variant="info" title="Prérequis">
        Ce module suppose le module C01 terminé.
      </Alert>
      <Alert variant="success" title="Module terminé">
        QCM validé à 100 % — la suite du parcours est débloquée.
      </Alert>
      <Alert variant="warning" title="Parcours complet requis">
        Cette leçon fait partie du parcours complet (9 € une fois) — débloquez-le depuis le
        tableau de bord.
      </Alert>
      <Alert variant="danger" title="Le build a échoué">
        L'étape des tests s'est arrêtée à <code>kmain.rs:42</code> — voir les logs.
      </Alert>
    </div>
  ),
};
