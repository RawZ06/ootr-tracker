---
stepsCompleted: [1, 2, 3]
inputDocuments: []
session_topic: 'Application de tracking pour Zelda Ocarina of Time Randomizer avec 4 modules (Checks, Entrances, Pathfinding, Statistiques)'
session_goals: 'Gérer ~3000 collectibles avec filtrage intelligent, tracking des entrances, pathfinding optimal avec Save Warp, statistiques détaillées par type/zone, sauvegarde JSON'
selected_approach: 'AI-Recommended Techniques'
techniques_used: ['First Principles Thinking', 'Morphological Analysis', 'SCAMPER Method']
ideas_generated: ['MVP simplifié avec 2 états', 'Toggle masquer checks faits', 'Mode exploration zones accessibles', 'Compteur entrances par zone', 'Bouton pathfinding depuis entrances', 'Mini compteur progression', 'Mode dark/light', 'Undo dernière action', 'Partage lecture seule', 'Stats double perspective fait/à faire']
context_file: '/Users/alexandre/Developer/Rando/NotesAllSanity/_bmad/bmm/data/project-context-template.md'
technique_execution_complete: true
---

# Brainstorming Session Results

**Facilitator:** Alexandre
**Date:** 2026-01-05

## Session Overview

**Topic:** Application de tracking pour Zelda Ocarina of Time Randomizer avec 4 modules principaux (Checks, Entrances, Pathfinding, Statistiques)

**Goals:**
- Gérer ~3000 collectibles avec système de filtrage intelligent
- Tracking des entrances et traçabilité de navigation
- Pathfinding optimal entre zones avec Save Warp
- Statistiques détaillées par type et par zone
- Système de sauvegarde JSON portable

### Context Guidance

