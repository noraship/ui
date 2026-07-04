---
status: done
depends_on: [004, 005]
---

# 008 — Composants pour build-os-teacher

## Objectif

Combler les manques identifiés en analysant `../build-os-teacher` (plateforme d'apprentissage :
landing + pricing, dashboard de modules, pages leçon avec tutoriel markdown + QCM).

## Composants

- [x] **Prose** — rend du **markdown brut** (décision de Jean : parser intégré, react-markdown +
      remark-gfm) avec les tokens NoraShip ; blocs de code avec bouton copier (CodeBlock)
- [x] **Alert / Callout** — messages inline info/succès/alerte/erreur (erreurs, paywall, notes)
- [x] **Breadcrumb** — fil d'ariane (LessonPage/ModulePage)
- [x] **ProgressBar** — progression module/parcours (dashboard)
- [x] **PrevNext** — navigation leçon précédente/suivante
- [x] **RadioCards** — options riches empilées (QCM : sélection + états correct/incorrect + note)
- [x] **Accordion** (Radix) — résumés/prérequis repliables

## Notes

- Conséquence côté build-os-teacher : l'API pourra servir le markdown brut au lieu du HTML rendu.
- Adoption : publier @noraship/ui sur npm ou dépendance `file:../storybook` en attendant.

## Journal

- 2026-07-04 : task créée après analyse du projet ; react-markdown choisi par Jean pour Prose.
- 2026-07-04 : terminé. 7 composants + stories : Prose (react-markdown + remark-gfm,
  CodeBlock avec bouton copier, story = vraie leçon de boot aarch64), Alert (4 variantes),
  Breadcrumb, ProgressBar (aria complet), PrevNext, RadioCards (avec tones success/danger +
  notes pour la correction de QCM), Accordion (Radix). react-markdown/remark-gfm externalisés
  du build lib (index.js : 30,7 kB). Vérifié : tsc OK, build lib OK, build Storybook OK,
  46 stories. Prochaine étape côté build-os-teacher : consommer @noraship/ui
  (`file:../storybook` en attendant npm) et servir le markdown brut depuis l'API Go.
- 2026-07-04 : premier branchement réel (build-os-teacher). Découverte : une leçon
  embarquait un `<iframe>` (page interactive) dans son markdown, que react-markdown
  ignore. Une prop `allowHtml` (rehype-raw) a été essayée puis **revertée** — décision
  de Jean : Prose reste 100 % markdown pur, pas de HTML direct. Les interactifs
  deviennent des métadonnées de leçon côté plateforme (sidecar yaml, comme les QCM),
  rendus par un composant dédié hors markdown. Feedback à traiter plus tard :
  Breadcrumb/PrevNext rendent des `<a href>` bruts — plein rechargement dans une SPA
  react-router ; prévoir un `asChild` ou un composant de lien injectable.
- 2026-07-05 : feedback lien traité — `Button` accepte `asChild` (Radix
  Slot) pour rendre un `<a>`/`<Link>` stylé, et `Breadcrumb`/`PrevNext`
  acceptent `linkComponent` (adaptateur react-router injectable, `<a>` par
  défaut). Adopté côté build-os-teacher (breadcrumb + prev/next de la
  page leçon, CTA quiz).
