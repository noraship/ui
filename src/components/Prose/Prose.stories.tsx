import type { Meta, StoryObj } from "@storybook/react-vite";
import { Prose } from "./Prose";

const lecon = `# Le boot sur aarch64

Quand la machine démarre, le processeur saute à une adresse fixe et exécute
**les premières instructions** de ton OS. Pas de runtime, pas de libc :
juste toi et le CPU.

## Ce qu'il faut retenir

- Le firmware (QEMU ici) charge ton binaire à \`0x40080000\`
- Le CPU démarre en **EL2** (niveau hyperviseur), on redescend en EL1
- La pile n'existe pas encore : c'est *toi* qui la crées

> Règle d'or : le learner ne fait jamais quelque chose qu'il ne comprend pas.

## Le point d'entrée

\`\`\`rust
#[no_mangle]
pub extern "C" fn _start() -> ! {
    // La toute première fonction exécutée par ton OS.
    // On initialise la pile, puis on saute vers kmain().
    unsafe { init_stack() };
    kmain();
}
\`\`\`

| Registre | Rôle |
|---|---|
| \`x0\` | Adresse du device tree |
| \`sp\` | Pointeur de pile — à initialiser |

Prêt ? [Vérifie ta compréhension](#qcm) avant de passer à la pratique.`;

const meta = {
  title: "Composants/Prose",
  component: Prose,
  args: { markdown: lecon },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lecon: Story = {
  name: "Leçon complète (markdown)",
};

const leconAvecHtml = `## Entraîne-toi

Le convertisseur ci-dessous montre les trois écritures d'un même nombre —
c'est une page interactive embarquée via une balise \`<iframe>\` du markdown :

<iframe src="about:blank" height="200" title="Convertisseur binaire / hexa / décimal"></iframe>

Sans \`allowHtml\`, la balise serait affichée comme du texte brut.`;

export const HtmlEmbarque: Story = {
  name: "HTML embarqué (allowHtml)",
  args: { markdown: leconAvecHtml, allowHtml: true },
};
