# Story 7.4: Integrate Save Warp as Free Teleportation Node

**Status:** ready-for-dev
**Epic:** 7 - Intelligent Pathfinding & Route Optimization
**Story ID:** 7.4
**Created:** 2026-01-10

---

## Story

As a player,
I want the pathfinding algorithm to consider Save Warp as a free teleportation option,
So that I get optimal routes using this game mechanic.

---

## Acceptance Criteria

**Given** the Dijkstra algorithm from Story 7.3
**When** I integrate Save Warp functionality
**Then** Save Warp is added as a special graph node accessible from ANY zone (FR26 free teleportation)
**And** Save Warp teleports to a predefined set of zones (configurable)
**And** Save Warp has cost 0 (free teleportation)
**And** pathfinding algorithm considers Save Warp routes when calculating optimal path
**And** if Save Warp provides a shorter route, it's included in the path
**And** Save Warp destinations are configurable in a constants file or configuration
**And** unit tests verify Save Warp integration (path using Save Warp vs direct path)
**And** Save Warp node is clearly identified in path results (e.g., "Zone A → **Save Warp** → Zone B")

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.4, lines 1539-1558)
- FRs: FR26
