# NotesAllSanity

[![CI Quality Gates](https://github.com/USERNAME/NotesAllSanity/workflows/CI%20Quality%20Gates/badge.svg)](https://github.com/USERNAME/NotesAllSanity/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Application Web Angular 21 pour suivre les checks et entrances d'un randomizer Ocarina of Time.

## 🎯 Description

NotesAllSanity permet d'importer un fichier `spoiler.json` généré par un randomizer OOT, de gérer les checks complétés, filtrer par zone/type, suivre les entrances découvertes, et calculer les meilleurs chemins avec l'algorithme de Dijkstra.

## 🛠️ Stack Technique

- **Angular 21** - Framework avec Standalone API
- **PrimeNG 20+** - Component library (Virtual Scroller pour 3000+ items)
- **Tailwind CSS v4** - Styling moderne
- **TypeScript 5.6.x** - Strict mode activé
- **pnpm** - Package manager rapide et déterministe
- **RxJS** - State management avec BehaviorSubjects
- **Vitest** - Tests unitaires ultra-rapides
- **Docker + nginx** - Déploiement en production

## 📋 Prérequis

- **Node.js 20+** (LTS recommandé)
- **pnpm** (package manager)
- **Docker** (optionnel - pour déploiement uniquement)

### Installation de pnpm

```bash
npm install -g pnpm
```

## 🚀 Développement Local

### 1. Installation des dépendances

```bash
pnpm install
```

### 2. Démarrage du serveur de développement

```bash
pnpm run start
# ou
ng serve
```

Ouvrir [http://localhost:4200](http://localhost:4200)

Le rechargement automatique (HMR) est activé.

### 3. Linting et Formatting

```bash
# ESLint
pnpm run lint
pnpm run lint:fix

# Prettier
pnpm run format
pnpm run format:check
```

### 4. Tests

```bash
# Tests unitaires (Vitest)
pnpm test
pnpm test --watch
pnpm test --coverage

# E2E tests (Playwright)
pnpm run e2e
```

## 📦 Build Production

```bash
pnpm run build --configuration production
```

Les fichiers optimisés sont générés dans `dist/NotesAllSanity/browser/`.

## 🐳 Déploiement Docker

### Build local

```bash
docker build -t notesallsanity:latest .
```

### Run container

```bash
docker run -d -p 8080:80 notesallsanity:latest
```

Ouvrir [http://localhost:8080](http://localhost:8080)

**Taille de l'image:** ~62MB (nginx:alpine optimisé)

## 🚢 Déploiement Dokploy

Dokploy lit automatiquement le Dockerfile à la racine du repo.

### Étapes:

1. Connecter le repo GitHub dans Dokploy UI
2. Dokploy détecte automatiquement le `Dockerfile`
3. Configurer le port exposé: **80**
4. (Optionnel) Configurer un domaine custom
5. Deploy automatique sur push vers `main`

**Important:** Ne PAS créer de `docker-compose.yml` - Dokploy gère l'orchestration.

## 🔄 CI/CD Pipeline

GitHub Actions s'exécute automatiquement sur `push` et `pull_request` vers `main`/`develop`.

### Quality Gates:

1. **Lint & Format** - ESLint + Prettier (fail si erreurs)
2. **Security Audit** - `pnpm audit --audit-level=high` (fail si CVE high/critical)
3. **Unit Tests** - Vitest avec coverage upload
4. **Production Build** - Vérification bundle < 2MB
5. **Docker Build** - Build image + smoke test HTTP 200

Tous les jobs doivent passer ✅ avant merge.

## 📄 Format de Données

### spoiler.json (OOT Randomizer)

Structure attendue:

```json
{
  "locations": {
    "GC Darunia Pot 1": "Deku Shield",
    "KF Midos Top Left Chest": "Recovery Heart"
  },
  "entrances": {
    "Kokiri Forest -> Lost Woods Bridge": "Lost Woods Bridge -> Kokiri Forest"
  }
}
```

### check-metadata.json

Fichier mapping check name → zone/type:

```json
{
  "GC Darunia Pot 1": { "zone": "Goron City", "type": "Pot" },
  "KF Midos Top Left Chest": { "zone": "Kokiri Forest", "type": "Chest" }
}
```

Localisation: `assets/data/check-metadata.json`

## 🤝 Contribution

Ce projet utilise:

- **pnpm** (PAS npm/yarn)
- **ESLint + Prettier** (format automatique obligatoire)
- **Conventional Commits** (`feat:`, `fix:`, `chore:`)
- **Dependabot** (mises à jour auto hebdomadaires)

### Workflow

1. Fork le repo
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

Les PRs déclenchent automatiquement le CI pipeline.

## 📝 License

MIT

## 🙏 Crédits

- Randomizer OOT Community
- Angular Team
- PrimeNG Team

---

**Build avec ❤️ et Angular 21**
