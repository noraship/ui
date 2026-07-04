import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";

const meta = {
  title: "Composants/Dropdown",
  component: Dropdown,
  args: {
    label: "Actions",
    items: [
      { label: "Relancer le déploiement", onSelect: () => {} },
      { label: "Voir les logs", onSelect: () => {} },
      { label: "Dupliquer", onSelect: () => {} },
      { label: "Supprimer", onSelect: () => {}, danger: true },
    ],
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
