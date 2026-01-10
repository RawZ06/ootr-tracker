# Story 1.4: Configure Routing with Lazy Loading

**Status:** ready-for-dev
**Epic:** 1 - Project Foundation & Technical Setup
**Story ID:** 1.4
**Created:** 2026-01-10

---

## Story

As a developer,
I want Angular Router configured with lazy loading for the 4 modules,
So that code splitting works and modules load on-demand.

---

## Acceptance Criteria

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

## Tasks / Subtasks

### Task 1: Configure Main Routes
- [x] Update `app.routes.ts` with lazy-loaded routes using `loadComponent()`
- [x] Add default redirect from `/` to `/checks`
- [x] Add wildcard route for 404 handling

### Task 2: Create Placeholder Components
- [x] Create `modules/checks/checks.component.ts` component
- [x] Create `modules/entrances/entrances.component.ts` component
- [x] Create `modules/pathfinding/pathfinding.component.ts` component
- [x] Create `modules/stats/stats.component.ts` component
- [x] All components use standalone: true
- [x] All components use OnPush change detection

### Task 3: Verify Lazy Loading
- [x] Run `ng build` and verify separate chunk files
- [x] Test navigation between all routes
- [x] Verify code splitting works correctly

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 1, Story 1.4, lines 631-649)
- NFRs: NFR-MAINT-1, NFR-MAINT-2 (Angular best practices, modularity)

---

## Dev Agent Record

### Agent Model Used

**Model:** Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)
**Workflow:** dev-story (BMM v1.0)
**Date:** 2026-01-10

### Implementation Notes

**Successfully configured Angular routing with lazy loading for all 4 modules:**

1. **Routes Configured:**
   - Updated `app.routes.ts` with 4 lazy-loaded routes using `loadComponent()` pattern
   - Added default redirect from `/` to `/checks`
   - Added wildcard route (`**`) that redirects to `/checks` for 404 handling

2. **Components Created:**
   - ChecksComponent: Placeholder for Checks module (Epic 2)
   - EntrancesComponent: Placeholder for Entrances module (Epic 3)
   - PathfindingComponent: Placeholder for Pathfinding module (Epic 7)
   - StatsComponent: Placeholder for Stats module (Epic 6)

3. **Component Architecture:**
   - All components use `standalone: true`
   - All components use `ChangeDetectionStrategy.OnPush`
   - All components have simple placeholder templates showing module name
   - All components follow kebab-case file naming convention

4. **Code Splitting Verification:**
   - Build successful: `ng build` passed
   - Verified 4 separate lazy chunk files created:
     - `chunk-JONKKIO4.js` (pathfinding-component) - 680 bytes
     - `chunk-BPDGHPP5.js` (entrances-component) - 672 bytes
     - `chunk-L3GCC4RL.js` (checks-component) - 660 bytes
     - `chunk-GXSBND5R.js` (stats-component) - 656 bytes
   - Total bundle size: 458.30 kB (main) + ~2.6 KB (lazy chunks)

5. **Issues Encountered:**
   - None. Implementation was straightforward.

### Files Created

**Components (4 files):**
- `src/app/modules/checks/checks.component.ts`
- `src/app/modules/entrances/entrances.component.ts`
- `src/app/modules/pathfinding/pathfinding.component.ts`
- `src/app/modules/stats/stats.component.ts`

**Files Modified (1 file):**
- `src/app/app.routes.ts` (added 6 routes)

**Total:** 4 files created + 1 file modified

---

**Story Status:** done

### Code Review (2026-01-10)
- ✅ All lazy routes configured correctly with loadComponent()
- ✅ Code splitting verified (4 separate chunk files)
- ✅ All components use OnPush and standalone: true
- ✅ No issues found - implementation perfect
