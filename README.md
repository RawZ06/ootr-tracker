# OoT Randomizer Tracker - Allsanity Edition

Un outil web moderne pour suivre votre progression dans les seeds Allsanity d'Ocarina of Time Randomizer.

## Fonctionnalités

### Gestion des Checks (2335 checks)
- **Tableau interactif** avec tri, recherche et filtrage
- **Statuts multiples** : ⏳ Pending, ✅ Done, 🔒 Blocked, ⏸️ Partial, ⚠️ Important
- **Informations détaillées** : location, région, type, item, prix
- **Notes personnalisées** sur chaque check
- **Pagination** (50 checks par page)

### Gestion des Entrances (278 entrances)
- **Suivi des entrées découvertes** avec checkbox
- **Types d'entrées** : Warp, Grotto, Dungeon, Interior, Overworld
- **Filtrage avancé** par type et statut de découverte
- **Notes personnalisées** pour chaque entrée

### Statistiques
- **Progression globale** : pourcentage de checks complétés et entrances découvertes
- **Breakdown par statut** : checks complétés, bloqués, importants
- **Répartition par type** : checks et entrances par catégorie

### Import/Export
- **Export JSON** : sauvegarde complète de votre progression
- **Import JSON** : restauration d'une session précédente
- **Reset** : remise à zéro de toutes les données
- **LocalStorage** : sauvegarde automatique dans le navigateur

### Interface
- **Mode sombre/clair** avec toggle
- **Navigation par onglets** : Checks, Entrances, Statistics
- **Design responsive** : fonctionne sur desktop et mobile
- **Tailwind CSS** : interface moderne et rapide

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
```

## Utilisation

### Première utilisation

1. Lance `npm run dev`
2. Ouvre [http://localhost:5173](http://localhost:5173)
3. L'application charge automatiquement les données du spoiler log

### Tracking des Checks

1. Va dans l'onglet **Checks**
2. Utilise la barre de recherche pour trouver un check spécifique
3. Clique sur le dropdown de statut pour changer l'état d'un check
4. Clique sur la colonne Notes pour ajouter des notes personnalisées
5. Utilise les filtres pour afficher seulement certains types ou statuts

### Tracking des Entrances

1. Va dans l'onglet **Entrances**
2. Clique sur le bouton ✓/✗ pour marquer une entrée comme découverte
3. Utilise les filtres pour voir seulement les entrées découvertes ou non découvertes
4. Ajoute des notes pour te rappeler des détails importants

### Statistiques

1. Va dans l'onglet **Statistics**
2. Consulte ta progression globale
3. Vois la répartition des checks par statut
4. Analyse la distribution des checks et entrances par type

### Sauvegarde et Restauration

**Export :**
- Clique sur "Export Progress" dans le header
- Un fichier JSON est téléchargé avec toute ta progression

**Import :**
- Clique sur "Import Progress" dans le header
- Sélectionne un fichier JSON d'export précédent
- Ta progression est restaurée

**Note :** L'application sauvegarde automatiquement dans le LocalStorage du navigateur.

## Architecture du Projet

```
ootr-tracker/
├── src/
│   ├── components/        # Composants React
│   │   ├── ChecksTable.tsx
│   │   ├── EntrancesTable.tsx
│   │   ├── Stats.tsx
│   │   └── ImportExport.tsx
│   ├── data/              # Données générées
│   │   └── constants.ts   # 2335 checks + 278 entrances
│   ├── hooks/             # Hooks personnalisés
│   │   ├── useFilters.ts
│   │   └── useStats.ts
│   ├── store/             # State management (Zustand)
│   │   └── trackerStore.ts
│   ├── types/             # Définitions TypeScript
│   │   └── index.ts
│   ├── App.tsx            # Composant principal
│   └── index.css          # Styles Tailwind
├── parse-spoiler.cjs      # Script de parsing du spoiler log
└── package.json
```

## Technologies Utilisées

- **Vite** : Build tool ultra-rapide
- **React 18** : UI framework
- **TypeScript** : Type safety
- **Tailwind CSS 3** : Styling
- **TanStack Table** : Tables interactives avec tri/filtrage/pagination
- **Zustand** : State management simple et performant
- **React Icons** : Bibliothèque d'icônes

## Données

Les données sont générées à partir du fichier spoiler log :
- **Seed ID** : 44A4NP37P1
- **Version** : 8.3.33 Rob-E4
- **Total Checks** : 2335
- **Total Entrances** : 278

Pour régénérer les données à partir d'un nouveau spoiler log :

```bash
# Place le fichier spoiler à la racine (au-dessus du dossier ootr-tracker)
# Puis lance :
node parse-spoiler.cjs
```

## Format d'Export

```json
{
  "version": "1.0",
  "seedId": "44A4NP37P1",
  "createdAt": "2025-10-24T...",
  "lastModified": "2025-10-24T...",
  "entrances": [...],
  "checks": [...],
  "inventory": {...}
}
```

## Développement

### Ajouter une fonctionnalité

1. Les types sont définis dans `src/types/index.ts`
2. Le state global est dans `src/store/trackerStore.ts`
3. Les composants sont dans `src/components/`
4. Les hooks réutilisables sont dans `src/hooks/`

### Personnalisation

- **Couleurs** : Modifie `tailwind.config.js`
- **Nombre de checks par page** : Change `pageSize` dans les composants Table
- **Colonnes des tables** : Modifie les `columns` dans ChecksTable.tsx ou EntrancesTable.tsx

## License

MIT - Libre d'utilisation, modification et distribution
