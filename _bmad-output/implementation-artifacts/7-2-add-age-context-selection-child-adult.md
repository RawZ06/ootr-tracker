# Story 7.2: Add Age Context Selection (Child/Adult)

**Status:** ready-for-dev
**Epic:** 7 - Intelligent Pathfinding & Route Optimization
**Story ID:** 7.2
**Created:** 2026-01-10

---

## Story

As a player,
I want to specify my current age context (Child or Adult),
So that pathfinding only suggests routes accessible with my current age.

---

## Acceptance Criteria

**Given** the pathfinding interface from Story 7.1
**When** I add age context selection
**Then** interface includes age selector with options: "Child" and "Adult" (FR24)
**And** age selector is implemented as radio buttons or toggle switch
**And** age context is stored in pathfinding state (default: Adult)
**And** age selector is clearly labeled: "Current Age Context"
**And** tooltip or help text explains: "Some zones are only accessible as Child or Adult"
**And** age context will be used by Dijkstra algorithm (Story 7.3) to filter accessible zones
**And** unit tests verify age context selection
**And** UI clearly indicates selected age

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.2, lines 1493-1512)
- FRs: FR24
