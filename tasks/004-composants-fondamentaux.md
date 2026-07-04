---
status: done
depends_on: [003]
---

# 004 — Composants fondamentaux

## Objectif

Construire la première vague de composants, ceux qui portent le plus l'identité visuelle et dont
tout le reste dépend.

## Composants

- [x] **Button** (variantes : primary, secondary, ghost, danger ; tailles ; états loading/disabled — support icône : à ajouter au besoin)
- [x] **Input** + **Textarea** (label, aide, erreur — préfixe/suffixe : à ajouter au besoin)
- [x] **Badge / Tag**
- [x] **Card**
- [x] **Avatar**
- [x] **Checkbox / Radio / Switch**
- [x] **Select** (natif stylé pour commencer)
- [x] **Link** & styles typographiques (Heading, Text)
- [x] **ChoiceChips / SwatchPicker** — pastilles cliquables avec point de couleur et label, comme
      les presets de l'atelier couleur du moodboard (Jean a explicitement aimé ce composant,
      2026-07-04). Généraliser : sélection d'une option dans une petite liste visuelle.

## Critères d'acceptation (par composant)

- [x] Props typées, variantes couvertes par des stories
- [x] Uniquement des tokens (aucune valeur brute)
- [x] Clavier + focus visible + ARIA corrects
- [x] Rendu correct en light et dark

## Journal

- 2026-07-04 : task créée.
- 2026-07-04 : terminé. Livrés avec stories : Button (primary/secondary/ghost/danger, 3 tailles,
  loading, disabled), Input/Textarea/Select (label, aide, erreur, aria-invalid/describedby),
  Badge (6 variantes), Card (titre/actions/footer, élévation), Avatar (initiales/img, 3 tailles),
  Checkbox/Radio (natifs + accent-color), Switch (role=switch), ChoiceChips (radiogroup,
  pastilles de couleur optionnelles), Heading/Text/Link. 100 % tokens, focus visible partout.
  Nuance : prefix/suffixe d'Input et icônes de Button non faits (à ajouter au besoin).
  Vérifié : tsc OK, build-storybook OK, 24 stories indexées.
