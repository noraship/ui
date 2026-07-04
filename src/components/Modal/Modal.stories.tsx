import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta = {
  title: "Composants/Modal",
  component: Modal,
  args: { open: false, onClose: () => {}, title: "", children: null },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Supprimer le projet
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Supprimer ce projet ?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Supprimer définitivement
            </Button>
          </>
        }
      >
        <p style={{ margin: 0 }}>
          Le projet « Apollo » et ses 14 déploiements seront supprimés. Cette action ne peut
          pas être annulée.
        </p>
      </Modal>
    </>
  );
}

export const Confirmation: Story = {
  render: () => <ModalDemo />,
};
