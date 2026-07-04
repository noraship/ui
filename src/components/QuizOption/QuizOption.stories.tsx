import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuizOption } from "./QuizOption";

const meta = {
  title: "Composants/QuizOption",
  component: QuizOption,
  args: { children: "0x7C00" },
  argTypes: {
    state: { control: "radio", options: ["idle", "selected", "correct", "wrong"] },
  },
} satisfies Meta<typeof QuizOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TousLesEtats: Story = {
  name: "Tous les états",
  render: () => (
    <div
      role="radiogroup"
      aria-label="Exemple de question"
      style={{ display: "grid", gap: 8, maxWidth: 520 }}
    >
      <QuizOption state="idle">0x0000</QuizOption>
      <QuizOption state="selected">0x7C00</QuizOption>
      <QuizOption state="correct">0x7C00 — le BIOS copie le secteur de boot ici</QuizOption>
      <QuizOption state="wrong">0xFFFF</QuizOption>
    </div>
  ),
};
