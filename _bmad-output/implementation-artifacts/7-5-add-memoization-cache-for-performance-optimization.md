# Story 7.5: Add Memoization Cache for Performance Optimization

**Status:** ready-for-dev
**Epic:** 7 - Intelligent Pathfinding & Route Optimization
**Story ID:** 7.5
**Created:** 2026-01-10

---

## Story

As a developer,
I want pathfinding results cached with memoization,
So that repeated calculations complete instantly and meet the <2s performance requirement.

---

## Acceptance Criteria

**Given** the pathfinding algorithm from Stories 7.3-7.4
**When** I add memoization caching
**Then** PathfindingService maintains a cache Map keyed by `${start}-${destination}-${age}`
**And** before running Dijkstra, service checks cache for existing result
**And** if cached result exists and entrances haven't changed, return cached result immediately (<10ms)
**And** if entrances change (new entrance recorded, entrance deleted), cache is invalidated
**And** cache invalidation listens to StateManagementService.entrances$ observable
**And** pathfinding with cache hit completes <50ms (instant to user)
**And** pathfinding without cache completes <2s (NFR-PERF-2 satisfied)
**And** unit tests verify cache hit/miss logic
**And** unit tests verify cache invalidation on entrance changes

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.5, lines 1560-1580)
- NFRs: NFR-PERF-2
