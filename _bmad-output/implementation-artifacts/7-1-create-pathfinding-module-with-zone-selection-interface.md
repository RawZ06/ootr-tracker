# Story 7.1: Create Pathfinding Module with Zone Selection Interface

**Status:** ready-for-dev
**Epic:** 7 - Intelligent Pathfinding & Route Optimization
**Story ID:** 7.1
**Created:** 2026-01-10

---

## Story

As a player,
I want to select starting and destination zones for pathfinding,
So that I can plan my route between two locations.

---

## Acceptance Criteria

**Given** the project structure from Epic 1
**When** I navigate to `/pathfinding` route
**Then** Pathfinding module component displays with interface containing: "Starting Zone" dropdown selector (FR22), "Destination Zone" dropdown selector (FR23), "Calculate Route" button
**And** zone dropdowns are populated from check metadata (all unique zones)
**And** starting zone can optionally default to last visited zone
**And** component is lazy-loaded via routing from Epic 1
**And** OnPush change detection strategy used
**And** interface is styled with PrimeNG (Dropdown) and Tailwind
**And** unit tests verify zone selection interface
**And** NFR-UX-4 is addressed (clear, intuitive UI)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.1, lines 1470-1491)
- FRs: FR22, FR23
- NFRs: NFR-UX-4
