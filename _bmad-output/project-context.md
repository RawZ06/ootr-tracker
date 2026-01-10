---
project_name: 'NotesAllSanity'
user_name: 'Alexandre'
date: '2026-01-07'
sections_completed: ['technology_stack', 'language_specific', 'framework_specific', 'testing', 'code_quality', 'workflow', 'deployment_devops', 'critical_rules']
existing_patterns_found: 18
status: 'complete'
completed_at: '2026-01-07'
source_document: '_bmad-output/planning-artifacts/architecture.md'
rule_count: 98
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

**Core Technologies:**
- **Angular 21** (latest stable Janvier 2026) - Framework principal avec Standalone API
- **TypeScript 5.6.x** avec strict mode activé - ES2022 target
- **PrimeNG 20+** (compatible Angular 21) - Component library avec Virtual Scroller
- **Tailwind CSS v4** - Styling avec intégration directe (`--style=tailwind`)
- **RxJS** (inclus Angular) - BehaviorSubjects pour state management

**Build & Package Management:**
- **pnpm** - Package manager avec support Angular CLI natif
- **esbuild + Vite** - Build tooling moderne (HMR ultra-rapide)
- **Angular CLI 21.0.4** - Outil officiel de création et build

**Testing:**
- **Vitest** - Test runner pour tests unitaires (plus rapide que Karma)
- **Jasmine** - Framework d'assertions (standard Angular)
- **Playwright** - Tests E2E framework-agnostic

**Runtime & APIs:**
- **Web Crypto API** (natif navigateurs modernes) - SHA-256 checksum validation
- **File API** (natif) - Import/Export JSON save files
- **LocalStorage API** (natif) - Theme persistence
- **System API prefers-color-scheme** - Dark/Light theme detection

**Versions Exactes Requises:**
```json
{
  "@angular/core": "^21.0.0",
  "@angular/common": "^21.0.0",
  "@angular/router": "^21.0.0",
  "primeng": "^20.0.0",
  "@primeuix/themes": "^20.0.0",
  "tailwindcss": "^4.0.0",
  "typescript": "~5.6.0"
}
```

**Compatibilités Critiques:**
- ✅ Angular 21 REQUIERT TypeScript 5.6.x (pas 5.5 ou 5.7)
- ✅ PrimeNG 20+ REQUIERT Angular 21+ (incompatible Angular 20 ou moins)
- ✅ Tailwind v4 utilise CSS pur (pas de preprocessor SCSS/LESS)
- ✅ Web Crypto API requiert navigateurs modernes (pas de legacy IE11)
- ✅ pnpm DOIT être utilisé (pas npm ou yarn) - lockfile déterministe critique

**Notes Spéciales pour Agents:**
- 🚨 Angular CLI génère format concis Angular 20+ : `checks.ts` (pas `checks.component.ts`)
- 🚨 Tailwind v4 s'intègre directement via `@tailwindcss/postcss` (pas besoin de JIT explicite)
- 🚨 PrimeNG Virtual Scroller requiert `itemSize` fixe (50px) - OBLIGATOIRE pour performance

---

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

**Configuration TypeScript Obligatoire :**
- ✅ Strict mode activé (`"strict": true` dans tsconfig.json)
- ✅ Target ES2022, module ES2022, moduleResolution bundler
- ✅ Tous les fichiers `.ts` DOIVENT compiler sans erreurs en strict mode - aucune exception

**Naming Conventions (DIFFÉRENT entre TypeScript et JSON) :**

**TypeScript Code :**
```typescript
const filteredChecks = [];              // camelCase variables/fonctions
class StateManagementService {}         // PascalCase classes/interfaces
interface Check {}                      // PascalCase (PAS de préfixe "I")
const MAX_CHECKS = 3000;                // SCREAMING_SNAKE_CASE constantes
checks$ = this.checksSubject.asObservable(); // $ suffix Observables RxJS
```

**JSON (DIFFÉRENT !) :**
```json
{
  "check_id": "GC Darunia Pot 1",      // snake_case OBLIGATOIRE
  "is_done": true,
  "save_date": "2026-01-07T14:30:00.000Z"
}
```

**🚨 Mapping JSON ↔ TypeScript OBLIGATOIRE :**

Les agents DOIVENT faire un mapping explicite snake_case (JSON) ↔ camelCase (TypeScript) :

```typescript
// Dans SaveLoadService - Mapping explicite requis
toJSON(data: SaveData): string {
  return JSON.stringify({
    save_date: data.saveDate,        // camelCase → snake_case
    check_id: c.checkId,             // camelCase → snake_case
    is_done: c.isDone
  });
}

fromJSON(json: string): SaveData {
  return {
    saveDate: parsed.save_date,      // snake_case → camelCase
    checkId: c.check_id,             // snake_case → camelCase
    isDone: c.is_done
  };
}
```

**Pourquoi snake_case en JSON ?**
- Cohérence avec `spoiler.json` du randomizer OOT (format officiel)
- Distinction claire données persistées (JSON) vs logique applicative (TypeScript)

**Import Order OBLIGATOIRE :**
```typescript
// 1. Angular core
import { Component, ChangeDetectionStrategy } from '@angular/core';
// 2. Third-party libraries
import { VirtualScrollerModule } from 'primeng/virtualscroller';
// 3. Project aliases (@core, @shared, @models)
import { StateManagementService } from '@core/services';
import { Check, Filters } from '@models';
// 4. Relative imports (si nécessaire)
import { CheckItemComponent } from './components/check-item';
```

**Error Handling (Type Union Strict) :**

