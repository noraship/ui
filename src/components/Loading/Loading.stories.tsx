import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner, Skeleton } from "./Loading";

const meta = {
  title: "Composants/Chargement",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinners: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Squelette: Story = {
  name: "Skeleton (carte en chargement)",
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton circle width={40} height={40} />
        <div style={{ flex: 1, display: "grid", gap: 8 }}>
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton height={14} />
      <Skeleton height={14} />
      <Skeleton width="80%" height={14} />
    </div>
  ),
};
