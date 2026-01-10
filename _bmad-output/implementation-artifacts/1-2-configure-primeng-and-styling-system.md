# Story 1.2: Configure PrimeNG and Styling System

**Status:** ready-for-dev
**Epic:** 1 - Project Foundation & Technical Setup
**Story ID:** 1.2
**Created:** 2026-01-09

---

## Story

As a developer,
I want PrimeNG 20+ and Tailwind v4 properly configured,
So that I can use UI components and styling utilities throughout the application.

---

## Acceptance Criteria

**Given** the Angular project from Story 1.1
**When** I configure PrimeNG and Tailwind
**Then** PrimeNG 20+ is installed (primeng, @primeuix/themes, primeicons, primeflex)
**And** `app.config.ts` includes `providePrimeNG()` configuration
**And** global styles are configured in `styles.css` with Tailwind imports
**And** `tailwind.config.js` includes correct content paths for purge
**And** I can import and use a PrimeNG component (e.g., Button) in app.component.ts
**And** Tailwind utilities work (e.g., `class="flex justify-center"`)

---

## Tasks / Subtasks

### Task 1: Verify PrimeNG Dependencies (AC: All)
- [ ] Verify PrimeNG 21+ is already installed from Story 1.1
- [ ] Verify @primeuix/themes, primeicons, primeflex are installed
- [ ] Check package.json for correct versions

### Task 2: Configure PrimeNG in app.config.ts (AC: providePrimeNG)
- [ ] Import providePrimeNG from primeng/config
- [ ] Add providePrimeNG() to providers array
- [ ] Configure theme settings (Aura theme)
- [ ] Write unit test for config

### Task 3: Configure Global Styles (AC: styles.css)
- [ ] Verify Tailwind imports in styles.css
- [ ] Add PrimeNG theme imports (Aura theme CSS)
- [ ] Add PrimeIcons CSS import
- [ ] Test global styles load correctly

### Task 4: Validate Tailwind Configuration (AC: tailwind.config.js)
- [ ] Verify content paths include all Angular files
- [ ] Test Tailwind purge works correctly
- [ ] Verify build output size is optimized

### Task 5: Create Test Component with PrimeNG (AC: Button usage)
- [ ] Import Button module in app.component.ts
- [ ] Add PrimeNG Button to app.component.html
- [ ] Add Tailwind utility classes to test
- [ ] Verify component renders correctly
- [ ] Write component tests

### Task 6: Verification and Testing (AC: All)
- [ ] Run `ng serve` and verify no errors
- [ ] Test PrimeNG Button displays correctly
- [ ] Test Tailwind classes apply correctly
- [ ] Run `pnpm test` and verify all tests pass
- [ ] Run `ng build` and verify bundle size

---

## Dev Notes

### Critical Intelligence from Story 1.1

**✅ Already Completed in Story 1.1:**
- PrimeNG 21.0.2 installed
- @primeuix/themes 2.0.2 installed
- Tailwind CSS 4.1.18 installed
- @tailwindcss/postcss 4.1.18 installed
- `.postcssrc.json` created with correct configuration
- `src/styles.css` with `@import "tailwindcss";`

**🔑 Key Learnings:**
- `.postcssrc.json` format REQUIRED (not `postcss.config.js`)
- Both `tailwindcss` AND `@tailwindcss/postcss` packages needed
- `postcss` v8.5.6 also required as devDependency
- TypeScript 5.9.3 is correct for Angular 21 (not 5.6.x)

**📁 Existing Files to Modify:**
- `src/app/app.config.ts` - Add PrimeNG configuration
- `src/app/app.component.ts` - Add test PrimeNG component
- `src/app/app.component.html` - Add test markup
- `src/styles.css` - Add PrimeNG theme imports
- `tailwind.config.js` - Verify content paths

---

## Developer Context

### Technical Requirements

#### PrimeNG Configuration

**Required Imports in app.config.ts:**
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '[data-theme="dark"]',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      }
    })
  ]
};
```

**Critical Configuration Details:**
- **Theme:** Aura preset (PrimeNG default for v20+)
- **Dark Mode:** Attribute-based `[data-theme="dark"]`
- **CSS Layer Order:** Ensures Tailwind utilities override PrimeNG when needed

#### Global Styles Configuration

**src/styles.css MUST contain:**
```css
/* Tailwind CSS imports */
@import "tailwindcss";

/* PrimeNG Theme */
@import "primeng/resources/themes/aura-light-blue/theme.css";