```typescript
// AppError type union avec discriminant "type"
export type AppError =
  | { type: 'json_parse'; title: 'Import impossible'; message: string; line?: number }
  | { type: 'json_corrupt'; title: 'Fichier corrompu'; message: string }
  | { type: 'spoiler_invalid'; title: 'Spoiler invalide'; message: string };

// ✅ CORRECT
this.errorHandler.showError({
  type: 'json_corrupt',
  title: 'Fichier corrompu',
  message: 'Checksum invalide'
});

// ❌ INTERDIT
throw new Error('Something went wrong');  // Pas de contexte, pas typé
```

**🚨 Règle Critique :** JAMAIS `throw new Error()` directement - TOUJOURS `ErrorHandlerService.showError()` avec `AppError` typé.

**Dates & Times (ISO 8601 OBLIGATOIRE) :**

```typescript
// ✅ CORRECT - Dates en JSON
interface SaveData {
  saveDate: string;        // "2026-01-07T14:30:00.000Z"
  completedAt?: string;
}

// ❌ INTERDIT
saveDate: number;          // Timestamps interdits en JSON
saveDate: Date;            // Date objects ne sérialisent pas proprement
```

---

### Framework-Specific Rules (Angular 21)

**File Naming Convention (Angular 20+ Format Concis) :**

```typescript
// ✅ CORRECT - Format concis Angular 20+
checks.ts                        // Component
checks.html / checks.css         // Template / Styles
checks.spec.ts                   // Test co-located
state-management.service.ts      // Service

// ❌ INTERDIT - Ancien format pre-Angular 20
checks.component.ts              // Trop verbeux
```

**Standalone API (Pas de NgModules) :**

```typescript
// ✅ CORRECT - Standalone component
@Component({
  selector: 'app-checks',
  standalone: true,                    // ✅ OBLIGATOIRE
  imports: [CommonModule, VirtualScrollerModule],
  templateUrl: './checks.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecksComponent {}

// ❌ INTERDIT - NgModules
@NgModule({ ... })  // ❌ Ce projet utilise 100% Standalone API
```

**Change Detection Strategy (OnPush SYSTÉMATIQUE) :**

```typescript
// ✅ CORRECT - OnPush OBLIGATOIRE tous composants
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush  // ✅ OBLIGATOIRE
})

// ❌ INTERDIT - Default change detection sans justification
```

**Exception UNIQUEMENT avec justification explicite en commentaire.**

**🚨 Règle Critique :** OnPush SYSTÉMATIQUE pour 60 FPS (NFR-PERF-3).

**RxJS State Management (Immutabilité OBLIGATOIRE) :**

```typescript
// ✅ CORRECT - BehaviorSubjects privés, Observables publics
@Injectable({ providedIn: 'root' })
export class StateManagementService {
  private checksSubject = new BehaviorSubject<Check[]>([]);  // ✅ Private
  checks$ = this.checksSubject.asObservable();               // ✅ Public readonly

  toggleCheck(checkId: string) {
    const checks = this.checksSubject.value;
    const updated = checks.map(c =>
      c.checkId === checkId ? { ...c, isDone: !c.isDone } : c  // ✅ Spread
    );
    this.checksSubject.next(updated);  // ✅ Nouvelle référence
  }
}

// ❌ INTERDIT - BehaviorSubject public
public checksSubject = new BehaviorSubject<Check[]>([]);  // ❌ Exposé

// ❌ INTERDIT - Mutation directe
checks.find(c => c.checkId === checkId).isDone = true;  // ❌ Mutation
this.checksSubject.next(checks);  // ❌ Même référence
```

**🚨 Règles Critiques :**
- BehaviorSubjects TOUJOURS privés, Observables TOUJOURS publics
- Updates TOUJOURS immutables (spread operator OBLIGATOIRE)
- OnPush requiert nouvelles références

**Memory Leak Prevention (takeUntilDestroyed OBLIGATOIRE) :**

**Ordre de préférence :**
1. **async pipe** (préféré - pas de subscribe)
2. **takeUntilDestroyed()** (si subscribe nécessaire)
3. **Manual unsubscribe** (edge cases uniquement)

```typescript
// ✅ PRÉFÉRÉ - async pipe
@Component({
  template: `<p-virtualScroller [value]="filteredChecks$ | async">`
})
export class ChecksComponent {
  filteredChecks$ = this.state.filteredChecks$;  // ✅ async pipe dans template
}

// ✅ CORRECT - takeUntilDestroyed si subscribe nécessaire
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

constructor(private state: StateManagementService) {
  this.state.checks$
    .pipe(takeUntilDestroyed())  // ✅ Cleanup automatique
    .subscribe(checks => this.doSomething(checks));
}

// ❌ INTERDIT - Memory leak
this.state.checks$.subscribe(checks => ...);  // ❌ Pas de cleanup
```

**🚨 Règle Critique :** Sessions 50h+ requises (NFR-UX-1). Zéro memory leak toléré.

**Lazy Loading (loadComponent) :**

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'checks',
    loadComponent: () => import('./modules/checks/checks')
      .then(m => m.ChecksComponent)  // ✅ Lazy loading
  }
];
```

**🚨 Règle Critique :** 4 modules lazy-loaded (checks, entrances, pathfinding, stats) pour NFR-PERF-4 (Load <3s).

**Module Isolation (Boundary Rules CRITIQUES) :**

```typescript
// ❌ INTERDIT - Imports cross-modules
import { EntrancesComponent } from '../entrances/entrances';  // ❌ Violation

