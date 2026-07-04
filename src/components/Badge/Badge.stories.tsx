import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Composants/Badge",
  component: Badge,
  args: { children: "Beta", variant: "accent" },
  argTypes: {
    variant: {
      control: "radio",
      options: ["accent", "success", "warning", "danger", "info", "neutral"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {};

export const ToutesLesVariantes: Story = {
  name: "Toutes les variantes",
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="accent">Beta</Badge>
      <Badge variant="success">En orbite</Badge>
      <Badge variant="warning">Instable</Badge>
      <Badge variant="danger">Échec</Badge>
      <Badge variant="info">Programmé</Badge>
      <Badge variant="neutral">Brouillon</Badge>
    </div>
  ),
};
