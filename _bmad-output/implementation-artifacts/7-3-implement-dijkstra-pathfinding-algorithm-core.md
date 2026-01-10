# Story 7.3: Implement Dijkstra Pathfinding Algorithm Core

**Status:** ready-for-dev
**Epic:** 7 - Intelligent Pathfinding & Route Optimization
**Story ID:** 7.3
**Created:** 2026-01-10

---

## Story

As a developer,
I want a Dijkstra algorithm implementation that calculates optimal paths using recorded entrances,
So that the pathfinding service can find routes between zones.

---

## Acceptance Criteria

**Given** recorded entrances from Epic 6 and age context from Story 7.2
**When** I implement the core Dijkstra algorithm in PathfindingService
**Then** `pathfinding.service.ts` has method `calculatePath(start: string, destination: string, age: 'Child' | 'Adult', entrances: Entrance[]): PathResult`
**And** algorithm builds a graph from recorded entrances (FR25 uses recorded entrances)
**And** algorithm filters entrances based on age context (FR24 - some zones age-restricted)
**And** algorithm uses Dijkstra shortest path algorithm (not BFS/DFS - optimal path required)
**And** algorithm returns PathResult containing: path array, found boolean, distance number
**And** if no path exists, returns `{ found: false }` (FR29 indicator)
**And** algorithm completes within 2 seconds for typical entrance graphs (NFR-PERF-2)
**And** unit tests verify Dijkstra correctness with sample graphs
**And** unit tests verify age filtering

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.3, lines 1514-1537)
- FRs: FR24, FR25, FR29
- NFRs: NFR-PERF-2
