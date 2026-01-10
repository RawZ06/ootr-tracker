# Story 6.2: Implement Auto-Reducing Zone Selector

**Status:** ready-for-dev
**Epic:** 6 - Entrance Tracking & Shuffle Navigation
**Story ID:** 6.2
**Created:** 2026-01-10

---

## Story

As a player,
I want zone selectors to show only unused entrances,
So that the list shrinks as I record more entrances and I avoid duplicates.

---

## Acceptance Criteria

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

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 6, Story 6.2, lines 1340-1360)
- FRs: FR16
- NFRs: NFR-UX-4
