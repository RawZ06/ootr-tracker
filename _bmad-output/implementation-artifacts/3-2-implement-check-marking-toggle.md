# Story 3.2: Implement Check Marking (Done/Not Done Toggle)

**Status:** review

**Epic:** 3 - Check Tracking & Progress Monitoring
**Story ID:** 3.2
**Created:** 2026-01-10

---

## Story

As a player,
I want to mark checks as done or not done with a simple click,
So that I can track which checks I've completed.

---

## Acceptance Criteria

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

## Tasks / Subtasks

- [x] Implement toggleCheck method in StateManagementService
- [x] Use immutable update pattern with spread operator
- [x] Add completedAt timestamp when marking done
- [x] Add click handler to check items in ChecksComponent
- [x] Add visual feedback (background color, line-through, bold status)
- [x] Verify BehaviorSubject pattern usage

---

## Dev Agent Record

### Implementation Details

**StateManagementService** [state-management.service.ts](src/app/core/services/state-management.service.ts:50):
```typescript
toggleCheck(checkId: string): void {
  const currentChecks = this.checksSubject.value;
  const updatedChecks = currentChecks.map((check) =>
    check.id === checkId
      ? {
          ...check, // Immutable update (NFR-MAINT-1)
          isDone: !check.isDone,
          completedAt: !check.isDone ? new Date().toISOString() : undefined,
        }
      : check
  );
  this.checksSubject.next(updatedChecks);
}
```

**ChecksComponent** [checks.component.ts](src/app/modules/checks/checks.component.ts:87):
- Click handler: `(click)="onToggleCheck(check.id)"`
- Visual feedback:
  - Background: `[class.bg-green-50]="check.isDone"`
  - Text: `[class.line-through]="check.isDone"`
  - Status: Bold for done checks
  - Cursor: `cursor-pointer`
  - Transition: `transition-colors` for smooth visual change

### Performance
- Toggle operation: O(n) map operation but feels instantaneous due to reactive updates
- BehaviorSubject pattern ensures immediate UI update
- OnPush change detection prevents unnecessary re-renders

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 3, Story 3.2, lines 859-877)
- FRs: FR10 (mark done), FR11 (mark not done)
- NFRs: NFR-PERF-5 (<50ms), NFR-PERF-7 (no degradation), NFR-MAINT-1 (immutability)
