# NoraShip — Component Library & Design System

## Contexte

Component library documentée via Storybook, qui matérialise l'identité visuelle de
**NoraShip** — nom officiel depuis le 2026-07-04 (`noraship.com` acquis par Jean chez un
registrar ; `.fr` encore à prendre). Les tokens et classes gardent le préfixe court `nora`.

Le propriétaire du projet est Jean Pasqualini (jpasqualini75@gmail.com). Langue de travail : français
(docs, tasks, échanges) ; code et noms d'API en anglais.

## Décisions techniques (validées le 2026-07-04)

- **Framework** : React + TypeScript
- **Build** : Vite (library mode pour le packaging futur)
- **Styling** : design tokens en **CSS variables** (source de vérité de l'identité visuelle),
  **Tailwind CSS** branché sur ces variables pour la productivité. Les composants ne référencent
  jamais une couleur/taille brute : toujours un token.
- **Documentation** : Storybook (dernière version stable), avec pages MDX pour la partie brand
  (logo, couleurs, typo, ton) en plus des stories de composants.
- **Direction visuelle** : « **Hélios Prune** », figée le 2026-07-04 (détails dans `tasks/001`) —
  display serif éditorial, accent prune `#6E3B5C`, **sombre par défaut** (`#191F1D`), mode clair
  **adouci** (`#EAE8E2`, jamais de blanc pur), contrastes AA mais volontairement non maximaux.
- **Dark/light** : le sombre est le thème par défaut (`:root`), le clair adouci s'active via
  `data-theme="light"`. Aucun blanc pur ni noir pur nulle part.

## Conventions

- Préfixe des tokens CSS : `--nora-*` (ex. `--nora-color-accent`, `--nora-space-4`).
- Un composant = un dossier `src/components/<Name>/` contenant `<Name>.tsx`,
  `<Name>.stories.tsx`, et ses styles/tests éventuels.
- Chaque composant expose ses variantes via props typées (pas de className magique côté consommateur).
- Accessibilité non négociable : focus visible, contrastes AA minimum, rôles ARIA corrects.

## Organisation du travail

Le travail est découpé en tasks markdown dans `tasks/`, numérotées par ordre de dépendance.
Chaque task a un statut en frontmatter (`todo` / `in-progress` / `done` / `blocked`).

**Workflow** : au début d'une session, lire `tasks/` pour voir où on en est ; mettre à jour le
statut et la section « Journal » d'une task quand on avance ; ne pas commencer une task dont les
dépendances ne sont pas `done` sans raison.

## Commandes

- `npm run storybook` — lance Storybook en dev (port 6006)
- `npm run build-storybook` — build statique de Storybook
- `npm run build` — build du package (`dist/` : ESM + types + `nora.css`)
- `npm run typecheck` — TypeScript strict (`tsc -b`)
- `node scripts/derive-accent.mjs "#xxxxxx"` — calcule les tokens accent AA des deux thèmes
  pour un hex donné (à reporter dans `src/styles/nora.css` si on change d'accent)

Stack en place : Vite 7, React 19, TS strict, Tailwind v4 (mappé sur les tokens via
`@theme inline` dans `src/styles/nora.css`), Storybook 10.4 (addons a11y/docs/vitest),
**Radix UI** (package unifié `radix-ui`) pour les composants interactifs — choix de Jean.
Le toggle sombre/clair adouci est dans la toolbar Storybook (`.storybook/preview.tsx`).
Les fontes (@fontsource) sont importées par le preview Storybook / l'app consommatrice,
pas par `nora.css` (qui est distribué tel quel dans le package).
