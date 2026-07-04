import type { Meta, StoryObj } from "@storybook/react-vite";
import { HintBox } from "./HintBox";

const meta = {
  title: "Composants/HintBox",
  component: HintBox,
  args: {
    children: (
      <>
        Astuce : retire la ligne{" "}
        <span className="font-nora-mono text-nora-warning-text">dw 0xAA55</span> de{" "}
        <span className="font-nora-mono">boot.asm</span> puis relance — observe l'erreur, et
        demande à Nora.
      </>
    ),
  },
} satisfies Meta<typeof HintBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Astuce: Story = {
  render: (args) => (
    <div style={{ maxWidth: 240 }}>
      <HintBox {...args} />
    </div>
  ),
};
