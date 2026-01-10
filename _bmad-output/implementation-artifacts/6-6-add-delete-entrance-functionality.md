# Story 6.6: Add Delete Entrance Functionality

**Status:** ready-for-dev
**Epic:** 6 - Entrance Tracking & Shuffle Navigation
**Story ID:** 6.6
**Created:** 2026-01-10

---

## Story

As a player,
I want to delete recorded entrances if I made a mistake,
So that I can correct my entrance tracking without restarting.

---

## Acceptance Criteria

**Given** recorded entrances displayed in the list from previous stories
**When** I click a delete button next to an entrance
**Then** confirmation dialog asks: "Delete entrance 'Zone A → Zone B'?" (FR21)
**And** confirming deletes the entrance from StateManagementService
**And** entrance disappears from list immediately (reactive update)
**And** entrance count per zone updates accordingly
**And** auto-reducing selector updates (deleted entrance's zones become available again)
**And** delete uses immutable update pattern (filter out by ID)
**And** canceling confirmation keeps the entrance
**And** delete button is clearly visible but styled to avoid accidental clicks
**And** unit tests verify delete functionality
**And** NFR-UX-4 is satisfied (clear error correction workflow)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 6, Story 6.6, lines 1432-1453)
- FRs: FR21
- NFRs: NFR-UX-4
