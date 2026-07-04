import type { Meta, StoryObj } from "@storybook/react-vite";
import { StepBadge } from "./StepBadge";

const meta = {
  title: "Composants/StepBadge",
  component: StepBadge,
  args: { children: "Étape 1 — on personnalise ton parcours" },
} satisfies Meta<typeof StepBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Etape: Story = { name: "Étape" };
