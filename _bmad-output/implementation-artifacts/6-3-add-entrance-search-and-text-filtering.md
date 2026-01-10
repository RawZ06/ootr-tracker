# Story 6.3: Add Entrance Search and Text Filtering

**Status:** ready-for-dev
**Epic:** 6 - Entrance Tracking & Shuffle Navigation
**Story ID:** 6.3
**Created:** 2026-01-10

---

## Story

As a player,
I want to search entrances by typing zone names,
So that I can quickly find how to access a specific zone.

---

## Acceptance Criteria

**Given** recorded entrances from Stories 6.1-6.2
**When** I type in the search input field
**Then** entrance list filters to show only entrances matching search text (FR17)
**And** search matches both "from" and "to" zone names
**And** search is case-insensitive
**And** search updates reactively with debounceTime(300) for performance (NFR-PERF-1)
**And** search input has clear button to reset filter
**And** empty search shows all entrances
**And** search box is prominently placed above entrance list
**And** unit tests verify search filtering logic
**And** performance test confirms search on 100+ entrances completes <100ms

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 6, Story 6.3, lines 1362-1381)
- FRs: FR17
- NFRs: NFR-PERF-1
