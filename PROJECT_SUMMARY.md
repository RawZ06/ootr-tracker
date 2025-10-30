# OoT Randomizer Tracker - Nuxt Application

## Structure de l'application

### Technologies utilisées
- **Nuxt 4** avec Vue 3
- **NuxtUI** pour les composants
- **Pinia** pour la gestion d'état avec persistence
- **js-yaml** pour parser les fichiers YAML
- **TypeScript** pour le typage

### Fichiers de données (public/)
- `entrances.yml` - Liste de toutes les entrances (278 entrées)
- `locations.yaml` - Liste de tous les checks/locations (~2335 entrées)
- `items.yaml` - Liste de tous les items du jeu

### Store (app/stores/tracker.ts)
Le store Pinia gère:
- **checks**: Array de tous les checks avec statut (pending/completed/blocked/important)
- **entrances**: Array de toutes les entrances avec découvertes
- **items**: Dictionnaire des items du jeu
- **Actions**: loadYamlFiles, updateCheck, updateEntrance, exportProgress, importProgress, resetAll

### Pages

#### 1. Checks (/) - Page principale
- Tableau de tous les checks/locations
- Colonnes: STATUS, LOCATION, AREA, TYPE, ITEM, PRICE, NOTES
- Filtres: recherche, area, type, status
- Édition inline des items et notes

#### 2. Entrances (/entrances)
- Tableau de toutes les entrances
- Colonnes: FROM, FROM AREA, TO, TO AREA, TYPE, NOTES
- Filtres: recherche, type, from area, to area
- Badges colorés pour les areas et types
- Édition inline des destinations

#### 3. Pathfinder (/pathfinder)
- Sélecteurs de départ et arrivée
- Affichage de toutes les areas accessibles
- Bouton "Find Path" (TODO: implémenter l'algorithme)

#### 4. Statistics (/statistics)
- Progress bars pour checks et entrances
- Breakdown par statut (completed/blocked/important/remaining)
- Statistiques par type de check
- Statistiques par type d'entrance

### Fonctionnalités globales (Header)
- **Export Progress**: Télécharge un JSON avec l'état actuel
- **Import Progress**: Charge un JSON sauvegardé
- **Load Sample**: Charge un spoiler log (TODO: parser le JSON)
- **Reset All Data**: Réinitialise tous les checks et entrances
- **Dark Mode**: Toggle dark/light mode

## Configuration

### nuxt.config.ts
- Modules: @nuxt/eslint, @nuxt/ui, @pinia/nuxt, @pinia-plugin-persistedstate/nuxt
- SSR désactivé pour éviter les erreurs de prerendering avec localStorage
- ESLint configuré avec style guide

### Types
- `Check`: id, location, area, type, item, price, notes, status
- `Entrance`: id, from, fromArea, fromSubArea, to, toArea, toSubArea, type, notes

## TODO
1. Implémenter le parsing du spoiler log dans "Load Sample"
2. Implémenter l'algorithme de pathfinding dans Pathfinder
3. Ajouter l'autocomplétion pour les items
4. Ajouter la gestion du mode coupled/decoupled pour les entrances
5. Améliorer les filtres avec des multi-select plus riches
