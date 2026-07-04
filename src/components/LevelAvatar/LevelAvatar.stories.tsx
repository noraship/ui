import type { Meta, StoryObj } from "@storybook/react-vite";
import { LevelAvatar } from "./LevelAvatar";

const meta = {
  title: "Composants/LevelAvatar",
  component: LevelAvatar,
  args: {
    name: "Jean Pasqualini",
    levelNum: 2,
    levelLabel: "Apprenti",
    pct: 46,
    title: "jean@exemple.dev",
  },
} satisfies Meta<typeof LevelAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Apprenti: Story = {};

export const DebutDeNiveau: Story = {
  name: "Début de niveau",
  args: { levelNum: 1, levelLabel: "Curieux", pct: 6 },
};
