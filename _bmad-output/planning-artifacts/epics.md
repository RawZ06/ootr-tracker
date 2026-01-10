---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/project-context.md'
  - '_bmad-output/SESSION-SUMMARY.md'
workflowType: 'epics-and-stories'
project_name: 'NotesAllSanity'
user_name: 'Alexandre'
date: '2026-01-07'
lastStep: 4
workflowComplete: true
completionDate: '2026-01-07'
---

# NotesAllSanity - Epic Breakdown

**Author:** Alexandre
**Date:** 2026-01-07

_Ce document transforme les requirements du PRD et les décisions architecturales en epics organisés par valeur utilisateur. Chaque epic contient des user stories détaillées avec critères d'acceptation implémentables._

---

## Requirements Inventory

### Functional Requirements (51 total)

**Data Import & Management (9 FRs):**
- **FR1:** Users can import a spoiler.json file from the OOT Randomizer
- **FR2:** The system can parse spoiler.json and extract check data (names, locations)
- **FR3:** The system can parse spoiler.json and extract entrance mappings
- **FR4:** The system can validate spoiler.json format before loading
- **FR5:** Users can see confirmation of successful data import with check count
- **FR48:** The system can load a check metadata reference file containing zone and type mappings for all checks
- **FR49:** The system can match spoiler.json checks against the metadata reference to retrieve zone and type information
- **FR50:** The system can handle checks not found in the metadata reference (display as "Unknown Zone" / "Unknown Type")
- **FR51:** The system can display warnings for unmapped checks

**Checks Management (9 FRs):**
- **FR6:** Users can view a complete list of all checks from the loaded seed
- **FR7:** Users can filter checks by zone (using metadata from reference file)
- **FR8:** Users can filter checks by type (using metadata from reference file)
- **FR9:** Users can apply multiple filters simultaneously (Zone × Type)
- **FR10:** Users can mark a check as "Done" (✅)
- **FR11:** Users can unmark a check back to "Not Done" (⬜)
- **FR12:** Users can toggle to hide all completed checks from the list
- **FR13:** Users can reset filters to show all checks
- **FR14:** The system can display checks using exact nomenclature from spoiler.json

**Entrances Management (7 FRs):**
- **FR15:** Users can record a discovered entrance as "Zone A → Zone B"
- **FR16:** Users can select an entrance from a list that reduces as entrances are recorded
- **FR17:** Users can search entrances by text
- **FR18:** Users can filter recorded entrances by zone
- **FR19:** Users can view the count of recorded entrances per zone
- **FR20:** Users can configure decoupled entrance mode (independent entrance directions)
- **FR21:** Users can delete a recorded entrance

**Pathfinding & Navigation (8 FRs):**
- **FR22:** Users can specify a starting zone for pathfinding
- **FR23:** Users can specify a destination zone for pathfinding
- **FR24:** Users can specify their current age context (Child or Adult) for pathfinding
- **FR25:** The system can calculate the optimal path between two zones using recorded entrances
- **FR26:** The system can integrate Save Warp as a free teleportation option in path calculations
- **FR27:** Users can see the calculated path displayed step-by-step
- **FR28:** Users can navigate directly to the checks view for the destination zone from pathfinding results
- **FR29:** The system can indicate when no path is available between zones

**Statistics & Progress Tracking (7 FRs):**
- **FR30:** Users can view global progression (X/Total checks completed)
- **FR31:** Users can view progression by check type (Pots, Chests, etc.)
- **FR32:** Users can view progression by zone
- **FR33:** Users can see statistics showing both "Done" and "To Do" perspectives
- **FR34:** Users can see a persistent mini progress counter while browsing checks
- **FR35:** Users can view detailed statistics for each zone (drill-down)
- **FR36:** Users can view entrance discovery statistics per zone

**Data Persistence & Export (7 FRs):**
- **FR37:** Users can export their complete progress to a JSON file
- **FR38:** Users can import a previously exported JSON file to restore progress
- **FR39:** The system can validate imported JSON files before loading
- **FR40:** The system can detect corrupted or invalid JSON files and reject them
- **FR41:** The system can display detailed error messages for invalid imports
- **FR42:** The system can preserve all tracker state in exports (checks, entrances, statistics)
- **FR43:** Users can see metadata about imported saves (date, check count, status)

**User Experience & Customization (4 FRs):**
- **FR44:** Users can toggle between Dark mode and Light mode
- **FR45:** The system can persist the selected theme across sessions
- **FR46:** Users can view large lists (3000+ items) with smooth scrolling performance
- **FR47:** The system can display check lists with virtual scrolling for performance

---

### Non-Functional Requirements (26 total)

**Performance (8 NFRs):**
- **NFR-PERF-1:** Check filtering (Zone × Type) on 3000+ items must complete within **100ms** (Target: <50ms)
- **NFR-PERF-2:** Pathfinding calculation (Dijkstra with Save Warp) must complete within **2 seconds** (Target: <1s)
- **NFR-PERF-3:** Virtual scrolling rendering must maintain **60 FPS** during list navigation
- **NFR-PERF-4:** Initial application load time must be under **3 seconds** (Target: <1s)
- **NFR-PERF-5:** Toggle actions (mark check, hide completed, dark/light mode) must be **instantaneous** (<50ms perceived)
- **NFR-PERF-6:** Application must maintain stable memory usage during **50+ hour sessions**
- **NFR-PERF-7:** No performance degradation after marking **1000+ checks**
- **NFR-PERF-8:** Browser memory consumption must remain **<500MB** during typical gameplay sessions

**Reliability & Data Integrity (7 NFRs):**
- **NFR-REL-1:** JSON export/import must achieve **100% data fidelity** (zero loss of checks, entrances, or statistics)
- **NFR-REL-2:** JSON validation must detect **100% of corrupted files** before attempting import
- **NFR-REL-3:** Invalid JSON imports must **never** corrupt or overwrite existing tracker state
- **NFR-REL-4:** Export JSON file size must remain **<5MB** for 3000 checks (Target: <1MB)
- **NFR-REL-5:** Application must handle **3000+ checks** without crashes or freezes
- **NFR-REL-6:** Application must recover gracefully from parsing errors in spoiler.json or metadata files
- **NFR-REL-7:** Application state must remain consistent across browser refresh or accidental closure (via localStorage or session recovery)

**Usability & User Experience (5 NFRs):**
- **NFR-UX-1:** Application must support **continuous sessions of 50+ hours** without requiring restart
- **NFR-UX-2:** Dark mode and Light mode must provide **sufficient contrast** for extended gameplay sessions (avoid eye strain)
- **NFR-UX-3:** UI must minimize required clicks to support **controller-in-hand gameplay** (mouse available as fallback)
- **NFR-UX-4:** Core workflows (import seed, filter checks, mark complete, export save) must be **intuitive without tutorial** for OOT Randomizer players
- **NFR-UX-5:** Error messages must be **clear and actionable** (e.g., JSON validation errors specify line and issue)

**Compatibility (8 NFRs):**
- **NFR-COMPAT-1:** Application must function correctly on **latest stable versions** of Chrome, Firefox, Edge, and Safari (desktop only)
- **NFR-COMPAT-2:** Application must support browsers with ES2020+ JavaScript capabilities
- **NFR-COMPAT-3:** No support required for legacy browsers (IE11, outdated versions)
- **NFR-COMPAT-4:** Application must be responsive across desktop resolutions from **1366×768 to 5120×2880**
- **NFR-COMPAT-5:** Layout must adapt to both **laptop screens (14")** and **large monitors (27" 5K)**
- **NFR-COMPAT-6:** No mobile device support required (tablets, smartphones)
- **NFR-COMPAT-7:** JSON save files must be **portable across operating systems** (Windows, macOS, Linux)
- **NFR-COMPAT-8:** Application must function identically across supported browsers (no browser-specific features)

**Maintainability (5 NFRs):**
- **NFR-MAINT-1:** Codebase must follow **Angular best practices** (modules, services, lazy loading, OnPush change detection)
- **NFR-MAINT-2:** Components must be **modular and reusable** (Checks, Entrances, Pathfinding, Stats as separate modules)
- **NFR-MAINT-3:** Code must include **TypeScript strict mode** for type safety
- **NFR-MAINT-4:** Check metadata reference JSON must be **human-readable and maintainable**
- **NFR-MAINT-5:** README must document spoiler.json format expectations and metadata file structure

---

### Additional Requirements from Architecture & Context

**Technology Stack (Imposé):**
- **Framework:** Angular 21 (Standalone API, format concis Angular 20+)
- **Component Library:** PrimeNG 20+ (Virtual Scroller requis)
- **Styling:** Tailwind CSS v4 (CSS pur, pas de preprocessor)
- **State Management:** RxJS BehaviorSubjects + combineLatest
- **Language:** TypeScript 5.6.x (strict mode obligatoire)
- **Package Manager:** pnpm (obligatoire)
- **Build Tools:** esbuild + Vite (HMR)
- **Tests Unitaires:** Vitest (co-located .spec.ts)
- **Tests E2E:** Playwright (tests/e2e/)
- **Target:** ES2022, Desktop browsers only

**Architectural Patterns Critiques:**
1. **OnPush Change Detection:** SYSTÉMATIQUE sur tous les composants (NFR-PERF-3)
2. **JSON snake_case:** OBLIGATOIRE pour cohérence avec spoiler.json OOT Randomizer
3. **TypeScript ↔ JSON Mapping:** Mapping explicite camelCase ↔ snake_case dans SaveLoadService
4. **Virtual Scrolling:** PrimeNG Virtual Scroller avec `itemSize=50` fixe (performance 3000 items)
5. **BehaviorSubjects Privés:** Encapsulation state, Observables publics uniquement
6. **Immutabilité Obligatoire:** Spread operator pour updates (requirement OnPush)
7. **Memory Leak Prevention:** `takeUntilDestroyed()` ou `async` pipe systématiques
8. **Lazy Loading:** 4 modules (checks, entrances, pathfinding, stats) avec `loadComponent()`

**Structure Modulaire (4 Modules Lazy-Loaded):**
- **Module Checks:** Filtrage multi-critères, virtual scrolling, toggle hide completed
- **Module Entrances:** Tracking entrances découvertes, recherche, sélecteur auto-réductif
- **Module Pathfinding:** Dijkstra + Save Warp, contexte Child/Adult, affichage route
- **Module Stats:** Analytics multi-dimensionnels (type, zone, fait/à faire)

**Services Core (7 Singleton Services):**
1. **SpoilerParserService:** Parse spoiler.json, extraction checks + entrances
2. **MetadataService:** Charge check-metadata.json, lookup O(1) zone/type
3. **StateManagementService:** RxJS state centralisé (checks, entrances, filters, stats)
4. **SaveLoadService:** Export/Import JSON, validation checksum SHA-256
5. **PathfindingService:** Dijkstra algorithm avec Save Warp + memoization
6. **ThemeService:** Dark/Light mode toggle + persistence localStorage
7. **ErrorHandlerService:** Global error handling + user-friendly messages

