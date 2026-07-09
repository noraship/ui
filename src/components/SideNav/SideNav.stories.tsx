import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SideNav } from "./SideNav";

const meta = {
  title: "Composants/SideNav",
  component: SideNav,
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Reglages: Story = {
  render: () => {
    const [active, setActive] = useState("usage");
    return (
      <div style={{ width: 240 }}>
        <SideNav
          label="Sections admin"
          activeId={active}
          onSelect={setActive}
          items={[
            { id: "usage", label: "Consommation Claude", hint: "coût & crédit" },
            { id: "users", label: "Utilisateurs", hint: "comptes & accès" },
            { id: "content", label: "Contenu", hint: "modules & leçons" },
          ]}
        />
      </div>
    );
  },
};
