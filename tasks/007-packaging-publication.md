---
status: in-progress
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