**DevOps & Deployment Requirements:**
- **Dockerfile:** Multi-stage build (node:20-alpine → nginx:alpine) OBLIGATOIRE
- **nginx.conf:** SPA routing (`try_files $uri $uri/ /index.html`), Gzip, Cache headers
- **GitHub Actions CI/CD:** ESLint, Prettier, pnpm audit (fail on high/critical CVE), tests, Docker build
- **Deployment:** Dokploy self-hosted (lit Dockerfile, gère compose lui-même)
- **PAS de docker-compose.yml:** Dokploy gère la configuration compose

**Configuration Files Requis:**
1. `Dockerfile` - Multi-stage build optimisé
2. `nginx.conf` - SPA routing + Gzip + Cache
3. `.github/workflows/ci.yml` - Pipeline quality gates complet
4. `.eslintrc.json` - ESLint strict Angular
5. `.prettierrc.json` - Prettier config
6. `.dockerignore` - Exclusions Docker
7. `.github/dependabot.yml` - Auto security updates
8. `tsconfig.json` - TypeScript strict mode + path aliases
9. `tailwind.config.js` - Tailwind v4 avec purge optimisé

**Anti-Patterns Documentés (JAMAIS FAIRE):**
1. ❌ Mutation directe state (casse OnPush)
2. ❌ BehaviorSubject public (casse encapsulation)
3. ❌ Subscribe sans cleanup (memory leaks)
4. ❌ Toast PrimeNG direct (bypass ErrorHandler)
5. ❌ Mixing snake_case et camelCase en JSON
6. ❌ Virtual Scrolling itemSize dynamique (performance catastrophique)
7. ❌ Pathfinding sans cache memoization (dépasse 2s)
8. ❌ Filtrage 3000 items sans debounce (lag UI)

**Phasing Strategy (MVP Progressif):**
- **v0.1 (MVP Ultra-Minimal):** Module Checks + Stats basique + Save/Load + Dark/Light
- **v0.2 (Navigation):** + Module Entrances
- **v0.3 (MVP Complet):** + Module Pathfinding (validation: seed AllSanity complète)
- **V2 (Post-MVP):** Undo global, tags, notes, chemins alternatifs, collaboration

---

## Epic List

### Epic 1: Project Foundation & Technical Setup

**User Outcome:** Alexandre dispose d'une application Angular 21 fonctionnelle avec infrastructure complète prête à recevoir les modules tracker.

**Value Delivered:** Foundation technique complète (Angular 21, PrimeNG 20+, Tailwind v4, services core skeleton, routing lazy-loading, structure projet 117 fichiers) configurée selon les patterns architecturaux définis.

**FRs Covered:** Aucun FR direct - Infrastructure obligatoire pour tous les autres epics

**Implementation Notes:**
- Init Angular CLI avec stack complet (pnpm, TypeScript 5.6.x strict, Tailwind v4)
- Configuration PrimeNG avec `providePrimeNG()` dans app.config.ts
- Services core skeleton (StateManagement, ErrorHandler, Theme, SpoilerParser, Metadata, SaveLoad, Pathfinding)
- Structure projet complète (modules/, core/, shared/, models/)
- Routing lazy-loading avec `loadComponent()` pour 4 modules
- Configuration ESLint strict Angular + Prettier + tsconfig paths

**NFRs Addressed:** NFR-MAINT-1 (Angular best practices), NFR-MAINT-2 (Modularité), NFR-MAINT-3 (TypeScript strict)

---

### Epic 2: Seed Import & Data Management

**User Outcome:** Alexandre peut importer son spoiler.json AllSanity et le tracker charge automatiquement les 3000 checks avec leurs métadonnées zone/type.

**Value Delivered:** Système d'import complet avec parsing spoiler.json, chargement check-metadata.json, validation format, messages confirmation/erreur clairs.

**FRs Covered:** FR1, FR2, FR3, FR4, FR5, FR48, FR49, FR50, FR51 (9 FRs)

**Implementation Notes:**
- SpoilerParserService (parse spoiler.json format OOT Randomizer)
- MetadataService (charge check-metadata.json, lookup O(1) via object map)
- UI import avec file upload, validation, loading state, confirmation
- Error handling gracieux (format invalide, métadonnées manquantes, warnings unmapped checks)
- Messages utilisateur clairs (check count, warnings, erreurs actionnables)

**NFRs Addressed:** NFR-REL-6 (Graceful error recovery), NFR-UX-4 (Intuitive workflow), NFR-UX-5 (Clear error messages), NFR-MAINT-4 (Metadata maintainable)

---

### Epic 3: Check Tracking & Progress Monitoring

**User Outcome:** Alexandre peut voir tous ses checks (3000 items), filtrer instantanément par zone/type, marquer fait/non-fait, masquer les complétés, et suivre sa progression en temps réel avec analytics détaillés.

**Value Delivered:** Module Checks complet avec filtrage multi-critères <100ms, virtual scrolling 60 FPS, toggle hide completed, et module Stats avec analytics multi-dimensionnels (type, zone, fait/à faire).

**FRs Covered:** FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR46, FR47 (20 FRs)

**Implementation Notes:**
- Module Checks (lazy-loaded avec loadComponent)
- PrimeNG Virtual Scroller (itemSize=50 fixe, 60 FPS rendering)
- Filtrage réactif Zone × Type (RxJS combineLatest + debounceTime(50))
- OnPush change detection SYSTÉMATIQUE (immutabilité via spread operator)
- Toggle "Masquer checks faits" (filtrage réactif)
- Module Stats (lazy-loaded)
- Mini compteur progression (sticky header, mise à jour temps réel)
- Analytics drill-down par zone, par type, perspective Fait/À faire toggle
- Nomenclature exacte spoiler.json (ex: "GC Darunia Pot 1")

**NFRs Addressed:** NFR-PERF-1 (Filtrage <100ms), NFR-PERF-3 (60 FPS virtual scrolling), NFR-PERF-5 (Toggle instantané), NFR-PERF-6 (Stable memory 50h+), NFR-PERF-7 (No degradation 1000+ checks), NFR-REL-5 (Handle 3000+ checks), NFR-UX-1 (Sessions 50h+), NFR-MAINT-1 (OnPush change detection)

---

### Epic 4: Session Persistence & State Recovery

**User Outcome:** Alexandre peut sauvegarder son état complet (checks marqués, entrances, stats) dans un JSON portable, fermer le tracker, et reprendre 2 jours plus tard exactement où il était sans perte de données.

**Value Delivered:** Système save/load JSON 100% fiable avec validation stricte checksum SHA-256, détection corruption, protection état actuel, restauration exacte, et portabilité cross-platform.

**FRs Covered:** FR37, FR38, FR39, FR40, FR41, FR42, FR43 (7 FRs)

**Implementation Notes:**
- SaveLoadService (export/import JSON avec Web Crypto API SHA-256)
- Validation stricte format (version, checksum, structure)
- Mapping explicite TypeScript ↔ JSON (camelCase ↔ snake_case obligatoire)
- Protection état actuel (refus import invalide, jamais écrasé)
- Messages détaillés validation (métadonnées: date, check count, status, erreurs ligne)
- UI export/import (file download/upload, confirmation, loading states)
- Format JSON snake_case (cohérence spoiler.json OOT Randomizer)

**NFRs Addressed:** NFR-REL-1 (100% data fidelity), NFR-REL-2 (100% corruption detection), NFR-REL-3 (Never corrupt state), NFR-REL-4 (JSON <5MB), NFR-REL-7 (State consistent), NFR-COMPAT-7 (JSON portable cross-OS), NFR-UX-5 (Clear error messages)

---

### Epic 5: Theme System & Extended Sessions

**User Outcome:** Alexandre peut basculer entre Dark/Light mode pour confort visuel optimal pendant ses sessions AllSanity longues (30h+) sans fatigue oculaire.

**Value Delivered:** Système de thème complet avec toggle Dark/Light, persistence localStorage, contraste suffisant sessions longues, et détection thème système (optionnel).

**FRs Covered:** FR44, FR45 (2 FRs)

**Implementation Notes:**
- ThemeService (toggle + persistence localStorage)
- Palettes Dark/Light avec contraste optimal NFR-UX-2 (éviter eye strain)
- Détection thème système au premier chargement (optionnel)
- UI toggle accessible (header ou sidebar, keyboard accessible)
- Application immédiate du thème (pas de flash)

**NFRs Addressed:** NFR-UX-2 (Sufficient contrast extended sessions), NFR-PERF-5 (Toggle instantané)

---

### Epic 6: Entrance Tracking & Shuffle Navigation

**User Outcome:** Alexandre peut tracker toutes les entrances découvertes en Entrance Shuffle, chercher rapidement comment accéder à une zone, et ne jamais se perdre dans la randomisation complexe.

**Value Delivered:** Module Entrances complet avec notation "Zone A → Zone B", sélecteur auto-réductif (liste diminue), recherche textuelle instantanée, filtrage par zone, compteur entrances, mode decoupled, CRUD complet.

**FRs Covered:** FR15, FR16, FR17, FR18, FR19, FR20, FR21 (7 FRs)

**Implementation Notes:**
- Module Entrances (lazy-loaded)
- UI notation entrances (sélecteurs zones from/to avec autocomplete)
- Sélecteur auto-réductif (liste zones disponibles diminue au fur et à mesure)
- Recherche textuelle avec debounce (performance)
- Filtrage par zone (afficher entrances depuis/vers zone spécifique)
- Mode Decoupled Entrances (bidirectionnel vs unidirectionnel)
- CRUD complet (Create, Read, Update, Delete entrances)
- Stats entrances intégrées (compteur par zone, progression exploration)
- Format "Zone A → Zone B (entrance #ID)" si pertinent

**NFRs Addressed:** NFR-UX-3 (Minimal clics), NFR-UX-4 (Intuitive workflow), NFR-PERF-1 (Recherche performante)

---

### Epic 7: Intelligent Pathfinding & Route Optimization

**User Outcome:** Alexandre peut calculer le chemin optimal entre deux zones en tenant compte des entrances découvertes, du Save Warp gratuit, et du contexte Child/Adult pour optimiser sa navigation et gagner du temps.

**Value Delivered:** Module Pathfinding avec algorithme Dijkstra + Save Warp, contexte Child/Adult, affichage route étape par étape, calcul <2s, navigation directe vers checks destination, message "Impossible" si pas de chemin.

**FRs Covered:** FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29 (8 FRs)