// ✅ CORRECT - Communication via core/services
constructor(private state: StateManagementService) {}  // ✅ Service central
this.router.navigate(['/entrances']);  // ✅ Router pour navigation
```

**🚨 Boundary Rules :**
- ❌ Modules NE PEUVENT PAS se référencer directement
- ✅ Communication UNIQUEMENT via `core/services/`
- ✅ Navigation inter-modules via Router

**PrimeNG Virtual Scroller Configuration :**

```typescript
// ✅ CORRECT
<p-virtualScroller
  [value]="filteredChecks$ | async"
  [itemSize]="50"           // ✅ OBLIGATOIRE - Fixe 50px
  scrollHeight="600px">
</p-virtualScroller>

// ❌ INTERDIT
[itemSize]="dynamicSize"    // ❌ Pas de taille dynamique
```

**🚨 Règle Critique :** `itemSize=50` FIXE pour 3000 items (NFR-PERF-1).

**ErrorHandlerService (Usage EXCLUSIF) :**

```typescript
// ✅ CORRECT
this.errorHandler.showError({
  type: 'json_parse',
  title: 'Import impossible',
  message: e.message
});

// ❌ INTERDIT - Toast direct
this.messageService.add({ ... });  // ❌ Bypass ErrorHandlerService

// ❌ INTERDIT - Console uniquement
console.error(e);  // ❌ Utilisateur ne voit rien
```

**🚨 Règle Critique :** ErrorHandlerService EXCLUSIF pour cohérence UX (NFR-UX-4, NFR-UX-5).

---

### Testing Rules

**Test Organization (TU vs E2E - DISTINCTION STRICTE) :**

**Tests Unitaires (TU) - Co-located OBLIGATOIRE :**
```
src/app/modules/checks/
├── checks.ts
├── checks.spec.ts         # ✅ TU co-located OBLIGATOIRE

src/app/core/services/
├── state-management.service.ts
└── state-management.service.spec.ts  # ✅ TU co-located
```

**Tests E2E - Séparés dans tests/e2e/ :**
```
tests/e2e/
├── checks-workflow.spec.ts       # ✅ Scénario complet A→Z
├── save-load-workflow.spec.ts
└── pathfinding-workflow.spec.ts
```

**🚨 Règle Critique :**
- **TU (.spec.ts)** : TOUJOURS co-located à côté du fichier testé
- **E2E (.spec.ts)** : TOUJOURS dans `tests/e2e/` - Scénarios complets utilisateur
- Distinction : TU = isolation composant/service, E2E = workflow complet

**Test File Naming :**
```typescript
// ✅ CORRECT
state-management.service.spec.ts      // Convention Angular = .spec.ts
checks.spec.ts

// ❌ INTERDIT
state-management.service.test.ts      // Pas .test.ts
```

**Test Structure (Jasmine) :**
```typescript
// ✅ CORRECT - Structure Jasmine standard
describe('StateManagementService', () => {
  let service: StateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateManagementService]
    });
    service = TestBed.inject(StateManagementService);
  });

  describe('toggleCheck', () => {
    it('should toggle check isDone from false to true', () => {
      // Arrange
      const checks = [{ checkId: 'test-1', isDone: false }];
      service['checksSubject'].next(checks);

      // Act
      service.toggleCheck('test-1');

      // Assert
      service.checks$.subscribe(result => {
        expect(result[0].isDone).toBe(true);
      });
    });

    it('should maintain immutability (new reference)', () => {
      const checks = [{ checkId: 'test-1', isDone: false }];
      service['checksSubject'].next(checks);

      const originalRef = service['checksSubject'].value;
      service.toggleCheck('test-1');
      const newRef = service['checksSubject'].value;

      expect(newRef).not.toBe(originalRef);  // ✅ Nouvelle référence
    });
  });
});
```

**🚨 Règle Critique :** Toujours tester l'immutabilité des updates BehaviorSubjects.

**Mock Patterns :**
```typescript
// ✅ CORRECT - Mock services avec Jasmine Spies
describe('ChecksComponent', () => {
  let mockStateService: jasmine.SpyObj<StateManagementService>;

  beforeEach(() => {
    mockStateService = jasmine.createSpyObj('StateManagementService',
      ['toggleCheck', 'updateFilters'],
      { filteredChecks$: of([]) }  // ✅ Mock observables avec 'of'
    );

    TestBed.configureTestingModule({
      imports: [ChecksComponent],
      providers: [
        { provide: StateManagementService, useValue: mockStateService }
      ]
    });
  });

  it('should call toggleCheck when check clicked', () => {
    component.onCheckToggle('test-1');
    expect(mockStateService.toggleCheck).toHaveBeenCalledWith('test-1');
  });
});
```

**Test Coverage Requirements :**
- **Services core/** : 90%+ coverage (StateManagement, SaveLoad, PathfindingService)
- **Components modules/** : 80%+ coverage
- **Utilities shared/utils/** : 95%+ coverage (array-helpers, validators)
- **Models** : Pas de tests (interfaces TypeScript pures)

```bash
pnpm test --coverage  # Vitest avec coverage
```

**🚨 Règle Critique :** Services critiques DOIVENT avoir 90%+ coverage avant merge.

**Integration vs Unit Test Boundaries :**

**Unit Tests :**
- Testent UN composant/service en **isolation**
- Mockent TOUTES les dépendances externes
- Rapides (<5ms par test)

**E2E Tests (Playwright) :**
- Testent **scénarios complets utilisateur**
- Application complète running
- Lents (5-30s par scénario)

```typescript
// ✅ E2E Test - Scénario complet
test('should complete checks workflow', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.click('[data-testid="import-button"]');
  await page.setInputFiles('input[type="file"]', 'fixtures/spoiler-test.json');
  await page.waitForSelector('[data-testid="checks-list"]');
  await page.selectOption('[data-testid="zone-filter"]', 'Goron City');
  await expect(page.locator('.check-item')).toHaveCount(45);
});
```

**Test Fixtures :**
```
tests/fixtures/
├── spoiler-test.json          # ~100 checks (pas 3000 pour vitesse)
├── save-test.json             # SaveData valide
└── invalid-save.json          # Pour tester validation errors
```

**🚨 Règle Critique :** Fixtures DOIVENT être cohérents avec format SaveData/Spoiler réel.

---

### Code Quality & Style Rules

**Project File & Folder Structure (OBLIGATOIRE) :**

```
src/app/
├── modules/              # ✅ Feature modules lazy-loaded UNIQUEMENT
│   ├── checks/
│   ├── entrances/
│   ├── pathfinding/
│   └── stats/
├── core/                 # ✅ Services singleton UNIQUEMENT
│   ├── services/         # providedIn: 'root'
│   └── guards/
├── shared/               # ✅ Composants/Pipes/Directives réutilisables
│   ├── components/
│   ├── pipes/
│   ├── directives/
│   └── utils/            # ✅ Fonctions pures UNIQUEMENT (pas de services)
└── models/               # ✅ Types/Interfaces centralisés (single source of truth)
```

**🚨 Règles Critiques :**
- **modules/** : UNIQUEMENT feature modules (checks, entrances, pathfinding, stats)
- **core/services/** : UNIQUEMENT services singleton (`providedIn: 'root'`)
- **shared/utils/** : UNIQUEMENT fonctions pures (pas de services, pas de state)
- **models/** : TOUS les types/interfaces partagés

**Naming Conventions (Récapitulatif) :**

**File Naming (kebab-case OBLIGATOIRE) :**
```typescript
// ✅ CORRECT
checks.ts                        // Component
state-management.service.ts      // Service
check.model.ts                   // Model
array-helpers.ts                 // Utils

