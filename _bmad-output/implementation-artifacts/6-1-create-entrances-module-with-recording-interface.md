# Story 6.1: Create Entrances Module with Recording Interface

**Status:** ready-for-dev
**Epic:** 6 - Entrance Tracking & Shuffle Navigation
**Story ID:** 6.1
**Created:** 2026-01-10

---

## Story

As a player,
I want to record discovered entrances as "Zone A → Zone B",
So that I can track where each entrance leads in Entrance Shuffle mode.

---

## Acceptance Criteria

**Given** the Entrance model from Epic 2
**When** I navigate to `/entrances` route
**Then** Entrances module component displays with recording interface (FR15)
**And** interface has two dropdown selectors: "From Zone" and "To Zone"
**And** zone lists are populated from check metadata (all unique zones)
**And** interface has "Record Entrance" button
**And** clicking button creates new Entrance in StateManagementService with: from, to, discoveredAt timestamp, generated UUID id
**And** recorded entrance displays in list below interface showing "From Zone → To Zone"
**And** entrance uses immutable update pattern (spread operator)
**And** component is lazy-loaded via routing from Epic 1
**And** OnPush change detection strategy used
**And** unit tests verify entrance recording
**And** NFR-UX-3 is addressed (minimal clics - 2 selects + 1 button)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 6, Story 6.1, lines 1313-1338)
- FRs: FR15
- NFRs: NFR-UX-3