**Implementation Notes:**
- Module Pathfinding (lazy-loaded)
- PathfindingService (Dijkstra algorithm + memoization cache pour performance)
- Save Warp intégration (node gratuit téléportation dans graphe)
- Contexte Child/Adult (zones accessibles selon âge)
- UI sélection start/destination zones + age context
- Affichage route step-by-step (liste zones traversées)
- Bouton "Ouvrir Checks destination" (navigation inter-modules via router)
- Message "Aucun chemin disponible" si impossible
- Performance <2s (NFR-PERF-2) via memoization cache

**NFRs Addressed:** NFR-PERF-2 (Pathfinding <2s), NFR-UX-4 (Intuitive workflow)

**Critical Dependency:** Epic 6 (Entrances) DOIT être implémenté avant Epic 7, car pathfinding utilise les entrances découvertes pour calculer les routes.

---

### Epic 8: Production Deployment & DevOps Pipeline

**User Outcome:** Alexandre peut déployer NotesAllSanity sur son serveur Dokploy self-hosted avec CI/CD automatique garantissant qualité code (ESLint, tests) et sécurité (CVE checks) à chaque commit.

**Value Delivered:** Infrastructure DevOps complète avec Dockerfile multi-stage optimisé, nginx SPA routing, GitHub Actions CI/CD quality gates, déploiement Dokploy automatisé, monitoring sécurité Dependabot.

**FRs Covered:** Aucun FR direct - DevOps requirement critique du project-context et SESSION-SUMMARY

**Implementation Notes:**
- Dockerfile multi-stage (node:20-alpine build → nginx:alpine serve)
- nginx.conf (SPA routing `try_files $uri $uri/ /index.html`, Gzip, Cache headers)
- GitHub Actions CI/CD (.github/workflows/ci.yml)
  - ESLint strict (fail pipeline si erreurs)
  - Prettier check (fail si non formaté)
  - pnpm audit (fail on high/critical CVE)
  - Tests runner (Vitest + Playwright)
  - Docker build & push
- .dockerignore (exclusions build)
- Dependabot (.github/dependabot.yml auto security updates)
- Dokploy deployment (lit Dockerfile du repo, gère compose lui-même)
- PAS de docker-compose.yml (Dokploy gère)

**NFRs Addressed:** NFR-MAINT-1 (Angular best practices enforced), NFR-MAINT-5 (README documentation), NFR-COMPAT-1 (Cross-browser testing)

**Deployment Strategy:** Epic 8 implémenté EARLY (après Epic 1) pour permettre déploiement continu et tests dès v0.1.

---

## Requirements Coverage Map

### Functional Requirements Mapping

**Epic 1: Project Foundation & Technical Setup**
- Infrastructure obligatoire (0 FRs directs)

**Epic 2: Seed Import & Data Management (9 FRs)**
- FR1: Import spoiler.json file
- FR2: Parse spoiler.json extract check data
- FR3: Parse spoiler.json extract entrance mappings
- FR4: Validate spoiler.json format before loading
- FR5: Confirmation successful data import with check count
- FR48: Load check metadata reference file (zone/type mappings)
- FR49: Match spoiler checks against metadata reference
- FR50: Handle checks not found in metadata (Unknown Zone/Type)
- FR51: Display warnings for unmapped checks

**Epic 3: Check Tracking & Progress Monitoring (20 FRs)**
- FR6: View complete list of all checks
- FR7: Filter checks by zone
- FR8: Filter checks by type
- FR9: Apply multiple filters simultaneously (Zone × Type)
- FR10: Mark check as "Done"
- FR11: Unmark check back to "Not Done"
- FR12: Toggle hide completed checks
- FR13: Reset filters to show all checks
- FR14: Display checks using exact spoiler.json nomenclature
- FR30: View global progression (X/Total)
- FR31: View progression by check type
- FR32: View progression by zone
- FR33: Statistics showing "Done" and "To Do" perspectives
- FR34: Persistent mini progress counter
- FR35: Detailed statistics per zone (drill-down)
- FR36: Entrance discovery statistics per zone (extended in Epic 6)
- FR46: View large lists (3000+ items) with smooth scrolling
- FR47: Check lists with virtual scrolling for performance

**Epic 4: Session Persistence & State Recovery (7 FRs)**
- FR37: Export complete progress to JSON file
- FR38: Import previously exported JSON file
- FR39: Validate imported JSON files before loading
- FR40: Detect corrupted/invalid JSON files and reject them
- FR41: Display detailed error messages for invalid imports
- FR42: Preserve all tracker state in exports (checks, entrances, stats)
- FR43: See metadata about imported saves (date, check count, status)

**Epic 5: Theme System & Extended Sessions (2 FRs)**
- FR44: Toggle between Dark mode and Light mode
- FR45: Persist selected theme across sessions

**Epic 6: Entrance Tracking & Shuffle Navigation (7 FRs)**
- FR15: Record discovered entrance as "Zone A → Zone B"
- FR16: Select entrance from auto-reducing list
- FR17: Search entrances by text
- FR18: Filter recorded entrances by zone
- FR19: View count of recorded entrances per zone
- FR20: Configure decoupled entrance mode
- FR21: Delete recorded entrance

**Epic 7: Intelligent Pathfinding & Route Optimization (8 FRs)**
- FR22: Specify starting zone for pathfinding
- FR23: Specify destination zone for pathfinding
- FR24: Specify age context (Child/Adult) for pathfinding
- FR25: Calculate optimal path between zones using recorded entrances
- FR26: Integrate Save Warp as free teleportation in path calculations
- FR27: See calculated path displayed step-by-step
- FR28: Navigate directly to checks view for destination zone
- FR29: Indicate when no path available between zones

**Epic 8: Production Deployment & DevOps Pipeline**
- DevOps infrastructure (0 FRs directs)

---

### Non-Functional Requirements Distribution

**Performance NFRs (8 total):**
- NFR-PERF-1, NFR-PERF-3, NFR-PERF-5, NFR-PERF-6, NFR-PERF-7 → Epic 3 (Checks & Stats)
- NFR-PERF-2 → Epic 7 (Pathfinding)
- NFR-PERF-4 → Epic 1 (Foundation build optimization)
- NFR-PERF-8 → Epic 3 (Memory management sessions longues)

**Reliability NFRs (7 total):**
- NFR-REL-1, NFR-REL-2, NFR-REL-3, NFR-REL-4, NFR-REL-7 → Epic 4 (Save/Load)
- NFR-REL-5 → Epic 3 (Handle 3000+ checks)
- NFR-REL-6 → Epic 2 (Graceful error recovery parsing)

**Usability NFRs (5 total):**
- NFR-UX-1 → Epic 3 (Sessions 50h+)
- NFR-UX-2 → Epic 5 (Contraste Dark/Light)
- NFR-UX-3 → Epic 6 (Minimal clics entrances)
- NFR-UX-4 → Epics 2, 3, 6, 7 (Intuitive workflows)
- NFR-UX-5 → Epics 2, 4 (Clear error messages)

**Compatibility NFRs (8 total):**
- NFR-COMPAT-1, NFR-COMPAT-2, NFR-COMPAT-3, NFR-COMPAT-8 → Epic 8 (Browser testing CI/CD)
- NFR-COMPAT-4, NFR-COMPAT-5, NFR-COMPAT-6 → Epic 1 (Responsive design foundation)
- NFR-COMPAT-7 → Epic 4 (JSON portable cross-OS)

**Maintainability NFRs (5 total):**
- NFR-MAINT-1, NFR-MAINT-2, NFR-MAINT-3 → Epic 1 (Architecture foundation)
- NFR-MAINT-4 → Epic 2 (Metadata maintainable)
- NFR-MAINT-5 → Epic 8 (README documentation)

---

## Coverage Summary

- **Total Epics:** 8
- **Total FRs:** 51 (100% coverage)
- **Total NFRs:** 26 (100% addressed)
- **Epic Dependencies:**
  - Epic 7 (Pathfinding) REQUIRES Epic 6 (Entrances) - entrances découvertes utilisées pour calcul routes
  - Epic 8 (DevOps) implémenté EARLY après Epic 1 pour déploiement continu dès v0.1

---

## Implementation Roadmap

### Phase 0: Foundation & DevOps (Early Deployment)
1. **Epic 1:** Project Foundation & Technical Setup
2. **Epic 8:** Production Deployment & DevOps Pipeline

→ **Outcome:** Infrastructure prête + déploiement automatisé pour tester dès v0.1

### Phase 1: MVP v0.1 Core
3. **Epic 2:** Seed Import & Data Management
4. **Epic 3:** Check Tracking & Progress Monitoring
5. **Epic 4:** Session Persistence & State Recovery
6. **Epic 5:** Theme System & Extended Sessions

→ **v0.1 Validable:** Import seed + Checks + Stats + Save/Load + Theme = Tracker fonctionnel sans Entrance Shuffle

### Phase 2: MVP v0.2 Navigation
7. **Epic 6:** Entrance Tracking & Shuffle Navigation

→ **v0.2 Validable:** v0.1 + Entrances = Support seeds avec Entrance Shuffle

### Phase 3: MVP v0.3 Complete
8. **Epic 7:** Intelligent Pathfinding & Route Optimization

→ **v0.3 Validable:** MVP complet prêt pour seed AllSanity complète (30h+, ~3000 checks)

---

## Detailed Epic Stories

---

## Epic 1: Project Foundation & Technical Setup

**User Outcome:** Alexandre dispose d'une application Angular 21 fonctionnelle avec infrastructure complète prête à recevoir les modules tracker.

**Value Delivered:** Foundation technique complète (Angular 21, PrimeNG 20+, Tailwind v4, services core skeleton, routing lazy-loading, structure projet 117 fichiers) configurée selon les patterns architecturaux définis.

**FRs Covered:** Infrastructure obligatoire (0 FRs directs)

**NFRs Addressed:** NFR-MAINT-1, NFR-MAINT-2, NFR-MAINT-3

---

### Story 1.1: Initialize Angular Project with Technology Stack

As a developer,
I want an Angular 21 project initialized with the complete technology stack,
So that I have a solid foundation following all architectural decisions.

**Acceptance Criteria:**

**Given** an empty project directory
**When** I run the initialization commands
**Then** an Angular 21 project is created with:
- pnpm as package manager (package.json configured)
- TypeScript 5.6.x strict mode enabled (tsconfig.json)
- Tailwind CSS v4 configured (tailwind.config.js + styles.css)
- Standalone API enabled (no NgModules)
- ES2022 target (tsconfig.json)
**And** `pnpm install` completes successfully with all dependencies locked (pnpm-lock.yaml)
**And** `ng serve` runs without errors showing Angular welcome page

---

### Story 1.2: Configure PrimeNG and Styling System

As a developer,
I want PrimeNG 20+ and Tailwind v4 properly configured,
So that I can use UI components and styling utilities throughout the application.

