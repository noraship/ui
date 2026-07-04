---
status: in-progress
depends_on: [008]
---

# 009 — Écrans « Atelier OS » (moodboard-002)

## Objectif

Jean a validé une nouvelle référence visuelle : `moodboard-002-atelier-os.html`
(3 écrans : évaluation initiale, leçon, atelier IDE). Le mockup est déjà 100 %
sur les tokens Hélios Prune (mêmes fontes, mêmes accents, mêmes sémantiques) —
l'écart est **au niveau composants et compositions**, pas au niveau identité.

Cette task : combler l'écart pour que `build-os-teacher` puisse reconstruire
ces écrans avec le DS.

## Tokens (fait)

- [x] `--nora-surface-2` — surface intermédiaire entre `bg` et `surface`
      (sombre `#1f2522`, clair `#efeee8`). Utilisée par : toolbar atelier,
      bulles assistant, chips suggestions, barre d'onglets éditeur.
- [x] Palette syntaxe `--nora-code-*` (ink, keyword, string, number,
      directive, comment, punct) — extraite du highlighter du mockup,
      variantes claires vérifiées AA sur `--nora-field` et `--nora-bg`.
- [x] Tokens terminal `--nora-term-*` (bg `#12100f`, line, ink, muted) —
      **identiques dans les deux thèmes** : un terminal reste sombre.

## Composants

### Fait dans cette task

- [x] **Wordmark** — marque « Nora**ship** » bicolore en display serif +
      libellé de contexte optionnel (« Atelier OS », uppercase, letter-spacing
      .16em) séparé par un trait vertical `line-strong`.
- [x] **TopBar** — barre d'app 60 px, sticky, fond `bg` à 90 % + blur 8px,
      3 zones : `brand` / nav centrale / `actions`. Avec **TopBarNav** :
      pilules bouton (7px 15px, radius 8, actif = `accent-soft` +
      `accent-text`, inactif = `muted`).
- [x] **StatChip** — chip pilule de gamification. Variantes : `outline`
      (bordure `line`, ex. série de jours + icône flamme `warning`) et
      `accent` (fond `accent-soft`, texte `accent-text` bold, ex. « 480 XP »).
      Icône en slot.
- [x] **Checklist** — liste d'étapes d'un module. États : `done` (rond 18px
      plein `success` + check sombre), `current` (rond bordure 2px
      `accent-text`, libellé `accent-text` semi-bold), `todo` (rond bordure
      `line-strong`, libellé `muted`). Titre eyebrow optionnel
      (11px uppercase, tracking .12em).

### À faire (recettes extraites du mockup, prêtes à implémenter)

- [ ] **Terminal** — console série. Fond `term-bg`, header 32px avec les
      3 pastilles (`danger`/`warning`/`success` pleins 10px), titre mono 11px
      `term-muted`, badge d'état à droite ; corps mono 12.5px/1.65, curseur
      bloc clignotant `success` (8×15px, `step-end` 1s). Lignes typées
      (cmd `#cdd3cd` bold, dim `#7f8a83`, warn `warning`, out `#8ee0a0` bold,
      ok `success`, err `danger`) → à tokeniser si besoin.
- [ ] **CodeBlock enrichi dans Prose** — le mockup encadre le code d'un header
      (nom de fichier mono 12px muted + langage à droite) dans un cadre
      `field` radius 12 ; brancher la palette `--nora-code-*` sur la
      coloration (asm : keyword/number/comment/label).
- [ ] **VideoCard** — placeholder vidéo 16/9 radius 14, fond
      `radial-gradient(120% 120% at 30% 20%, #26302c, #161b19)` + scanlines,
      bouton play 74px `accent` avec ombre portée accent, titre serif 18px
      blanc + durée mono en pastille.
- [ ] **ChatPanel / ChatBubble / SuggestionChips** (épic E05 tuteur) —
      header avec avatar étincelle `accent-soft` + statut `success` ;
      bulles max 88 %, radius 14 avec coin « queue » 3px (user = `accent`
      blanc, assistant = `surface-2`) ; indicateur « réflexion » 3 points
      animés ; chips suggestions (`surface-2`, bordure `line`, hover
      `accent-text`) ; zone de saisie `field` focus `accent-text`, bouton
      envoyer 34px carré radius 8 (`accent` si actif, `line` sinon).
- [ ] **HintBox** — encart astuce : bordure **pointillée** `line-strong`
      radius 8, 12px muted ; le code inline en `warning`.
- [ ] **LevelAvatar** — avatar 34px avec anneau de progression XP en
      `conic-gradient(accent pct%, line 0)` + libellé « Niv. N / titre ».
- [ ] **StepBadge** — pilule d'étape (« Étape 1 — on personnalise ton
      parcours ») : bordure `line`, point 6px `accent-text`, 12px muted.
- [ ] **SkillLevelRow** (évaluation initiale) — carte `surface` avec titre
      serif + hint muted, et 3 pilules niveau (bordure `line-strong`,
      sélection = fond `accent` blanc). Peut se construire avec
      **ChoiceChips** existant si on lui ajoute la variante « bordure ».
- [ ] **Quiz option row** — l'option QCM du mockup : rangée pleine largeur
      radius 10, bordure/fond par état (idle `line`/`surface`, sélection
      `accent`/`accent-soft`, correct `success`/soft, faux `danger`/soft) —
      à rapprocher du QCM existant de build-os-teacher (composant app ou DS ?
      décision à prendre avec Jean).

### Hors DS (niveau app build-os-teacher)

- Explorateur de fichiers avec badges d'extension colorés (AS/C/MK/LD),
  barre d'onglets éditeur (onglet actif : fond `bg` + liseré haut 2px
  `accent`), gouttière de numéros de ligne — c'est l'atelier E04 (Monaco
  prendra le relais pour l'édition réelle).
- Les 3 écrans eux-mêmes (compositions de page).

## Journal

- 2026-07-05 — mockup décodé (artifact bundlé → HTML source), recettes
  extraites, tokens ajoutés à `nora.css`, Wordmark/TopBar/StatChip/Checklist
  implémentés avec stories. Reste : composants « à faire » ci-dessus.
