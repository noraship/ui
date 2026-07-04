import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar, NavbarLink, Sidebar } from "./Layout";
import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Heading, Text } from "../Typography/Typography";

const meta = {
  title: "Composants/Layout",
  component: Navbar,
  parameters: { layout: "fullscreen" },
  args: { brand: "NoraShip" },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarreDeNavigation: Story = {
  name: "Navbar",
  render: () => (
    <Navbar
      brand="NoraShip"
      actions={
        <>
          <Button size="sm" variant="secondary">
            Documentation
          </Button>
          <Avatar name="Jean Pasqualini" size="sm" />
        </>
      }
    >
      <NavbarLink href="#" active>
        Missions
      </NavbarLink>
      <NavbarLink href="#">Déploiements</NavbarLink>
      <NavbarLink href="#">Équipage</NavbarLink>
    </Navbar>
  ),
};

export const ApplicationComplete: Story = {
  name: "Application complète",
  render: () => (
    <div style={{ display: "grid", gridTemplateRows: "auto 1fr", minHeight: "100vh" }}>
      <Navbar
        brand="NoraShip"
        actions={
          <>
            <Button size="sm">Nouvelle mission</Button>
            <Avatar name="Jean Pasqualini" size="sm" />
          </>
        }
      >
        <NavbarLink href="#" active>
          Missions
        </NavbarLink>
        <NavbarLink href="#">Équipage</NavbarLink>
      </Navbar>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <Sidebar
          sections={[
            {
              title: "Missions",
              items: [
                { label: "Apollo", href: "#", active: true, badge: <Badge variant="success">Live</Badge> },
                { label: "Artemis", href: "#" },
                { label: "Voyager", href: "#", badge: <Badge variant="neutral">Brouillon</Badge> },
              ],
            },
            {
              title: "Réglages",
              items: [
                { label: "Équipage", href: "#" },
                { label: "Facturation", href: "#" },
              ],
            },
          ]}
        />
        <main style={{ flex: 1, padding: 32, display: "grid", gap: 20, alignContent: "start" }}>
          <Heading level={1}>Apollo</Heading>
          <Text muted>
            Trois environnements, quatorze déploiements ce mois-ci, aucun incident en cours.
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            <Card title="Production" actions={<Badge variant="success">En orbite</Badge>}>
              v1.4.0 — déployée il y a 12 minutes.
            </Card>
            <Card title="Staging" actions={<Badge variant="warning">Instable</Badge>}>
              v1.5.0-rc1 — 2 tests en échec.
            </Card>
            <Card title="Développement" actions={<Badge variant="neutral">Brouillon</Badge>}>
              Branche feature/choice-chips en cours.
            </Card>
          </div>
        </main>
      </div>
    </div>
  ),
};
