---
stepsCompleted: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
inputDocuments: ['_bmad-output/analysis/brainstorming-session-2026-01-05.md']
workflowType: 'prd'
lastStep: 11
workflowComplete: true
completionDate: '2026-01-07'
brainstormingCount: 1
briefCount: 0
researchCount: 0
projectDocsCount: 0
---

# Product Requirements Document - NotesAllSanity

**Author:** Alexandre
**Date:** 2026-01-05

## Executive Summary

**NotesAllSanity** est un tracker web dédié aux seeds AllSanity de Zelda Ocarina of Time Randomizer, conçu pour gérer la complexité extrême des parties longues (30h+) avec ~3000 checks.

Les trackers existants ciblent le mode standard (~200 checks) et deviennent inutilisables face à la densité d'AllSanity. NotesAllSanity comble ce gap en offrant une architecture modulaire spécialement pensée pour la navigation dans des seeds massives, tout en préservant le principe fondamental : **"Je note mais je réfléchis"** - l'application est un disque dur externe fiable, pas une IA qui joue à la place du joueur.

**Vision produit :** Permettre aux joueurs AllSanity d'atteindre un état de flow optimal pendant leurs seeds, avec une visibilité complète sur leur progression, un routing intelligent, et la certitude de ne jamais perdre de temps à refaire des checks déjà vérifiés.

### Ce Qui Rend Ce Tracker Spécial

**1. Architecture 4 Modules pour AllSanity**
- **Checks Tracker** : Filtrage multi-critères intelligent (Zone × Type) pour réduire 3000 checks à une liste actionnable
- **Entrances Tracker** : Traçabilité de navigation inter-zones avec historique
- **Pathfinding** : Algorithme Dijkstra avec intégration native du Save Warp
- **Statistiques** : Analytics multi-dimensionnels (type, zone, fait/à faire)

**2. Principe de Design "Disque Dur, PAS IA"**
L'application affiche l'information de manière claire et filtrable, mais le joueur garde le contrôle total de l'analyse et des décisions. Le plaisir du jeu vient de la réflexion personnelle - le tracker est un outil de confiance, pas un assistant automatique.

**3. Parsing Natif du Spoiler.json**
Utilisation directe du format officiel des développeurs du randomizer, avec nomenclature exacte des checks (ex: `GC Darunia Pot 1`, `KF Midos Top Left Chest`). Pas d'abstraction inutile, les joueurs reconnaissent instantanément les locations.

**4. Sauvegarde JSON Portable**
Système de sauvegarde cross-device permettant de continuer une seed de 30h+ sur différentes machines sans perte de données.

### Différenciation Marché

**Gap identifié :** La communauté OOT Randomizer dispose de trackers adaptés au mode standard, mais aucun outil n'est optimisé pour la densité et la complexité des seeds AllSanity. NotesAllSanity est le premier tracker pensé nativement pour gérer ~3000 checks avec des outils de filtrage, routing et analytics adaptés à cette échelle.

**Moment "aha" utilisateur :** En plein milieu d'une seed AllSanity difficile, le joueur est en flow complet - il progresse efficacement, voit clairement où il en est, trouve son routing optimal, et sait précisément quels items il lui reste à obtenir. Le tracker disparaît de la conscience - il devient une extension naturelle de la mémoire du joueur.

## Project Classification

**Technical Type:** Web App (SPA)
**Domain:** General
**Complexity:** Medium
**Project Context:** Greenfield - nouveau projet

**Stack Technique Confirmé :**
- **Framework:** Angular (latest stable)
- **Styling:** Tailwind CSS
- **Component Library:** PrimeNG (version gratuite)
- **State Management:** Services Angular + RxJS (BehaviorSubjects, combineLatest pour filtres réactifs)
- **Pathfinding:** Algorithme Dijkstra avec Save Warp
- **Data Source:** Parsing client-side du spoiler.json
- **Déploiement:** Dockerfile → Dokploy (self-hosted)

**Architecture Modulaire :**
- Module Checks (filtrage multi-critères, virtual scrolling pour performance)
- Module Entrances (tracking navigation inter-zones)
- Module Pathfinding (service dédié avec algorithme optimisé)
- Module Statistiques (data visualization, analytics multi-dimensionnels)

**Justification Angular :**
- Cadre strict et opinionated pour architecture propre
- TypeScript natif (typage fort requis pour 3000+ items)
- RxJS natif (filtres réactifs multi-critères)
- Dependency Injection (services partagés entre modules)
- PrimeNG mature et complet (Virtual Scroller, Data Table, Charts)

## Success Criteria

### User Success

**Critère de Succès Ultime :**
Un joueur complète une seed AllSanity (30h+, ~3000 checks) du début à la fin en utilisant NotesAllSanity comme unique système de tracking.

**Moments de Succès Mesurables :**

1. **Mémoire Totale** : "Je sais ce que j'ai pas fait et donc oublie rien"
   - ✅ Succès : Le joueur peut identifier instantanément quels checks sont faits/non-faits dans n'importe quelle zone
   - ✅ Succès : Zéro doute sur l'état d'un check (pas de "j'ai déjà fait ça ou pas?")
   - ❌ Échec : Le joueur doit revérifier un check déjà fait par manque de confiance dans le tracker

2. **Navigation Entrance Shuffle** : "Je sais me retrouver dans l'entrance shuffle sans difficulté"
   - ✅ Succès : Le joueur trace son historique de navigation inter-zones
   - ✅ Succès : Retrouve instantanément comment accéder à une zone via les entrances découvertes
   - ❌ Échec : Le joueur se perd et doit refaire la cartographie manuellement

3. **Continuité Session** : "Quand il sauvegarde et revient le lendemain il sait où il en était hier"
   - ✅ Succès : Export JSON → ferme navigateur → revient 24h+ plus tard → Import JSON → contexte complet restauré
   - ✅ Succès : Le joueur reprend sa progression exactement où il l'avait laissée sans perte d'information
   - ❌ Échec : Perte de contexte, obligation de se réorienter ou de reconstruire l'état mental

**Dealbreaker Absolu :**
🚨 **Corruption de sauvegarde = "c'est la fin"** → Si le JSON se corrompt après X heures de seed, le projet est un échec complet. La fiabilité de la sauvegarde est NON-NÉGOCIABLE.

### Business Success

**Contexte :** Projet personnel avec partage communautaire potentiel si qualité prouvée.

