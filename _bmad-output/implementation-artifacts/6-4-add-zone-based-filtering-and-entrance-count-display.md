# Story 6.4: Add Zone-Based Filtering and Entrance Count Display

**Status:** ready-for-dev
**Epic:** 6 - Entrance Tracking & Shuffle Navigation
**Story ID:** 6.4
**Created:** 2026-01-10

---

## Story

As a player,
I want to filter entrances by zone and see how many entrances each zone has,
So that I can focus on specific areas and track my exploration progress.

---

## Acceptance Criteria

**Given** recorded entrances from Stories 6.1-6.3
**When** I select a zone from the filter dropdown
**Then** entrance list shows only entrances where "from" OR "to" matches selected zone (FR18)
**And** "All Zones" option shows all entrances
**And** zone filter works in combination with text search (both filters applied)
**And** entrance count per zone is displayed in a summary section (FR19)
**And** count shows both "from" and "to" entrances for each zone
**And** count updates reactively as entrances are recorded
**And** count section is visible above or beside entrance list
**And** unit tests verify zone filtering and count calculations

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 6, Story 6.4, lines 1383-1405)
- FRs: FR18, FR19
