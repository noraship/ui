import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";
import { Badge } from "../Badge/Badge";

const meta = {
  title: "Composants/Table",
  component: Table,
  args: {
    caption: "Historique des déploiements",
    columns: [
      { key: "version", label: "Version" },
      { key: "env", label: "Environnement" },
      { key: "statut", label: "Statut" },
      { key: "duree", label: "Durée", align: "right" },
    ],
    rows: [
      {
        version: "v1.4.0",
        env: "Production",
        statut: <Badge variant="success">En orbite</Badge>,
        duree: "2 min 14 s",
      },
      {
        version: "v1.3.9",
        env: "Staging",
        statut: <Badge variant="warning">Instable</Badge>,
        duree: "3 min 02 s",
      },
      {
        version: "v1.3.8",
        env: "Production",
        statut: <Badge variant="danger">Échec</Badge>,
        duree: "0 min 47 s",
      },
    ],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Historique: Story = {};
