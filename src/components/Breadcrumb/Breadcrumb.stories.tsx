import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Composants/Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { label: "Parcours", href: "#" },
      { label: "C01 — Le boot", href: "#" },
      { label: "Le point d'entrée" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilDAriane: Story = {
  name: "Fil d'Ariane",
};
