import type { Meta, StoryObj } from "@storybook/react-vite";
import { Terminal } from "./Terminal";

const meta = {
  title: "Composants/Terminal",
  component: Terminal,
  args: {
    title: "QEMU — qemu-system-aarch64",
    badge: "prêt",
    lines: [
      { kind: "cmd", text: "$ make run" },
      { kind: "dim", text: "cargo build --release --target aarch64-unknown-none" },
      { kind: "dim", text: "qemu-system-aarch64 -M virt -nographic -kernel kernel.bin" },
      { text: "" },
      { kind: "info", text: "QEMU virt · cortex-a72 · 128 Mio" },
      { kind: "info", text: "Kernel chargé à 0x40080000..." },
      { kind: "out", text: "Hello depuis MON OS !" },
      { kind: "ok", text: "✓ Boot réussi — ton kernel tourne en EL1." },
    ],
    cursor: true,
  },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BootReussi: Story = {
  name: "Boot réussi",
  render: (args) => (
    <div style={{ height: 260, display: "flex", borderRadius: 12, overflow: "hidden" }}>
      <Terminal {...args} className="flex-1" />
    </div>
  ),
};

export const Erreur: Story = {
  args: {
    badge: "échec",
    cursor: false,
    lines: [
      { kind: "cmd", text: "$ make run" },
      { kind: "dim", text: "cargo build --release --target aarch64-unknown-none" },
      { kind: "err", text: "error[E0425]: cannot find function `uart_init` in this scope" },
      { kind: "warn", text: "le build a échoué — demande à Nora d'expliquer l'erreur." },
    ],
  },
  render: (args) => (
    <div style={{ height: 200, display: "flex", borderRadius: 12, overflow: "hidden" }}>
      <Terminal {...args} className="flex-1" />
    </div>
  ),
};
