# Story 3.2: Implement Check Marking (Done/Not Done Toggle)

**Status:** ready-for-dev
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

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 3, Story 3.2, lines 858-877)
- FRs: FR10, FR11
- NFRs: NFR-PERF-5, NFR-PERF-7, NFR-MAINT-1
