import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Composants/ProgressRing",
  component: ProgressRing,
  args: { pct: 46, size: 88, thickness: 6, label: "Progression du niveau : 46 %" },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CarteNiveau: Story = {
  name: "Carte niveau (88px)",
  render: (args) => (
    <ProgressRing {...args} innerClassName="bg-nora-surface-2">
      <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span className="font-nora-display text-2xl font-bold">2</span>
        <span className="text-[9px] tracking-[0.1em] text-nora-muted uppercase">niveau</span>
      </span>
    </ProgressRing>
  ),
};

export const Petit: Story = {
  name: "Petit (34px, LevelAvatar)",
  args: { pct: 72, size: 34, thickness: 2 },
  render: (args) => (
    <ProgressRing {...args}>
      <span className="font-nora-display text-xs font-bold">JP</span>
    </ProgressRing>
  ),
};
