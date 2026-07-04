import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../Card/Card";
import { Checklist } from "./Checklist";

const meta = {
  title: "Composants/Checklist",
  component: Checklist,
  args: {
    title: "Dans ce module",
    items: [
      { label: "Le secteur de boot", state: "done" },
      { label: "La signature 0xAA55", state: "done" },
      { label: "Afficher un caractère", state: "current" },
      { label: "Le quiz", state: "todo" },
    ],
  },
} satisfies Meta<typeof Checklist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModuleEnCours: Story = { name: "Module en cours" };

export const DansUneCarte: Story = {
  name: "Dans une carte (aside leçon)",
  render: (args) => (
    <div style={{ maxWidth: 260 }}>
      <Card>
        <Checklist {...args} />
      </Card>
    </div>
  ),
};
