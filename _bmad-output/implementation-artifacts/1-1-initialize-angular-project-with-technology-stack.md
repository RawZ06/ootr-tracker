# Story 1.1: Initialize Angular Project with Technology Stack

**Status:** ready-for-dev
**Epic:** 1 - Project Foundation & Technical Setup
**Story ID:** 1.1
**Created:** 2026-01-09

---

## Story

As a developer,
I want an Angular 21 project initialized with the complete technology stack,
So that I have a solid foundation following all architectural decisions.

---

## Acceptance Criteria

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

## Implementation Commands

### Step 1: Initialize Angular Project

```bash
ng new NotesAllSanity \
  --standalone \
  --style=tailwind \
  --routing \
  --strict \
  --skip-git \
  --package-manager=pnpm
```

**Flags Explained:**
- `--standalone`: Uses modern Standalone API (no NgModules)
- `--style=tailwind`: Configures Tailwind CSS v4 directly (pure CSS, no preprocessor)
- `--routing`: Configures Angular Router from init (navigation between modules)
- `--strict`: Activates TypeScript strict mode + bundle budgets (NFR-MAINT-3)
- `--skip-git`: Skips Git init (assume Git configured separately)
- `--package-manager=pnpm`: Uses pnpm for optimal dependency management

### Step 2: Install PrimeNG Dependencies

```bash
cd NotesAllSanity
pnpm install primeng @primeuix/themes primeicons primeflex
```

**Dependencies Added:**
- `primeng` (v20+): Component library with Virtual Scroller required
- `@primeuix/themes` (v20+): PrimeNG theme system
- `primeicons`: PrimeNG icon library
- `primeflex`: PrimeNG flexbox utilities (optional but useful)

### Step 3: Verify Installation

```bash
# Verify dependencies installed
pnpm list primeng @angular/core

# Test dev server
ng serve --open
```

**Expected:** Browser opens at `http://localhost:4200` showing Angular welcome page

---

## Technical Requirements

### Required Versions (CRITICAL)

**Exact versions from architecture.md:**
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

**⚠️ CRITICAL Compatibilities:**
- ✅ Angular 21 REQUIRES TypeScript 5.6.x (not 5.5 or 5.7)
- ✅ PrimeNG 20+ REQUIRES Angular 21+ (incompatible with Angular 20 or less)
- ✅ Tailwind v4 uses pure CSS (no SCSS/LESS preprocessor)
- ✅ pnpm MUST be used (not npm or yarn) - deterministic lockfile critical

### Generated File Structure

After initialization, project structure should be:

```
NotesAllSanity/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Root component (Angular 20+ concise format)
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts
│   │   ├── app.routes.ts          # Routing config
│   │   └── app.config.ts          # Global config
│   ├── assets/
│   ├── styles.css                 # Global styles + Tailwind imports
│   ├── main.ts                    # Bootstrap
│   └── index.html
├── angular.json                   # Angular CLI config
├── tsconfig.json                  # TypeScript config (strict mode)
├── tsconfig.app.json
├── tsconfig.spec.json
├── tailwind.config.js             # Tailwind configuration
├── package.json
├── pnpm-lock.yaml                 # pnpm lockfile (MUST exist)
└── README.md
```

### Configuration Files Validation

**tsconfig.json MUST have:**
```json
{
  "compilerOptions": {
    "strict": true,              // ✅ CRITICAL
    "target": "ES2022",          // ✅ REQUIRED
    "module": "ES2022",
    "moduleResolution": "bundler"
  }
}
```

**angular.json MUST have:**
```json
{
  "projects": {
    "NotesAllSanity": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1.5mb",
                  "maximumError": "2mb"   // ✅ NFR-PERF-4
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

**tailwind.config.js MUST have:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",    // ✅ CRITICAL for purge
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Architecture Compliance

### Naming Conventions (project-context.md Rule #66-68)

**File Naming (kebab-case OBLIGATORY):**
- ✅ CORRECT: `app.component.ts`, `state-management.service.ts`
- ❌ FORBIDDEN: `appComponent.ts`, `App.component.ts`

**Angular 20+ Concise Format:**
- ✅ CORRECT: `app.ts` (component), `state-management.service.ts` (service)
- ❌ OLD FORMAT: `app.component.ts` (too verbose for Angular 20+)

**Note:** Angular CLI 21 generates concise format automatically with the flags used.

### Package Manager (project-context.md Rule #89)

**pnpm OBLIGATORY - NEVER npm or yarn:**
```bash
# ✅ CORRECT - ALWAYS pnpm
pnpm install
pnpm run dev
pnpm run build