// ❌ INTERDIT
checks.component.ts              // Ancien format
stateManagement.service.ts       // camelCase
CheckModel.ts                    // PascalCase
check_metadata.json              // snake_case pour fichiers
```

**TypeScript Code Naming :**
```typescript
const filteredChecks = [];              // camelCase variables/fonctions
class StateManagementService {}         // PascalCase classes
interface Check {}                      // PascalCase (PAS de "I" prefix)
const MAX_CHECKS = 3000;                // SCREAMING_SNAKE_CASE constantes
checks$ = this.checksSubject.asObservable(); // $ suffix Observables
```

**JSON Naming (snake_case OBLIGATOIRE) :**
```json
{
  "check_id": "GC Darunia Pot 1",       // ✅ snake_case
  "is_done": true,
  "save_date": "2026-01-07T14:30:00.000Z"
}
```

**Import Order (OBLIGATOIRE) :**
```typescript
// 1. Angular core
import { Component, ChangeDetectionStrategy } from '@angular/core';
// 2. Third-party libraries
import { VirtualScrollerModule } from 'primeng/virtualscroller';
// 3. Project aliases (@core, @shared, @models)
import { StateManagementService } from '@core/services';
import { Check } from '@models';
// 4. Relative imports (si nécessaire)
import { CheckItemComponent } from './components/check-item';
```

**Function Length & Complexity :**
```typescript
// ✅ CORRECT - Fonctions courtes et focalisées (<50 lignes)
toggleCheck(checkId: string) {
  const checks = this.checksSubject.value;
  const updated = checks.map(c =>
    c.checkId === checkId ? { ...c, isDone: !c.isDone } : c
  );
  this.checksSubject.next(updated);
}

// ❌ INTERDIT - Fonction >50 lignes
// Décomposer en fonctions plus petites
```

**Documentation & Comments (UNIQUEMENT si non-évident) :**

```typescript
// ✅ CORRECT - Commentaire utile
// Dijkstra avec Save Warp : coût vers "Save Warp" toujours 1 (warp instantané)
const saveWarpCost = 1;

// Web Crypto API requiert ArrayBuffer pour SHA-256
const encoder = new TextEncoder();

// ❌ INTERDIT - Commentaire évident
// Toggle check
toggleCheck(checkId: string) { ... }
```

**JSDoc UNIQUEMENT pour APIs publiques complexes :**
```typescript
/**
 * Calculate shortest path using Dijkstra with Save Warp.
 * @param from - Starting zone
 * @param to - Destination zone
 * @param age - 'Child' | 'Adult' affecting available entrances
 * @returns PathResult with steps or error
 */
calculatePath(from: string, to: string, age: 'Child' | 'Adult'): PathResult
```

**🚨 Règle Critique :** Code self-explanatory > Commentaires. JAMAIS commenter l'évident.

**Path Aliases (tsconfig.json) :**
```json
{
  "paths": {
    "@core/*": ["src/app/core/*"],
    "@shared/*": ["src/app/shared/*"],
    "@models": ["src/app/models"]
  }
}
```

```typescript
// ✅ CORRECT - Path aliases
import { StateManagementService } from '@core/services/state-management.service';
import { Check } from '@models';

// ❌ INTERDIT - Relative paths cross-folder
import { StateManagementService } from '../../../core/services/state-management.service';
```

**DRY Principle (Don't Repeat Yourself) :**

```typescript
// ✅ CORRECT - Type centralisé dans models/
export interface Check { ... }  // models/check.model.ts
import { Check } from '@models';