**Succès à 3 mois (MVP) :**
- ✅ Alexandre utilise le tracker pour 100% de ses seeds AllSanity
- ✅ Au moins une seed AllSanity complétée du début à la fin avec le tracker
- ✅ Partage avec 2-5 amis joueurs OOT Randomizer pour feedback initial

**Succès à 12 mois :**
- ✅ Tracker utilisé régulièrement par Alexandre et son cercle de joueurs AllSanity
- ✅ Feedback positif de la communauté si partagé publiquement
- ✅ Devient l'outil de référence personnel pour toutes les seeds complexes

**Critère de Validation Communautaire (optionnel) :**
Si partagé : 10-20 utilisateurs actifs dans la communauté OOT Randomizer = succès d'adoption.

### Technical Success

**Performance & Réactivité :**

1. **Filtrage Instantané** (NON-NÉGOCIABLE)
   - ✅ Filtrage multi-critères (Zone × Type) sur 3000 checks : **<100ms**
   - ✅ Rendu liste filtrée (virtual scrolling) : **instantané**
   - ❌ Délai perceptible (>100ms) = échec technique

2. **Pathfinding Performant**
   - ✅ Calcul Dijkstra entre deux zones : **1-2 secondes maximum**
   - ⚠️ Au-delà de 2 secondes : ralentit la progression de la seed (inacceptable)

3. **Support 3000 Checks**
   - ✅ Affichage fluide avec virtualisation (scroll, navigation)
   - ✅ Mémoire navigateur stable sur sessions longues (50h+ gameplay)
   - ✅ Pas de dégradation performance après 1000+ checks marqués

**Fiabilité Sauvegarde (CRITIQUE) :**

1. **Export JSON**
   - ✅ Export complet et exhaustif : état checks, entrances, pathfinding, statistiques
   - ✅ Format JSON concis mais complet (optimisation taille)
   - ✅ Toujours générer un JSON valide et parseable

2. **Import JSON**
   - ✅ Validation stricte du format à l'import
   - ✅ Si JSON invalide/corrompu : refus de charger + message d'erreur clair
   - ❌ Import JSON invalide qui crash l'app = échec critique
   - ✅ Restauration complète de l'état exact à l'export

3. **Intégrité Données**
   - ✅ Aucune perte de données entre Export → Import
   - ✅ Support cross-browser (Chrome ↔ Firefox) sur desktop
   - ✅ Portabilité cross-device desktop (PC ↔ Mac ↔ Linux)

**Compatibilité :**
- Desktop only (pas de support mobile requis pour MVP)
- Browsers modernes (Chrome, Firefox, Edge, Safari)

### Measurable Outcomes

**Métriques Quantitatives :**

| Métrique | Cible MVP | Cible Optimale |
|----------|-----------|----------------|
| Temps filtrage 3000 checks | <100ms | <50ms |
| Temps calcul pathfinding | <2s | <1s |
| Taille JSON pour 3000 checks | <5MB | <1MB |
| Temps chargement initial app | <3s | <1s |
| Durée session support | 50h+ | Illimité |

**Métriques Qualitatives :**

