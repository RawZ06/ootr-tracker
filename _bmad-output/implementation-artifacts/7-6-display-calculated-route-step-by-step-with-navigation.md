# Story 7.6: Display Calculated Route Step-by-Step with Navigation

**Status:** ready-for-dev
**Epic:** 7 - Intelligent Pathfinding & Route Optimization
**Story ID:** 7.6
**Created:** 2026-01-10

---

## Story

As a player,
I want to see the calculated route displayed clearly step-by-step,
So that I know exactly which zones to traverse to reach my destination.

---

## Acceptance Criteria

**Given** a calculated path from Stories 7.3-7.5
**When** I click "Calculate Route" button
**Then** loading indicator shows during calculation (if >100ms)
**And** if path found, route displays step-by-step (FR27) with each step showing zone transitions (arrow →)
**And** Save Warp steps are highlighted/bolded (special node indicator)
**And** route includes "Open Checks" button for destination zone (FR28 navigate to checks view)
**And** clicking "Open Checks" navigates to `/checks?zone=X` with pre-filtered checks
**And** if no path found, message displays: "No path available between these zones" (FR29)
**And** unit tests verify route display and navigation
**And** NFR-UX-4 is satisfied (clear, actionable route display)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.6, lines 1582-1607)
- FRs: FR27, FR28, FR29
- NFRs: NFR-UX-4
