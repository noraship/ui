import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const meta = {
  title: "Composants/Tabs",
  component: Tabs,
  args: {
    label: "Sections du déploiement",
    tabs: [
      {
        id: "apercu",
        label: "Aperçu",
        content: "Le déploiement v1.4 est en production depuis 12 minutes.",
      },
      {
        id: "logs",
        label: "Logs",
        content: "── build ✓ · tests ✓ · publication ✓",
      },
      {
        id: "reglages",
        label: "Réglages",
        content: "Environnement, variables et secrets du projet.",
      },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