- ✅ Zéro perte de données sur sessions longues
- ✅ Confiance totale du joueur dans l'état persisté
- ✅ Flow state maintenu (pas d'interruption par lags/bugs)
- ✅ Interface ne nécessite pas de tutoriel (intuitif pour joueur OOT Randomizer)

## Product Scope

### MVP - Minimum Viable Product

**Modules Core (4 modules obligatoires) :**

1. **Module Checks**
   - Affichage 3000 checks avec virtual scrolling
   - Filtrage multi-critères (Zone × Type) instantané
   - 2 états : ✅ Fait | ⬜ Non-fait
   - Nomenclature exacte du spoiler.json

2. **Module Entrances**
   - Tracking des entrances découvertes
   - Traçabilité navigation inter-zones
   - Historique de navigation

3. **Module Pathfinding**
   - Algorithme Dijkstra avec Save Warp intégré
   - Calcul chemin optimal entre zones
   - Affichage du chemin calculé
   - Bouton "Ouvrir Checks" depuis résultat pathfinding (workflow complet)

4. **Module Statistiques**
   - Analytics multi-dimensionnels :
     - Par type de check (Pots, Chests, etc.)
     - Par zone (Goron City, Kokiri Forest, etc.)
     - Perspective Fait / À faire (toggle)
   - Mini compteur progression visible en permanence

**Fonctionnalités Cross-Module MVP :**

- **Sauvegarde JSON** : Export/Import manuel avec validation
- **Mode Dark/Light** : Indispensable pour sessions longues
- **Undo Global** : Ctrl+Z universel sur toutes les actions
- **Performance** : Virtualisation, chargement intelligent
- **UX Optimisée Manette** : Minimal clics, scroll, toggle, vues unifiées

**Parsing Data :**
- Import spoiler.json (source officielle randomizer)
- Parsing nomenclature native (ex: `GC Darunia Pot 1`)

### Growth Features (Post-MVP - V2)

**Priorité 2 (après validation MVP avec seed complète) :**

- **Pathfinding Avancé**
  - Chemins alternatifs (top 3 routes)
  - Option priorité Save Warp ("Préférer/Éviter")

- **Personnalisation**
  - Tags personnalisés sur checks
  - Notes libres par zone/check

- **Collaboration**
  - Partage lecture seule (pour spectateurs, streams)
  - Export rapport progression

- **États Avancés**
  - État 👁️ "Vu mais pas pris" (si demandé par utilisateurs réels)

### Vision (Future - Post-V2)

**Si adoption communautaire forte :**

- Multi-seed management (historique de plusieurs seeds)
- Statistiques cross-seed (progression globale joueur)
- Intégration avec tools communautaires OOT Randomizer
- Mode "Race" pour speedrunners AllSanity (si demande)
- Support modes randomizer alternatifs (au-delà d'AllSanity)

**Critère de Transition MVP → Growth → Vision :**
- MVP → Growth : Après completion d'une seed AllSanity complète avec succès
- Growth → Vision : Après adoption par 10+ utilisateurs actifs communauté

## User Journeys

### Journey 1: Alexandre - La Seed Qui Coule (Success Path)

**Opening Scene:**
Alexandre lance une nouvelle seed AllSanity un vendredi soir. Il vient de terminer son setup habituel : émulateur à gauche, tracker à droite sur son second écran. Il importe le spoiler.json fraîchement généré - 3047 checks s'affichent instantanément dans le tracker. Il commence au Kokiri Forest, la musique nostalgique de OOT en fond.

**Rising Action:**
Après 2h de jeu, Alexandre a déjà marqué 87 checks. Il arrive à Goron City et veut vérifier s'il a fait tous les pots. D'un clic rapide, il filtre "Goron City + Pots" - instantanément, 9 pots s'affichent. 5 sont ✅, 4 restent ⬜. Il sait exactement où aller. Pas de doute, pas d'hésitation. Le mini compteur en haut affiche "87/3047 (2.8%)" - il sourit, la progression est visible.

À la 4ème heure, il obtient le Hookshot. Son cerveau s'allume : "Avec ça, je peux atteindre quelles zones maintenant ?" Il ouvre le module Pathfinding, sélectionne "Temple of Time" comme destination. Le calcul Dijkstra tourne 1.2 secondes. Résultat : Kokiri Forest → Lost Woods → Sacred Forest Meadow → Market → Temple of Time. Le Save Warp est automatiquement intégré dans le calcul. Il clique sur "Ouvrir Checks Temple of Time" - la liste filtrée apparaît avec les 23 checks de la zone. Flow parfait.

**Climax:**
À la 8ème heure (3h du matin), Alexandre est en plein momentum. Il a trouvé son rythme : filtrer zone par zone, marquer méthodiquement, utiliser le pathfinding pour optimiser ses déplacements. L'entrance shuffle ne le perturbe plus - chaque entrance découverte est tracée dans le module Entrances. Il consulte son historique de navigation : "Kakariko Village → Death Mountain Trail (via entrance #42)". Tout est clair.

Le moment magique arrive quand il réalise qu'il n'a pas pensé au tracker depuis 30 minutes. L'outil est devenu une extension naturelle de sa mémoire. Il ne se demande jamais "Ai-je déjà fait ce check ?" - la réponse est toujours évidente, instantanée. Le tracker a disparu de sa conscience - c'est exactement ce qu'il voulait.

**Resolution:**
Alexandre sauvegarde son état (Export JSON - 1.2MB pour 847 checks marqués). Il se couche satisfait. Le lendemain, il reprend là où il s'est arrêté. Après 6 sessions sur 2 semaines, il complète la seed AllSanity : 3047/3047 checks ✅. Le tracker ne l'a jamais trahi. Pas une seule fois il n'a dû revérifier un check par manque de confiance. Il partage son achievement avec 3 amis de la communauté OOT Randomizer qui lui demandent immédiatement le lien du tracker.

**Requirements Révélés:**
- Filtrage multi-critères instantané (<100ms) avec virtual scrolling
- Pathfinding Dijkstra avec Save Warp, calcul <2s
- Module Entrances avec historique navigation
- Mini compteur progression en temps réel
- Export/Import JSON fiable et rapide
- Support sessions longues (50h+) sans dégradation performance

---

### Journey 2: Alexandre - Le Retour Après 2 Jours (Continuité Session)

**Opening Scene:**
Alexandre est au milieu d'une seed particulièrement difficile. Mardi soir, après 12h de gameplay réparties sur 3 jours, il a marqué 1423 checks. Il doit partir en déplacement professionnel pour 2 jours. Avant de fermer son laptop, il clique sur "Export JSON". Le fichier `allsanity-seed-789-save.json` (2.1MB) se télécharge. Il le copie sur son cloud personnel et ferme tout.

**Rising Action:**
Jeudi soir, Alexandre rentre chez lui épuisé. Il rallume son PC, ouvre le tracker. Page vierge. Il clique sur "Import JSON", sélectionne son fichier sauvegardé 48h plus tôt. La validation du JSON prend 800ms. Message : "✅ Sauvegarde valide - 1423 checks, 47 entrances, dernière activité il y a 2 jours". Il clique "Charger".

**Climax:**
En moins de 2 secondes, TOUT se restaure exactement comme il l'avait laissé :
- Les 1423 checks ✅ sont marqués
- Le module Entrances affiche les 47 entrances découvertes avec leur historique
- Le mini compteur affiche "1423/3047 (46.7%)"
- Les statistiques montrent la distribution par zone et par type
- Son dernier filtre actif ("Kakariko Village + Chests") est même restauré

Alexandre regarde l'écran, inspire profondément. Il se souvient EXACTEMENT où il en était : "J'étais en train de nettoyer Kakariko, il me reste les skulltulas et le windmill." Il n'a pas besoin de se réorienter, de reconstruire son contexte mental. C'est comme s'il n'avait jamais fermé le tracker.

**Resolution:**
Alexandre continue sa seed sans une seconde d'hésitation. La continuité est parfaite. Il réalise qu'il peut faire des pauses de plusieurs jours sans craindre de perdre son flow. Cette confiance absolue dans la persistance des données change sa manière de jouer - il n'est plus pressé de "finir avant d'oublier", il peut prendre son temps. La seed devient un marathon confortable plutôt qu'un sprint stressant.

**Requirements Révélés:**
- Export JSON complet : checks, entrances, statistiques, métadonnées
- Import JSON avec validation stricte du format
- Restauration état exact : pas de perte d'information
- Format JSON concis (<5MB pour 3000 checks)
- Messages clairs sur validation (date, nombre checks, statut)
- Support cross-session avec métadonnées temporelles

---

### Journey 3: Alexandre - L'Entrance Shuffle Complexe (Navigation Challenge)

**Opening Scene:**
Alexandre démarre une seed AllSanity avec Entrance Shuffle activé - le niveau de difficulté maximal. Les entrances sont complètement randomisées : entrer dans une maison à Kakariko peut te téléporter dans Death Mountain Crater. Sans tracking, c'est le chaos mental total. Il sait que ce sera le vrai test du module Entrances.

**Rising Action:**
Après 1h, Alexandre a découvert 12 entrances. Il les note méthodiquement dans le module :
- "Kokiri Forest House #3 → Gerudo Training Ground"
- "Kakariko Well → Inside Jabu-Jabu"
- "Market Guard House → Fire Temple Entrance"

Chaque découverte est surprenante, déroutante. Sans le tracker, il serait déjà perdu. À la 3ème heure, il veut retourner au Fire Temple pour un check qu'il a repéré. Question : "Comment j'y accède déjà ?"

Il ouvre le module Entrances, cherche "Fire Temple". Résultat : "Market Guard House → Fire Temple Entrance". Ah oui ! Il avait oublié. Sans le tracker, il aurait passé 10 minutes à chercher l'entrance au hasard.

**Climax:**
À la 6ème heure, Alexandre réalise le pouvoir du système. Il a maintenant 34 entrances tracées. L'entrance shuffle n'est plus un obstacle - c'est presque devenu un puzzle amusant. Il consulte son historique de navigation :

```
Session Flow:
Kokiri Forest → Lost Woods (entrance #7)
Lost Woods → Goron City (entrance #12)
Goron City → Lake Hylia (entrance #23)
Lake Hylia → Spirit Temple (entrance #31)
```

Il voit le pattern de sa progression. Il peut même utiliser le pathfinding en combinaison avec les entrances découvertes : "Je veux aller à Zora's Domain, quelles entrances j'ai découvert qui pourraient m'y mener ?" Le tracker combine pathfinding + entrance tracking pour suggérer la route optimale.

**Resolution:**
Alexandre complète la seed avec 87 entrances découvertes et tracées. Chaque fois qu'il se demandait "Comment j'accède à cette zone déjà ?", le module Entrances avait la réponse en 2 secondes. L'Entrance Shuffle, réputé comme la feature la plus frustrante du randomizer, est devenu gérable grâce au tracking systématique. Il se dit : "Sans ce module, j'aurais abandonné cette seed au bout de 5h."

**Requirements Révélés:**
- Module Entrances avec CRUD complet (Create, Read, Update, Delete)
- Search/Filter dans la liste des entrances découvertes
- Historique de navigation avec timestamps
- Intégration pathfinding + entrances (calcul routes via entrances découvertes)
- Vue "Entrances par zone" pour regroupement logique
- Notation claire du format "Zone A → Zone B (entrance #ID)"

---

### Journey 4: Alexandre - La Presque-Catastrophe Évitée (Error Recovery)

**Opening Scene:**
Alexandre est à la 15ème heure d'une seed épique. 1876 checks marqués. Il décide de sauvegarder avant d'aller dîner. Export JSON → fichier téléchargé. Pendant le repas, il discute du tracker avec un ami par Discord et partage le fichier JSON "pour montrer la structure". Son ami, curieux, ouvre le fichier dans un éditeur, modifie accidentellement une ligne, et re-envoie le fichier corrompu à Alexandre en disant "j'ai rien compris au format lol".

**Rising Action:**
Alexandre revient, ferme le tracker, veut reprendre. Il clique "Import JSON". Par erreur, il sélectionne le fichier corrompu que son ami lui a renvoyé au lieu de son export original. Le fichier commence à charger...

**Climax:**
⚠️ **VALIDATION EN COURS...**

Après 1.2 secondes, un message d'erreur s'affiche :

```
❌ IMPORT IMPOSSIBLE - Fichier JSON Invalide

Erreurs détectées :
- Ligne 347 : Syntaxe JSON invalide (virgule manquante)
- Checksum ne correspond pas (données potentiellement corrompues)
- Format version incompatible

Votre tracker actuel n'a PAS été modifié.
Aucune donnée perdue.

Veuillez utiliser un fichier JSON valide exporté depuis NotesAllSanity.
```

Le cœur d'Alexandre bat vite pendant 2 secondes. Puis il réalise : **rien n'a été écrasé**. Le tracker a REFUSÉ de charger le fichier corrompu. Ses données actuelles sont intactes. Il retrouve son fichier export original dans ses téléchargements et l'importe - cette fois, validation ✅, chargement parfait.

**Resolution:**
Alexandre respire. Il vient de vivre le scénario catastrophe qu'il redoutait le plus : "Et si mon JSON se corrompt ?" La réponse : le système refuse de charger, message clair, zéro perte de données. La validation stricte à l'import vient de lui sauver 15h de progression.

Il met immédiatement en place une discipline : chaque export JSON est sauvegardé dans 2 endroits (local + cloud) avec timestamp dans le nom du fichier. Si un fichier se corrompt, il a toujours le backup précédent. Mais surtout, il a **confiance** : le tracker ne laissera jamais un JSON invalide écraser ses données.

**Requirements Révélés:**
- Validation JSON stricte AVANT import
- Checksum/Hash pour détecter corruption
- Messages d'erreur clairs et détaillés (ligne, type d'erreur)
- Protection : état actuel JAMAIS écrasé par import invalide
- Version format JSON pour compatibilité future
- Suggestion : Backup automatique ou multiple exports recommandés

---

### Journey Requirements Summary

**Capabilities Core Révélées par les Journeys :**

**Module Checks :**
- Filtrage multi-critères instantané (Zone × Type)
- Virtual scrolling pour 3000+ items
- États binaires (Fait/Non-fait) avec toggle rapide
- Compteur progression temps réel
- Performance <100ms garantie

**Module Entrances :**
- CRUD complet pour entrances découvertes
- Format "Zone A → Zone B (entrance #ID)"
- Search/Filter dans la liste
- Historique navigation avec timestamps
- Intégration avec pathfinding

**Module Pathfinding :**
- Algorithme Dijkstra avec Save Warp
- Calcul <2 secondes
- Intégration entrances découvertes
- Affichage route étape par étape
- Bouton "Ouvrir Checks" depuis résultat

**Module Statistiques :**
- Mini compteur progression permanent
- Distribution par zone et par type
- Perspective Fait/À faire (toggle)
- Métadonnées session (durée, last activity)

**Sauvegarde & Persistance :**
- Export JSON complet (<5MB)
- Import avec validation stricte
- Checksum pour détecter corruption
- Messages erreur détaillés
- Protection données actuelles
- Restauration état exact (checks, entrances, stats, filtres actifs)

**UX Transversale :**
- Performance fluide sessions 50h+
- Pas de dégradation avec 1000+ checks marqués
- Interface intuitive (pas de tutoriel requis)
- Confiance totale dans la persistance

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Architecture Modulaire 4-Piliers pour Gestion de Complexité**

NotesAllSanity innove en **séparant intentionnellement** ce que les trackers existants regroupent. Cette architecture permet de gérer la complexité d'AllSanity (~3000 checks) de manière isolée et ciblée :

- **Module Checks** : Filtrage et marquage isolé
- **Module Entrances** : Tracking navigation découplé
- **Module Pathfinding** : Calcul de route séparé
- **Module Statistiques** : Analytics indépendant

**Innovation insight :** Les trackers existants échouent sur AllSanity parce qu'ils regroupent tout, créant une UX surchargée. La séparation modulaire permet une navigation mentale claire dans un espace de 3000 items.

**2. Philosophie "Disque Dur, PAS IA" - Design Principle**

Principe de design fondamental : le tracker est un **système de mémoire externe fiable**, pas un assistant automatique qui prend des décisions.

- ✅ Afficher l'information clairement
- ✅ Filtrer pour réduire la charge cognitive
- ✅ Le joueur analyse et décide lui-même
- ❌ Zéro prise de décision automatique

**Innovation insight :** Cette philosophie préserve le **plaisir du jeu** (la réflexion personnelle) tout en éliminant le **risque de perte de temps** (refaire des checks déjà faits). C'est un équilibre unique entre assistance et autonomie.

**3. Adaptations UX Ciblées AllSanity**

Plusieurs patterns UX adaptés d'autres contextes mais optimisés pour AllSanity :

- **Sélecteur auto-réductif** (Entrances) : Liste qui diminue au fur et à mesure = double valeur (facilité + visualisation progression)
- **Toggle "Masquer checks faits"** : Perspective inversée pour focus productivité
- **Stats double perspective** : Fait / À faire / Total en simultané
- **Mode Exploration** : Pathfinding inversé ("Qu'est-ce qui est accessible d'ici ?")

**Innovation insight :** Ces patterns ne sont pas inventés from scratch, mais leur **combinaison et application au contexte AllSanity** est unique et ciblée.

### Market Context & Competitive Landscape

**Gap Identifié :**

La communauté OOT Randomizer dispose de trackers fonctionnels pour le **mode standard** (~200 checks), mais **aucun outil n'est optimisé** pour la densité et complexité des seeds AllSanity (~3000 checks).

**Différenciation :**

- Trackers existants : Conçus pour standard, deviennent inutilisables sur AllSanity
- **NotesAllSanity** : Pensé nativement pour gérer 3000 checks avec architecture modulaire

**Positionnement :**

Premier tracker spécialisé AllSanity dans l'écosystème OOT Randomizer.

### Validation Approach

**Méthode de Validation Pragmatique :**

Alexandre utilisera une approche **proof-by-completion** :

**Critère de succès ultime :**

Compléter une seed AllSanity (30h+, ~3000 checks) du début à la fin en utilisant exclusivement NotesAllSanity comme système de tracking.

**Rationale :**

Sans tracker fiable, Alexandre n'arrive jamais au bout d'une AllSanity. Si le tracker permet de compléter une seed, c'est la **preuve concrète** que le système fonctionne.

**Approche itérative :**

1. Développer MVP avec 4 modules core
2. Tester sur seed AllSanity réelle
3. Identifier points de friction pendant le jeu
4. Itérer et améliorer
5. Répéter jusqu'à completion

**Validation communautaire (secondaire) :**

Si partagé : Feedback de 2-5 joueurs AllSanity du cercle d'amis pour validation initiale.

### Risk Mitigation

**Risque #1 : Performance avec 3000 Checks**

- **Mitigation :** Virtualisation + infinite scroll (patterns éprouvés)
- **Fallback :** Pagination si virtualisation pose problème

**Risque #2 : Complexité UX des 4 Modules**

- **Mitigation :** Séparation claire, navigation simple entre modules
- **Fallback :** Réduire à 3 modules si trop complexe (fusionner Stats ailleurs)

**Risque #3 : Pathfinding Dijkstra trop lent**

- **Mitigation :** Optimisations algorithme (Save Warp, cache)
- **Fallback :** Simplifier à "Zones accessibles" seulement (pas de calcul route complète)

**Risque #4 : Abandon Avant Completion**

- **Mitigation :** Sauvegarde JSON robuste (pas de perte progression)
- **Fallback :** Accepter que le MVP peut nécessiter plusieurs itérations avant seed complète

**Dealbreaker Absolu (Non-Négociable) :**

🚨 **Corruption sauvegarde JSON** = Échec critique du projet. La fiabilité est priorité #1.

## Web App (SPA) Specific Requirements

### Project-Type Overview

NotesAllSanity est une **Single Page Application (SPA)** Angular déployée comme application web desktop. L'architecture privilégie la **performance client-side** avec traitement local des données (parsing spoiler.json) et persistance via export/import JSON manuel.

**Stack Technique :**
- **Framework :** Angular (dernière version stable)
- **Styling :** Tailwind CSS
- **Component Library :** PrimeNG (version gratuite)
- **State Management :** Services Angular + RxJS (BehaviorSubjects, combineLatest)
- **Déploiement :** Dockerfile → Dokploy (self-hosted)

### Technical Architecture Considerations

**Architecture Client-Side Pure :**

L'application fonctionne entièrement côté client sans backend :
- ✅ Parsing spoiler.json dans le navigateur
- ✅ State management via RxJS
- ✅ Persistance via export/import JSON manuel
- ✅ Aucune synchronisation cloud requise
- ✅ Pas de base de données externe

**Avantages :**
- Simplicité architecture (pas de backend à maintenir)
- Performance optimale (pas de latence réseau)
- Portabilité complète (fichier JSON = sauvegarde portable)
- Déploiement simple (fichiers statiques)

### Browser Support Matrix

**Navigateurs Supportés :**

Desktop seulement (pas de support mobile pour MVP) :
- **Chrome/Chromium** : Dernière version stable
- **Firefox** : Dernière version stable
- **Edge** : Dernière version stable
- **Safari** : Dernière version stable (macOS)

**Politique de Support :**
- Support uniquement des **versions actuellement supportées** par les éditeurs
- Pas de support navigateurs legacy ou obsolètes
- Utilisation des API web modernes (ES2020+, Web Storage API, File API)

**Justification :**
Application de niche pour joueurs techniques, pas besoin de rétrocompatibilité avec anciens navigateurs.

### Responsive Design Strategy

**Approche Responsive Desktop :**

Support écrans desktop de **14" 1080p à 27" 5K** :
- **Minimum :** 1366×768 (laptop 14")
- **Optimal :** 1920×1080 et supérieur
- **Maximum testé :** 5120×2880 (27" 5K)

**Design Adaptatif :**
- Layout fluide avec breakpoints Tailwind
- Virtualisation adaptative (nombre items affichés selon résolution)
- Typographie scalable (rem units)
- Interface optimisée second écran (tracker côté + jeu côté)

**Pas de Support Mobile :**
- Pas de tactile
- Pas de gestes mobiles
- Pas de layout vertical smartphone

### Performance Targets

**Critères Performance Critiques :**

| Métrique | Cible MVP | Cible Optimale | Dealbreaker |
|----------|-----------|----------------|-------------|
| **Temps chargement initial** | <3s | <1s | >5s |
| **Filtrage 3000 checks** | <100ms | <50ms | >200ms |
| **Calcul pathfinding Dijkstra** | <2s | <1s | >3s |
| **Rendering liste virtuelle** | 60 FPS | 60 FPS | <30 FPS |
| **Taille JSON export** | <5MB | <1MB | >10MB |
| **Mémoire navigateur (50h session)** | Stable | <500MB | Fuite mémoire |

**Optimisations Techniques :**
- **Virtual Scrolling** (PrimeNG Virtual Scroller) pour listes 3000+ items
- **Lazy Loading** modules Angular (code splitting)
- **Change Detection Strategy** OnPush pour performance
- **RxJS debounceTime** sur filtres réactifs
- **Memoization** calculs pathfinding (cache résultats)

### SEO Strategy

**Approche SEO :**

**Pas de SEO requis** pour le MVP.

**Rationale :**
- Application de niche pour communauté OOT Randomizer
- Distribution via **liens directs Discord/Reddit**
- Pas de besoin de découvrabilité Google
- SPA sans SSR/SSG (pas optimisée SEO de base)

**Distribution :**
- Lien direct partagé sur Discord communautaire
- Partage manuel entre joueurs
- Potentiel README GitHub si open-source

**Post-MVP (optionnel) :**
- Si adoption communautaire : ajouter landing page statique SEO-friendly
- Meta tags basiques (Open Graph pour partage social)

### Accessibility Level

**Niveau d'Accessibilité : Basique**

**Exigences Minimales :**
- ✅ **Navigation clavier complète** (Tab, Enter, Espace, Flèches)
- ✅ **Contraste suffisant** (mode Dark + Light avec contraste correct)
- ✅ **Focus visible** (outline sur éléments interactifs)
- ✅ **Labels appropriés** (boutons, inputs)

**Contrainte UX Manette :**
- Design optimisé pour **minimal clics**
- Navigation compatible souris ET clavier
- Pas de dépendance exclusive clavier (souris disponible)

**Pas Requis pour MVP :**
- ❌ Support screen readers avancé (ARIA complet)
- ❌ WCAG 2.1 AA/AAA compliance
- ❌ Magnification avancée
- ❌ Support voix (voice control)

**Justification :**
Alexandre peut utiliser la souris si besoin - l'objectif est **réduire les clics** pendant le jeu (manette en main), pas éliminer complètement la souris. Accessibilité basique suffit.

### Implementation Considerations

**Architecture Modulaire Angular :**

4 modules lazy-loaded :
- `ChecksModule` : Gestion checks avec filtrage
- `EntrancesModule` : Tracking entrances
- `PathfindingModule` : Calcul routes Dijkstra
- `StatsModule` : Analytics et statistiques

**Services Partagés :**
- `SpoilerParserService` : Parsing spoiler.json
- `StateManagementService` : RxJS state (checks, entrances, stats)
- `SaveLoadService` : Export/Import JSON
- `ThemeService` : Dark/Light mode toggle

**Déploiement :**
- Build Angular production (`ng build --configuration production`)
- Fichiers statiques → Dockerfile
- Deployment Dokploy (self-hosted)
- Pas de CI/CD complexe requis pour MVP

**Considérations Sécurité :**
- Application client-side pure = pas de risque backend
- Validation JSON import (checksum pour détecter corruption)
- Pas de données sensibles (spoiler log = public)
- Pas d'auth requise

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche MVP : Problem-Solving Progressive**

NotesAllSanity suit une approche **itérative et validée par l'usage** :
- Chaque version est **jouable sur une seed AllSanity réelle**
- Validation = Alexandre complète une seed avec cette version
- Ajout incrémental de modules selon besoins identifiés pendant le jeu

**Critère de Succès Ultime :**

Compléter une seed AllSanity (30h+, ~3000 checks) du début à la fin = preuve que le tracker fonctionne.

**Ressources MVP :**
- **Équipe :** Alexandre (solo dev)
- **Timeline :** Progressive, pas de deadline fixe
- **Stack :** Angular + PrimeNG + Tailwind (stack maîtrisé)

### Versions Progressives - Roadmap

#### v0.1 - MVP Ultra-Minimal (Checks Core)

**Objectif :** Valider que le tracker résout le problème fondamental = éviter de refaire des checks déjà faits.

**Features Incluses :**
- ✅ **Module Checks**
  - Import spoiler.json
  - Affichage liste 3000 checks avec virtual scrolling
  - Filtrage multi-critères (Zone × Type)
  - États binaires : ✅ Fait / ⬜ Non-fait (toggle simple)
  - Toggle "Masquer checks faits"
- ✅ **Module Statistiques (basique)**
  - Progression globale (X/3000 checks)
  - Stats par type (Pots, Coffres, etc.)
  - Stats par zone
- ✅ **Sauvegarde JSON**
  - Export/Import manuel
  - Validation format
- ✅ **Mode Dark/Light** (indispensable sessions longues)
- ✅ **Mini compteur progression** (sticky header)

**Critère de Validation v0.1 :**

Jouer une seed AllSanity **sans Entrance Shuffle** (entrances vanilla) en utilisant uniquement le module Checks.

**Limitations Acceptables :**
- ❌ Pas de tracking entrances (navigation manuelle)
- ❌ Pas de pathfinding (routing mental)
- ❌ Pas d'undo (attention aux clics)

#### v0.2 - Ajout Navigation (Entrances)

**Objectif :** Gérer les seeds avec Entrance Shuffle activé.

**Features Ajoutées :**
- ✅ **Module Entrances**
  - Notation entrances découvertes (`Zone A → Zone B`)
  - Sélecteur auto-réductif
  - Recherche textuelle
  - Vue filtrée par zone
  - Compteur entrances par zone
  - Option Decoupled Entrances
- ✅ **Stats Entrances** (ajoutées au module Stats existant)
  - Nombre entrances découvertes par zone
  - Progression exploration

**Critère de Validation v0.2 :**

Jouer une seed AllSanity **avec Entrance Shuffle** en utilisant Checks + Entrances.

**Limitations Acceptables :**
- ❌ Pas de pathfinding automatique (chercher manuellement comment accéder aux zones)

#### v0.3 - MVP Complet (Pathfinding)

**Objectif :** Ajouter routing intelligent pour optimiser la navigation.

**Features Ajoutées :**
- ✅ **Module Pathfinding**
  - Algorithme Dijkstra avec Save Warp
  - Contexte Child/Adult
  - Calcul chemin optimal (<2s)
  - Affichage étape par étape
  - Bouton "Ouvrir Checks destination"
  - Message "Impossible" si pas de chemin
- ✅ **Stats Pathfinding** (si pertinent)
  - Historique routes calculées (optionnel)

**Critère de Validation v0.3 :**

Compléter une seed AllSanity complète avec Entrance Shuffle en utilisant les 4 modules.

**Succès v0.3 = MVP Validé** → Passage en V2 pour améliorations

### Post-MVP Features (V2)

**Priorité 2 - Après validation MVP (v0.3) :**

**UX Enhancements :**
- Undo Global (Ctrl+Z universel)
- Mode Exploration zones accessibles (pathfinding inversé)
- Chemins alternatifs pathfinding
- Option priorité Save Warp ("Préférer/Éviter")

**Personnalisation :**
- Tags personnalisés sur checks
- Notes libres par zone/check

**Collaboration :**
- Partage lecture seule (spectateurs, streams)
- Export rapport progression

**État Avancé :**
- État 👁️ "Vu mais pas pris" (si demandé par utilisateurs réels)

**Critère de Transition MVP → V2 :**

Après completion d'**au moins une seed AllSanity complète** avec v0.3.

### Vision Long-Terme (V3)

**Si adoption communautaire forte (10+ utilisateurs actifs) :**

- Multi-seed management (historique plusieurs seeds)
- Statistiques cross-seed (progression globale joueur)
- Intégration tools communautaires OOT Randomizer
- Mode "Race" pour speedrunners AllSanity
- Support modes randomizer alternatifs

**Critère de Transition V2 → V3 :**

Adoption par 10+ utilisateurs actifs dans la communauté.

### Risk Mitigation Strategy

#### Risque #1 : Pathfinding Dijkstra Trop Complexe/Lent

**Impact :** High - C'est le risque principal identifié

**Probabilité :** Medium - Algorithme Dijkstra connu mais contexte AllSanity + Save Warp complexe

**Mitigation :**
- Pathfinding arrive en **dernier** (v0.3) après validation v0.1 et v0.2
- Si v0.1 et v0.2 fonctionnent, tracker déjà **utilisable** sans pathfinding
- Calcul peut être simplifié progressivement

**Fallback si bloqué :**
1. **Fallback niveau 1 :** Simplifier à "Zones accessibles" seulement (pas de calcul route complète)
2. **Fallback niveau 2 :** Éliminer pathfinding du MVP, rester sur v0.2 (Checks + Entrances suffit)
3. **Fallback niveau 3 :** Externaliser pathfinding en feature V2 (manuel temporairement)

**Décision :** v0.2 (Checks + Entrances) est **déjà suffisant** pour jouer AllSanity. Pathfinding = bonus confort, pas blocker.

#### Risque #2 : Performance avec 3000 Checks

**Impact :** High - Sans virtualisation, app inutilisable

**Probabilité :** Low - Virtual scrolling (PrimeNG) est pattern éprouvé

**Mitigation :**
- PrimeNG Virtual Scroller utilisé dès v0.1
- Tests performance avec spoiler.json réel (3000+ items)
- Filtrage multi-critères réduit liste affichée

**Fallback si bloqué :**
- Pagination classique (moins fluide mais fonctionne)
- Lazy loading par chunks
- Réduire nombre checks affichés (filtrage obligatoire)

#### Risque #3 : Corruption Sauvegarde JSON

**Impact :** CRITICAL - Dealbreaker absolu (perte progression 30h+)

**Probabilité :** Low - Format JSON + validation stricte

**Mitigation :**
- **Validation stricte** à l'import (checksum, format)
- Protection état actuel (refus import invalide)
- Messages erreur détaillés
- Recommandation backup multiples (local + cloud)

**Fallback si bloqué :**
- Aucun fallback acceptable - la fiabilité est NON-NÉGOCIABLE
- Si problème détecté : fix immédiat priorité #1

#### Risque #4 : Abandon Avant Completion (Motivation)

**Impact :** Medium - Projet solo, risque démotivation

**Probabilité :** Medium - Seeds AllSanity longues (30h+)

**Mitigation :**
- Approche progressive (v0.1 → v0.2 → v0.3) = victoires rapides
- Chaque version **jouable** = validation immédiate
- Pas de deadline = pression réduite

**Fallback si bloqué :**
- Accepter itérations multiples avant seed complète
- Partager v0.1/v0.2 avec amis pour feedback/motivation
- Réduire scope si nécessaire (rester sur v0.2)

## Functional Requirements

### Data Import & Management

- **FR1:** Users can import a spoiler.json file from the OOT Randomizer
- **FR2:** The system can parse spoiler.json and extract check data (names, locations)
- **FR3:** The system can parse spoiler.json and extract entrance mappings
- **FR4:** The system can validate spoiler.json format before loading
- **FR5:** Users can see confirmation of successful data import with check count
- **FR48:** The system can load a check metadata reference file containing zone and type mappings for all checks
- **FR49:** The system can match spoiler.json checks against the metadata reference to retrieve zone and type information
- **FR50:** The system can handle checks not found in the metadata reference (display as "Unknown Zone" / "Unknown Type")
- **FR51:** The system can display warnings for unmapped checks

### Checks Management

- **FR6:** Users can view a complete list of all checks from the loaded seed
- **FR7:** Users can filter checks by zone (using metadata from reference file)
- **FR8:** Users can filter checks by type (using metadata from reference file)
- **FR9:** Users can apply multiple filters simultaneously (Zone × Type)
- **FR10:** Users can mark a check as "Done" (✅)
- **FR11:** Users can unmark a check back to "Not Done" (⬜)
- **FR12:** Users can toggle to hide all completed checks from the list
- **FR13:** Users can reset filters to show all checks
- **FR14:** The system can display checks using exact nomenclature from spoiler.json

### Entrances Management

- **FR15:** Users can record a discovered entrance as "Zone A → Zone B"
- **FR16:** Users can select an entrance from a list that reduces as entrances are recorded
- **FR17:** Users can search entrances by text
- **FR18:** Users can filter recorded entrances by zone
- **FR19:** Users can view the count of recorded entrances per zone
- **FR20:** Users can configure decoupled entrance mode (independent entrance directions)
- **FR21:** Users can delete a recorded entrance

### Pathfinding & Navigation

- **FR22:** Users can specify a starting zone for pathfinding
- **FR23:** Users can specify a destination zone for pathfinding
- **FR24:** Users can specify their current age context (Child or Adult) for pathfinding
- **FR25:** The system can calculate the optimal path between two zones using recorded entrances
- **FR26:** The system can integrate Save Warp as a free teleportation option in path calculations
- **FR27:** Users can see the calculated path displayed step-by-step
- **FR28:** Users can navigate directly to the checks view for the destination zone from pathfinding results
- **FR29:** The system can indicate when no path is available between zones

### Statistics & Progress Tracking

- **FR30:** Users can view global progression (X/Total checks completed)
- **FR31:** Users can view progression by check type (Pots, Chests, etc.)
- **FR32:** Users can view progression by zone
- **FR33:** Users can see statistics showing both "Done" and "To Do" perspectives
- **FR34:** Users can see a persistent mini progress counter while browsing checks
- **FR35:** Users can view detailed statistics for each zone (drill-down)
- **FR36:** Users can view entrance discovery statistics per zone

### Data Persistence & Export

- **FR37:** Users can export their complete progress to a JSON file
- **FR38:** Users can import a previously exported JSON file to restore progress
- **FR39:** The system can validate imported JSON files before loading
- **FR40:** The system can detect corrupted or invalid JSON files and reject them
- **FR41:** The system can display detailed error messages for invalid imports
- **FR42:** The system can preserve all tracker state in exports (checks, entrances, statistics)
- **FR43:** Users can see metadata about imported saves (date, check count, status)

### User Experience & Customization

- **FR44:** Users can toggle between Dark mode and Light mode
- **FR45:** The system can persist the selected theme across sessions
- **FR46:** Users can view large lists (3000+ items) with smooth scrolling performance
- **FR47:** The system can display check lists with virtual scrolling for performance

## Non-Functional Requirements

### Performance

**Response Time Requirements:**

- **NFR-PERF-1:** Check filtering (Zone × Type) on 3000+ items must complete within **100ms** (Target: <50ms)
- **NFR-PERF-2:** Pathfinding calculation (Dijkstra with Save Warp) must complete within **2 seconds** (Target: <1s)
- **NFR-PERF-3:** Virtual scrolling rendering must maintain **60 FPS** during list navigation
- **NFR-PERF-4:** Initial application load time must be under **3 seconds** (Target: <1s)
- **NFR-PERF-5:** Toggle actions (mark check, hide completed, dark/light mode) must be **instantaneous** (<50ms perceived)

**Memory & Resource Management:**

- **NFR-PERF-6:** Application must maintain stable memory usage during **50+ hour sessions**
- **NFR-PERF-7:** No performance degradation after marking **1000+ checks**
- **NFR-PERF-8:** Browser memory consumption must remain **<500MB** during typical gameplay sessions

**Rationale:** Performance est un dealbreaker - si le filtrage lag, le tracker devient inutilisable pendant le jeu.

### Reliability & Data Integrity

**Data Persistence:**

- **NFR-REL-1:** JSON export/import must achieve **100% data fidelity** (zero loss of checks, entrances, or statistics)
- **NFR-REL-2:** JSON validation must detect **100% of corrupted files** before attempting import
- **NFR-REL-3:** Invalid JSON imports must **never** corrupt or overwrite existing tracker state
- **NFR-REL-4:** Export JSON file size must remain **<5MB** for 3000 checks (Target: <1MB)

**Application Stability:**

- **NFR-REL-5:** Application must handle **3000+ checks** without crashes or freezes
- **NFR-REL-6:** Application must recover gracefully from parsing errors in spoiler.json or metadata files
- **NFR-REL-7:** Application state must remain consistent across browser refresh or accidental closure (via localStorage or session recovery)

**Rationale:** Corruption de sauvegarde après 30h de seed = dealbreaker absolu. La fiabilité est NON-NÉGOCIABLE.

### Usability & User Experience

**Session Longevity:**

- **NFR-UX-1:** Application must support **continuous sessions of 50+ hours** without requiring restart
- **NFR-UX-2:** Dark mode and Light mode must provide **sufficient contrast** for extended gameplay sessions (avoid eye strain)
- **NFR-UX-3:** UI must minimize required clicks to support **controller-in-hand gameplay** (mouse available as fallback)

**Learning Curve:**

- **NFR-UX-4:** Core workflows (import seed, filter checks, mark complete, export save) must be **intuitive without tutorial** for OOT Randomizer players
- **NFR-UX-5:** Error messages must be **clear and actionable** (e.g., JSON validation errors specify line and issue)

**Rationale:** Sessions longues (30h+ seeds) nécessitent UX confortable. Interface doit être fluide avec manette en main.

### Compatibility

**Browser Support:**

- **NFR-COMPAT-1:** Application must function correctly on **latest stable versions** of Chrome, Firefox, Edge, and Safari (desktop only)
- **NFR-COMPAT-2:** Application must support browsers with ES2020+ JavaScript capabilities
- **NFR-COMPAT-3:** No support required for legacy browsers (IE11, outdated versions)

**Responsive Design:**

- **NFR-COMPAT-4:** Application must be responsive across desktop resolutions from **1366×768 to 5120×2880**
- **NFR-COMPAT-5:** Layout must adapt to both **laptop screens (14")** and **large monitors (27" 5K)**
- **NFR-COMPAT-6:** No mobile device support required (tablets, smartphones)

**Cross-Platform:**

- **NFR-COMPAT-7:** JSON save files must be **portable across operating systems** (Windows, macOS, Linux)
- **NFR-COMPAT-8:** Application must function identically across supported browsers (no browser-specific features)

**Rationale:** Desktop-only, niche audience technique - pas besoin de support legacy ou mobile.

### Maintainability

**Code Quality:**

- **NFR-MAINT-1:** Codebase must follow **Angular best practices** (modules, services, lazy loading, OnPush change detection)
- **NFR-MAINT-2:** Components must be **modular and reusable** (Checks, Entrances, Pathfinding, Stats as separate modules)
- **NFR-MAINT-3:** Code must include **TypeScript strict mode** for type safety

**Documentation:**

- **NFR-MAINT-4:** Check metadata reference JSON must be **human-readable and maintainable**
- **NFR-MAINT-5:** README must document spoiler.json format expectations and metadata file structure

**Rationale:** Projet solo - code maintenable critique pour itérations futures (v0.1 → v0.2 → v0.3).
