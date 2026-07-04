import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../Avatar/Avatar";
import { StatChip } from "../StatChip/StatChip";
import { Wordmark } from "../Wordmark/Wordmark";
import { TopBar, TopBarNav, TopBarNavItem } from "./TopBar";

const flame = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2c1 3-1 4-1 6a3 3 0 0 0 6 0c0-1-.3-2-.8-2.7C17.8 8 19 10.3 19 13a7 7 0 1 1-14 0c0-3.6 2.5-6 4-8 .4 2 1.2 3 2 3.5C11.2 8 10.8 4.5 12 2Z"
      fill="var(--nora-warning-text)"
    />
  </svg>
);

const meta = {
  title: "Composants/TopBar",
  component: TopBar,
  parameters: { layout: "fullscreen" },
  args: { brand: <Wordmark context="Atelier OS" /> },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AtelierOS: Story = {
  name: "Atelier OS (moodboard-002)",
  args: {
    nav: (
      <TopBarNav>
        <TopBarNavItem>Parcours</TopBarNavItem>
        <TopBarNavItem>Leçon</TopBarNavItem>
        <TopBarNavItem active>Atelier</TopBarNavItem>
      </TopBarNav>
    ),
    actions: (
      <>
        <StatChip variant="outline" icon={flame} title="Série de jours">
          4
        </StatChip>
        <StatChip variant="accent">480 XP</StatChip>
        <Avatar name="Jean Pasqualini" size="sm" />
      </>
    ),
  },
};

export const Minimale: Story = {};