// ✅ CORRECT - Utility centralisée dans shared/utils/
export function groupBy<T>(...) { ... }  // shared/utils/array-helpers.ts
import { groupBy } from '@shared/utils/array-helpers';

// ❌ INTERDIT - Duplication type/fonction dans composants
```

**🚨 Règle Critique :** Toute logique réutilisée >2 fois DOIT être centralisée.

---

### Development Workflow Rules

**Package Manager (pnpm OBLIGATOIRE) :**

```bash
# ✅ CORRECT - TOUJOURS pnpm
pnpm install
pnpm run dev
pnpm run build
pnpm test

# ❌ INTERDIT - JAMAIS npm ou yarn
npm install              # ❌ INTERDIT
yarn install             # ❌ INTERDIT
```

**🚨 Règle Critique :** pnpm OBLIGATOIRE pour lockfile déterministe. Si `node_modules/` ou `package-lock.json` présents : supprimer et `pnpm install`.

**Development Commands :**

```bash
# Dev server (HMR)
pnpm run dev
ng serve --open

# Build production
pnpm run build
ng build --configuration production

# Tests unitaires (Vitest)
pnpm test                    # Run once
pnpm test --watch            # Watch mode
pnpm test --coverage         # Avec coverage

# Tests E2E (Playwright)
pnpm run e2e
playwright test --headed     # Mode visible
```

**Project Initialization (Story 1) :**

```bash
# Étape 1 : Créer projet Angular
ng new NotesAllSanity \
  --standalone \
  --style=tailwind \
  --routing \
  --strict \
  --skip-git \
  --package-manager=pnpm

# Étape 2 : Installer PrimeNG
cd NotesAllSanity
pnpm install primeng @primeuix/themes primeicons primeflex
```

**🚨 Règle Critique :** Cette commande `ng new` DOIT être la première story (Epic "Project Setup").

**File Creation Workflow :**

```bash
# ✅ CORRECT - Angular CLI génère format concis Angular 20+
ng generate component modules/checks/checks
# Génère : checks.ts, checks.html, checks.css, checks.spec.ts

ng generate service core/services/state-management
# Génère : state-management.service.ts, state-management.service.spec.ts

# ❌ INTERDIT - Créer fichiers manuellement
# (Risque format incohérent)
```

**🚨 Règle Critique :** TOUJOURS utiliser `ng generate` pour format concis et tests co-located.

**Git Workflow (Si utilisé) :**

```bash
# ✅ Branch naming
git checkout -b feature/checks-module
git checkout -b fix/memory-leak-checks

# ✅ Commit messages
git commit -m "feat(checks): add virtual scrolling with itemSize=50

Implements FR10-FR11 with PrimeNG Virtual Scroller.
Performance: <100ms filtering 3000 items."

# ❌ INTERDIT - Messages vagues
git commit -m "updates"
git commit -m "fix bug"
```

**Code Review Checklist (Avant Merge) :**

```markdown
- [ ] Fichiers kebab-case (checks.ts, state-management.service.ts)
- [ ] JSON snake_case (check_id, is_done, save_date)
- [ ] Tous composants OnPush
- [ ] BehaviorSubjects privés, Observables publics avec $
- [ ] Aucun subscribe sans takeUntilDestroyed (sauf async pipe)
- [ ] Aucun Toast direct (seulement ErrorHandlerService)
- [ ] State updates immutables (spread operator)
- [ ] Tests TU co-located
- [ ] Coverage ≥90% services core, ≥80% components
- [ ] Build production réussit
- [ ] Bundle budgets respectés
```

**🚨 Règle Critique :** Checklist DOIT être validée avant merge.

**Performance Monitoring :**

```json
// angular.json - Bundle budgets
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "1.5mb",
      "maximumError": "2mb"
    }
  ]
}
```

**🚨 Règle Critique :** Build DOIT échouer si bundle >2MB (NFR-PERF-4).

**Memory Profiling (Sessions 50h+) :**
- Chrome DevTools > Memory > Heap snapshot après 1h usage
- Vérifier pas de memory leaks
- Si leaks : vérifier takeUntilDestroyed, async pipe, timers cleanup

**Deployment :**

```bash
# Build production
pnpm run build

