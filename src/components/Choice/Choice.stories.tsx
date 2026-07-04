import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, Radio, Switch } from "./Choice";

const meta = {
  title: "Composants/Cases & interrupteurs",
  component: Checkbox,
  args: { label: "Me prévenir à chaque déploiement" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cases: Story = {
  name: "Checkbox",
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Checkbox label="Me prévenir à chaque déploiement" defaultChecked />
      <Checkbox
        label="Activer les rapports hebdomadaires"
        hint="Envoyés le lundi matin."
      />
      <Checkbox label="Option désactivée" disabled />
    </div>
  ),
};

export const Radios: Story = {
  name: "Radio",
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Radio name="env" label="Production" defaultChecked />
      <Radio name="env" label="Staging" />
      <Radio name="env" label="Développement" hint="Réinitialisé chaque nuit." />
    </div>
  ),
};

function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Switch
        label="Notifications"
        hint="Alertes en temps réel sur les déploiements."
        checked={notifications}
        onChange={setNotifications}
      />
      <Switch label="Mode maintenance" checked={maintenance} onChange={setMaintenance} />
      <Switch label="Option verrouillée" checked onChange={() => {}} disabled />
    </div>
  );
}

export const Interrupteurs: Story = {
  name: "Switch",
  render: () => <SwitchDemo />,
};
