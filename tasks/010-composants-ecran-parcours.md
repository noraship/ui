---
status: todo
depends_on: [009]
---

# 010 — Réutilisables repérés en construisant l'écran Parcours (moodboard-002 v2)

## Contexte

Le rework du dashboard de build-os-teacher (hero + carte niveau +
master-détail) a été fait en composants d'app + CSS local. Revue après
coup : certains morceaux sont de la vraie duplication et méritent le DS,
d'autres non. Inventaire pour arbitrage/extraction.

## À extraire (duplication réelle)

- [ ] **ProgressRing** — l'anneau conique de progression
      (`conic-gradient(accent pct%, line 0)` + pastille intérieure).
      Existe déjà **deux fois** : dans `LevelAvatar` (34 px) et dans la
      carte niveau du dashboard (88 px, avec numéro + « niveau »).
      API : `size`, `pct`, `thickness`, `children` (contenu du centre) ;
      refactorer `LevelAvatar` dessus.
- [ ] **ProgressBar : variante gradient** — la barre XP du dashboard
      réimplémente une barre alors que le DS a déjà `ProgressBar` (aria
      complet). Faute avouée : il fallait l'utiliser. Ajouter une prop
      (`tone="xp"` ou `gradient`) pour le dégradé
      `accent → accent-text`, et brancher le dashboard dessus.
- [ ] **Eyebrow** — le libellé uppercase accent (12px, tracking .14em)
      revient maintenant partout : dashboard (« Parcours · Créer son
      OS », « Fondations »…), landing (« Pourquoi NoraShip », « Tarif »),
      quiz (« Vérifie ta compréhension »), explorateur atelier. Composant
      minuscule mais 6+ occurrences en CSS local → DS.

## À décider avec Jean (incohérence de tokens)

- [ ] Les mockups utilisent des **radius 14/16 px** pour les grandes
      cartes (hero, niveau, détail module, pricing) alors que le token
      `--nora-radius-card` vaut 12. Aujourd'hui les apps codent `14px`/
      `16px` en dur. Soit on ajoute `--nora-radius-card-lg: 16px`, soit
      on normalise tout à 12 — trancher puis nettoyer.

## Vu mais laissé côté app (pas de duplication, sémantique métier)

- **ModuleRow** (chip d'id + titre serif + teaser + point/cadenas) et la
  carte détail : structure liée aux statuts modules de la plateforme,
  une seule utilisation. À re-regarder si un 2e usage apparaît.
- **Badge slots 44 px** (jalons « mon OS boote ! ») : placeholders en
  attendant le vrai système de badges (E03) — le composant DS
  (`AchievementBadge` ?) naîtra avec le système.
- Le **chip de code module** (mono, 3 états) n'existe que dans cet écran
  (rangée + détail) ; composant d'app suffisant.

## Journal

- 2026-07-05 : task créée après revue de l'écran Parcours.
