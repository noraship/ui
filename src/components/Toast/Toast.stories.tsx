import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button/Button";

const meta = {
  title: "Composants/Toast",
  component: ToastProvider,
  args: { children: null },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const toast = useToast();
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="secondary" onClick={() => toast("Déploiement lancé.")}>
        Neutre
      </Button>
      <Button variant="secondary" onClick={() => toast("Déployé en production.", "success")}>
        Succès
      </Button>
      <Button variant="secondary" onClick={() => toast("Le build a échoué — voir les logs.", "danger")}>
        Erreur
      </Button>
      <Button variant="secondary" onClick={() => toast("Une mise à jour est disponible.", "info")}>
        Info
      </Button>
    </div>
  );
}

export const Notifications: Story = {
  render: () => <ToastDemo />,
};
