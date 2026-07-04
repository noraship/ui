import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta = {
  title: "Composants/Tooltip",
  component: Tooltip,
  args: { label: "", children: <span /> },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SurUnBouton: Story = {
  name: "Sur un bouton",
  render: () => (
    <div style={{ padding: 48 }}>
      <Tooltip label="Publie la version courante en production">
        <Button>Lancer la mission</Button>
      </Tooltip>
    </div>
  ),
};
