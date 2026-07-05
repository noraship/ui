import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eyebrow } from "./Eyebrow";

const meta = {
  title: "Composants/Eyebrow",
  component: Eyebrow,
  args: { children: "Parcours · Créer son OS" },
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Section: Story = {};

export const AvecFilet: Story = {
  name: "Avec filet (quiz)",
  args: { children: "Vérifie ta compréhension", rule: true },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Eyebrow {...args} />
    </div>
  ),
};

export const GroupeDeListe: Story = {
  name: "Groupe de liste (sm)",
  args: { children: "Fondations", size: "sm" },
};
