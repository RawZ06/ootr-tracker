# Story 3.7: Add Persistent Mini Progress Counter

**Status:** done

### Code Review (2026-01-10)
- ✅ All acceptance criteria met and verified
- ✅ Components fully functional with PrimeNG
- ✅ StateManagementService complete (toggle, filters, stats)
- ✅ Virtual scrolling, multi-filter, zone drill-down working
- ✅ Build ✅, Lint ✅

**Epic:** 3 - Check Tracking & Progress Monitoring
**Story ID:** 3.7
**Created:** 2026-01-10

---

## Story

As a player,
I want to see a mini progress counter always visible while browsing checks,
So that I can track my progression without navigating to stats.

---

## Acceptance Criteria

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

## Tasks / Subtasks

- [x] Update app.ts with navigation header
- [x] Add mini progress counter to header
- [x] Subscribe to stats$ observable
- [x] Format progress text as "X / Total (Y%)"
- [x] Use PrimeNG Badge for counter display
- [x] Make header sticky (position: sticky, top: 0)
- [x] Add navigation buttons for all routes
- [x] Add Import button to open ImportDialogComponent
- [x] Verify counter updates in real-time

---

## Dev Agent Record

### Implementation Details

**App Component** [app.ts](src/app/app.ts):
```typescript
progressText = signal('0 / 0 (0%)');
progressPercentage = signal(0);

constructor() {
  this.stateService.stats$.pipe(takeUntilDestroyed()).subscribe((stats) => {
    const percentage = stats.percentage.toFixed(1);
    this.progressText.set(`${stats.completed} / ${stats.total} (${percentage}%)`);
    this.progressPercentage.set(stats.percentage);
  });
}
```

**Header Template** [app.html](src/app/app.html):
- Sticky header: `sticky top-0 z-50`
- Mini progress counter with PrimeNG Badge
- Navigation buttons with routerLink and routerLinkActive
- Import button to trigger ImportDialogComponent
- Real-time update via stats$ observable

### Visual Design
Header layout:
```
[App Title] [Checks] [Entrances] [Pathfinding] [Stats]     [Progress: 847 / 3047 (27.8%)] [Import]
```

- Always visible at top of screen (sticky)
- Success badge for progress (green)
- Active route highlighted (white background)
- Responsive layout with flexbox

### Real-Time Updates
- Counter subscribes to stats$ observable
- Updates automatically when checks are marked done
- No manual refresh needed
- takeUntilDestroyed prevents memory leaks

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 3, Story 3.7, lines 967-984)
- FRs: FR34 (mini progress counter always visible)
- NFRs: NFR-PERF-6 (no memory leaks)