# SPA routing configuration requise
# _redirects (Netlify) ou vercel.json
/*    /index.html   200
```

**🚨 Règle Critique :** SPA routing rewrites OBLIGATOIRES (toutes routes → index.html).

---

### Deployment & DevOps Rules

**Docker Configuration (Dockerfile UNIQUEMENT) :**

```dockerfile
# ✅ CORRECT - Multi-stage build optimisé Angular 21
# Stage 1: Build Angular app
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build production app
RUN pnpm run build --configuration production

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built app from builder
COPY --from=builder /app/dist/notes-all-sanity /usr/share/nginx/html

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf (SPA Routing OBLIGATOIRE) :**

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - CRITIQUE pour Angular Router
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**🚨 Règle Critique :**
- Dockerfile multi-stage OBLIGATOIRE (build + nginx)
- pnpm DOIT être utilisé (pas npm)
- nginx.conf DOIT avoir `try_files $uri $uri/ /index.html` pour SPA routing

**❌ INTERDIT :**
```dockerfile
# ❌ INTERDIT - docker-compose.yml
# Dokploy gère lui-même la config compose
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
```

**Pourquoi CRITIQUE :** Dokploy self-hosted lit le repo et déploie le Dockerfile. docker-compose.yml serait ignoré et créerait confusion.

---

**GitHub Actions (CI/CD Quality Gates) :**

```yaml
# .github/workflows/ci.yml
name: CI Quality Gates

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  quality-checks:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      # Linting & Formatting
      - name: Run ESLint
        run: pnpm run lint
        continue-on-error: false  # ✅ Fail pipeline si erreurs

      - name: Check Prettier formatting
        run: pnpm run format:check
        continue-on-error: false

      # Security CVE Check
      - name: Run npm audit
        run: pnpm audit --audit-level=high
        continue-on-error: false  # ✅ Fail si CVE high/critical

      # Build Check
      - name: Build production
        run: pnpm run build --configuration production

      - name: Check bundle budgets
        run: |
          if [ -f "dist/notes-all-sanity/stats.json" ]; then
            SIZE=$(du -sh dist/notes-all-sanity | cut -f1)
            echo "Bundle size: $SIZE"
          fi

      # Tests
      - name: Run unit tests
        run: pnpm test --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false

      # E2E Tests (optionnel sur CI)
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps

      - name: Run E2E tests
        run: pnpm run e2e
        continue-on-error: true  # E2E peuvent être flaky en CI

      # Docker Build Test
      - name: Test Docker build
        run: docker build -t notes-all-sanity:test .
```

**Scripts package.json Requis :**

```json
{
  "scripts": {
    "dev": "ng serve",
    "build": "ng build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "e2e": "playwright test",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,css,json}\""
  }
}
```

**🚨 Règles Critiques GitHub Actions :**
- ✅ ESLint DOIT fail la pipeline si erreurs (`continue-on-error: false`)
- ✅ Prettier DOIT fail si code non formaté (`format:check`)
- ✅ `pnpm audit --audit-level=high` DOIT fail si CVE high/critical
- ✅ Build production DOIT réussir avant merge
- ✅ Tests unitaires DOIVENT passer (coverage upload optionnel)
- ✅ Docker build DOIT réussir (validation Dockerfile)

**ESLint Configuration (.eslintrc.json) :**

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ]
      }
    },
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:@angular-eslint/template/accessibility"
      ]
    }
  ]
}
```

**Prettier Configuration (.prettierrc.json) :**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

---

**Dokploy Deployment (Self-Hosted) :**

**Configuration Dokploy :**
- ✅ Dokploy lit le repo Git directement
- ✅ Détecte automatiquement le Dockerfile à la racine
- ✅ Gère la config compose/networking lui-même
- ✅ Expose l'app sur port configuré dans l'UI Dokploy

**Variables d'Environnement (Si nécessaire futur) :**

```bash
# environment.prod.ts (Angular)
export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || '',  // Si API backend futur
  version: '0.1.0'
};
```

**Dokploy UI Configuration :**
1. Connecter repo GitHub
2. Détecter Dockerfile automatiquement
3. Configurer port expose (80)
4. Configurer domaine custom (si voulu)
5. Deploy automatique sur push main

**🚨 Règles Critiques Dokploy :**
- ❌ PAS de docker-compose.yml (Dokploy gère)
- ✅ Dockerfile DOIT exposer port 80 (nginx)
- ✅ Build DOIT être self-contained (pas de dépendances externes)
- ✅ Variables env DOIVENT être configurées dans Dokploy UI (pas hardcodées)

---

**Deployment Checklist (Avant Premier Deploy) :**

```markdown
## Pre-Deployment Checklist

- [ ] Dockerfile multi-stage validé (build + nginx)
- [ ] nginx.conf avec SPA routing (`try_files $uri $uri/ /index.html`)
- [ ] GitHub Actions CI configuré et passant (lint, tests, build, audit)
- [ ] ESLint + Prettier configurés et appliqués
- [ ] pnpm-lock.yaml commité (lockfile déterministe)
- [ ] .dockerignore créé (exclure node_modules, .git, _bmad-output)
- [ ] Bundle budgets respectés (<2MB)
- [ ] Tests unitaires coverage ≥80%
- [ ] Dokploy repo connecté et Dockerfile détecté
- [ ] Variables env configurées dans Dokploy UI (si nécessaire)
- [ ] Test build Docker local réussi (`docker build -t test .`)
```

**.dockerignore (OBLIGATOIRE) :**

```
node_modules
dist
.git
.github
_bmad-output
_bmad
coverage
.angular
*.log
.env
.DS_Store
```

**🚨 Règle Critique :** .dockerignore DOIT exclure node_modules et dist pour éviter conflits avec build Docker.

---

**Security & CVE Management :**

```bash
# ✅ Check CVE régulièrement
pnpm audit

# Fix automatique CVE low/moderate
pnpm audit --fix

# Review manuel CVE high/critical
pnpm audit --audit-level=high

# Update dependencies sécurisées
pnpm update --latest
```

**Dependabot Configuration (.github/dependabot.yml) :**

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    reviewers:
      - "Alexandre"
    labels:
      - "dependencies"
      - "security"
```

**🚨 Règle Critique :**
- GitHub Actions DOIT fail si CVE high/critical détecté
- Dependabot DOIT être activé pour auto-PR security updates
- Review manuel OBLIGATOIRE pour CVE critiques avant merge

---

### Critical Don't-Miss Rules

**🚨 ANTI-PATTERNS À ÉVITER ABSOLUMENT**

#### **1. Mutation Directe State (CASSE OnPush)**

```typescript
// ❌ INTERDIT - Mutation directe (OnPush ne détecte PAS)
toggleCheck(checkId: string) {
  const checks = this.checksSubject.value;
  checks.find(c => c.checkId === checkId).isDone = true;  // ❌ MUTATION
  this.checksSubject.next(checks);  // ❌ Même référence → OnPush skip
}

// ✅ CORRECT - Immutable update
toggleCheck(checkId: string) {
  const checks = this.checksSubject.value;
  const updated = checks.map(c =>
    c.checkId === checkId ? { ...c, isDone: !c.isDone } : c  // ✅ Spread
  );
  this.checksSubject.next(updated);  // ✅ Nouvelle référence
}
```

**Pourquoi CRITIQUE :** OnPush compare références. Mutation = même référence = pas de re-render = bug UI silencieux.

#### **2. BehaviorSubject Exposé Publiquement**

```typescript
// ❌ INTERDIT - N'importe qui peut .next()
public checksSubject = new BehaviorSubject<Check[]>([]);  // ❌ Public

// ✅ CORRECT - Encapsulation stricte
private checksSubject = new BehaviorSubject<Check[]>([]);  // ✅ Private
checks$ = this.checksSubject.asObservable();  // ✅ Public readonly
```

**Pourquoi CRITIQUE :** BehaviorSubject public = n'importe quel code peut écraser state sans validation.

#### **3. Memory Leaks (Subscribe Sans Cleanup)**

```typescript
// ❌ INTERDIT - Memory leak garanti
ngOnInit() {
  this.state.checks$.subscribe(checks => {
    this.processChecks(checks);
  });  // ❌ Pas de unsubscribe → leak après destroy
}

// ✅ CORRECT - Async pipe (préféré)
filteredChecks$ = this.state.filteredChecks$;
// Template : {{ filteredChecks$ | async }}

// ✅ CORRECT - takeUntilDestroyed si subscribe nécessaire
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
constructor(private state: StateManagementService) {
  this.state.checks$
    .pipe(takeUntilDestroyed())
    .subscribe(checks => this.processChecks(checks));
}
```

**Pourquoi CRITIQUE :** Sessions 50h+ requises. Memory leaks → crash navigateur après 10-20h.

#### **4. Toast PrimeNG Direct (Bypass ErrorHandler)**

```typescript
// ❌ INTERDIT - Inconsistance UX
this.messageService.add({
  severity: 'error',
  detail: error.message
});  // ❌ Bypass ErrorHandlerService

// ✅ CORRECT - TOUJOURS via ErrorHandlerService
this.errorHandler.showError({
  type: 'json_parse',
  title: 'Import impossible',
  message: error.message
});
```

**Pourquoi CRITIQUE :** Inconsistance messages = UX confuse. ErrorHandler centralise logs futurs.

#### **5. Mixing snake_case et camelCase en JSON**

```json
// ❌ INTERDIT - Inconsistance
{
  "check_id": "GC Darunia Pot 1",    // snake_case
  "isDone": true,                    // ❌ camelCase mélangé
  "totalChecks": 3000                // ❌ camelCase mélangé
}

// ✅ CORRECT - snake_case PARTOUT
{
  "check_id": "GC Darunia Pot 1",
  "is_done": true,
  "total_checks": 3000
}
```

**Pourquoi CRITIQUE :** Cohérence avec `spoiler.json` officiel OOT Randomizer.

---

**⚠️ EDGE CASES SPÉCIFIQUES**

#### **1. Check Metadata Manquant (Unknown Zone/Type)**

```typescript
// ❌ INTERDIT - Crash si metadata manquant
return this.metadata[checkName].zone;  // ❌ Crash si undefined

// ✅ CORRECT - Graceful fallback
getCheckMetadata(checkName: string): { zone: string, type: string } {
  return this.metadata[checkName] || {
    zone: 'Unknown Zone',
    type: 'Unknown Type'
  };  // ✅ Fallback (FR50)
}
```

**Pourquoi CRITIQUE :** Spoiler.json peut contenir checks custom. Application DOIT rester stable.

#### **2. Pathfinding Sans Entrances Découvertes**

```typescript
// ❌ INTERDIT - Crash si pas d'entrances
calculatePath(from: string, to: string): PathResult {
  const graph = this.buildGraph(this.entrances);  // ❌ Crash si []
  return this.dijkstra(graph, from, to);
}

// ✅ CORRECT - Validation early return
calculatePath(from: string, to: string, age: 'Child' | 'Adult'): PathResult {
  const entrances = this.entrancesSubject.value;

  if (entrances.length === 0) {
    return {
      success: false,
      error: 'Aucune entrance découverte.',
      steps: []
    };  // ✅ Error explicite
  }

  const graph = this.buildGraph(entrances);
  return this.dijkstra(graph, from, to, age);
}
```

**Pourquoi CRITIQUE :** User peut cliquer "Calculate Path" avant entrées. UX DOIT être graceful.

#### **3. Import JSON Corrompu (Checksum Invalide)**

```typescript
// ❌ INTERDIT - Import sans validation
async importJSON(file: File) {
  const data = JSON.parse(await file.text());
  this.state.loadState(data);  // ❌ Pas de checksum validation
}

// ✅ CORRECT - Validation AVANT import
async importJSON(file: File) {
  const json = await file.text();
  const data = JSON.parse(json);

  // Validation checksum SHA-256
  const expectedChecksum = data.checksum;
  const actualChecksum = await this.calculateChecksum(data);

  if (expectedChecksum !== actualChecksum) {
    this.errorHandler.showError({
      type: 'json_corrupt',
      title: 'Fichier corrompu',
      message: 'Checksum invalide'
    });
    return;  // ✅ Refuser import, état préservé
  }

  this.state.loadState(data);
}
```

**Pourquoi CRITIQUE :** NFR-REL-2 (100% détection corruption). JAMAIS écraser état avec données corrompues.

#### **4. Virtual Scrolling avec itemSize Dynamique**

```typescript
// ❌ INTERDIT - Performance catastrophique
<p-virtualScroller
  [itemSize]="getItemSize()"  // ❌ Fonction dynamique
  scrollHeight="600px">

// ✅ CORRECT - itemSize FIXE
<p-virtualScroller
  [itemSize]="50"  // ✅ FIXE 50px TOUJOURS
  scrollHeight="600px">
```

**Pourquoi CRITIQUE :** PrimeNG requiert itemSize fixe. Dynamique = recalcul constant = lag 3000 items.

---

**🔒 SECURITY CONSIDERATIONS**

#### **1. Validation Stricte JSON Import**

```typescript
// ✅ CORRECT - Validation multi-niveaux
async validateJSON(jsonString: string): Promise<ValidationResult> {
  // 1. Parse JSON
  let data;
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    return { valid: false, error: `Parse error: ${e.message}` };
  }

  // 2. Validate structure
  if (!data.version || !data.checksum || !Array.isArray(data.checks)) {
    return { valid: false, error: 'Structure JSON invalide' };
  }

  // 3. Validate checksum SHA-256
  const { checksum, ...dataWithoutChecksum } = data;
  const actualChecksum = await this.calculateChecksum(dataWithoutChecksum);

  if (checksum !== actualChecksum) {
    return { valid: false, error: 'Checksum invalide' };
  }

  return { valid: true };
}
```

#### **2. Pas de eval() ou innerHTML Dynamique**

```typescript
// ❌ INTERDIT - XSS vulnerability
eval(name);  // ❌ INTERDIT ABSOLU
this.element.innerHTML = name;  // ❌ INTERDIT (XSS)

// ✅ CORRECT - Utiliser sanitizer Angular
import { DomSanitizer, SecurityContext } from '@angular/platform-browser';
return this.sanitizer.sanitize(SecurityContext.HTML, name);
```

**Pourquoi CRITIQUE :** eval() = remote code execution. innerHTML = XSS.

---

**⚡ PERFORMANCE GOTCHAS**

#### **1. Filtrage 3000 Items Sans Debounce**

```typescript
// ❌ INTERDIT - Lag sur chaque keystroke
filteredChecks$ = combineLatest([this.checks$, this.filters$]).pipe(
  map(([checks, filters]) => this.applyFilters(checks, filters))
  // ❌ Pas de debounce
);

// ✅ CORRECT - debounceTime(50)
filteredChecks$ = combineLatest([this.checks$, this.filters$]).pipe(
  debounceTime(50),  // ✅ Attendre 50ms
  map(([checks, filters]) => this.applyFilters(checks, filters))
);
```

**Pourquoi CRITIQUE :** NFR-PERF-1 (Filtrage <100ms). 3000 items sans debounce = lag visible.

#### **2. Pathfinding Sans Cache Memoization**

```typescript
// ❌ INTERDIT - Recalcul Dijkstra à chaque fois
calculatePath(from: string, to: string, age: 'Child' | 'Adult'): PathResult {
  return this.dijkstra(graph, from, to, age);  // ❌ Pas de cache
}

// ✅ CORRECT - Cache Map<string, PathResult>
private pathCache = new Map<string, PathResult>();

calculatePath(from: string, to: string, age: 'Child' | 'Adult'): PathResult {
  const cacheKey = `${from}-${to}-${age}`;

  if (this.pathCache.has(cacheKey)) {
    return this.pathCache.get(cacheKey)!;  // ✅ Cache hit
  }

  const result = this.dijkstra(graph, from, to, age);
  this.pathCache.set(cacheKey, result);
  return result;
}

// Clear cache when entrances updated
addEntrance(entrance: Entrance) {
  this.entrancesSubject.next([...this.entrances, entrance]);
  this.pathCache.clear();  // ✅ Invalidate cache
}
```

**Pourquoi CRITIQUE :** NFR-PERF-2 (Pathfinding <2s). Dijkstra sans cache peut dépasser 2s.

---

## Usage Guidelines

**For AI Agents:**

- ✅ **Read this file BEFORE implementing any code** - Critical patterns must be understood
- ✅ **Follow ALL rules exactly as documented** - No exceptions without explicit justification
- ✅ **When in doubt, prefer the more restrictive option** - Consistency > flexibility
- ✅ **Update this file if new patterns emerge** - Keep context current and relevant
- ✅ **Reference specific rules in code reviews** - Cite rules when correcting violations

**For Humans:**

- 📝 **Keep this file lean and focused on agent needs** - Remove obvious or redundant rules
- 🔄 **Update when technology stack changes** - Versions, dependencies, patterns evolve
- 📅 **Review quarterly for outdated rules** - Technology moves fast, prune stale content
- 🗑️ **Remove rules that become obvious over time** - Agents learn, reduce noise
- ✅ **Validate rules during code reviews** - Ensure agents actually follow documented patterns

**Maintenance Best Practices:**

- New framework version? Update Technology Stack section immediately
- New anti-pattern discovered? Add to Critical Don't-Miss Rules with examples
- Pattern becomes standard practice? Remove from context to reduce noise
- Agents consistently violating a rule? Make it more explicit and add "Why CRITIQUE"

**Last Updated:** 2026-01-07
