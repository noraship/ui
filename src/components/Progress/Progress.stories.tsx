import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./Progress";

const meta = {
  title: "Composants/ProgressBar",
  component: ProgressBar,
  args: { value: 60, label: "Module C01 — Le boot" },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const TableauDeBord: Story = {
  name: "Progression d'un parcours",
  render: () => (
    <div style={{ display: "grid", gap: 20, maxWidth: 420 }}>
      <ProgressBar value={100} label="C01 — Le boot" />
      <ProgressBar value={60} label="C02 — L'UART" />
      <ProgressBar value={0} label="C03 — Les interruptions" />
      <ProgressBar value={53} max={90} label="Parcours complet" size="sm" />
    </div>
  ),
};
