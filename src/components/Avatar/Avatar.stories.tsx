import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta = {
  title: "Composants/Avatar",
  component: Avatar,
  args: { name: "Jean Pasqualini", size: "md" },
  argTypes: { size: { control: "radio", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initiales: Story = {};

export const ToutesLesTailles: Story = {
  name: "Toutes les tailles",
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Jean Pasqualini" size="sm" />
      <Avatar name="Jean Pasqualini" size="md" />
      <Avatar name="Jean Pasqualini" size="lg" />
    </div>
  ),
};