**Acceptance Criteria:**

**Given** the Angular project from Story 1.1
**When** I configure PrimeNG and Tailwind
**Then** PrimeNG 20+ is installed (primeng, @primeuix/themes, primeicons, primeflex)
**And** `app.config.ts` includes `providePrimeNG()` configuration
**And** global styles are configured in `styles.css` with Tailwind imports
**And** `tailwind.config.js` includes correct content paths for purge
**And** I can import and use a PrimeNG component (e.g., Button) in app.component.ts
**And** Tailwind utilities work (e.g., `class="flex justify-center"`)

---

### Story 1.3: Setup Project Structure and Core Services Skeleton

As a developer,
I want the complete project structure with core services skeleton,
So that I have organized directories and service interfaces ready for implementation.

**Acceptance Criteria:**

**Given** the configured Angular project from Story 1.2
**When** I create the project structure
**Then** the following directories exist:
- `src/app/modules/` (with subdirs: checks, entrances, pathfinding, stats)
- `src/app/core/services/`
- `src/app/shared/`
- `src/app/models/`
- `src/assets/data/`
**And** core service skeletons are created with `@Injectable({ providedIn: 'root' })`:
- `state-management.service.ts`
- `error-handler.service.ts`
- `theme.service.ts`
- `spoiler-parser.service.ts`
- `metadata.service.ts`
- `save-load.service.ts`
- `pathfinding.service.ts`
**And** each service has basic TypeScript interface with empty methods
**And** all services compile without errors (`ng build` succeeds)

---

### Story 1.4: Configure Routing with Lazy Loading

As a developer,
I want Angular Router configured with lazy loading for the 4 modules,
So that code splitting works and modules load on-demand.

**Acceptance Criteria:**

**Given** the project structure from Story 1.3
**When** I configure routing
**Then** `app.routes.ts` is created with 4 lazy-loaded routes:
- `/checks` → `modules/checks/checks.component.ts` (loadComponent)
- `/entrances` → `modules/entrances/entrances.component.ts` (loadComponent)
- `/pathfinding` → `modules/pathfinding/pathfinding.component.ts` (loadComponent)
- `/stats` → `modules/stats/stats.component.ts` (loadComponent)
**And** default route redirects to `/checks`
**And** placeholder components are created for each module (simple template showing module name)
**And** navigation between routes works (clicking links loads correct lazy component)
**And** `ng build` shows separate chunk files for each module (code splitting confirmed)

---

### Story 1.5: Configure Development Tools (ESLint, Prettier, TypeScript Paths)

As a developer,
I want ESLint, Prettier, and TypeScript path aliases configured,
So that code quality is enforced and imports are clean.

**Acceptance Criteria:**

**Given** the routing configured from Story 1.4
**When** I configure development tools
**Then** `.eslintrc.json` is created with Angular strict rules
**And** `.prettierrc.json` is created with project formatting rules
**And** `tsconfig.json` includes path aliases:
- `@core/*` → `src/app/core/*`
- `@modules/*` → `src/app/modules/*`
- `@shared/*` → `src/app/shared/*`
- `@models/*` → `src/app/models/*`
**And** `pnpm run lint` executes without errors on existing code
**And** `pnpm run format` (Prettier) formats all files consistently
**And** imports using path aliases work (e.g., `import { StateManagementService } from '@core/services/state-management.service'`)
**And** NFR-MAINT-3 is satisfied (TypeScript strict mode confirmed)

---

## Epic 2: Seed Import & Data Management

**User Outcome:** Alexandre peut importer son spoiler.json AllSanity et le tracker charge automatiquement les 3000 checks avec leurs métadonnées zone/type.

**Value Delivered:** Système d'import complet avec parsing spoiler.json, chargement check-metadata.json, validation format, messages confirmation/erreur clairs.

**FRs Covered:** FR1, FR2, FR3, FR4, FR5, FR48, FR49, FR50, FR51 (9 FRs)

**NFRs Addressed:** NFR-REL-6, NFR-UX-4, NFR-UX-5, NFR-MAINT-4

---

### Story 2.1: Define Core Data Models for Checks and Entrances

As a developer,
I want TypeScript interfaces defined for Check, Entrance, and related data structures,
So that I have type-safe models for spoiler.json parsing.

**Acceptance Criteria:**

**Given** the project structure from Epic 1
**When** I create the data models
**Then** `src/app/models/check.model.ts` exists with interfaces:
- `Check` (id: string, name: string, zone?: string, type?: string, isDone: boolean, completedAt?: string)
- `CheckMetadata` (zone: string, type: string)
- `CheckMetadataMap` (index signature: [checkName: string]: CheckMetadata)
**And** `src/app/models/entrance.model.ts` exists with interfaces:
- `Entrance` (from: string, to: string, discoveredAt: string, id?: string)
- `EntranceMapping` (format pour spoiler.json si nécessaire)
**And** `src/app/models/spoiler.model.ts` exists with interfaces:
- `SpoilerData` (structure parsing spoiler.json)
**And** all models use snake_case for JSON mapping compatibility (documented in comments)
**And** all files compile without TypeScript errors
**And** NFR-MAINT-3 is satisfied (strict mode types)

---

### Story 2.2: Implement Metadata Service with Check Reference Loading

As a developer,
I want a MetadataService that loads check-metadata.json and provides O(1) lookup,
So that I can retrieve zone/type for any check name instantly.

**Acceptance Criteria:**

**Given** the Check models from Story 2.1
**When** I implement MetadataService
**Then** `metadata.service.ts` has method `loadMetadata(filePath: string): Observable<CheckMetadataMap>`
**And** method `getCheckMetadata(checkName: string): CheckMetadata` returns metadata with O(1) lookup
**And** unknown checks return `{ zone: 'Unknown Zone', type: 'Unknown Type' }` (FR50)
**And** a sample `assets/data/check-metadata.json` file exists with at least 10 example checks:
```json
{
  "GC Darunia Pot 1": { "zone": "Goron City", "type": "Pot" },
  "KF Midos Top Left Chest": { "zone": "Kokiri Forest", "type": "Chest" }
}
```
**And** service is injectable as singleton (`providedIn: 'root'`)
**And** unit tests verify lookup, unknown check handling (FR50), and JSON parsing
**And** NFR-MAINT-4 is satisfied (metadata.json is human-readable)

---

### Story 2.3: Implement Spoiler Parser Service

As a developer,
I want a SpoilerParserService that parses spoiler.json and extracts checks and entrances,
So that I can load OOT Randomizer spoiler files.

**Acceptance Criteria:**

**Given** the models and MetadataService from Stories 2.1-2.2
**When** I implement SpoilerParserService
**Then** `spoiler-parser.service.ts` has method `parseSpoiler(fileContent: string): Observable<{ checks: Check[], entrances: Entrance[] }>`
**And** method `validateFormat(fileContent: string): { valid: boolean, errors: string[] }` checks JSON structure (FR4)
**And** parser extracts check names from spoiler.json (FR2)
**And** parser extracts entrance mappings from spoiler.json (FR3)
**And** parser enriches checks with metadata via MetadataService (FR49)
**And** parser handles malformed JSON gracefully with detailed error messages (NFR-REL-6, NFR-UX-5)
**And** unit tests verify parsing with sample spoiler.json (at least 20 checks, 5 entrances)
**And** unit tests verify format validation rejects invalid JSON (FR4)

---

### Story 2.4: Create Import UI Component with File Upload

As a developer,
I want an Import UI component allowing file upload,
So that users can import their spoiler.json files.

**Acceptance Criteria:**

**Given** the SpoilerParserService from Story 2.3
**When** I create the Import UI component
**Then** `src/app/shared/components/import-dialog/import-dialog.component.ts` exists (or similar location)
**And** component has file input accepting `.json` files
**And** component has "Import Spoiler" button
**And** component displays loading state while parsing (spinner/progress indicator)
**And** component is styled with PrimeNG (FileUpload or similar) and Tailwind
**And** component can be opened via a trigger (button in header/home page)
**And** component compiles and renders without errors
**And** NFR-UX-4 is addressed (intuitive file selection workflow)

---

### Story 2.5: Integrate Import with State Management and Display Confirmation

As a developer,
I want the import process to load checks into StateManagementService and show confirmation,
So that users see their imported data and know the import succeeded.

**Acceptance Criteria:**

**Given** the Import UI from Story 2.4
**When** user selects and imports a valid spoiler.json file
**Then** file content is passed to SpoilerParserService for validation (FR4)
**And** if valid, parsed checks and entrances are stored in StateManagementService
**And** confirmation message displays showing:
  - Total checks imported (e.g., "3047 checks imported successfully") (FR5)
  - Total entrances imported
  - Import timestamp
**And** user is automatically navigated to `/checks` route showing imported checks
**And** if validation fails, error message displays with specific issues (NFR-UX-5)
**And** loading state is visible during parsing (no frozen UI)
**And** unit tests verify successful import flow (FR1, FR5)

---

### Story 2.6: Handle Unmapped Checks and Display Warnings

As a developer,
I want the import process to detect checks not in metadata.json and display warnings,
So that users are aware of potentially missing zone/type information.

**Acceptance Criteria:**

**Given** the integrated import from Story 2.5
**When** imported spoiler.json contains checks not in check-metadata.json
**Then** those checks are still imported with `zone: 'Unknown Zone', type: 'Unknown Type'` (FR50)
**And** a warning banner displays after import completion (FR51):
  - "Warning: X checks could not be mapped to zones/types"
  - List of unmapped check names (or expandable section if many)
**And** unmapped checks are functional (can be marked done, filtered, etc.)
**And** warning is dismissible but reappears on next import if issue persists
**And** unit tests verify unmapped check handling (FR50, FR51)
**And** NFR-REL-6 is satisfied (graceful degradation, no crashes)

---

## Epic 3: Check Tracking & Progress Monitoring

**User Outcome:** Alexandre peut voir tous ses checks (3000 items), filtrer instantanément par zone/type, marquer fait/non-fait, masquer les complétés, et suivre sa progression en temps réel avec analytics détaillés.

**Value Delivered:** Module Checks complet avec filtrage multi-critères <100ms, virtual scrolling 60 FPS, toggle hide completed, et module Stats avec analytics multi-dimensionnels (type, zone, fait/à faire).

**FRs Covered:** FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR46, FR47 (20 FRs)

**NFRs Addressed:** NFR-PERF-1, NFR-PERF-3, NFR-PERF-5, NFR-PERF-6, NFR-PERF-7, NFR-PERF-8, NFR-REL-5, NFR-UX-1, NFR-MAINT-1

---

### Story 3.1: Create Checks Module with Virtual Scrolling Display

As a player,
I want to see a complete list of all my checks with smooth scrolling,
So that I can view all 3000+ checks without performance issues.

