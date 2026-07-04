import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChatPanel } from "./ChatPanel";
import type { ChatMessage } from "./ChatPanel";

const meta = {
  title: "Composants/ChatPanel",
  component: ChatPanel,
  parameters: { layout: "fullscreen" },
  args: {
    name: "Nora",
    status: "assistante · contexte : boot.s",
    messages: [],
    input: "",
    onInputChange: () => {},
    onSend: () => {},
  },
} satisfies Meta<typeof ChatPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Salut, moi c'est Nora. Je vois ton fichier boot.s ouvert — pose-moi une question sur le cours, ou colle-moi une erreur de QEMU et je t'explique.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  function send(text: string) {
    setMessages((ms) => [...ms, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((ms) => [
        ...ms,
        { role: "assistant", text: "Bonne question ! (réponse de démonstration Storybook)" },
      ]);
    }, 1200);
  }

  return (
    <div style={{ height: 480, width: 352, display: "flex", border: "1px solid var(--nora-line)" }}>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <ChatPanel
          name="Nora"
          status="assistante · contexte : boot.s"
          messages={messages}
          thinking={thinking}
          suggestions={["Pourquoi de l'assembleur ?", "C'est quoi no_std ?", "Explique wfe"]}
          input={input}
          onInputChange={setInput}
          onSend={send}
          placeholder="Demande de l'aide sur ton code ou le cours…"
        />
      </div>
    </div>
  );
}

export const Conversation: Story = {
  render: () => <Demo />,
};
