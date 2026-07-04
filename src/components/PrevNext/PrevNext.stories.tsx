import type { Meta, StoryObj } from "@storybook/react-vite";
import { PrevNext } from "./PrevNext";

const meta = {
  title: "Composants/PrevNext",
  component: PrevNext,
  args: {
    prev: { label: "Le point d'entrée", href: "#" },
    next: { label: "Initialiser la pile", href: "#" },
  },
} satisfies Meta<typeof PrevNext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const PremiereLecon: Story = {
  name: "Première leçon (pas de précédent)",
  args: { prev: undefined },
};
