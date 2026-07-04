import type { Meta, StoryObj } from "@storybook/react-vite";
import { Wordmark } from "./Wordmark";

const meta = {
  title: "Composants/Wordmark",
  component: Wordmark,
  args: { context: "Atelier OS" },
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Wordmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvecContexte: Story = { name: "Avec contexte" };

export const Seul: Story = { args: { context: undefined } };