Cette session se concentre sur le développement de produit logiciel avec exploration de :
- Problèmes utilisateurs et points de douleur dans le tracking de randomizer
- Fonctionnalités et capacités de l'application
- Approches techniques (UI/UX, algorithmes de pathfinding, gestion d'état)
- Modèle de valeur et différenciation
- Métriques de succès

### Session Setup

Session initialisée avec approche de techniques recommandées par IA pour générer des idées optimales autour de l'architecture de l'application, de l'expérience utilisateur, et des fonctionnalités techniques avancées (pathfinding, statistiques multi-dimensionnelles).

## Technique Selection

**Approche:** AI-Recommended Techniques
**Contexte d'Analyse:** Application de tracking Zelda OOT Randomizer avec focus sur gestion de complexité (3000+ items), UX/UI intuitive, pathfinding intelligent, et statistiques multi-dimensionnelles.

**Techniques Recommandées:**

**Phase 1 - First Principles Thinking (Creative):** Déconstruction de l'application en éliminant toutes les assumptions pour identifier les vérités fondamentales de chaque module. Cette technique va révéler les véritables contraintes vs contraintes perçues et établir une architecture conceptuelle solide. Résultat attendu: fondations claires, identification des besoins réels sans contraintes artificielles.

**Phase 2 - Morphological Analysis (Deep):** Exploration systématique de toutes les combinaisons possibles de paramètres techniques pour chaque module (types de filtres × algorithmes × formats d'affichage pour Checks; algorithmes pathfinding × structures de données × optimisations). Résultat attendu: matrice complète des options techniques, identification des combinaisons optimales, découverte de solutions non-évidentes.

**Phase 3 - SCAMPER Method (Structured):** Application méthodique des sept lentilles d'innovation (Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse) pour raffiner et améliorer chaque aspect identifié dans les phases précédentes. Résultat attendu: fonctionnalités améliorées, innovations UX concrètes, différenciation de l'application.

**Rationale IA:** Cette séquence progressive (déconstruction → exploration systématique → raffinement créatif) est optimale pour des projets complexes nécessitant à la fois solidité architecturale et innovation UX. Les techniques se complètent pour couvrir l'analyse fondamentale, l'exploration exhaustive des options, et l'optimisation créative des solutions.

---

## Technique 1 : First Principles Thinking

**Objectif:** Déconstruire l'application pour identifier les vérités fondamentales sans assumptions.

### Vérités Fondamentales Découvertes

#### Contexte Global
- **Seeds difficiles** : 30h+ de gameplay
- **~3000 checks** impossibles à mémoriser
- **Mémoire humaine défaillante** sur sessions longues
- **Notes manuelles obligatoires** (règle du jeu)
- **Source de données** : spoiler.json des développeurs du randomizer

#### Module 1 : Checks Tracker

**Besoin Fondamental :**
- Éviter la perte de temps (ne pas refaire ce qui est déjà fait)
- Planification de route (vérifier AVANT d'y aller, pas après)
- Confiance dans le système (notes fiables)

**Workflow Mental du Joueur :**
1. "Est-ce que j'ai déjà vérifié ça ?"
2. "Quel item pourrait être là ?"
3. "Cet item me fait-il progresser maintenant ?"

**Principe de Design : Tracker = Disque Dur, PAS IA**
- ✅ Afficher les informations clairement
- ✅ Filtrer pour que le joueur puisse voir ce qui l'intéresse
- ✅ Le joueur analyse lui-même son inventaire vs les checks
- ❌ PAS de prise de décision automatique
- **Le plaisir du jeu = l'analyse personnelle du joueur**

**Données des Checks :**
- Format nomenclature du spoiler.json (noms exacts définis par les développeurs)
- Exemples : `GC Darunia Pot 1`, `KF Midos Top Left Chest`, `LW Target in Woods`
- Les noms sont suffisamment descriptifs pour localiser les checks
- Pas besoin d'informations supplémentaires

**Système de Filtrage :**
- **Multi-critères** : Zone + Type
- Exemple : "Goron City + Pots" → affiche les 9 pots de Goron City
- But : Réduire 3000 checks à une liste gérable et pertinente

**3 États par Check :**
1. ✅ **Fait** : Check complété et coché
2. ⬜ **Non fait** : Pas encore vérifié
3. 👁️ **Vu mais pas pris** : Item identifié mais manque prérequis pour le récupérer

**Workflow de Décision :**
1. Filtrer (ex: "Goron City + Pots")
2. Voir la liste résultante
3. Analyser personnellement (pots = bouton A, accessible ; coffres = peuvent nécessiter bombes/marteau)
4. Évaluer motivation (nombre de checks = chances de progression)
5. Décider d'y aller
6. Utiliser pathfinding pour le trajet

**Types de Checks et Prérequis :**
- **Pots** : Peu/aucun prérequis (bouton A pour casser)
- **Coffres** : Peuvent nécessiter items (bombes, marteau, etc.)
- **Skulls** : Variables selon localisation
- Plus de checks accessibles = plus grande motivation à y aller

#### Module 2 : Entrances Tracker

**Contexte : Entrance Randomizer**
- Toutes les entrées/sorties du jeu sont mélangées
- Besoin de reconstruire le réseau de connexions

**Principe : Entrances Unidirectionnelles**
- Les entrances sont **unidirectionnelles** (graphe orienté)
- `Cimetière -> Temple de l'ombre` ≠ `Temple de l'ombre -> Cimetière`
- Certaines entrances ne peuvent être prises que dans un sens
- Il existe des prérequis (âmes de mobs, téléportations, etc.)

**Format de Notation :**
- Format du spoiler.json : `[Zone Source] -> [Zone Destination]`
- Exemples :
  - `Lake Hylia -> LH Lab` (depuis Lake Hylia, j'entre dans le laboratoire)
  - `SFM Fairy Grotto -> Sacred Forest Meadow` (depuis la grotte fée, j'arrive à SFM)

**Workflow de Découverte Progressive :**
1. **Passer une warp** → STOP immédiat
2. **Noter** : "Je viens de [Zone A], j'ai pris [Entrance X->Y]"
3. **Faire les checks** de la zone actuelle
4. **Chercher entrances non explorées** dans la zone → En prendre une au hasard
5. **Répéter** jusqu'à avoir mappé suffisamment le réseau
6. **Phase ciblée** : Utiliser pathfinding avec le réseau reconstruit

**Interface : Filtrage par Zone Actuelle**
```
Kokiri Forest Entrances:
  ✅ KF -> Shop (exploré)
  ✅ KF -> Links House (exploré)
  ⬜ KF -> Sarias House (pas encore fait)
  ⬜ KF -> Lost Woods (pas encore fait)
```
**Cas d'usage :** "Je suis à KF, quelles entrances me restent à explorer ici ?"

**Option : Decoupled Entrances**
- **Si Decoupled = OFF (couplé) :**
  - Notation : `Lake Hylia → LH Lab` arrive à `Cimetière ← Shadow Temple`
  - Le système déduit automatiquement : `Shadow Temple → Cimetière` mène à `LH Lab → Lake Hylia`

- **Si Decoupled = ON (découplé) :**
  - Chaque direction est indépendante
  - Faut noter les deux sens séparément

→ **Option configurable basée sur le setting de la seed**

**Contraintes et Prérequis :**
- Le pathfinding gère uniquement les contraintes structurelles permanentes
- Prérequis temporaires (âme de mob, items) = géré mentalement par le joueur
- "Pas l'âme du mob ? Tant pis" - le joueur assume

#### Module 3 : Pathfinding

**Besoin Fondamental :**
- **Trop complexe pour calcul mental** avec entrance randomizer
- Exception au principe "tracker = disque dur" : ici le tracker CALCULE

**Workflow :**
- Input : Position actuelle + Destination désirée
- Output : Chemin(s) pour y arriver

**Principe : Multi-Chemins avec Optimisation**
- Proposer **plusieurs chemins** si disponibles
- Prioriser le **moins d'entrances** à traverser (chemin optimal)
- Le joueur choisit parmi les options proposées

**Save Warp : Téléportation Gratuite Contextualisée**
- **Save Warp disponible depuis N'IMPORTE OÙ** vers la zone de spawn
- **CRITIQUE :** Contextualisé par âge
  - 🧒 **Child Spawn** ≠ 🧔 **Adult Spawn**
  - Le joueur spécifie : "Je suis Child" ou "Je suis Adult"
  - Le pathfinding calcule depuis le bon spawn point

**Exemple :**
```
Situation : Child au Market, destination DMC
Option 1 : Market → entrance 1 → ... → DMC (5 entrances)
Option 2 : Save Warp (Child Spawn) → entrance 2 → ... → DMC (3 entrances) ⭐ OPTIMAL
```

**Gestion de l'Impossible :**
- Si aucun chemin trouvé : afficher **"Impossible"**
- Causes possibles :
  - Destination jamais visitée
  - Entrance existe mais Child-only (joueur est Adult) ou vice-versa
  - Manque chants de téléportation
- **Pas besoin d'explication complexe** → Signal pour explorer davantage

**Contraintes :**
- Pathfinding ignore les prérequis d'items temporaires
- Utilise uniquement les contraintes structurelles permanentes du jeu

#### Module 4 : Statistiques

**Moments de Consultation :**
1. **En cours de jeu (continu)** :
   - Voir progression globale
   - Motivation ("il me reste tant à faire")

2. **Bilan final** :
   - Combien de checks non faits ?
   - Lesquels étaient bloqués/inutiles ?

**Architecture de Vue : Séparée avec Drill-Down**

**Vue Globale par Type (Toujours visible) :**
```
Global - Tous Types :
  Pots : 46 / 230 (✅ 46 | ⬜ 180 | 👁️ 4)
  Coffres : 12 / 150 (✅ 12 | ⬜ 138)
  Skulls : 8 / 100 (✅ 8 | ⬜ 90 | 👁️ 2)
  Grass : 25 / 300 (✅ 25 | ⬜ 275)
  ...
```

**Vue par Zone (Cliquable pour détail) :**
```
Goron City : 45 checks total [Cliquer pour détail]
  → Ouvre décomposition :
    Pots : 9 (✅ 5 | ⬜ 3 | 👁️ 1)
    Coffres : 3 (✅ 1 | ⬜ 2)
    Skulls : 2 (✅ 2)
    ...
```

**Les 3 États dans les Statistiques :**
1. ✅ **Fait** : Check complété
2. ⬜ **Non fait** : Pas encore vérifié
3. 👁️ **Vu mais pas pris** : Identifié mais manque item pour récupérer

**Tous les 3 états sont séparés et comptabilisés distinctement**

#### Cross-Module : Sauvegarde

**Format : Export/Import JSON**
- Export de toute la progression dans un fichier JSON
- Import du JSON pour reprendre exactement où on s'était arrêté
- Support sessions 50h+ réparties sur plusieurs sessions
- Portabilité (peut partager/sauvegarder sur différents devices)

### Insights Clés de First Principles

**Insight #1 : Tracker comme Extension de Mémoire**
- Le tracker n'est pas un outil de "complétion" mais un **outil anti-gaspillage de temps**
- Garde-fou contre la redondance sur sessions longues (30h+)
- La vraie anxiété : "Enchaîner 1h de checks déjà faits par manque de notes"

**Insight #2 : Plaisir = Analyse Personnelle**
- Le plaisir du randomizer = analyser soi-même
- Le tracker doit rester un "disque dur" (sauf pathfinding)
- Préserver l'autonomie du joueur dans la prise de décision

**Insight #3 : Graphe Orienté Complexe**
- Les entrances forment un graphe orienté avec contraintes
- Directionnalité + contexte (Child/Adult) + prérequis
- Pathfinding = seule partie "intelligente" du tracker (trop complexe pour calcul mental)

**Insight #4 : Contexte Âge Critique**
- Child vs Adult = deux états de jeu fondamentalement différents
- Affecte : Save Warp spawn, accessibilité entrances, prérequis
- Doit être géré explicitement dans le pathfinding

**Insight #5 : Progression Multi-Dimensionnelle**
- Pas juste "nombre de checks faits"
- Par type (Pots, Coffres, Skulls, etc.)
- Par zone (Goron City, Kokiri Forest, etc.)
- Par état (Fait, Non fait, Vu mais pas pris)
- Vision globale + drill-down pour analyse fine

---

## Technique 2 : Morphological Analysis

**Objectif:** Explorer systématiquement toutes les combinaisons possibles de paramètres techniques pour chaque module.

### Méthodologie

Pour chaque module, identification des **paramètres variables clés**, puis exploration de **toutes les options** pour chaque paramètre, et enfin test de **combinaisons** pour découvrir des solutions optimales.

### Contrainte Critique Découverte

🎮 **Manette en main pendant le jeu** → Minimiser les clics et les interactions complexes

Cette contrainte a guidé toutes les décisions UX pour privilégier la fluidité et la simplicité d'interaction.

---

### Module 1 : Checks Tracker - Matrice & Solutions

#### Paramètres Identifiés

1. **Interface d'Affichage** : Comment afficher la liste de checks ?
2. **Système de Filtrage** : Comment implémenter les filtres multi-critères ?
3. **Interaction de Cochage** : Comment le joueur coche les checks ?
4. **Indicateurs Visuels** : Comment représenter les 3 états ?
5. **Organisation des Données** : Comment grouper/trier les checks ?
6. **Stratégie de Chargement** : Comment gérer la performance avec 3000 items ?

#### Options Explorées par Paramètre

**Paramètre 1 - Interface d'Affichage :**
- A. Liste simple scrollable
- B. Tableau filtrable
- C. Vue hiérarchique expandable
- D. Vue compacte avec expansion

**Paramètre 2 - Système de Filtrage :**
- A. Dropdowns séparés (Zone + Type)
- B. Recherche textuelle intelligente
- C. Tags cliquables
- D. Filtres favoris sauvegardables

**Paramètre 3 - Interaction de Cochage :**
- A. Simple clic (toggle)
- B. Menu contextuel
- C. Swipe mobile
- D. Raccourcis clavier

**Paramètre 4 - Indicateurs Visuels :**
- A. Couleurs (Vert/Gris/Jaune)
- B. Icônes (✅ ⬜ 👁️)
- C. Style de texte (barré/normal/italique)
- D. Badges

**Paramètre 5 - Organisation :**
- A. Par zone
- B. Par type
- C. Plat (sans groupement)
- D. Mixte (zone PUIS type)

**Paramètre 6 - Stratégie de Chargement :**
- A. Pagination classique
- B. Infinite scroll
- C. Virtualisation (affichage uniquement du visible)
- D. Chargement par seuil

#### Combinaisons Testées & Insights

**Combinaison 1 (A+A+A+B+A+aucun)** : Liste simple + Dropdowns
- ❌ Problème identifié : Scroll trop long = lourdeur du tracker

**Combinaison 2 (D+A+A+B+A)** : Vue compacte
- ❌ Problème identifié : Trop de clics requis (incompatible avec manette en main)

**Combinaison 3 (C+B+A+B+D)** : Vue hiérarchique
- ❌ Problème identifié : Trop de clics pour expand/collapse (incompatible avec manette)

**Combinaison 4 (A+A+Cycle 3 états+B+D+B+C) - SOLUTION RETENUE** ✅

#### Solution Optimale Retenue

**Combinaison finale :**
- **Interface** : Liste simple scrollable avec infinite scroll + virtualisation
- **Filtrage** : Dropdowns séparés (Zone + Type), modifiables à tout moment
- **Interaction** : **Cycle à 3 états en un clic** : ⬜ → ✅ → 👁️ → ⬜
- **Indicateurs** : Icônes (✅ ⬜ 👁️)
- **Organisation** : Sorted list groupée par zone ET type
- **Chargement** : Infinite scroll avec virtualisation (comme Twitter)

**Interface Résultante :**
```
[Dropdown: Goron City ▼] [Dropdown: Pots ▼] [Réinitialiser filtres]

=== Goron City - Pots ===
⬜ GC Darunia Pot 1          [Clic: passe à ✅]
✅ GC Darunia Pot 2          [Clic: passe à 👁️]
👁️ GC Medigoron Pot          [Clic: passe à ⬜]
⬜ GC Lower Staircase Pot 1
...
[Scroll automatique] → Charge suivants dynamiquement
```

**Avantages de cette combinaison :**
- ✅ Navigation manette fluide (pas de clics inutiles)
- ✅ Performance optimale (virtualisation = pas de lag même avec 3000 checks)
- ✅ Flexibilité (filtrage modifiable à tout moment pendant le scroll)
- ✅ Clarté (groupement organisé évite la confusion)
- ✅ Interaction rapide (un seul clic pour changer d'état)

---

### Module 2 : Entrances Tracker - Matrice & Solutions

#### Innovation Découverte : Sélecteur Auto-Réductif

**Concept clé :** Le sélecteur d'entrances se réduit au fur et à mesure qu'on note les entrances découvertes.

**Double fonction :**
1. **Facilité** : Liste de plus en plus courte = recherche rapide
2. **Visualisation** : Voir combien d'entrances restent à découvrir

#### Solution Retenue

**Format de Notation :**
```
=== Noter une Entrance ===

Entrance (d'où je viens) : [Sélecteur auto-réductif]
  → Liste COMPLÈTE initiale (toutes les entrances du spoiler log)
  → Se RÉDUIT automatiquement quand une entrance est notée
  → Recherche textuelle intégrée

Exemple au début :
  [Recherche : "lost" 🔍]
  ▼ Lost Woods -> LW Near Shortcuts Grotto
  ▼ Kokiri Forest -> Lost Woods
  ▼ Sacred Forest Meadow -> Lost Woods
  ...

Après notation de "Lost Woods -> LW Near Shortcuts Grotto" :
  ✅ Cette option DISPARAÎT de la liste
  → Liste réduite = recherche plus facile

Résultat (où je suis arrivé) : [Sélecteur zones]
  → Exemple : ZD Storms Grotto -> Zoras Domain
```

**Vue des Entrances Notées :**
```
[Dropdown: Filtrer par zone ▼]

=== Zoras Domain ===
✅ ZD Storms Grotto -> Zoras Domain
✅ Lake Hylia -> Zoras Domain

=== Lost Woods ===
✅ Lost Woods -> LW Near Shortcuts Grotto
⬜ (Autres entrances non encore découvertes)
```

**Avantages :**
- ✅ Progression visible (liste qui diminue)
- ✅ Recherche de plus en plus facile
- ✅ Motivation (voir les découvertes restantes)
- ✅ Format standardisé du spoiler log

**Option Configurable : Decoupled Entrances**
- Setting basé sur la configuration de la seed
- Si couplé : déduction automatique de l'entrance inverse
- Si découplé : notation séparée requise

---

### Module 3 : Pathfinding - Matrice & Solutions

#### Paramètres Identifiés

1. **Input Interface** : Comment spécifier départ/arrivée/contexte ?
2. **Output Format** : Comment afficher les chemins trouvés ?
3. **Gestion Multi-Chemins** : Afficher un ou plusieurs chemins ?
4. **Save Warp** : Comment intégrer la téléportation gratuite ?

#### Options Explorées pour Output

**Option A - Liste de chemins multiples :**
```
Chemin 1 (3 entrances) ⭐ OPTIMAL
Chemin 2 (5 entrances)
...
```

**Option B - Étapes détaillées d'un seul chemin :** ✅ RETENUE
```
Chemin optimal (3 entrances) :
Étape 1 : Market -> Hyrule Field
Étape 2 : Hyrule Field -> Kakariko
Étape 3 : Kakariko -> DMC
```

**Raison du choix :** Meilleure visualisation, facile à suivre pendant le jeu

#### Solution Retenue

**Interface Complète :**
```
=== Pathfinding ===

De : [Dropdown: Market ▼]
Vers : [Dropdown: Death Mountain Crater ▼]
Je suis : [Child] [Adult] ← Toggle

[Calculer le chemin]

────────────────────────────────
Chemin optimal (3 entrances) :

Étape 1 : Market -> Hyrule Field
Étape 2 : Hyrule Field -> Kakariko Village
Étape 3 : Kakariko Village -> Death Mountain Crater

[Option : Voir chemin alternatif si disponible]
────────────────────────────────
```

**Si aucun chemin trouvé :**
```
❌ Aucun chemin trouvé

Vous devez explorer davantage ou trouver
des chants de téléportation.
```

**Fonctionnalités clés :**
- ✅ Contexte Child/Adult explicite (affecte Save Warp et accessibilité)
- ✅ Affichage étape par étape (facile à suivre)
- ✅ Option de chemins alternatifs (si le joueur préfère un autre trajet)
- ✅ Message simple si impossible (signal pour explorer)

**Intégration Save Warp :**
- Considéré automatiquement comme option de téléportation gratuite
- Spawn point différent selon Child/Adult
- Inclus dans le calcul d'optimisation

---

### Module 4 : Statistiques - Matrice & Solutions

#### Paramètres Identifiés

1. **Organisation de l'Information** : Onglets vs Vue unifiée vs Dashboard ?
2. **Niveau de Détail** : Toujours visible vs expandable ?
3. **Groupement** : Par type, par zone, ou les deux ?

#### Options Explorées

**Option A - Onglets :**
- Navigation entre [Par Type] et [Par Zone]

**Option B - Vue unifiée :** ✅ RETENUE
- Tout visible en un scroll

**Option C - Dashboard avec widgets :**
- Widgets séparés pour différentes métriques

**Raison du choix :** Vue unifiée = toute l'information d'un coup d'œil, pas de navigation nécessaire

#### Solution Retenue

**Interface Complète :**
```
=== Statistiques ===

📊 Progression Globale : 58/3000 checks (1.9%)

─────────────────────────────────────────
📦 Par Type
─────────────────────────────────────────
Pots      : 46/230  (✅ 46 | ⬜ 180 | 👁️ 4)
Coffres   : 12/150  (✅ 12 | ⬜ 138 | 👁️ 0)
Skulls    :  8/100  (✅  8 | ⬜ 90  | 👁️ 2)
Grass     : 25/300  (✅ 25 | ⬜ 275 | 👁️ 0)
Beehives  :  2/50   (✅  2 | ⬜ 48  | 👁️ 0)
...

─────────────────────────────────────────
🗺️ Par Zone [Scroll pour détails]
─────────────────────────────────────────
▼ Goron City : 15/45 (33.3%)
    Pots    : 5/9   (✅ 5 | ⬜ 3 | 👁️ 1)
    Coffres : 1/3   (✅ 1 | ⬜ 2 | 👁️ 0)
    Skulls  : 2/2   (✅ 2 | ⬜ 0 | 👁️ 0)
    Grass   : 7/15  (✅ 7 | ⬜ 8 | 👁️ 0)
    ...

▼ Kokiri Forest : 8/60 (13.3%)
    Pots    : 3/15  (✅ 3 | ⬜ 12 | 👁️ 0)
    Coffres : 2/10  (✅ 2 | ⬜ 8  | 👁️ 0)
    ...

[Continue scroll pour autres zones...]
```

**Fonctionnalités clés :**
- ✅ Progression globale en tête (motivation)
- ✅ Vue par type toujours visible (comprendre quels types manquent)
- ✅ Vue par zone avec détail (drill-down pour analyse fine)
- ✅ Les 3 états séparés partout (✅ Fait | ⬜ Non fait | 👁️ Vu)
- ✅ Pourcentages de complétion (feedback visuel immédiat)
- ✅ Tout en un scroll (pas de navigation, pas de clics)

**Cas d'usage :**
1. **En cours de jeu** : Vérifier progression, se motiver
2. **Fin de partie** : Voir checks non faits, identifier ceux bloqués/inutiles

---

### Insights Clés de Morphological Analysis

**Insight #1 : Contrainte Manette = Design Minimaliste**
- Chaque clic compte quand on a une manette en main
- Privilégier infinite scroll, cycles d'états, vues unifiées
- Éviter menus contextuels, expand/collapse, navigation multi-niveaux

**Insight #2 : Virtualisation = Performance Sans Compromis**
- Afficher 3000 checks sans lag grâce à la virtualisation
- Permet UX fluide (liste complète) + performance technique

**Insight #3 : Sélecteur Auto-Réductif = Double Valeur**
- Facilite la saisie (liste plus courte au fil du temps)
- Visualise la progression (voir ce qui reste à découvrir)
- Innovation émergée de la combinaison exploration/notation

**Insight #4 : Vue Unifiée > Navigation**
- Pour les stats : tout visible d'un coup > navigation entre onglets
- Scroll vertical naturel avec manette
- Pas de contexte perdu en changeant de vue

**Insight #5 : Détail Étape par Étape = Meilleure UX Pathfinding**
- Affichage linéaire des étapes > liste de chemins abstraits
- Plus facile à visualiser et suivre pendant le jeu
- Option de chemins alternatifs pour flexibilité

**Insight #6 : Standardisation Format Spoiler Log**
- Utiliser le format existant des développeurs = cohérence
- Pas besoin de réinventer, les joueurs connaissent déjà
- Facilite l'import/export de données

---

## Technique 3 : SCAMPER Method

**Objectif:** Appliquer 7 lentilles systématiques d'innovation pour raffiner et améliorer les solutions identifiées.

### Méthodologie SCAMPER

Application des 7 lentilles créatives :
- **S**ubstitute (Substituer) : Que remplacer pour améliorer ?
- **C**ombine (Combiner) : Quels éléments fusionner ?
- **A**dapt (Adapter) : Qu'emprunter d'ailleurs ?
- **M**odify (Modifier) : Que changer pour optimiser ?
- **P**ut to other uses (Autres usages) : Quels usages alternatifs ?
- **E**liminate (Éliminer) : Que supprimer pour simplifier ?
- **R**everse (Inverser) : Qu'inverser pour innover ?

---

### Lentille S : SUBSTITUTE (Substituer)

**Exploration :** Que pourrait-on substituer pour améliorer l'expérience ?

**Substitutions explorées :**
- Dropdowns → Raccourcis clavier : ❌ Rejeté (complexité inutile)
- Clic → Gestures tactiles : ❌ Rejeté (manette = priorité)
- Texte → Icônes visuelles : ❌ Rejeté (noms existants suffisants)
- Sélecteur textuel → Carte visuelle : ❌ Rejeté (entrances)
- Auto-détection Child/Adult : ❌ Rejeté (complexité)
- Texte "Étapes 1, 2, 3" → Carte avec trajet : ❌ Rejeté après réflexion

**Résultat :** Aucune substitution retenue - les choix de base sont optimaux

**Insight clé :** Parfois la simplicité originale est la meilleure solution. Ne pas substituer juste pour substituer.

---

### Lentille C : COMBINE (Combiner)

**Exploration :** Quels modules/fonctionnalités combiner pour meilleure UX ?

**Combinaisons explorées :**

1. **Checks + Pathfinding** : Bouton "Aller à [zone]" depuis checks
   - ❌ Rejeté (moyennement convaincant)

2. **Entrances + Pathfinding** : Afficher état entrances dans chemin
   - ❌ Rejeté (moyennement convaincant)

3. **Stats + Checks** : Cliquer zone dans stats → ouvre checks filtrés
   - ❌ Rejeté (moyennement convaincant)

4. **Pathfinding → Checks** : Bouton destination → ouvre checks de cette zone ✅
   - ✅ **RETENU** - Workflow naturel après pathfinding

5. **Checks + Stats** : Mini compteur progression visible pendant scroll ✅
   - ✅ **RETENU** - Feedback constant motivant

**Combinaisons Retenues pour MVP :**

**Combinaison #1 : Mini Compteur Progression**
```
[Dropdown: Goron City ▼] [Dropdown: Pots ▼]

📊 Progression : 58/3000 (1.9%) ← Sticky header pendant scroll

=== Goron City - Pots ===
⬜ GC Darunia Pot 1
✅ GC Darunia Pot 2
...
```

**Avantage :** Motivation constante, voir progression sans changer de module

**Combinaison #2 : Pathfinding → Lancer Checks**
```
=== Pathfinding ===

Chemin optimal (3 entrances) :
Étape 1 : Market -> Hyrule Field
Étape 2 : Hyrule Field -> Kakariko Village
Étape 3 : Kakariko Village -> Death Mountain Crater

[➤ Ouvrir Checks à Death Mountain Crater]
```

**Workflow naturel :** Pathfinding → Arriver → Faire les checks

---

### Lentille A : ADAPT (Adapter)

**Exploration :** Qu'adapter d'autres apps/jeux que les joueurs connaissent ?

**Adaptations explorées :**

1. **Système Favoris (navigateurs web)** : Sauvegarder filtres fréquents
   - ❌ Rejeté (nice to have, pas MVP)

2. **Mode Dark/Light (Discord, Twitter)** ✅
   - ✅ **RETENU - MVP** - Indispensable pour sessions nocturnes

3. **Undo / Ctrl+Z (apps universelles)** ✅
   - ✅ **RETENU - MVP** - Annuler check coché par erreur

4. **Tags personnalisés (Notion)**
   - ⚠️ Noté comme "nice to have" mais pas prioritaire MVP

**Adaptations Retenues pour MVP :**

**Adaptation #1 : Mode Dark/Light**
```
[⚙️ Settings]
  Thème : [☀️ Light] [🌙 Dark] ← Toggle rapide
```

**Cas d'usage :** Jouer la nuit sans se cramer les yeux

**Adaptation #2 : Undo (Ctrl+Z)**
```
Module Checks :
  Undo : Annuler le dernier changement d'état
  Raccourci : Ctrl+Z
```

**Cas d'usage :** Clic accidentel rapide avec manette

---

### Lentille M : MODIFY (Modifier)

**Exploration :** Comment modifier/améliorer ce qu'on a déjà ?

**Modifications explorées :**

**Module Checks :**
- Modifier taille texte : ❌ Rejeté
- Modifier couleurs accessibilité : ❌ Rejeté (pas MVP)
- Modifier feedback sonore : ❌ Rejeté

**Module Entrances :**
- Modifier ordre tri : ❌ Rejeté
- Modifier affichage - Compteur par zone : ✅ **RETENU**

**Pathfinding :**
- Modifier priorité Save Warp : ⚠️ Post-MVP (bonne idée mais V2)
- Modifier niveau détail : ❌ Rejeté

**Stats :**
- Modifier granularité Child/Adult : ❌ Rejeté
- Modifier période cette session/total : ❌ Rejeté

**Modification Retenue pour MVP :**

**Compteur Entrances par Zone**
```
=== Module Entrances ===

[Filtrer par zone : Toutes ▼]

=== Lost Woods (3/15 entrances notées) ← Compteur ajouté
✅ Lost Woods -> LW Near Shortcuts Grotto
✅ Kokiri Forest -> Lost Woods
✅ Sacred Forest Meadow -> Lost Woods

=== Goron City (5/20 entrances notées) ← Compteur ajouté
✅ GC Shop -> Goron City
✅ Market -> GC Shop
...
```

**Avantage :** Voir d'un coup d'œil la progression d'exploration par zone

**Modification Post-MVP (V2) :**
- Option "Préférer/Éviter Save Warp" dans pathfinding

---

### Lentille P : PUT TO OTHER USES (Autres Usages)

**Exploration :** Utiliser modules différemment de leur usage principal ?

**Usages alternatifs explorés :**

**Module Checks :**
- Planification session : ❌ Rejeté
- Mode collaborative comparaison : ❌ Rejeté
- **Partage spectateur (lecture seule)** : ✅ Modifié et retenu

**Module Entrances :**
- Génération cheatsheet printable : ❌ Rejeté
- Mode apprentissage quiz : ❌ Rejeté

**Module Stats :**
- Prédiction temps restant : ❌ Rejeté
- Comparaison anciennes seeds : ❌ Rejeté

**Pathfinding :**
- **Mode exploration zones accessibles** : ✅ **RETENU**
- Calculateur distance : ❌ Rejeté (couvert par mode exploration)

**Usages Alternatifs Retenus :**

**Usage Alternatif #1 : Partage Lecture Seule**
```
=== Export / Partage ===

[Exporter JSON]
[Partager lien lecture seule] ← Génère URL pour spectateurs

Cas d'usage : Stream Twitch, montrer progression aux viewers
               Partager avec ami pour qu'il voit où on en est
```

**Post-MVP** - Nice to have, pas prioritaire MVP

**Usage Alternatif #2 : Mode Exploration Zones Accessibles**
```
=== Pathfinding - Mode Exploration ===

Ma position : [Market ▼]
Je suis : [Child]

[Montrer zones accessibles]

────────────────────────────────
📍 Zones accessibles depuis Market (Child) :

🔵 Hyrule Field (1 entrance) [➤ Y aller]
🔵 Temple du Temps (2 entrances) [➤ Y aller]
🔵 Back Alley (1 entrance) [➤ Y aller]
...

[Clic sur "Y aller" → Lance pathfinding vers cette zone]
────────────────────────────────
```

**Cas d'usage :**
- "Je suis au Market, qu'est-ce que je peux explorer d'ici ?"
- Inspiration pour savoir où aller chercher des checks
- Découverte du réseau d'entrances

**✅ RETENU pour MVP** - Valeur ajoutée claire pour exploration

---

### Lentille E : ELIMINATE (Éliminer)

**Exploration :** Que simplifier en éliminant sans perdre de valeur ?

**Éléments évalués pour élimination :**

**Module Checks :**
- Bouton "Réinitialiser filtres" : ❌ Gardé (utile)
- **État 👁️ "Vu mais pas pris"** : ✅ **ÉLIMINÉ**

**Module Entrances :**
- Vue "Entrances notées" : ❌ Gardé (utile)
- Option "Decoupled" : ❌ Gardé (nécessaire selon seeds)

**Pathfinding :**
- **Option "Chemins alternatifs"** : ✅ **ÉLIMINÉ pour MVP**

**Stats :**
- Vue "Par Zone" : ❌ Gardé (essentiel)

**Éliminations Retenues pour MVP :**

**Élimination #1 : État 👁️ "Vu mais pas pris"**

**Raison :** Cas trop rare pour justifier la complexité

**Avant (3 états) :**
```
⬜ → ✅ → 👁️ → ⬜  (Cycle à 3 états)
```

**Après (2 états - MVP) :**
```
⬜ ↔ ✅  (Toggle simple)
```

**Impacts positifs :**
- ✅ Interaction plus simple (toggle au lieu de cycle)
- ✅ Code plus simple à développer
- ✅ Stats simplifiées : `Pots : 46/230 (✅ 46 | ⬜ 184)`
- ✅ MVP livré plus rapidement

**Note :** Peut être ajouté en V2 si vraiment nécessaire après feedback utilisateurs

**Élimination #2 : Chemins Alternatifs Pathfinding**

**Raison :** Simplifier développement MVP, fonctionnalité secondaire

**MVP :**
```
Chemin optimal (3 entrances) :
Étape 1 : Market -> Hyrule Field
Étape 2 : Hyrule Field -> Kakariko
Étape 3 : Kakariko -> DMC
```

**Post-MVP (V2) :**
```
[Option : Voir chemin alternatif]
```

**Impact :** Développement MVP plus rapide, fonctionnalité peut être ajoutée plus tard

---

### Lentille R : REVERSE (Inverser)

**Exploration :** Et si on inversait certains concepts ?

**Inversions explorées :**

1. **Cocher ce qui EST fait → Cocher ce qui RESTE à faire**
   - ❌ **REJETÉ** - "On devrait tout cocher au début, burk"

2. **Filtrer pour réduire → Cacher ce qui est fait** ✅
   - ✅ **RETENU** - Toggle "Masquer checks faits"

3. **Où je veux aller → Qu'est-ce qui est proche** ✅
   - ✅ **RETENU** - Mode Exploration (déjà couvert dans "Other Uses")

4. **Noter d'où je viens → Noter où je peux aller**
   - ❌ **REJETÉ** - Pas pertinent

5. **Stats : Voir ce qui est fait → Voir ce qui reste**
   - ✅ **RETENU** - Double perspective Fait / À faire / Total

**Inversions Retenues pour MVP :**

**Inversion #1 : Toggle "Masquer Checks Faits"**
```
[Dropdown: Goron City ▼] [Dropdown: Pots ▼]
[☑️ Masquer checks faits] ← Toggle

=== Goron City - Pots ===
⬜ GC Darunia Pot 1
⬜ GC Darunia Pot 3
⬜ GC Lower Staircase Pot 1
...

(Les ✅ sont masqués pour focus sur ce qui reste)
```

**Cas d'usage :**
- En plein jeu, focus uniquement sur ce qui reste à faire
- Meilleure concentration
- Liste plus courte = navigation plus rapide

**✅ RETENU pour MVP** - Valeur claire pour productivité

**Inversion #2 : Stats Double Perspective**
```
=== Statistiques ===

📊 Progression : 58 faits / 2942 à faire / 3000 total (1.9%)

─────────────────────────────────────────
📦 Par Type
─────────────────────────────────────────
Pots      : ✅ 46 fait | ⬜ 184 à faire | 230 total
Coffres   : ✅ 12 fait | ⬜ 138 à faire | 150 total
Skulls    : ✅  8 fait | ⬜  92 à faire | 100 total
...
```

**Avantage :**
- Voir à la fois ce qui est accompli (motivation)
- ET ce qui reste (effort à fournir)
- Meilleure compréhension de la progression

**✅ RETENU pour MVP** - Enrichit la compréhension

**Inversion #3 : Mode Exploration**
- Déjà couvert dans "Put to Other Uses"
- Inverser "Je vais là" → "Qu'est-ce qui est accessible ?"

---

### Récapitulatif SCAMPER - Améliorations Identifiées

#### Pour MVP (Priorité 1) :

**De COMBINE :**
1. ✅ Mini compteur progression dans module Checks (sticky header)
2. ✅ Bouton Pathfinding → Ouvrir Checks destination

**De ADAPT :**
3. ✅ Mode Dark/Light (indispensable)
4. ✅ Undo / Ctrl+Z (annuler dernier changement)

**De MODIFY :**
5. ✅ Compteur entrances par zone (progression visible)

**De PUT TO OTHER USES :**
6. ✅ Mode Exploration zones accessibles (pathfinding alternatif)

**De ELIMINATE :**
7. ✅ Éliminer état 👁️ "Vu" (simplification à 2 états : ✅/⬜)
8. ✅ Éliminer chemins alternatifs pathfinding (MVP = optimal seulement)

**De REVERSE :**
9. ✅ Toggle "Masquer checks faits" (focus sur ce qui reste)
10. ✅ Stats double perspective : Fait / À faire / Total

#### Post-MVP / V2 (Priorité 2) :

**De MODIFY :**
- Option priorité Save Warp dans pathfinding ("Préférer/Éviter Save Warp")

**De ADAPT :**
- Tags/Notes personnalisés (nice to have)

**De PUT TO OTHER USES :**
- Partage lecture seule (spectateurs, streams)

**De ELIMINATE :**
- Réintroduire chemins alternatifs si demandé par utilisateurs

---

### Insights Clés de SCAMPER

**Insight #1 : Simplicité > Complexité pour MVP**
- Élimination de l'état 👁️ "Vu" = gain massif en simplicité
- Toggle binaire ✅/⬜ suffit pour 95% des cas
- Fonctionnalités complexes → V2 après validation besoins réels

**Insight #2 : Perspective Inversée = Nouvelle Valeur**
- "Masquer checks faits" = même data, usage différent, valeur énorme
- Stats "À faire" vs "Fait" = deux visions complémentaires
- Mode exploration = pathfinding inversé, cas d'usage distinct

**Insight #3 : Combinaisons Subtiles > Grandes Features**
- Mini compteur progression = petite feature, grand impact motivation
- Bouton pathfinding depuis destination = raccourci workflow naturel
- Adaptations d'UX patterns connus (Dark mode, Undo) = confort utilisateur

**Insight #4 : Feedback Constant = Engagement**
- Compteur progression sticky = motivation continue
- Compteur entrances par zone = progression visible
- Stats double perspective = compréhension claire

**Insight #5 : Mode Exploration = Usage Non-Évident**
- Pathfinding traditionnel : "Je vais à X"
- Mode exploration : "Que puis-je faire d'ici ?"
- Même technologie (graphe), usage complémentaire, valeur distincte

**Insight #6 : Manette = Contrainte UX Persistante**
- Même en SCAMPER, rejet systématique des solutions multi-clics
- Toggle simple > menus contextuels
- Scroll > navigation hiérarchique
- La contrainte manette guide toutes les décisions

---

## Synthèse Finale de la Session

### Vue d'Ensemble

Cette session de brainstorming a permis de construire une vision complète et détaillée d'une application de tracking pour Zelda Ocarina of Time Randomizer, en utilisant trois techniques complémentaires qui se sont enrichies mutuellement.

**Progression méthodologique :**
1. **First Principles Thinking** → Établir les vérités fondamentales
2. **Morphological Analysis** → Explorer systématiquement les solutions techniques
3. **SCAMPER Method** → Raffiner et innover sur les solutions identifiées

### Architecture Finale de l'Application

#### Module 1 : Checks Tracker (MVP)

**Fonctionnalités Core :**
- Liste infinite scroll avec virtualisation (performance 3000 checks)
- Filtrage multi-critères : Zone + Type (dropdowns)
- Système d'états simplifié : ✅ Fait / ⬜ Non fait (toggle simple)
- Organisation : Sorted list groupée par zone ET type
- Mini compteur progression sticky (motivation constante)
- Toggle "Masquer checks faits" (focus productivité)
- Undo / Ctrl+Z (correction erreurs)

**Format Données :**
- Source : spoiler.json (nomenclature développeurs randomizer)
- Exemples : `GC Darunia Pot 1`, `KF Midos Top Left Chest`

**UX Optimisée Manette :**
- Un clic = toggle état
- Scroll fluide sans lag
- Filtrage modifiable à tout moment

#### Module 2 : Entrances Tracker (MVP)

**Fonctionnalités Core :**
- Format standardisé : `[Zone Source] -> [Zone Destination]`
- Sélecteur auto-réductif (liste diminue au fur et à mesure)
- Recherche textuelle intégrée
- Vue filtrée par zone
- Compteur entrances par zone (progression visible)
- Bouton "Comment y aller ?" → Lance pathfinding
- Option Decoupled Entrances (configurable selon seed)

**Workflow :**
1. Passer une entrance → Noter immédiatement
2. Sélectionner entrance (liste qui se réduit)
3. Sélectionner destination
4. Entrance notée + disparaît de la liste

#### Module 3 : Pathfinding (MVP)

**Fonctionnalités Core :**
- Input : Position actuelle + Destination + Contexte Child/Adult
- Output : Chemin optimal étape par étape
- Save Warp intégré (téléportation gratuite contextualisée)
- Mode Exploration : Zones accessibles depuis position actuelle
- Message "Impossible" si aucun chemin

**Algorithme :**
- Graphe orienté avec contraintes
- Optimisation : Moins d'entrances possible
- Considère Save Warp dans calcul
- Ignore prérequis items temporaires

**Affichage :**
```
Chemin optimal (3 entrances) :
Étape 1 : Market -> Hyrule Field
Étape 2 : Hyrule Field -> Kakariko
Étape 3 : Kakariko -> DMC

[➤ Ouvrir Checks à DMC]
```

**Mode Exploration :**
```
Zones accessibles depuis Market (Child) :
🔵 Hyrule Field [➤ Y aller]
🔵 Temple du Temps [➤ Y aller]
...
```

#### Module 4 : Statistiques (MVP)

**Fonctionnalités Core :**
- Vue unifiée (tout en un scroll)
- Progression globale en tête
- Vue par type (toujours visible)
- Vue par zone avec drill-down
- Double perspective : Fait / À faire / Total
- Pourcentages de complétion

**Format :**
```
📊 Progression : 58 faits / 2942 à faire / 3000 total (1.9%)

📦 Par Type
Pots : ✅ 46 fait | ⬜ 184 à faire | 230 total
...

🗺️ Par Zone
▼ Goron City : 15/45 (33.3%)
    Pots : ✅ 5 | ⬜ 4 | 9 total
...
```

#### Cross-Module (MVP)

**Sauvegarde :**
- Export/Import JSON
- Portabilité complète
- Support sessions 50h+

**UX Globale :**
- Mode Dark/Light (indispensable)
- Undo / Ctrl+Z universel
- Design optimisé manette (minimal clics)
- Performance (virtualisation, chargement intelligent)

### Fonctionnalités Post-MVP (V2)

**Priorité 2 :**
- Chemins alternatifs pathfinding
- Option priorité Save Warp ("Préférer/Éviter")
- Tags/Notes personnalisés
- Partage lecture seule (spectateurs, streams)
- État 👁️ "Vu mais pas pris" (si demandé utilisateurs)

### Insights Stratégiques Globaux

**1. Contrainte Manette = Design Driver**
- Toutes les décisions UX guidées par usage manette en main
- Rejet systématique solutions multi-clics
- Privilégier : scroll, toggle, vues unifiées

**2. Simplicité MVP > Feature Creep**
- Éliminer état 👁️ = gain massif simplicité
- Focus sur 95% des cas d'usage
- Fonctionnalités complexes → V2 après validation

**3. Double Valeur via Inversion**
- Même données, perspectives différentes = valeur multiplicative
- Toggle "Masquer faits" = focus productivité
- Stats "Fait/À faire" = motivation + effort visible

**4. Performance = Non-Négociable**
- 3000 checks = défi technique
- Virtualisation + Infinite scroll = solution
- Pas de compromis UX pour performance

**5. Workflow Naturel > Features Isolées**
- Pathfinding → Ouvrir Checks = workflow complet
- Entrance → Pathfinding = navigation fluide
- Mini compteur = feedback constant

**6. Standardisation Format Existant**
- Spoiler.json = source de vérité
- Pas réinventer nomenclature
- Cohérence avec écosystème randomizer

### Prochaines Étapes Recommandées

**Phase 1 : Validation Concept**
- [ ] Créer wireframes/mockups interactifs
- [ ] Tester avec joueurs OOT randomizer
- [ ] Valider workflows principaux
- [ ] Ajuster selon feedback

**Phase 2 : Développement MVP**
- [ ] Module Checks (priorité 1)
- [ ] Module Entrances (priorité 2)
- [ ] Module Pathfinding (priorité 3)
- [ ] Module Stats (priorité 4)
- [ ] Sauvegarde JSON
- [ ] Mode Dark/Light
- [ ] Undo global

**Phase 3 : Test & Itération**
- [ ] Beta test avec joueurs réels
- [ ] Mesurer usage fonctionnalités
- [ ] Identifier points friction
- [ ] Optimiser performance

**Phase 4 : Post-MVP (V2)**
- [ ] Implémenter features priorité 2 selon demandes
- [ ] Chemins alternatifs si utile
- [ ] Partage lecture seule si demandé
- [ ] État 👁️ si cas d'usage validés

### Valeur Créée par cette Session

**Clarté Architecturale :**
- Vision complète des 4 modules
- Décisions techniques justifiées
- Priorisation MVP vs V2 claire

**Innovation UX :**
- Sélecteur auto-réductif (double valeur)
- Mode exploration (usage alternatif pathfinding)
- Toggle masquer faits (perspective inversée)
- Stats double perspective

**Simplification Intelligente :**
- 2 états au lieu de 3 (MVP)
- Vue unifiée vs navigation complexe
- Focus sur essentiel

**Documentation Complète :**
- Vérités fondamentales identifiées
- Solutions techniques explorées
- Améliorations SCAMPER documentées
- Roadmap claire MVP → V2

### Conclusion

Cette session a transformé une idée initiale ("tracker pour randomizer OOT") en une vision architecturale complète, détaillée et prête pour l'implémentation.

Les trois techniques de brainstorming se sont parfaitement complétées :
- **First Principles** a établi les fondations solides
- **Morphological Analysis** a exploré systématiquement les solutions
- **SCAMPER** a raffiné et innové sur ces solutions

Le résultat est une application qui :
- ✅ Résout le vrai problème (extension de mémoire anti-gaspillage temps)
- ✅ Respecte les contraintes (manette, performance 3000 checks)
- ✅ Optimise l'UX (minimal clics, feedback constant, workflow naturel)
- ✅ Simplifie intelligemment (MVP focus essentiel)
- ✅ Innove subtilement (sélecteur auto-réductif, mode exploration, perspectives inversées)

**L'application est maintenant prête à passer en phase de design et développement !** 🚀

---