**Acceptance Criteria:**

**Given** checks are loaded in StateManagementService from Epic 2
**When** I navigate to `/checks` route
**Then** Checks module component displays all checks in a list (FR6)
**And** PrimeNG Virtual Scroller is implemented with `itemSize=50` fixed (NFR-PERF-3)
**And** each check item displays: check name exactly as in spoiler.json (FR14), zone, type, done status
**And** list renders at 60 FPS during scrolling (NFR-PERF-3 verified via performance profiler)
**And** list handles 3000+ checks without crashes or freezes (NFR-REL-5)
**And** OnPush change detection strategy is used (NFR-MAINT-1)
**And** component is lazy-loaded via routing from Epic 1
**And** unit tests verify virtual scrolling renders all checks
**And** NFR-PERF-6 is addressed (stable memory, no leaks with takeUntilDestroyed)

---

### Story 3.2: Implement Check Marking (Done/Not Done Toggle)

As a player,
I want to mark checks as done or not done with a simple click,
So that I can track which checks I've completed.

**Acceptance Criteria:**

**Given** the checks list from Story 3.1
**When** I click on a check item
**Then** the check toggles between ✅ Done and ⬜ Not Done states (FR10, FR11)
**And** visual indicator shows current state clearly (checkmark icon, color change)
**And** state updates in StateManagementService via immutable update (spread operator - NFR-MAINT-1)
**And** toggle action feels instantaneous (<50ms perceived - NFR-PERF-5)
**And** BehaviorSubject pattern used (private subject, public observable)
**And** change is reflected immediately in the UI via RxJS observable
**And** unit tests verify toggle functionality and immutability
**And** no performance degradation after marking 1000+ checks (NFR-PERF-7)

---

### Story 3.3: Implement Zone Filter with Reactive Updates

As a player,
I want to filter checks by zone,
So that I can focus on a specific area of the game.

**Acceptance Criteria:**

**Given** the checks list from Story 3.2
**When** I select a zone from a dropdown filter
**Then** only checks matching the selected zone are displayed (FR7)
**And** zone list is populated from check metadata (all unique zones)
**And** filter updates reactively using RxJS combineLatest (checks$ + filters$)
**And** filtering completes within 100ms for 3000 checks (NFR-PERF-1 target <50ms)
**And** "All Zones" option shows all checks (FR13 reset functionality)
**And** virtual scroller updates smoothly with filtered results
**And** unit tests verify zone filtering logic
**And** debounceTime(50) applied for performance optimization

---

### Story 3.4: Implement Type Filter and Multi-Criteria Filtering

As a player,
I want to filter checks by type and combine zone + type filters,
So that I can narrow down to specific check categories (e.g., "Goron City Pots").

**Acceptance Criteria:**

**Given** the zone filter from Story 3.3
**When** I select a type from a dropdown filter
**Then** only checks matching the selected type are displayed (FR8)
**And** type list is populated from check metadata (all unique types: Pot, Chest, etc.)
**And** I can apply both zone AND type filters simultaneously (FR9 multi-criteria)
**And** combined filtering (Zone × Type) completes within 100ms (NFR-PERF-1)
**And** "All Types" option available (FR13 reset functionality)
**And** "Reset All Filters" button clears both zone and type filters (FR13)
**And** filter state persists in StateManagementService filters$ observable
**And** unit tests verify type filtering and combined Zone × Type filtering
**And** NFR-PERF-1 is satisfied (<100ms, target <50ms)

---

### Story 3.5: Implement Toggle to Hide Completed Checks

As a player,
I want to hide all completed checks from the list,
So that I can focus only on remaining uncompleted checks.

**Acceptance Criteria:**

**Given** the filtered checks list from Story 3.4 with some checks marked done
**When** I toggle the "Hide Completed Checks" option
**Then** all checks with isDone=true are hidden from the list (FR12)
**And** toggle button shows clear on/off state (e.g., "Show All" vs "Hide Completed")
**And** toggle action feels instantaneous (<50ms - NFR-PERF-5)
**And** toggle state is integrated with existing filters (Zone × Type × HideCompleted)
**And** filtering with hide completed enabled still completes within 100ms (NFR-PERF-1)
**And** toggle state persists in filters$ observable
**And** virtual scroller updates smoothly when toggling
**And** unit tests verify hide completed logic combined with other filters

---

### Story 3.6: Create Stats Module with Global Progression Display

As a player,
I want to see my global progression and statistics by type and zone,
So that I understand my overall completion status.

**Acceptance Criteria:**

**Given** checks are loaded and some are marked done
**When** I navigate to `/stats` route
**Then** Stats module component displays:
  - Global progression: "X / Total checks completed" (e.g., "847 / 3047") (FR30)
  - Progression by check type (FR31): "Pots: 45/120, Chests: 230/580", etc.
  - Progression by zone (FR32): "Goron City: 23/87, Kokiri Forest: 12/54", etc.
**And** statistics calculate reactively from StateManagementService.checks$ (using map operator)
**And** both "Done" and "To Do" perspectives are shown (FR33) - toggle or side-by-side view
**And** component is lazy-loaded via routing from Epic 1
**And** OnPush change detection strategy used (NFR-MAINT-1)
**And** unit tests verify statistics calculations accuracy
**And** stats update in real-time when checks are marked done

---

### Story 3.7: Add Persistent Mini Progress Counter

As a player,
I want to see a mini progress counter always visible while browsing checks,
So that I can track my progression without navigating to stats.

**Acceptance Criteria:**

**Given** the checks module and stats from Stories 3.1-3.6
**When** I am on any route (/checks, /entrances, /pathfinding, /stats)
**Then** a mini progress counter is visible in the header or sticky position (FR34)
**And** counter displays: "X / Total (Y%)" (e.g., "847 / 3047 (27.8%)")
**And** counter updates in real-time when checks are marked done
**And** counter is styled with PrimeNG Badge or similar component
**And** counter is always visible regardless of scroll position (sticky/fixed)
**And** counter uses RxJS observable from StateManagementService.stats$
**And** unit tests verify counter updates reactively

---

### Story 3.8: Add Detailed Zone Statistics with Drill-Down

As a player,
I want to see detailed statistics for each zone and drill down into zone-specific data,
So that I can understand my progression in specific areas.

**Acceptance Criteria:**

**Given** the stats module from Story 3.6
**When** I view the stats page
**Then** I can see a list of all zones with individual progression (FR35 drill-down)
**And** each zone shows:
  - Total checks in zone
  - Completed checks in zone
  - Percentage completion
  - Breakdown by type within that zone (e.g., "Goron City: Pots 5/9, Chests 12/23")
**And** clicking a zone navigates to `/checks?zone=X` (pre-filtered checks view)
**And** entrance discovery statistics per zone are displayed (FR36): "Entrances discovered: X"
**And** drill-down navigation works smoothly
**And** unit tests verify zone drill-down calculations and navigation
**And** NFR-UX-1 is addressed (stats support 50h+ sessions without performance issues)

---

**Status:** Step 3 In Progress - Adding Epics 4-8
**Next:** Continue with Epic 4-8 stories...

## Epic 4: Session Persistence & State Recovery

**User Outcome:** Alexandre peut sauvegarder son état complet (checks marqués, entrances, stats) dans un JSON portable, fermer le tracker, et reprendre 2 jours plus tard exactement où il était sans perte de données.

**Value Delivered:** Système save/load JSON 100% fiable avec validation stricte checksum SHA-256, détection corruption, protection état actuel, restauration exacte, et portabilité cross-platform.

**FRs Covered:** FR37, FR38, FR39, FR40, FR41, FR42, FR43 (7 FRs)

**NFRs Addressed:** NFR-REL-1, NFR-REL-2, NFR-REL-3, NFR-REL-4, NFR-REL-7, NFR-COMPAT-7, NFR-UX-5

---

### Story 4.1: Define Save Data JSON Format with snake_case Convention

As a developer,
I want a clearly defined save data JSON structure using snake_case,
So that save files are consistent with OOT Randomizer spoiler.json format.

**Acceptance Criteria:**

**Given** the project models from previous epics
**When** I define the save data format
**Then** `src/app/models/save-data.model.ts` exists with interfaces:
- `SaveData` with properties (all snake_case):
  - `version: string` (format version, e.g., "1.0")
  - `save_date: string` (ISO timestamp)
  - `checksum: string` (SHA-256 hash)
  - `checks: CheckState[]`
  - `entrances: EntranceState[]`
  - `filters: FiltersState`
  - `metadata: SaveMetadata`
- `CheckState` with properties: `check_id: string`, `is_done: boolean`, `completed_at?: string`
- `EntranceState` with properties: `entrance_from: string`, `entrance_to: string`, `discovered_at: string`
- `SaveMetadata` with properties: `seed_name?: string`, `total_checks: number`, `completed_checks: number`
**And** TypeScript interfaces document snake_case ↔ camelCase mapping in comments
**And** all interfaces compile without errors
**And** format is designed to be <5MB for 3000 checks (NFR-REL-4)

---

### Story 4.2: Implement JSON Export with SHA-256 Checksum

As a player,
I want to export my complete progress to a JSON file with integrity checksum,
So that I can save my session safely.

**Acceptance Criteria:**

**Given** the save data format from Story 4.1
**When** I implement export in SaveLoadService
**Then** `save-load.service.ts` has method `exportSave(): Observable<Blob>`
**And** method collects all state from StateManagementService:
  - All checks with isDone status (FR42 complete state)
  - All entrances (FR42)
  - Current filters state (FR42)
  - Statistics metadata (FR42)
**And** method maps TypeScript camelCase to JSON snake_case:
  - `checkId` → `check_id`
  - `isDone` → `is_done`
  - `completedAt` → `completed_at`
**And** method calculates SHA-256 checksum using Web Crypto API on all data except checksum field
**And** method generates SaveData object with version, save_date, checksum, all state
**And** method returns JSON Blob ready for download (FR37)
**And** exported JSON file size is <5MB for 3000 checks (NFR-REL-4)
**And** unit tests verify export generates valid JSON with checksum

---

### Story 4.3: Implement JSON Import with Strict Validation

As a player,
I want to import a previously saved JSON file with strict validation,
So that I can restore my session safely without corrupting my current state.

**Acceptance Criteria:**

**Given** the export functionality from Story 4.2
**When** I implement import validation in SaveLoadService
**Then** `save-load.service.ts` has method `validateSave(fileContent: string): Observable<{ valid: boolean, errors: string[], metadata?: SaveMetadata }>`
**And** validation checks (FR39, FR40):
  - JSON is parseable (syntax valid)
  - Required fields exist (version, save_date, checksum, checks, etc.)
  - Format version is compatible
  - Checksum matches calculated SHA-256 hash (FR40 corruption detection)
  - Data types are correct (arrays, strings, booleans)
