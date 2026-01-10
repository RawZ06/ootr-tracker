# Story 3.6: Create Stats Module with Global Progression Display

**Status:** done

### Code Review (2026-01-10)
- ✅ All acceptance criteria met and verified
- ✅ Components fully functional with PrimeNG
- ✅ StateManagementService complete (toggle, filters, stats)
- ✅ Virtual scrolling, multi-filter, zone drill-down working
- ✅ Build ✅, Lint ✅

**Epic:** 3 - Check Tracking & Progress Monitoring
**Story ID:** 3.6
**Created:** 2026-01-10

---

## Story

As a player,
I want to see my global progression and statistics by type and zone,
So that I understand my overall completion status.

---

## Acceptance Criteria

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

## Tasks / Subtasks

- [x] Implement calculateStats method in StateManagementService
- [x] Calculate global progression (total, completed, percentage)
- [x] Calculate stats by type (FR31)
- [x] Calculate stats by zone (FR32)
- [x] Export Stats interface for component usage
- [x] Create StatsComponent with PrimeNG Cards and ProgressBars
- [x] Add Done/To Do perspective toggle (FR33)
- [x] Subscribe to stats$ observable
- [x] Use OnPush change detection
- [x] Verify lazy loading via app.routes.ts

---

## Dev Agent Record

### Implementation Details

**StateManagementService** [state-management.service.ts](src/app/core/services/state-management.service.ts:158):

```typescript
export interface Stats {
  total: number;
  completed: number;
  percentage: number;
  byType: { type: string; total: number; completed: number; percentage: number }[];
  byZone: { zone: string; total: number; completed: number; percentage: number }[];
}

stats$ = this.checks$.pipe(map(checks => this.calculateStats(checks)));

private calculateStats(checks: Check[]): Stats {
  // Global stats (FR30)
  const total = checks.length;
  const completed = checks.filter((c) => c.isDone).length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  // Stats by type (FR31)
  const typeMap = new Map<string, { total: number; completed: number }>();
  checks.forEach((check) => {
    const type = check.type || 'Unknown';
    const stats = typeMap.get(type) || { total: 0, completed: 0 };
    stats.total++;
    if (check.isDone) stats.completed++;
    typeMap.set(type, stats);
  });
  const byType = Array.from(typeMap.entries()).map(...).sort(by total desc);

  // Stats by zone (FR32) - similar logic
  
  return { total, completed, percentage, byType, byZone };
}
```

**StatsComponent** [stats.component.ts](src/app/modules/stats/stats.component.ts):
- PrimeNG Card components for each section
- PrimeNG ProgressBar for visual representation
- Toggle button for Done/To Do perspective (FR33)
- Real-time updates via stats$ observable subscription
- OnPush change detection (NFR-MAINT-1)

### Visual Design
- Global Progress: Large centered display with percentage
- Progress by Type: List with progress bars sorted by total count
- Progress by Zone: List with progress bars sorted by total count
- Toggle button switches between:
  - Done view: Shows completed/total (green)
  - To Do view: Shows remaining/total (blue)

### Performance
- Reactive calculation via RxJS map operator
- Updates automatically when checks are marked done
- OnPush prevents unnecessary re-renders
- Sorted by total (most checks first) for better UX

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 3, Story 3.6, lines 944-964)
- FRs: FR30 (global progression), FR31 (by type), FR32 (by zone), FR33 (Done/To Do perspectives)
- NFRs: NFR-MAINT-1 (OnPush), NFR-UX-1 (50h+ sessions)
