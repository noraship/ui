---
status: done
depends_on: []
---

# 001 — Explorer la direction visuelle « Nora »

## Objectif

Proposer 2-3 pistes d'identité visuelle (palette, typographie, ambiance, formes) sous forme d'une
page HTML comparative, pour que Jean choisisse la direction qui servira de base aux design tokens.

## Critères d'acceptation

- [ ] 2-3 directions distinctes présentées côte à côte (palette complète, typo, exemples de
      composants factices : bouton, card, badge)
- [ ] Chaque direction testée en light **et** dark
- [ ] Contrastes AA vérifiés sur les combinaisons texte/fond principales
- [ ] Une direction choisie et notée ici comme décision

## Décision (2026-07-04)

**Identité retenue : « Hélios Prune »**

- **Famille** : Hélios — display serif éditorial, interface neutre et précise
- **Accent** : prune `#6E3B5C` (sur clair, tel quel ; sur sombre, éclairci automatiquement
  jusqu'à AA par l'algorithme de l'atelier — à figer en valeurs exactes dans la task 003)
- **Thème par défaut : sombre** — fond `#191F1D`, surface `#232A27`, texte `#E8EBE7`
- **Mode clair adouci** (jamais de blanc pur) — fond `#EAE8E2`, surface `#F3F2ED`, encre `#1E201C`
- **Contraste** : volontairement non maximal (préférence de Jean), mais toujours ≥ AA
- Typo cible : display serif type Tiempos Headline, texte sans neutre — équivalents libres à
  choisir en task 003
- Raisons du choix de la prune : aucune collision avec les couleurs sémantiques (erreur/succès/
  alerte), territoire de marque libre (violet désaturé), bonne tenue dans les deux thèmes.
  Finalistes écartés : lie-de-vin `#8A3242` (trop proche du rouge d'erreur), encre violette
  `#302C4E` (trop sombre pour un accent en thème sombre ; reste une piste pour teinter les fonds).
- Point ouvert pour la task 003 : la teinte des neutres sombres actuels tire vers le vert
  (héritage patine) — valider si on la garde ou si on la neutralise/viole légèrement.

Référence visuelle : `tasks/moodboard-001.html` (v6) —
https://claude.ai/code/artifact/3b437bb5-9e29-434e-805e-ce40c1e634e1

## Journal

- 2026-07-04 : task créée, moodboard en cours de préparation.
- 2026-07-04 : moodboard publié avec 3 pistes (A « Pulsar » spatial sombre, B « Hélios » clair
  éditorial accent solaire, C « Mission Control » rétro-aérospatial ambre/mono), chacune avec
  toggle light/dark. Source : `tasks/moodboard-001.html`. En ligne :
  https://claude.ai/code/artifact/3b437bb5-9e29-434e-805e-ce40c1e634e1 — en attente du choix de Jean.
- 2026-07-04 : ajout de 2 pistes en tons intermédiaires à la demande de Jean (ni trop clair ni trop
  sombre, pas « design IA », fonctionnel) : D « Stratus » (gris pierre chaud + vert pétrole, zéro
  effet) et E « Crépuscule » (ardoise bleutée + sable doré, saturation basse). Même artifact, v2.
- 2026-07-04 : Jean retient **B (Hélios)** et **D (Stratus)** ; A, C et E éliminées. Ajout d'une
  déclinaison de chaque famille : B2 « Hélios Outremer » (gris minéral mi-clair + outremer, même
  serif) et D2 « Stratus Sauge » (gris-vert sauge + prune, même discipline typo). Artifact v3.
  Reste à choisir la déclinaison finale parmi B / B2 / D / D2 (ou un mix).
- 2026-07-04 : Jean ne garde que **B (Hélios)** — Stratus et ses variantes éliminées. Il demande une
  alternative dont les couleurs ne soient pas déjà associées à une marque connue (l'orange étant
  occupé : Reddit, SoundCloud, HubSpot…). Ajout de **B2 « Hélios Patine »** : même squelette
  éditorial serif, accent vert-de-gris `#3D7068` + cuivre `#96522F` en touche — duo non revendiqué
  par une marque majeure, et qui évoque la coque en cuivre patinée d'un navire (Nora-ship).
  Artifact v4. Choix final : Hélios (orange) vs Hélios Patine (vert-de-gris/cuivre).
- 2026-07-04 : le vert seul ne convainc pas ; Jean veut tester lui-même les couleurs. B2 devient un
  **atelier couleur interactif** : sélecteur libre + 6 presets peu revendiqués (vert-de-gris,
  cuivre, prune, lie-de-vin, bleu glauque, ocre terre), dérivation automatique des tokens (hover,
  texte, on-accent), contrastes AA calculés en direct, indicateur du territoire de marque par teinte.
- 2026-07-04 : décisions de Jean actées : **sombre par défaut** ; le mode clair doit être adouci
  (gris coquille ~#E9EAE6/#EAE8E2, jamais blanc pur) ; il aime le contraste texte/fond plus doux
  de B2 par rapport à B. Structure light/dark inversée dans le moodboard (v5). Reste : choisir
  l'accent définitif via l'atelier.
- 2026-07-04 : Jean hésite entre 3 accents : **prune `#6E3B5C`**, **lie-de-vin `#8A3242`** et
  **encre violette `#302C4E`** (proposée par lui). Ajout d'une section « duel » dans l'atelier :
  les trois côte à côte, en sombre et en clair adouci, tokens dérivés par les mêmes règles.
  Analyse fournie : prune = zéro collision sémantique ; lie-de-vin = frôle le rouge d'erreur ;
  encre violette = très sombre, s'exprime surtout en clair/grandes surfaces. Artifact v6.
- 2026-07-04 : **Jean choisit la prune.** Décision figée ci-dessus, task close. Il signale aussi
  aimer le composant « presets cliquables » de l'atelier → ajouté à la task 004 (ChoiceChips).
