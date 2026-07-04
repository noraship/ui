---
status: done
depends_on: [004]
---

# 005 — Composants avancés

## Objectif

Deuxième vague : composants avec état/interaction plus riches. Envisager Radix UI (headless) comme
base d'accessibilité plutôt que tout réécrire — à décider au démarrage de la task.

## Composants

- [x] **Modal / Dialog**
- [x] **Dropdown / Menu**
- [x] **Toast / Notification**
- [x] **Tabs**
- [x] **Tooltip**
- [x] **Table** (simple : tri optionnel, pas de virtualisation)
- [x] **Skeleton / Spinner** (états de chargement)
- [x] **Navbar / Sidebar** (patterns de layout applicatif)

## Critères d'acceptation

- Mêmes exigences que la task 004 (tokens, a11y, stories, light/dark)
- [x] Focus trap et gestion clavier corrects sur Modal/Dropdown/Tooltip

## Journal

- 2026-07-04 : task créée.
- 2026-07-04 : j'avais opté pour du natif sans dépendance ; Jean a soulevé la question Radix et
  a tranché : **Radix UI** (package unifié `radix-ui`) pour les composants interactifs — a11y et
  positionnement éprouvés, style 100 % tokens. Les composants purement présentationnels
  (Table, Skeleton/Spinner, Navbar/Sidebar) restent faits main.

### Clôture (2026-07-04)

Livrés avec stories : Modal (Radix Dialog, contrôlée, footer d'actions), Dropdown (Radix
DropdownMenu, item danger), Toast (Radix Toast + ToastProvider/useToast, 4 variantes à liseré),
Tabs (Radix), Tooltip (Radix, fond encre inversé), Table (caption sr-only, alignement droite +
tabular-nums), Spinner/Skeleton, Navbar/NavbarLink/Sidebar + story « Application complète » qui
assemble tout (navbar + sidebar + cards). Vérifié : tsc OK, build-storybook OK.