**And** validation returns detailed errors array if invalid (FR41):
  - "Invalid JSON syntax at line X"
  - "Missing required field: checks"
  - "Checksum mismatch - file may be corrupted"
  - "Incompatible version: expected 1.x, found 2.0"
**And** validation NEVER modifies current application state (NFR-REL-3)
**And** NFR-REL-2 is satisfied (100% corruption detection via checksum)
**And** unit tests verify validation detects all error conditions

---

### Story 4.4: Implement State Restoration with TypeScript Mapping

As a player,
I want imported save data to restore my exact state,
So that I can continue my session exactly where I left off.

**Acceptance Criteria:**

**Given** a valid save file passing validation from Story 4.3
**When** I implement state restoration in SaveLoadService
**Then** `save-load.service.ts` has method `importSave(saveData: SaveData): Observable<void>`
**And** method maps JSON snake_case to TypeScript camelCase:
  - `check_id` → `checkId`
  - `is_done` → `isDone`
  - `completed_at` → `completedAt`
**And** method restores state to StateManagementService:
  - All checks with correct isDone status
  - All entrances with discoveredAt timestamps
  - Filters state
**And** restoration achieves 100% data fidelity (NFR-REL-1 - zero loss)
**And** restored state matches exported state exactly (unit tests compare before/after)
**And** method updates StateManagementService using immutable patterns
**And** unit tests verify complete state restoration with 3000 checks
**And** NFR-COMPAT-7 is satisfied (JSON portable across OS - tested on different platforms)

---

### Story 4.5: Create Export UI with Download Functionality

As a player,
I want a clear export button that downloads my save file,
So that I can easily save my progress.

**Acceptance Criteria:**

**Given** the export functionality from Story 4.2
**When** I create the export UI
**Then** an "Export Save" button exists in the application header or menu
**And** clicking the button triggers SaveLoadService.exportSave()
**And** file downloads automatically with filename format: `notesallsanity-save-{YYYY-MM-DD}.json`
**And** a success message displays: "Save exported successfully - X checks, Y entrances saved"
**And** loading indicator shows during export generation (if processing takes >100ms)
**And** button is styled with PrimeNG Button component and Tailwind
**And** export works on Chrome, Firefox, Edge, Safari (NFR-COMPAT-7)
**And** unit tests verify export download triggers correctly

---

### Story 4.6: Create Import UI with Validation and Error Display

As a player,
I want to import a save file with clear validation feedback,
So that I know if my save file is valid before loading it.

**Acceptance Criteria:**

**Given** the validation and import from Stories 4.3-4.4
**When** I create the import UI
**Then** an "Import Save" button exists in the application header or menu
**And** clicking button opens file picker accepting `.json` files
**And** after file selection, validation runs automatically (FR39)
**And** if validation succeeds, confirmation dialog displays save metadata (FR43):
  - Save date
  - Total checks count
  - Completed checks count
  - "Load this save?" confirmation
**And** if validation fails, error dialog displays all validation errors (FR41, NFR-UX-5):
  - Clear, actionable error messages
  - Specific issues (e.g., "Checksum mismatch on line 347")
  - "Your current state has NOT been modified" reassurance
**And** user must explicitly confirm before state is restored (NFR-REL-3 protection)
**And** loading indicator shows during validation and import
**And** unit tests verify UI validation flow and error display

---

### Story 4.7: Implement Import with State Protection and Confirmation

As a player,
I want my current state protected if I import an invalid save file,
So that I never lose my progress due to a corrupted import.

**Acceptance Criteria:**

**Given** the import UI from Story 4.6
**When** I attempt to import an invalid save file
**Then** validation errors are displayed (from Story 4.6)
**And** import is BLOCKED - no state changes occur (NFR-REL-3)
**And** current StateManagementService state remains unchanged
**And** message confirms: "Import cancelled - your current progress is safe"
**When** I import a valid save file and confirm
**Then** state restoration executes (Story 4.4)
**And** success message displays: "Save loaded successfully - restored to {save_date}"
**And** user is navigated to `/checks` route to see restored checks
**And** all checks, entrances, filters are restored exactly (NFR-REL-1)
**And** application state remains consistent across browser refresh (NFR-REL-7 - localStorage backup optional)
**And** unit tests verify invalid import protection and valid import success
**And** integration test verifies full export → close → import → restore cycle

---

## Epic 5: Theme System & Extended Sessions

**User Outcome:** Alexandre peut basculer entre Dark/Light mode pour confort visuel optimal pendant ses sessions AllSanity longues (30h+) sans fatigue oculaire.

**Value Delivered:** Système de thème complet avec toggle Dark/Light, persistence localStorage, contraste suffisant sessions longues, et détection thème système (optionnel).

**FRs Covered:** FR44, FR45 (2 FRs)

**NFRs Addressed:** NFR-UX-2, NFR-PERF-5

---

### Story 5.1: Implement Theme Service with Dark/Light Palettes

As a developer,
I want a ThemeService managing Dark and Light theme palettes,
So that the application can switch themes programmatically.

**Acceptance Criteria:**

**Given** the core services skeleton from Epic 1
**When** I implement ThemeService
**Then** `theme.service.ts` has enum `Theme { DARK = 'dark', LIGHT = 'light' }`
**And** service has BehaviorSubject `private currentThemeSubject = new BehaviorSubject<Theme>(Theme.DARK)`
**And** service has public observable `currentTheme$ = this.currentThemeSubject.asObservable()`
**And** service has method `setTheme(theme: Theme): void` that:
  - Updates currentThemeSubject
  - Applies theme CSS class to document body (`<body class="theme-dark">` or `<body class="theme-light">`)
**And** service has method `toggleTheme(): void` that switches between Dark and Light
**And** Dark and Light CSS palettes are defined in `styles.css` with sufficient contrast (NFR-UX-2):
  - Dark: Background #1a1a1a, Text #e0e0e0, Primary accent, etc.
  - Light: Background #ffffff, Text #1a1a1a, Primary accent, etc.
**And** service is injectable as singleton (`providedIn: 'root'`)
**And** unit tests verify theme switching logic

---

### Story 5.2: Add Theme Persistence with localStorage

As a player,
I want my selected theme to persist across browser sessions,
So that I don't have to reselect my preferred theme every time.

**Acceptance Criteria:**

**Given** the ThemeService from Story 5.1
**When** I add persistence functionality
**Then** ThemeService has method `loadThemeFromStorage(): Theme` that:
  - Reads theme from localStorage key `'notesallsanity-theme'`
  - Returns stored theme if valid, otherwise returns default (Dark or system preference)
**And** ThemeService has method `saveThemeToStorage(theme: Theme): void` that:
  - Saves theme to localStorage (FR45 persist across sessions)
**And** `setTheme()` method calls `saveThemeToStorage()` automatically
**And** on service initialization, saved theme is loaded and applied automatically
**And** theme persists across:
  - Browser refresh
  - Close and reopen browser
  - Different tabs (same origin)
**And** optional: detect system theme preference on first load (`window.matchMedia('(prefers-color-scheme: dark)')`)
**And** unit tests verify localStorage persistence
**And** NFR-PERF-5 is satisfied (toggle instantaneous <50ms)

---

### Story 5.3: Create Theme Toggle UI Component

As a player,
I want a visible toggle to switch between Dark and Light modes,
So that I can easily change themes based on my environment and comfort.

**Acceptance Criteria:**

**Given** the ThemeService with persistence from Story 5.2
**When** I create the theme toggle UI
**Then** a theme toggle button/switch exists in the application header (visible on all routes)
**And** toggle clearly indicates current theme (e.g., moon icon for Dark, sun icon for Light)
**And** clicking toggle calls ThemeService.toggleTheme() (FR44)
**And** theme changes immediately without flash or flicker (<50ms - NFR-PERF-5)
**And** toggle is styled with PrimeNG (ToggleButton or InputSwitch) and Tailwind
**And** toggle is keyboard accessible (Space/Enter to toggle)
**And** current theme persists after toggle (localStorage updated via Story 5.2)
**And** all application components respect theme (PrimeNG components + custom components use CSS variables)
**And** contrast is sufficient for extended gameplay (NFR-UX-2):
  - Dark mode: No eye strain during long sessions
  - Light mode: Clear visibility without glare
**And** unit tests verify toggle UI triggers theme change
**And** visual test confirms both themes display correctly across all routes

---

## Epic 6: Entrance Tracking & Shuffle Navigation

**User Outcome:** Alexandre peut tracker toutes les entrances découvertes en Entrance Shuffle, chercher rapidement comment accéder à une zone, et ne jamais se perdre dans la randomisation complexe.

**Value Delivered:** Module Entrances complet avec notation "Zone A → Zone B", sélecteur auto-réductif (liste diminue), recherche textuelle instantanée, filtrage par zone, compteur entrances, mode decoupled, CRUD complet.

**FRs Covered:** FR15, FR16, FR17, FR18, FR19, FR20, FR21 (7 FRs)

**NFRs Addressed:** NFR-UX-3, NFR-UX-4, NFR-PERF-1

---

### Story 6.1: Create Entrances Module with Recording Interface

As a player,
I want to record discovered entrances as "Zone A → Zone B",
So that I can track where each entrance leads in Entrance Shuffle mode.

**Acceptance Criteria:**

**Given** the Entrance model from Epic 2
**When** I navigate to `/entrances` route
**Then** Entrances module component displays with recording interface (FR15)
**And** interface has two dropdown selectors: "From Zone" and "To Zone"
**And** zone lists are populated from check metadata (all unique zones)
**And** interface has "Record Entrance" button
**And** clicking button creates new Entrance in StateManagementService with:
  - `from: string` (selected from zone)
  - `to: string` (selected to zone)
  - `discoveredAt: string` (ISO timestamp)
  - `id: string` (generated UUID)
**And** recorded entrance displays in list below interface showing "From Zone → To Zone"
**And** entrance uses immutable update pattern (spread operator)
**And** component is lazy-loaded via routing from Epic 1
**And** OnPush change detection strategy used
**And** unit tests verify entrance recording
**And** NFR-UX-3 is addressed (minimal clics - 2 selects + 1 button)

---

### Story 6.2: Implement Auto-Reducing Zone Selector

As a player,
I want zone selectors to show only unused entrances,
So that the list shrinks as I record more entrances and I avoid duplicates.

**Acceptance Criteria:**

**Given** the entrance recording interface from Story 6.1
**When** I have recorded some entrances
**Then** the "From Zone" dropdown shows only zones that haven't been used as "from" yet (FR16 auto-reducing)
**And** the "To Zone" dropdown shows all zones (or filters based on "from" if decoupled mode off)
**And** as I record more entrances, available "from" zones decrease
**And** dropdown updates reactively using RxJS (combineLatest with recorded entrances)
**And** when all zones are used, interface shows message: "All entrances recorded"
**And** auto-reducing behavior is configurable via decoupled mode (Story 6.5)
**And** unit tests verify auto-reducing logic
**And** NFR-UX-4 is satisfied (intuitive - list naturally shrinks as user progresses)

