# Story 4.2: Implement JSON Export with SHA-256 Checksum

**Status:** ready-for-dev
**Epic:** 4 - Session Persistence & State Recovery
**Story ID:** 4.2
**Created:** 2026-01-10

---

## Story

As a player,
I want to export my complete progress to a JSON file with integrity checksum,
So that I can save my session safely.

---

## Acceptance Criteria

**Given** the save data format from Story 4.1
**When** I implement export in SaveLoadService
**Then** `save-load.service.ts` has method `exportSave(): Observable<Blob>`
**And** method collects all state from StateManagementService (checks, entrances, filters, stats) (FR42)
**And** method maps TypeScript camelCase to JSON snake_case
**And** method calculates SHA-256 checksum using Web Crypto API
**And** method generates SaveData object with version, save_date, checksum, all state
**And** method returns JSON Blob ready for download (FR37)
**And** exported JSON file size is <5MB for 3000 checks (NFR-REL-4)
**And** unit tests verify export generates valid JSON with checksum

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 4, Story 4.2, lines 1053-1079)
- FRs: FR37, FR42
- NFRs: NFR-REL-4
