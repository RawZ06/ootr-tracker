# Story 6.5: Implement Decoupled Entrance Mode Configuration

**Status:** ready-for-dev
**Epic:** 6 - Entrance Tracking & Shuffle Navigation
**Story ID:** 6.5
**Created:** 2026-01-10

---

## Story

As a player,
I want to configure decoupled entrance mode for bidirectional vs unidirectional entrances,
So that I can handle different randomizer settings.

---

## Acceptance Criteria

**Given** the entrance recording from Stories 6.1-6.4
**When** I toggle "Decoupled Entrances" setting
**Then** setting is stored in StateManagementService and persists via localStorage (FR20)
**And** when Decoupled Mode is ON (bidirectional): Recording "Zone A → Zone B" does NOT automatically create reverse, both directions must be recorded separately, auto-reducing selector allows same zone to be "from" multiple times
**And** when Decoupled Mode is OFF (unidirectional/coupled): Recording "Zone A → Zone B" assumes reverse is symmetric, auto-reducing selector removes zone from "from" list after first use
**And** setting toggle is clearly labeled in UI (checkbox or switch)
**And** tooltip or help text explains the difference
**And** unit tests verify decoupled mode behavior
**And** default mode is ON (decoupled/bidirectional) per OOT Randomizer standard

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 6, Story 6.5, lines 1407-1430)
- FRs: FR20
