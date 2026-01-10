# Story 3.5: Implement Toggle to Hide Completed Checks

**Status:** done

### Code Review (2026-01-10)
- ✅ All acceptance criteria met and verified
- ✅ Components fully functional with PrimeNG
- ✅ StateManagementService complete (toggle, filters, stats)
- ✅ Virtual scrolling, multi-filter, zone drill-down working
- ✅ Build ✅, Lint ✅

**Epic:** 3 - Check Tracking & Progress Monitoring
**Story ID:** 3.5
**Created:** 2026-01-10

---

## Story

As a player,
I want to hide all completed checks from the list,
So that I can focus only on remaining uncompleted checks.

---

## Acceptance Criteria

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

## Tasks / Subtasks

- [x] Implement hideCompleted filter in applyFilters method
- [x] Add Hide Completed toggle button to UI
- [x] Add visual state indication (button label and severity)
- [x] Integrate with existing zone and type filters
- [x] Add onToggleHideCompleted handler
- [x] Update filters$ observable with hideCompleted state
- [x] Verify combined filtering with all three criteria

---

## Dev Agent Record

### Implementation Details

**StateManagementService** [state-management.service.ts](src/app/core/services/state-management.service.ts):

```typescript
private applyFilters(checks: Check[], filters: FilterState): Check[] {
  let filtered = checks;
  
  if (filters.zone) {
    filtered = filtered.filter((c) => c.zone === filters.zone);
  }
  
  if (filters.type) {
    filtered = filtered.filter((c) => c.type === filters.type);
  }
  
  // FR12: Hide completed filter
  if (filters.hideCompleted) {
    filtered = filtered.filter((c) => !c.isDone);
  }
  
  return filtered;
}
```

**ChecksComponent** [checks.component.ts](src/app/modules/checks/checks.component.ts):
```typescript
// Button with dynamic label and severity
<p-button
  [label]="hideCompleted() ? 'Show All' : 'Hide Completed'"
  [severity]="hideCompleted() ? 'secondary' : 'primary'"
  (onClick)="onToggleHideCompleted()"
  [outlined]="!hideCompleted()"
/>

onToggleHideCompleted(): void {
  this.stateService.updateFilters({ hideCompleted: !this.hideCompleted() });
}
```

### Visual Feedback
- Label changes: "Hide Completed" → "Show All"
- Severity changes: primary → secondary
- Outlined state toggles
- Instantaneous UI update via signal

### Combined Filtering
All three filters work together:
- Zone filter (if set) → Type filter (if set) → Hide Completed (if set)
- Results count updates to show filtered total
- Virtual scroller smoothly updates with filtered list

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 3, Story 3.5, lines 923-941)
- FRs: FR12 (hide completed), FR9 (multi-criteria with zone + type)
- NFRs: NFR-PERF-1 (<100ms), NFR-PERF-5 (<50ms toggle)
