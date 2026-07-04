import type { Meta, StoryObj } from "@storybook/react-vite";
import { VideoCard } from "./VideoCard";

const meta = {
  title: "Composants/VideoCard",
  component: VideoCard,
  args: {
    title: "Le premier boot, ligne par ligne",
    duration: "4:12",
    kicker: "Chapitre 3 · démo",
  },
} satisfies Meta<typeof VideoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <VideoCard {...args} />
    </div>
  ),
};
