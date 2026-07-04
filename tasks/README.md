# Tasks — Noraship Design System

Roadmap du projet, par ordre de dépendance. Statuts en frontmatter de chaque fichier.

| # | Task | Statut | Dépend de |
|---|------|--------|-----------|
| 001 | [Direction visuelle](001-direction-visuelle.md) | done — « Hélios Prune » | — |
| 002 | [Setup projet](002-setup-projet.md) | done | — |
| 003 | [Design tokens](003-design-tokens.md) | done | 001, 002 |
| 004 | [Composants fondamentaux](004-composants-fondamentaux.md) | done | 003 |
| 005 | [Composants avancés](005-composants-avances.md) | done | 004 |
| 006 | [Pages brand](006-pages-brand.md) | done | 003 |
| 007 | [Packaging & publication](007-packaging-publication.md) | done (npm différé) | 004 |
| 008 | [Composants build-os-teacher](008-composants-build-os-teacher.md) | done | 004, 005 |

⚠️ Tenir ce tableau synchronisé avec les frontmatters quand un statut change.

Note (2026-07-04) : nom passé de **Nova\*** à **Nora\***, puis officialisé : **NoraShip**
(`noraship.com` acquis). Tokens/classes gardent le préfixe court `nora` ; package `@noraship/ui`.
Dossier local : renommage prévu `~/projects/novaship/storybook` → `~/projects/noraship/ui` (fait par Jean, hors session).
