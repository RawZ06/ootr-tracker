# Story 4.4: Implement State Restoration with TypeScript Mapping

**Status:** ready-for-dev
**Epic:** 4 - Session Persistence & State Recovery
**Story ID:** 4.4
**Created:** 2026-01-10

---

## Story

As a player,
I want imported save data to restore my exact state,
So that I can continue my session exactly where I left off.

---

## Acceptance Criteria

**Given** a valid save file passing validation from Story 4.3
**When** I implement state restoration in SaveLoadService
**Then** `save-load.service.ts` has method `importSave(saveData: SaveData): Observable<void>`
**And** method maps JSON snake_case to TypeScript camelCase
**And** method restores state to StateManagementService (checks with isDone status, entrances with timestamps, filters state)
**And** restoration achieves 100% data fidelity (NFR-REL-1 - zero loss)
**And** restored state matches exported state exactly (unit tests compare before/after)
**And** method updates StateManagementService using immutable patterns
**And** unit tests verify complete state restoration with 3000 checks
**And** NFR-COMPAT-7 is satisfied (JSON portable across OS)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 4, Story 4.4, lines 1109-1134)
- FRs: FR38
- NFRs: NFR-REL-1, NFR-COMPAT-7