---

### Story 6.3: Add Entrance Search and Text Filtering

As a player,
I want to search entrances by typing zone names,
So that I can quickly find how to access a specific zone.

**Acceptance Criteria:**

**Given** recorded entrances from Stories 6.1-6.2
**When** I type in the search input field
**Then** entrance list filters to show only entrances matching search text (FR17)
**And** search matches both "from" and "to" zone names (e.g., searching "Goron" shows all entrances from/to Goron City)
**And** search is case-insensitive
**And** search updates reactively with debounceTime(300) for performance (NFR-PERF-1)
**And** search input has clear button to reset filter
**And** empty search shows all entrances
**And** search box is prominently placed above entrance list
**And** unit tests verify search filtering logic
**And** performance test confirms search on 100+ entrances completes <100ms

---

### Story 6.4: Add Zone-Based Filtering and Entrance Count Display

As a player,
I want to filter entrances by zone and see how many entrances each zone has,
So that I can focus on specific areas and track my exploration progress.

**Acceptance Criteria:**

**Given** recorded entrances from Stories 6.1-6.3
**When** I select a zone from the filter dropdown
**Then** entrance list shows only entrances where "from" OR "to" matches selected zone (FR18)
**And** "All Zones" option shows all entrances
**And** zone filter works in combination with text search (both filters applied)
**And** entrance count per zone is displayed in a summary section (FR19):
  - "Goron City: 5 entrances discovered"
  - "Kokiri Forest: 3 entrances discovered"
  - etc.
**And** count shows both "from" and "to" entrances for each zone
**And** count updates reactively as entrances are recorded
**And** count section is visible above or beside entrance list
**And** unit tests verify zone filtering and count calculations

---

### Story 6.5: Implement Decoupled Entrance Mode Configuration

As a player,
I want to configure decoupled entrance mode for bidirectional vs unidirectional entrances,
So that I can handle different randomizer settings.

**Acceptance Criteria:**

**Given** the entrance recording from Stories 6.1-6.4
**When** I toggle "Decoupled Entrances" setting
**Then** setting is stored in StateManagementService and persists via localStorage (FR20)
**And** when Decoupled Mode is ON (bidirectional):
  - Recording "Zone A → Zone B" does NOT automatically create reverse "Zone B → Zone A"
  - Both directions must be recorded separately
  - Auto-reducing selector allows same zone to be "from" multiple times
**And** when Decoupled Mode is OFF (unidirectional/coupled):
  - Recording "Zone A → Zone B" assumes reverse is symmetric
  - Auto-reducing selector removes zone from "from" list after first use
**And** setting toggle is clearly labeled in UI (e.g., checkbox or switch)
**And** tooltip or help text explains the difference
**And** unit tests verify decoupled mode behavior
**And** default mode is ON (decoupled/bidirectional) per OOT Randomizer standard

---

### Story 6.6: Add Delete Entrance Functionality

As a player,
I want to delete recorded entrances if I made a mistake,
So that I can correct my entrance tracking without restarting.

**Acceptance Criteria:**

