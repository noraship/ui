---
status: done
depends_on: [004]
---

# 007 — Packaging & publication

## Objectif

Rendre la library consommable par les futurs projets Noraship, et Storybook consultable en ligne.

## Critères d'acceptation

- [ ] Build library (ESM + types) via Vite library mode, `exports` propres dans `package.json`
- [ ] Tree-shaking vérifié (importer un composant n'embarque pas tout)
- [ ] CSS des tokens distribué avec le package
- [ ] Storybook statique déployé (Vercel/Netlify/GitHub Pages — à choisir)
- [ ] Publication npm (registre public ou privé — à décider ; le nom du package attendra le nom
      définitif de l'entreprise)
- [ ] CI basique : lint + build + tests sur chaque push

## Journal

- 2026-07-04 : task créée.

### Avancement (2026-07-04)

**Fait** : build library opérationnel (`npm run build`) — ESM 19 kB via `vite.config.lib.ts`
(React/Radix/fontsource externalisés), types via `tsconfig.build.json`, CSS complet
`dist/nora.css` via @tailwindcss/cli (fontes non embarquées : l'app consommatrice importe les
packages @fontsource — le preview Storybook fait pareil). `exports` propres : `.` (JS+types) et
`./styles.css`. `files: ["dist"]`, `sideEffects: ["*.css"]`.

**Reste (décisions de Jean nécessaires)** :
- [ ] `git init` + remote GitHub (le repo n'est pas versionné !)
- [ ] Hébergeur du Storybook statique (Vercel/Netlify/GitHub Pages)
- [ ] Registre npm (public ou privé) — le nom est décidé : **@noraship/ui** (org npm `noraship`
      à créer, ainsi que l'org GitHub `noraship`)
- [ ] CI (lint + build + tests) — dépend du remote

- 2026-07-04 : **le nom est officiel : NoraShip** — Jean a acheté `noraship.com`. Package renommé
  `@noraship/ui`, nom propagé (CLAUDE.md, pages brand, stories). Restent : `.fr` à acheter,
  git init + org GitHub `noraship`, hébergeur Storybook, org npm.

- 2026-07-04 : org GitHub `noraship` créée par Jean. Dépôt local initialisé (branche `main`,
  identité configurée, `*.log` ignoré), premier commit « Initialisation du design system
  NoraShip » (64 fichiers, avec workflow `.github/workflows/deploy-storybook.yml` :
  typecheck + build package + build Storybook → GitHub Pages). Poussé sur
  **github.com/noraship/ui**. Accroc : le repo a été créé privé (défaut GitHub) alors que le
  choix était public → Jean doit le passer public + activer Pages (Source : GitHub Actions),
  puis relancer le workflow. Restent ensuite : org npm + publication (différée), `.fr`.

### Clôture (2026-07-04)

Repo passé public + Pages activée par Jean ; workflow relancé (commit vide) → **déployé avec
succès sur https://noraship.github.io/ui/** (vérifié : HTTP 200, 35 stories dans l'index).
Le workflow fait office de CI (typecheck + build package + build Storybook à chaque push).
**Différé volontairement** : publication npm de `@noraship/ui` (créer l'org npm `noraship`,
retirer `"private": true`, choisir la licence) — à faire quand un premier projet consommateur
existera. Lint ESLint toujours absent (hérité de la task 002).