# ❌ FORBIDDEN - NEVER npm or yarn
npm install              # ❌ FORBIDDEN
yarn install             # ❌ FORBIDDEN
```

**Why CRITICAL:** pnpm provides deterministic lockfile. If `node_modules/` or `package-lock.json` present: delete and run `pnpm install`.

### Build Tooling (architecture.md)

**Angular CLI 21 provides:**
- **esbuild**: Modern ultra-fast bundler (default Angular 17+)
- **Vite**: Dev server with HMR (Hot Module Replacement)
- **Production optimization**: Tree-shaking, minification, code-splitting automatic

---

## Developer Context

### Critical Implementation Rules

#### 1. TypeScript Strict Mode (ENFORCED)

**From project-context.md Rule #74:**
- ✅ Strict mode activated (`"strict": true` in tsconfig.json)
- ✅ Target ES2022, module ES2022, moduleResolution bundler
- ✅ All `.ts` files MUST compile without errors in strict mode - NO EXCEPTIONS

#### 2. Standalone API (No NgModules)

**From project-context.md Rule #180:**
```typescript
// ✅ CORRECT - Standalone component
@Component({
  selector: 'app-root',
  standalone: true,                    // ✅ OBLIGATORY
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {}

// ❌ FORBIDDEN - NgModules
@NgModule({ ... })  // ❌ This project uses 100% Standalone API
```

#### 3. Angular CLI Generated Format

**From project-context.md Rule #67:**
- 🚨 Angular CLI generates concise format Angular 20+: `checks.ts` (not `checks.component.ts`)
- 🚨 Tailwind v4 integrates directly via `@tailwindcss/postcss` (no explicit JIT needed)
- 🚨 PrimeNG Virtual Scroller requires fixed `itemSize` (50px) - MANDATORY for performance

---

## Testing Requirements

### Unit Tests (Co-located)

**From project-context.md Rule #78:**

After initialization, verify test infrastructure:

```bash
# Run tests (Vitest)
pnpm test

# Expected: Sample tests pass
```

**Test file naming convention:**
- ✅ CORRECT: `app.component.spec.ts` (Angular convention = `.spec.ts`)
- ❌ FORBIDDEN: `app.component.test.ts` (not `.test.ts`)

### Initial Test Validation

```bash
# Verify Angular CLI generated default tests
pnpm test

# Expected output:
# ✓ should create the app
# ✓ should have the 'NotesAllSanity' title
```

---

## Post-Implementation Verification Checklist

After completing Story 1.1, verify:

- [ ] Project directory `NotesAllSanity/` exists
- [ ] `pnpm-lock.yaml` exists (deterministic lockfile)
- [ ] `package.json` has Angular 21 + PrimeNG 20+ + Tailwind v4
- [ ] `tsconfig.json` has `"strict": true` and `"target": "ES2022"`
- [ ] `tailwind.config.js` exists with correct content paths
- [ ] `angular.json` exists with bundle budgets configured
- [ ] `ng serve` starts dev server successfully at `http://localhost:4200`
- [ ] Browser shows Angular welcome page without errors
- [ ] `pnpm test` runs and default tests pass
- [ ] No `node_modules/` or `package-lock.json` (npm artifacts)
- [ ] No errors in console when running `ng serve`

---

## Known Issues & Edge Cases

### Issue 1: Angular CLI Version Mismatch

**Problem:** If global `@angular/cli` is older version (e.g., Angular 18-20)

**Solution:**
```bash
# Update Angular CLI globally first
npm install -g @angular/cli@latest

# Verify version
ng version
# Expected: Angular CLI: 21.0.4 or higher
```

### Issue 2: Tailwind CSS Not Applying

**Problem:** Tailwind classes not working after init

**Solution:** Verify `styles.css` has Tailwind imports:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Note:** Angular CLI with `--style=tailwind` should add this automatically.

### Issue 3: PrimeNG Installation Fails

**Problem:** PrimeNG version incompatible with Angular 21

**Solution:**
```bash
# Install latest compatible versions explicitly
pnpm install primeng@^20.0.0 @primeuix/themes@^20.0.0 primeicons@latest primeflex@latest
```

---

## Dependencies on Other Stories

**Prerequisites:**
- None (this is Story 1.1 - first story of Epic 1)

**Blocks:**
- Story 1.2: Configure PrimeNG and Styling System (requires project initialized)
- Story 1.3: Setup Project Structure (requires base project)

---

## Reference Documentation

### External Documentation
- [Angular CLI 21 Documentation](https://angular.dev/cli)
- [PrimeNG 20 Getting Started](https://primeng.org/installation)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [pnpm Documentation](https://pnpm.io/)

### Internal Documentation
- Source: `_bmad-output/planning-artifacts/architecture.md` (lines 185-208, 711-725)
- Source: `_bmad-output/planning-artifacts/epics.md` (lines 561-579)
- Source: `_bmad-output/project-context.md` (lines 20-69, 711-728)

---

## Dev Agent Record

### Agent Model Used

**Model:** Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)
**Date:** 2026-01-09
**Agent:** Amelia (Dev Agent)

### Implementation Notes

**✅ Successfully completed with following details:**

**Actual versions installed:**
- Angular CLI: 21.0.5
- Angular Core: 21.0.8
- TypeScript: 5.9.3 (not 5.6.x as specified in story)
- Tailwind CSS: 4.1.18
- @tailwindcss/postcss: 4.1.18
- PrimeNG: 21.0.2
- @primeuix/themes: 2.0.2
- pnpm: 10.13.1

**🚨 CRITICAL CORRECTION: TypeScript Version Requirement**
- **Story indicated:** TypeScript 5.6.x required
- **ACTUAL requirement:** TypeScript >=5.9.0 <6.0.0 (per Angular 21 official docs)
- **Installed:** TypeScript 5.9.3 ✅ CORRECT
- **Source:** https://angular.dev/reference/versions

**Deviations and resolutions:**

1. **Tailwind CSS v4 Configuration Issue:**
   - **Problem:** Initial `postcss.config.js` caused build errors
   - **Root cause:** Angular Build requires `.postcssrc.json` format for Tailwind v4
   - **Solution:** Created `.postcssrc.json` with `@tailwindcss/postcss` plugin
   - **Files modified:**
     - Deleted: `postcss.config.js`
     - Created: `.postcssrc.json`
     - Modified: `src/styles.css` (reverted to `@import "tailwindcss";`)

2. **Package installation:**
   - Installed `postcss` explicitly (v8.5.6) as devDependency
   - Both `tailwindcss` and `@tailwindcss/postcss` required for Angular

**Warnings encountered (non-blocking):**
- CSS property warning: "file" is not a known CSS property (line 281 in generated styles.css)
  - This is from Tailwind CSS generated output
  - Does not affect functionality
  - Build and serve work correctly

### Completion Checklist

- [x] Commands executed successfully
- [x] All acceptance criteria verified
- [x] Post-implementation checklist completed
- [x] No errors in `ng serve` or `pnpm test`
- [x] `pnpm-lock.yaml` committed (if using Git)

### Files Created/Modified

**Configuration files created:**
- `.postcssrc.json` - PostCSS configuration for Tailwind v4
- `angular.json` - Angular CLI configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json` - TypeScript configs
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Project dependencies
- `pnpm-lock.yaml` - pnpm lockfile

**Source files:**
- `src/main.ts` - Application bootstrap
- `src/app/app.component.ts|html|css|spec.ts` - Root component
- `src/app/app.config.ts` - Application config
- `src/app/app.routes.ts` - Routing configuration
- `src/styles.css` - Global styles with Tailwind imports
- `src/index.html` - HTML entry point

**Test results:**
- ✅ Build: Successful (1.114 seconds)
- ✅ ng serve: Started successfully on http://localhost:4200/
- ✅ Tests: 2/2 passing (66ms execution)

**Total files in project:** 21 (excluding node_modules)
**Key verified:** pnpm-lock.yaml (209,541 bytes), angular.json, .postcssrc.json

---

**Story Status:** done
**Next Action:** Story 1.1 complete - Ready for Story 1.2 (Configure PrimeNG and Styling System)

---

## Ultimate Context Engine Analysis Completed

✅ **Comprehensive developer guide created**
✅ **All critical architecture rules extracted and documented**
✅ **Zero ambiguity - ready for flawless implementation**

This story file contains everything needed to initialize the Angular project correctly according to all architectural decisions, avoiding common pitfalls and ensuring compliance with:
- 51 Functional Requirements (foundation for all)
- 26 Non-Functional Requirements (especially NFR-MAINT-1, NFR-MAINT-3, NFR-PERF-4)
- 98 Critical implementation rules from project-context.md
- Technology stack compatibility (Angular 21 + PrimeNG 20+ + Tailwind v4)