**Given** recorded entrances displayed in the list from previous stories
**When** I click a delete button next to an entrance
**Then** confirmation dialog asks: "Delete entrance 'Zone A → Zone B'?" (FR21)
**And** confirming deletes the entrance from StateManagementService
**And** entrance disappears from list immediately (reactive update)
**And** entrance count per zone updates accordingly
**And** auto-reducing selector updates (deleted entrance's zones become available again)
**And** delete uses immutable update pattern (filter out by ID)
**And** canceling confirmation keeps the entrance
**And** delete button is clearly visible but styled to avoid accidental clicks
**And** unit tests verify delete functionality
**And** NFR-UX-4 is satisfied (clear error correction workflow)

---

## Epic 7: Intelligent Pathfinding & Route Optimization

**User Outcome:** Alexandre peut calculer le chemin optimal entre deux zones en tenant compte des entrances découvertes, du Save Warp gratuit, et du contexte Child/Adult pour optimiser sa navigation et gagner du temps.

**Value Delivered:** Module Pathfinding avec algorithme Dijkstra + Save Warp, contexte Child/Adult, affichage route étape par étape, calcul <2s, navigation directe vers checks destination, message "Impossible" si pas de chemin.

**FRs Covered:** FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29 (8 FRs)

**NFRs Addressed:** NFR-PERF-2, NFR-UX-4

**Critical Dependency:** Epic 6 (Entrances) DOIT être implémenté - pathfinding utilise les entrances découvertes

---

### Story 7.1: Create Pathfinding Module with Zone Selection Interface

As a player,
I want to select starting and destination zones for pathfinding,
So that I can plan my route between two locations.

**Acceptance Criteria:**

**Given** the project structure from Epic 1
**When** I navigate to `/pathfinding` route
**Then** Pathfinding module component displays with interface containing:
  - "Starting Zone" dropdown selector (FR22)
  - "Destination Zone" dropdown selector (FR23)
  - "Calculate Route" button
**And** zone dropdowns are populated from check metadata (all unique zones)
**And** starting zone can optionally default to last visited zone (optional enhancement)
**And** component is lazy-loaded via routing from Epic 1
**And** OnPush change detection strategy used
**And** interface is styled with PrimeNG (Dropdown) and Tailwind
**And** unit tests verify zone selection interface
**And** NFR-UX-4 is addressed (clear, intuitive UI)

---

### Story 7.2: Add Age Context Selection (Child/Adult)

As a player,
I want to specify my current age context (Child or Adult),
So that pathfinding only suggests routes accessible with my current age.

**Acceptance Criteria:**

**Given** the pathfinding interface from Story 7.1
**When** I add age context selection
**Then** interface includes age selector with options: "Child" and "Adult" (FR24)
**And** age selector is implemented as radio buttons or toggle switch
**And** age context is stored in pathfinding state (default: Adult)
**And** age selector is clearly labeled: "Current Age Context"
**And** tooltip or help text explains: "Some zones are only accessible as Child or Adult"
**And** age context will be used by Dijkstra algorithm (Story 7.3) to filter accessible zones
**And** unit tests verify age context selection
**And** UI clearly indicates selected age

---

### Story 7.3: Implement Dijkstra Pathfinding Algorithm Core

As a developer,
I want a Dijkstra algorithm implementation that calculates optimal paths using recorded entrances,
So that the pathfinding service can find routes between zones.

**Acceptance Criteria:**

**Given** recorded entrances from Epic 6 and age context from Story 7.2
**When** I implement the core Dijkstra algorithm in PathfindingService
**Then** `pathfinding.service.ts` has method `calculatePath(start: string, destination: string, age: 'Child' | 'Adult', entrances: Entrance[]): PathResult`
**And** algorithm builds a graph from recorded entrances (FR25 uses recorded entrances)
**And** algorithm filters entrances based on age context (FR24 - some zones age-restricted)
**And** algorithm uses Dijkstra shortest path algorithm (not BFS/DFS - optimal path required)
**And** algorithm returns PathResult containing:
  - `path: string[]` (array of zone names from start to destination)
  - `found: boolean` (true if path exists)
  - `distance: number` (total cost/hops)
**And** if no path exists, returns `{ found: false }` (FR29 indicator)
**And** algorithm completes within 2 seconds for typical entrance graphs (NFR-PERF-2)
**And** unit tests verify Dijkstra correctness with sample graphs
**And** unit tests verify age filtering

---

### Story 7.4: Integrate Save Warp as Free Teleportation Node

As a player,
I want the pathfinding algorithm to consider Save Warp as a free teleportation option,
So that I get optimal routes using this game mechanic.

**Acceptance Criteria:**

**Given** the Dijkstra algorithm from Story 7.3
**When** I integrate Save Warp functionality
**Then** Save Warp is added as a special graph node accessible from ANY zone (FR26 free teleportation)
**And** Save Warp teleports to a predefined set of zones (e.g., Temple of Time, Link's House, etc. - configurable)
**And** Save Warp has cost 0 (free teleportation)
**And** pathfinding algorithm considers Save Warp routes when calculating optimal path
**And** if Save Warp provides a shorter route, it's included in the path
**And** Save Warp destinations are configurable in a constants file or configuration
**And** unit tests verify Save Warp integration (path using Save Warp vs direct path)
**And** Save Warp node is clearly identified in path results (e.g., "Zone A → **Save Warp** → Zone B")

---

### Story 7.5: Add Memoization Cache for Performance Optimization

As a developer,
I want pathfinding results cached with memoization,
So that repeated calculations complete instantly and meet the <2s performance requirement.

**Acceptance Criteria:**

**Given** the pathfinding algorithm from Stories 7.3-7.4
**When** I add memoization caching
**Then** PathfindingService maintains a cache Map keyed by `${start}-${destination}-${age}`
**And** before running Dijkstra, service checks cache for existing result
**And** if cached result exists and entrances haven't changed, return cached result immediately (<10ms)
**And** if entrances change (new entrance recorded, entrance deleted), cache is invalidated
**And** cache invalidation listens to StateManagementService.entrances$ observable
**And** pathfinding with cache hit completes <50ms (instant to user)
**And** pathfinding without cache completes <2s (NFR-PERF-2 satisfied)
**And** unit tests verify cache hit/miss logic
**And** unit tests verify cache invalidation on entrance changes

---

### Story 7.6: Display Calculated Route Step-by-Step with Navigation

As a player,
I want to see the calculated route displayed clearly step-by-step,
So that I know exactly which zones to traverse to reach my destination.

**Acceptance Criteria:**

**Given** a calculated path from Stories 7.3-7.5
**When** I click "Calculate Route" button
**Then** loading indicator shows during calculation (if >100ms)
**And** if path found, route displays step-by-step (FR27):
  - "Starting Zone: Kokiri Forest"
  - "1. Kokiri Forest → Lost Woods"
  - "2. Lost Woods → Sacred Forest Meadow"
  - "3. Sacred Forest Meadow → **Save Warp**"
  - "4. Save Warp → Temple of Time"
  - "Destination reached: Temple of Time"
**And** each step clearly shows zone transitions (arrow →)
**And** Save Warp steps are highlighted/bolded (special node indicator)
**And** route includes "Open Checks" button for destination zone (FR28 navigate to checks view)
**And** clicking "Open Checks" navigates to `/checks?zone=Temple%20of%20Time` with pre-filtered checks
**And** if no path found, message displays: "No path available between these zones" (FR29)
**And** unit tests verify route display and navigation
**And** NFR-UX-4 is satisfied (clear, actionable route display)

---

### Story 7.7: Handle Edge Cases and Display "No Path" Message

As a player,
I want clear feedback when no path exists between zones,
So that I know I need to discover more entrances or the route is impossible.

**Acceptance Criteria:**

**Given** the pathfinding interface from Stories 7.1-7.6
**When** no path exists between selected zones
**Then** message displays: "No path available between [Start] and [Destination]" (FR29)
**And** message includes helpful suggestions:
  - "You may need to discover more entrances"
  - "Check if the destination is accessible with your current age context (Child/Adult)"
  - "Try switching age context if applicable"
**And** message is styled clearly (info/warning banner with PrimeNG Message component)
**And** edge cases are handled gracefully:
  - Start zone same as destination → message "You are already at the destination"
  - No entrances recorded yet → message "No entrances recorded - please record entrances first"
  - Invalid zone selection → appropriate error message
**And** all edge cases have unit tests
**And** NFR-UX-4 is satisfied (clear error messages guide user)
**And** NFR-PERF-2 is satisfied (even failed path calculations complete <2s)

---

## Epic 8: Production Deployment & DevOps Pipeline

**User Outcome:** Alexandre peut déployer NotesAllSanity sur son serveur Dokploy self-hosted avec CI/CD automatique garantissant qualité code (ESLint, tests) et sécurité (CVE checks) à chaque commit.

**Value Delivered:** Infrastructure DevOps complète avec Dockerfile multi-stage optimisé, nginx SPA routing, GitHub Actions CI/CD quality gates, déploiement Dokploy automatisé, monitoring sécurité Dependabot.

**FRs Covered:** Infrastructure DevOps (0 FRs directs)

**NFRs Addressed:** NFR-MAINT-1, NFR-MAINT-5, NFR-COMPAT-1

**Deployment Strategy:** Epic 8 implémenté EARLY (après Epic 1) pour déploiement continu dès v0.1

---

### Story 8.1: Create Multi-Stage Dockerfile for Production Build

As a developer,
I want a multi-stage Dockerfile optimized for production,
So that the application can be deployed as a lightweight container.

**Acceptance Criteria:**

**Given** the Angular project from Epic 1
**When** I create the Dockerfile
**Then** `Dockerfile` exists at project root with multi-stage build:
  - **Stage 1 (builder):** `FROM node:20-alpine AS builder`
    - Install pnpm globally
    - Copy package.json and pnpm-lock.yaml
    - Run `pnpm install --frozen-lockfile`
    - Copy all source files
    - Run `pnpm run build --configuration production`
  - **Stage 2 (serve):** `FROM nginx:alpine`
    - Copy built files from builder stage to `/usr/share/nginx/html`
    - Copy nginx.conf to `/etc/nginx/conf.d/default.conf`
    - Expose port 80
    - CMD nginx
**And** `.dockerignore` exists excluding: node_modules, dist, .git, *.md, tests
**And** `docker build -t notesallsanity:latest .` completes successfully
**And** built image size is optimized (<100MB for nginx stage)
**And** container runs and serves application on port 80

---

### Story 8.2: Create nginx Configuration for SPA Routing

As a developer,
I want nginx configured for SPA routing with performance optimizations,
So that Angular routing works correctly and assets are cached efficiently.

**Acceptance Criteria:**

**Given** the Dockerfile from Story 8.1
**When** I create nginx configuration
**Then** `nginx.conf` exists with configuration:
  - `listen 80;`
  - `root /usr/share/nginx/html;`
  - `index index.html;`
  - SPA routing: `location / { try_files $uri $uri/ /index.html; }` (CRITICAL for Angular routes)
  - Gzip compression enabled: `gzip on; gzip_types text/css application/javascript;`
  - Cache headers for static assets: `location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; }`
  - No cache for index.html: `location = /index.html { add_header Cache-Control "no-cache"; }`
**And** nginx configuration is copied to container in Dockerfile Stage 2
**And** container serves Angular app correctly on all routes (/checks, /entrances, /pathfinding, /stats)
**And** browser refresh on any route doesn't give 404 (SPA routing works)
**And** Gzip compression verified in response headers
**And** static assets cache headers verified

---

### Story 8.3: Create GitHub Actions CI Pipeline with Quality Gates

As a developer,
I want GitHub Actions CI/CD pipeline with quality gates,
So that code quality and security are enforced automatically on every commit.

**Acceptance Criteria:**

**Given** the project with ESLint and Prettier from Epic 1
**When** I create GitHub Actions workflow
**Then** `.github/workflows/ci.yml` exists with jobs:
  - **Job 1: Lint & Format**
    - Checkout code
    - Setup Node.js 20
    - Install pnpm
    - Run `pnpm install --frozen-lockfile`
    - Run `pnpm run lint` (ESLint - fail pipeline on errors)
    - Run `pnpm run format:check` (Prettier - fail if unformatted)
  - **Job 2: Security Audit**
    - Run `pnpm audit --audit-level=high` (fail on high/critical CVE)
  - **Job 3: Tests**
    - Run `pnpm run test` (Vitest unit tests)
    - Run `pnpm run test:e2e` (Playwright E2E tests - if applicable)
  - **Job 4: Build**
    - Run `pnpm run build --configuration production`
    - Verify build succeeds
**And** workflow triggers on push to `main` and `develop` branches
**And** workflow triggers on pull requests
**And** all jobs must pass for merge (required status checks)
**And** NFR-MAINT-1 is enforced (Angular best practices via ESLint)

---

### Story 8.4: Add Docker Build to CI Pipeline

As a developer,
I want Docker build integrated in CI pipeline,
So that container images are validated on every commit.

**Acceptance Criteria:**

**Given** the CI pipeline from Story 8.3 and Dockerfile from Story 8.1
**When** I add Docker build job to `.github/workflows/ci.yml`
**Then** new job **Job 5: Docker Build** is added:
  - Checkout code
  - Set up Docker Buildx
  - Build Docker image: `docker build -t notesallsanity:${{ github.sha }} .`
  - Optional: Run container smoke test (start container, verify HTTP 200 on localhost)
  - Optional: Push to container registry (GitHub Container Registry or Docker Hub) if on main branch
**And** Docker build job runs after Build job succeeds
**And** Docker build must succeed for pipeline to pass
**And** built image is tagged with commit SHA for traceability
**And** pipeline completes within reasonable time (<10 minutes total)

---

### Story 8.5: Configure Dependabot for Security Updates

As a developer,
I want Dependabot configured for automatic security updates,
So that dependencies are kept up-to-date with security patches.

**Acceptance Criteria:**

**Given** the project repository on GitHub
**When** I configure Dependabot
**Then** `.github/dependabot.yml` exists with configuration:
  - Package ecosystem: `npm` (for pnpm)
  - Directory: `/`
  - Schedule: `daily` or `weekly`
  - Auto-merge enabled for patch and minor updates (optional)
  - Labels: `dependencies`, `security` (for easy filtering)
**And** Dependabot creates pull requests for:
  - Security vulnerabilities (high priority)
  - Version updates (npm packages)
**And** PRs trigger CI pipeline (all quality gates must pass)
**And** NFR-COMPAT-1 is supported (PRs test cross-browser compatibility via CI)
**And** README documents Dependabot process

---

### Story 8.6: Create Deployment Documentation and README

As a developer,
I want comprehensive deployment documentation in README,
So that deployment to Dokploy is clearly explained.

**Acceptance Criteria:**

**Given** all DevOps infrastructure from Stories 8.1-8.5
**When** I create deployment documentation
**Then** `README.md` is updated with sections (NFR-MAINT-5):
  - **Project Overview:** Brief description of NotesAllSanity
  - **Technology Stack:** Angular 21, PrimeNG 20+, Tailwind v4, TypeScript 5.6.x, pnpm
  - **Prerequisites:** Node.js 20+, pnpm, Docker (for deployment)
  - **Development Setup:** 
    - `pnpm install`
    - `ng serve` (runs on localhost:4200)
  - **Build:** `pnpm run build --configuration production`
  - **Docker Deployment:**
    - `docker build -t notesallsanity:latest .`
    - `docker run -p 80:80 notesallsanity:latest`
  - **Dokploy Deployment:**
    - Connect Dokploy to GitHub repository
    - Dokploy reads Dockerfile automatically
    - Dokploy manages docker-compose (PAS de docker-compose.yml dans le repo)
    - Environment variables: none required (static SPA)
  - **CI/CD Pipeline:** Explanation of GitHub Actions quality gates
  - **Spoiler.json Format:** Expected structure from OOT Randomizer
  - **Check Metadata Format:** Structure of check-metadata.json
**And** README includes badges: Build Status, License, etc.
**And** README is clear, concise, and actionable
**And** NFR-MAINT-5 is satisfied (complete documentation)

---

**Status:** ✅ WORKFLOW COMPLETE - Ready for Implementation
**Completion Date:** 2026-01-07
**Total Epics:** 8
**Total Stories:** 48
**FR Coverage:** 51/51 (100%)
**NFR Coverage:** 26/26 (100%)

---

## 🎯 Next Steps for Implementation

Le document `epics.md` est maintenant **complet et validé**. Voici les prochaines étapes recommandées :

### Recommandation Immédiate

**Option 1: Implementation Readiness Check (Recommandé)**
```
/check-implementation-readiness
```
Workflow adversarial qui valide PRD + Architecture + Epics avant de commencer l'implémentation. Détecte les gaps et incohérences potentiels.

**Option 2: Commencer l'Implémentation Directement**
```
/sprint-planning
```
Génère le fichier de tracking sprint et commence l'implémentation des stories.

### Ordre d'Implémentation Recommandé

**Phase 0: Foundation & DevOps (Early Deployment)**
1. Epic 1: Project Foundation & Technical Setup
2. Epic 8: Production Deployment & DevOps Pipeline

**Phase 1: MVP v0.1 Core**
3. Epic 2: Seed Import & Data Management
4. Epic 3: Check Tracking & Progress Monitoring
5. Epic 4: Session Persistence & State Recovery
6. Epic 5: Theme System & Extended Sessions

**Phase 2: MVP v0.2 Navigation**
7. Epic 6: Entrance Tracking & Shuffle Navigation

**Phase 3: MVP v0.3 Complete**
8. Epic 7: Intelligent Pathfinding & Route Optimization

### Documents Disponibles

- ✅ `prd.md` - Product Requirements (51 FRs, 26 NFRs)
- ✅ `architecture.md` - Architecture Decisions (3340 lignes)
- ✅ `project-context.md` - Implementation Rules (98 règles)
- ✅ `epics.md` - **CE FICHIER** - 8 Epics, 48 Stories
- ✅ `SESSION-SUMMARY.md` - Session recap

---

**Workflow Create Epics & Stories : TERMINÉ ✅**
