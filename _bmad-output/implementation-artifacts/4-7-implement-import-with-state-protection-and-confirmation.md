# Story 4.7: Implement Import with State Protection and Confirmation

**Status:** ready-for-dev
**Epic:** 4 - Session Persistence & State Recovery
**Story ID:** 4.7
**Created:** 2026-01-10

---

## Story

As a player,
I want my current state protected if I import an invalid save file,
So that I never lose my progress due to a corrupted import.

---

## Acceptance Criteria

**Given** the import UI from Story 4.6
**When** I attempt to import an invalid save file
**Then** validation errors are displayed (from Story 4.6)
**And** import is BLOCKED - no state changes occur (NFR-REL-3)
**And** current StateManagementService state remains unchanged
**And** message confirms: "Import cancelled - your current progress is safe"
**When** I import a valid save file and confirm
**Then** state restoration executes (Story 4.4)
**And** success message displays: "Save loaded successfully - restored to {save_date}"
**And** user is navigated to `/checks` route to see restored checks
**And** all checks, entrances, filters are restored exactly (NFR-REL-1)
**And** application state remains consistent across browser refresh (NFR-REL-7 - localStorage backup optional)
**And** unit tests verify invalid import protection and valid import success
**And** integration test verifies full export → close → import → restore cycle

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 4, Story 4.7, lines 1185-1208)
- FRs: FR38, FR40
- NFRs: NFR-REL-1, NFR-REL-3, NFR-REL-7
