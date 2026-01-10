# Story 7.7: Handle Edge Cases and Display "No Path" Message

**Status:** ready-for-dev
**Epic:** 7 - Intelligent Pathfinding & Route Optimization
**Story ID:** 7.7
**Created:** 2026-01-10

---

## Story

As a player,
I want clear feedback when no path exists between zones,
So that I know I need to discover more entrances or the route is impossible.

---

## Acceptance Criteria

**Given** the pathfinding interface from Stories 7.1-7.6
**When** no path exists between selected zones
**Then** message displays: "No path available between [Start] and [Destination]" (FR29)
**And** message includes helpful suggestions: "You may need to discover more entrances", "Check if the destination is accessible with your current age context", "Try switching age context if applicable"
**And** message is styled clearly (info/warning banner with PrimeNG Message component)
**And** edge cases are handled gracefully: Start zone same as destination, No entrances recorded yet, Invalid zone selection
**And** all edge cases have unit tests
**And** NFR-UX-4 is satisfied (clear error messages guide user)
**And** NFR-PERF-2 is satisfied (even failed path calculations complete <2s)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.7, lines 1609-1634)
- FRs: FR29
- NFRs: NFR-PERF-2, NFR-UX-4
