---
status: done
depends_on: []
---

# 002 — Setup du projet (Vite + React + TS + Tailwind + Storybook)

## Objectif

Initialiser le squelette technique : projet Vite en mode library, TypeScript strict, Tailwind
branché sur les CSS variables, Storybook fonctionnel avec une story de démonstration.

## Critères d'acceptation

- [ ] `npm run storybook` lance Storybook sans erreur
- [ ] Tailwind configuré pour consommer les tokens `--nora-*` (pas de palette Tailwind par défaut
      dans les composants)
- [ ] TypeScript strict, ESLint + Prettier configurés
- [ ] Structure `src/components/`, `src/tokens/`, `src/styles/` en place
- [ ] Toggle light/dark fonctionnel dans la toolbar Storybook (`data-theme`)
- [ ] Section « Commandes » du CLAUDE.md mise à jour

## Notes

- Peut démarrer en parallèle de la task 001 (le setup ne dépend pas des couleurs choisies).
- Vite library mode + `package.json` exports propres dès le départ pour faciliter la task 007.

## Journal

- 2026-07-04 : task créée.
- 2026-07-04 : setup terminé. Vite 7 + React 19 + TS strict, Tailwind v4 (plugin Vite, mapping
  `@theme inline` sur les tokens `--nora-*`), Storybook 10.4 (addons a11y/docs/vitest, init
  officiel). Tokens « Hélios Prune » dans `src/styles/nora.css` (sombre défaut, clair adouci via
  `data-theme="light"`). Toggle de thème dans la toolbar Storybook (decorator `withTheme`).
  Premier composant Button (primary/secondary/ghost, 3 tailles) + 5 stories. Vérifié :
  `build-storybook` OK, `tsc -b` OK, tokens présents dans le CSS compilé, 5 stories indexées.
  Script `scripts/derive-accent.mjs` : donne les tokens AA des 2 thèmes pour n'importe quel hex
  (permet de changer d'accent plus tard en 1 commande). ESLint/Prettier non installés → reportés.
  Note : l'init Storybook a aussi configuré les tests vitest/playwright (vite.config.ts).
