import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatChip } from "./StatChip";

const flame = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2c1 3-1 4-1 6a3 3 0 0 0 6 0c0-1-.3-2-.8-2.7C17.8 8 19 10.3 19 13a7 7 0 1 1-14 0c0-3.6 2.5-6 4-8 .4 2 1.2 3 2 3.5C11.2 8 10.8 4.5 12 2Z"
      fill="var(--nora-warning-text)"
    />
  </svg>
);

const meta = {
  title: "Composants/StatChip",
  component: StatChip,
  args: { children: "480 XP", variant: "accent" },
  argTypes: {
    variant: { control: "radio", options: ["outline", "accent"] },
  },
} satisfies Meta<typeof StatChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Xp: Story = { name: "XP" };

export const Gamification: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <StatChip variant="outline" icon={flame} title="Série de jours">
        4
      </StatChip>
      <StatChip variant="accent">480 XP</StatChip>
    </div>
  ),
};