/* PrimeNG Core CSS */
@import "primeng/resources/primeng.min.css";

/* PrimeIcons */
@import "primeicons/primeicons.css";

/* Custom global styles */
html, body {
  height: 100%;
  margin: 0;
  font-family: var(--font-family);
}
```

**Layer Ordering:**
1. Tailwind base/components/utilities
2. PrimeNG theme
3. PrimeNG core
4. PrimeIcons
5. Custom styles

#### Tailwind Content Paths

**tailwind.config.js verification:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",    // ✅ Covers all components and templates
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Critical:** Content paths MUST include all `.html` and `.ts` files for proper purging.

---

### Architecture Compliance

#### Rule #1: providePrimeNG() is MANDATORY (project-context.md Line 724)

**Installation already complete from Story 1.1:**
```bash
# Already executed:
pnpm install primeng @primeuix/themes primeicons primeflex
```

**Configuration MUST be in app.config.ts:**
- ✅ providePrimeNG() in providers array
- ✅ Aura theme preset
- ✅ Dark mode selector configured
- ❌ NEVER use old NgModule approach (deprecated in Angular 21)

#### Rule #2: Standalone Components Only (project-context.md Line 200)

**Component Pattern:**
```typescript
@Component({
  selector: 'app-root',
  standalone: true,  // ✅ REQUIRED
  imports: [CommonModule, ButtonModule],  // Import PrimeNG modules here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
```

#### Rule #3: OnPush Change Detection (project-context.md Line 216, 224)

**MANDATORY for ALL components:**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush  // ✅ REQUIRED
})
```

**Why Critical:** NFR-PERF-3 (60 FPS mandatory)

#### Rule #4: CSS Layer Ordering (architecture.md)

**CSS Layer Strategy:**
```css
@layer tailwind-base, primeng, tailwind-utilities;
```

**Purpose:**
- Tailwind base styles load first
- PrimeNG component styles overlay
- Tailwind utilities have final override power

**Configuration in providePrimeNG:**
```typescript
cssLayer: {
  name: 'primeng',
  order: 'tailwind-base, primeng, tailwind-utilities'
}
```

---

### Library & Framework Requirements

#### PrimeNG 21+ with Angular 21

**Verified Versions (from Story 1.1):**
- primeng: 21.0.2
- @primeuix/themes: 2.0.2
- primeicons: 7.0.0+ (latest)
- primeflex: 4.0.0+ (optional utility classes)

**PrimeNG Components to Test:**
- **Button** - Basic component test
- Future stories will use: VirtualScroller, Checkbox, Toast, ProgressBar, Skeleton

**Import Pattern:**
```typescript
import { ButtonModule } from 'primeng/button';
```

#### Tailwind CSS v4 Configuration

**PostCSS Configuration (Already exists from Story 1.1):**

**.postcssrc.json:**
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

**Critical Files:**
- ✅ `.postcssrc.json` (not postcss.config.js)
- ✅ `tailwindcss` v4.1.18
- ✅ `@tailwindcss/postcss` v4.1.18
- ✅ `postcss` v8.5.6

**Sources:**
- [Tailwind Angular Guide](https://angular.dev/guide/tailwind)
- [Tailwind PostCSS Installation](https://tailwindcss.com/docs/installation/using-postcss)
- [Angular Tailwind Setup Guide](https://dev.to/manthanank/setting-up-tailwind-css-40-in-angular-v191-a-step-by-step-guide-258m)

---

### File Structure Requirements

**Files to Modify:**
```
src/
├── app/
│   ├── app.config.ts          # Add providePrimeNG()
│   ├── app.component.ts       # Import ButtonModule, add test button
│   ├── app.component.html     # Add PrimeNG Button + Tailwind test
│   ├── app.component.css      # (no changes needed)
│   └── app.component.spec.ts  # Add tests for PrimeNG
├── styles.css                 # Add PrimeNG theme imports
└── index.html                 # (no changes needed)
```

**Configuration Files to Verify:**
```
./
├── .postcssrc.json           # ✅ Already exists (Story 1.1)
├── tailwind.config.js        # ✅ Verify content paths
├── package.json              # ✅ Verify PrimeNG versions
└── angular.json              # (no changes needed)
```

---

### Testing Requirements

#### Unit Tests (Co-located)

**Test app.config.ts:**
```typescript
// src/app/app.config.spec.ts
import { TestBed } from '@angular/core/testing';
import { appConfig } from './app.config';

describe('appConfig', () => {
  it('should provide PrimeNG configuration', () => {
    TestBed.configureTestingModule({
      providers: appConfig.providers
    });

    const config = TestBed.inject(/* PrimeNG config token if available */);
    expect(config).toBeDefined();
  });
});
```

**Test app.component.ts with PrimeNG Button:**
```typescript
// src/app/app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render PrimeNG button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('p-button');
    expect(button).toBeTruthy();
  });

  it('should apply Tailwind classes', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('.flex');
    expect(element).toBeTruthy();
  });
});
```

#### Integration Tests

**Verify styling loads:**
```bash
# Run dev server
ng serve

# Verify in browser:
# 1. PrimeNG Button renders with theme
# 2. Tailwind classes apply (flex, justify-center)
# 3. No console errors
# 4. Dark mode toggle works (if implemented)
```

**Verify build optimization:**
```bash
# Build production
ng build --configuration production

# Verify:
# 1. dist/NotesAllSanity/main.*.js < 500KB
# 2. dist/NotesAllSanity/styles.*.css < 100KB
# 3. Tailwind CSS purged correctly
# 4. PrimeNG theme loaded
```

---

### Previous Story Intelligence

**From Story 1.1 (Initialize Angular Project):**

**Files Created:**
- `src/app/app.config.ts` - Application config (modify for PrimeNG)
- `src/app/app.routes.ts` - Routing config (no changes needed)
- `src/styles.css` - Global styles (add PrimeNG imports)
- `tailwind.config.js` - Tailwind config (verify paths)
- `.postcssrc.json` - PostCSS config (already correct)

**Dev Notes from 1.1:**
- **TypeScript Version:** 5.9.3 is CORRECT (not 5.6.x as originally specified)
- **Tailwind Config:** `.postcssrc.json` format is MANDATORY
- **Package Manager:** Always use pnpm (never npm or yarn)
- **Build Time:** ~1.1 seconds for development build
- **Test Time:** Tests run in ~66ms

**Problems Encountered & Solutions:**
1. **Tailwind v4 PostCSS Plugin Error:**
   - Solution: Use `.postcssrc.json` instead of `postcss.config.js`
   - Required packages: `tailwindcss`, `@tailwindcss/postcss`, `postcss`

**Patterns Established:**
- Standalone components only (no NgModules)
- TypeScript strict mode enabled
- ES2022 target
- pnpm package manager
- Vitest for testing

---

### Latest Technical Information

**PrimeNG 21 with Angular 21 (2026):**
- **Current Version:** PrimeNG 21.0.2 (installed in Story 1.1)
- **Theme System:** Aura preset (new default for v20+)
- **Dark Mode:** Attribute-based `[data-theme="dark"]`
- **Configuration:** `providePrimeNG()` function in app.config
- **Compatibility:** ✅ Angular 21 fully supported

**Tailwind CSS v4 with Angular (2026):**
- **Current Version:** Tailwind CSS 4.1.18 (installed in Story 1.1)
- **PostCSS Plugin:** @tailwindcss/postcss v4.1.18 required
- **Configuration File:** `.postcssrc.json` (JSON format mandatory)
- **Import Syntax:** `@import "tailwindcss";` in styles.css
- **Angular Integration:** Native support via `--style=tailwind` flag
- **Known Issues:** postcss.config.js not supported, use .postcssrc.json

**Sources:**
- [Tailwind Angular Official Guide](https://angular.dev/guide/tailwind)
- [Tailwind CSS 4 PostCSS Setup](https://dev.to/manthanank/setting-up-tailwind-css-40-in-angular-v191-a-step-by-step-guide-258m)
- [PrimeNG Installation](https://primeng.org/installation)

---

### Project Context Reference

**Critical Rules from project-context.md:**

**Styling Rules:**
- File naming: kebab-case (e.g., `app.component.css`)
- OnPush change detection: MANDATORY all components
- No direct Toast usage: Use ErrorHandlerService exclusively
- Virtual Scroller: itemSize MUST be 50px fixed (for future stories)
- Async pipe: Prefer over manual subscriptions
- Memory leaks: Use takeUntilDestroyed() if subscribe needed

**PrimeNG Rules:**
- VirtualScroller: itemSize=50 fixed (NFR-PERF-1)
- ErrorHandlerService: Exclusive for all error messages
- MessageService: Only via ErrorHandlerService
- Theme Service: Exclusive for theme persistence

**Tailwind Rules:**
- Pure CSS only (no SCSS/LESS)
- Content paths: MUST include all .html and .ts files
- Purge optimization: Verify in production builds
- Utility classes: Preferred for spacing/layout

**Performance Rules:**
- Bundle size: <2MB (strict budget)
- Initial load: <3s (NFR-PERF-4)
- OnPush: Required for 60 FPS (NFR-PERF-3)
- Debounce filters: 50ms for 3000+ items

---

## Post-Implementation Verification Checklist

After completing Story 1.2, verify:

- [ ] `app.config.ts` includes `providePrimeNG()` with Aura theme
- [ ] `styles.css` has PrimeNG theme and PrimeIcons imports
- [ ] PrimeNG Button component renders in app.component
- [ ] Tailwind utility classes work (flex, justify-center, etc.)
- [ ] `tailwind.config.js` has correct content paths
- [ ] `ng serve` runs without errors
- [ ] `pnpm test` passes all tests (2/2 from Story 1.1 + new tests)
- [ ] `ng build` completes successfully
- [ ] Bundle size < 2MB (production build)
- [ ] No console errors in browser
- [ ] PrimeNG theme loads correctly
- [ ] Dark mode attribute configured (ready for Story 5.x)

---

## Known Issues & Edge Cases

### Issue 1: CSS Layer Ordering

**Problem:** Tailwind utilities might not override PrimeNG styles

**Solution:**
```typescript
// In providePrimeNG configuration:
cssLayer: {
  name: 'primeng',
  order: 'tailwind-base, primeng, tailwind-utilities'
}
```

### Issue 2: Dark Mode Not Working

**Problem:** Dark mode toggle doesn't change theme

**Root Cause:** `data-theme` attribute not set on `<html>` element

**Solution:**
- Story 1.2 only configures dark mode selector
- Actual theme toggle implemented in Story 5.1 (Theme Service)
- For now, just verify configuration is correct

### Issue 3: PrimeNG Styles Not Loading

**Problem:** Button appears unstyled

**Solution:**
1. Verify `styles.css` has PrimeNG theme import
2. Check browser DevTools for CSS 404 errors
3. Verify `@primeuix/themes` package is installed
4. Clear Angular cache: `rm -rf .angular`

### Issue 4: Tailwind Classes Not Applying

**Problem:** Utility classes like `flex` don't work

**Solution:**
1. Verify `.postcssrc.json` exists
2. Verify `tailwind.config.js` content paths
3. Check `@tailwindcss/postcss` is installed
4. Restart `ng serve` (PostCSS config changes require restart)

---

## Dependencies on Other Stories

**Prerequisites:**
- **Story 1.1:** Initialize Angular Project (COMPLETED ✅)
  - Requires: Angular 21, Tailwind v4, PrimeNG packages installed

**Blocks:**
- **Story 1.3:** Setup Project Structure (needs styling ready)
- **Story 5.1:** Theme Service (builds on dark mode config)
- **Epic 2+:** All feature modules (use PrimeNG components)

---

## Reference Documentation

### External Documentation
- [PrimeNG Getting Started](https://primeng.org/installation)
- [PrimeNG Aura Theme](https://primeng.org/theming)
- [Tailwind Angular Guide](https://angular.dev/guide/tailwind)
- [Tailwind CSS v4 PostCSS](https://tailwindcss.com/docs/installation/using-postcss)
- [Angular Configuration API](https://angular.dev/api/core/ApplicationConfig)

### Internal Documentation
- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 1, Story 1.2)
- Source: `_bmad-output/planning-artifacts/architecture.md` (PrimeNG & Tailwind configuration)
- Source: `_bmad-output/project-context.md` (Rules 66-68, 200, 216, 224, 319-333, 345-352)
- Source: Story 1.1 Dev Agent Record (Tailwind configuration learnings)

---

## Dev Agent Record

### Agent Model Used

**Model:** Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)
**Date:** 2026-01-09
**Agent:** Amelia (Dev Agent)

### Implementation Notes

**✅ Successfully completed with following details:**

**Actual versions used:**
- PrimeNG: 21.0.2 (already installed from Story 1.1)
- @primeng/themes: 21.0.2 (NEW - installed in this story)
- @primeuix/themes: 2.0.2 (already installed from Story 1.1)
- primeicons: 7.0.0
- primeflex: 4.0.0
- Tailwind CSS: 4.1.18
- @tailwindcss/postcss: 4.1.18

**🚨 CRITICAL DISCOVERY: @primeng/themes Package**
- **Story mentioned:** @primeuix/themes for Aura theme
- **ACTUAL requirement:** @primeng/themes v21.0.2 (separate package)
- **Action taken:** Installed @primeng/themes (1MB download)
- **Import path:** `import Aura from '@primeng/themes/aura'`
- **Source:** [PrimeNG Official Docs](https://primeng.org/configuration)

**Deviations and key findings:**

1. **PrimeNG 21 Theme System (NEW):**
   - **No CSS imports needed** for theme (different from older versions)
   - Theme configured programmatically via `providePrimeNG({ theme: { preset: Aura }})`
   - Only PrimeIcons CSS import required in `styles.css`
   - Old approach (primeng/resources/themes/*.css) is DEPRECATED in v21

2. **CSS Layer Ordering:**
   - Configured in providePrimeNG options
   - Order: `tailwind-base, primeng, tailwind-utilities`
   - Ensures Tailwind utilities override PrimeNG when needed

3. **Angular 21 File Naming:**
   - Uses concise format: `app.ts` (not `app.component.ts`)
   - Template: `app.html` (not `app.component.html`)
   - Styles: `app.css` (not `app.component.css`)
   - Tests: `app.spec.ts` (Angular convention)

4. **OnPush Change Detection:**
   - Added `ChangeDetectionStrategy.OnPush` to App component
   - Required for performance (NFR-PERF-3: 60 FPS)

**Warnings encountered (non-blocking):**
- CSS property warning: "file" is not a known CSS property (line 349 in styles.css)
  - Same as Story 1.1
  - From Tailwind CSS generated output
  - Does not affect functionality

### Completion Checklist

- [x] providePrimeNG() configured in app.config.ts with Aura preset
- [x] PrimeIcons CSS import added to styles.css
- [x] @primeng/themes package installed (21.0.2)
- [x] Test Button component added to app.ts
- [x] Test template created in app.html with PrimeNG + Tailwind
- [x] Tailwind classes verified working (flex, bg-*, rounded, etc.)
- [x] All acceptance criteria verified
- [x] All tests passing (5/5)
- [x] No errors in `ng serve` or `ng build`
- [x] Bundle size within budget (455.90 kB << 2MB)

### Files Modified

**Configuration files:**
- `src/app/app.config.ts` - Added providePrimeNG with Aura theme and CSS layer ordering
- `src/styles.css` - Added PrimeIcons import + custom global styles

**Component files:**
- `src/app/app.ts` - Imported ButtonModule, added OnPush, added onButtonClick method
- `src/app/app.html` - Created test template with PrimeNG Button + Tailwind classes
- `src/app/app.spec.ts` - Updated tests (5 tests: title, PrimeNG button, Tailwind, onButtonClick)

**Packages installed:**
- `@primeng/themes@21.0.2` - PrimeNG theme system (NEW in this story)

**Test results:**
- ✅ Build dev: 1.64 MB main.js, 29.91 kB styles.css (2.063s)
- ✅ Build prod: 431.69 kB main.js (93.31 kB gzipped), 24.21 kB styles.css (5.00 kB gzipped)
- ✅ Total prod: 455.90 kB (98.30 kB gzipped) - Budget: 2MB ✅
- ✅ ng serve: Started successfully on http://localhost:4200/ (1.087s)
- ✅ Tests: 5/5 passing (122ms execution)

**Bundle size comparison:**
- Story 1.1: 1.29 MB total (dev)
- Story 1.2: 1.64 MB total (dev) - PrimeNG added (+350 KB)
- Production: 455.90 kB (well below 2MB budget)

**Total files modified:** 5 files
**Key verified:** @primeng/themes installed, app.config.ts configured, tests passing

---

**Story Status:** done
**Next Action:** Story 1.2 complete - Ready for Story 1.3 (Setup Project Structure)

---

## Ultimate Context Engine Analysis Completed

✅ **Comprehensive developer guide created**
✅ **All critical architecture rules extracted and documented**
✅ **Zero ambiguity - ready for flawless implementation**

This story file contains everything needed to configure PrimeNG and Tailwind CSS correctly according to all architectural decisions, learning from Story 1.1, and ensuring compliance with:
- All Epic 1 requirements (PrimeNG 20+, Tailwind v4)
- NFR-MAINT-1, NFR-MAINT-3 (Architecture best practices)
- NFR-PERF-3, NFR-PERF-4 (Performance requirements)
- NFR-UX-2 (Theme system foundation)
- 98 Critical implementation rules from project-context.md
- Technology stack compatibility (Angular 21 + PrimeNG 21 + Tailwind v4)
- Learnings from Story 1.1 (PostCSS configuration patterns)
