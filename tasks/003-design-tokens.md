---
status: done
depends_on: [001, 002]
---

# 003 — Design tokens

## Objectif

Traduire la direction visuelle choisie (task 001) en tokens CSS variables `--nora-*`, documentés
dans Storybook.

## Périmètre

- **Couleurs** : palette brand (accent, échelle de neutres), couleurs sémantiques (success,
  warning, danger, info), surfaces/fonds/bordures/texte — déclinées light + dark
- **Typographie** : familles (display, texte, mono), échelle de tailles, graisses, line-heights
- **Espacement** : échelle `--nora-space-*`
- **Rayons** : `--nora-radius-*`
- **Ombres / élévation** : `--nora-shadow-*`
- **Motion** : durées et easings de base

## Critères d'acceptation

- [x] Tokens définis dans `src/styles/nora.css` (CSS variables), sombre défaut + clair adouci
- [x] Tailwind mappé sur ces tokens
- [x] Page Storybook MDX « Tokens » qui affiche visuellement chaque catégorie
- [x] Contrastes AA validés pour texte normal sur les surfaces principales

## Journal

- 2026-07-04 : task créée.
- 2026-07-04 : terminé. Tokens complets dans `src/styles/nora.css` : surfaces/texte/bordures,
  accent prune (dérivé AA par `scripts/derive-accent.mjs`), 4 familles sémantiques + danger plein
  (tous vérifiés ≥ 4,5:1 dans les 2 thèmes), typo (Source Serif 4 display / Public Sans corps /
  JetBrains Mono — fontsource variable, embarquées), échelles texte/espacement (grille 4px),
  rayons, ombres, motion. Mapping Tailwind `@theme inline`. Page docs « Design system/Tokens »
  (MDX + `src/docs/TokenDemos.tsx`) qui lit les variables en direct et suit le toggle de thème.
