import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta = {
  title: "Composants/Accordion",
  component: Accordion,
  args: {
    defaultId: "prereqs",
    items: [
      {
        id: "prereqs",
        title: "Prérequis du module",
        content: "Module C01 terminé, Rust installé, QEMU aarch64 fonctionnel.",
      },
      {
        id: "objectifs",
        title: "Ce que tu sauras faire",
        content: "Configurer l'UART PL011 et afficher tes premiers caractères depuis ton OS.",
      },
      {
        id: "duree",
        title: "Durée estimée",
        content: "Environ 2 heures, QCM inclus.",
      },
    ],
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
