# Story 4.1: Define Save Data JSON Format with snake_case Convention

**Status:** ready-for-dev
**Epic:** 4 - Session Persistence & State Recovery
**Story ID:** 4.1
**Created:** 2026-01-10

---

## Story

As a developer,
I want a clearly defined save data JSON structure using snake_case,
So that save files are consistent with OOT Randomizer spoiler.json format.

---

## Acceptance Criteria

**Given** the project models from previous epics
**When** I define the save data format
**Then** `src/app/models/save-data.model.ts` exists with interfaces:
- `SaveData` with properties (all snake_case): version, save_date, checksum, checks, entrances, filters, metadata
- `CheckState` with properties: check_id, is_done, completed_at
- `EntranceState` with properties: entrance_from, entrance_to, discovered_at
- `SaveMetadata` with properties: seed_name, total_checks, completed_checks
**And** TypeScript interfaces document snake_case ↔ camelCase mapping in comments
**And** all interfaces compile without errors
**And** format is designed to be <5MB for 3000 checks (NFR-REL-4)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 4, Story 4.1, lines 1026-1051)
- NFRs: NFR-REL-4 (JSON <5MB)
