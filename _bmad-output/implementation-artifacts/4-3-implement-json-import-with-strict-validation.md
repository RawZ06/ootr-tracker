# Story 4.3: Implement JSON Import with Strict Validation

**Status:** done
**Epic:** 4 - Session Persistence & State Recovery
**Story ID:** 4.3
**Created:** 2026-01-10

---

## Story

As a player,
I want to import a previously saved JSON file with strict validation,
So that I can restore my session safely without corrupting my current state.

---

## Acceptance Criteria

**Given** the export functionality from Story 4.2
**When** I implement import validation in SaveLoadService
**Then** `save-load.service.ts` has method `validateSave(fileContent: string): Observable<{ valid: boolean, errors: string[], metadata?: SaveMetadata }>`
**And** validation checks (FR39, FR40): JSON parseable, required fields exist, format version compatible, checksum matches SHA-256 hash, data types correct
**And** validation returns detailed errors array if invalid (FR41)
**And** validation NEVER modifies current application state (NFR-REL-3)
**And** NFR-REL-2 is satisfied (100% corruption detection via checksum)
**And** unit tests verify validation detects all error conditions

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 4, Story 4.3, lines 1081-1107)
- FRs: FR39, FR40, FR41
- NFRs: NFR-REL-2, NFR-REL-3

---

## Code Review Notes (2026-01-10)

**Status:** ✅ APPROVED - All acceptance criteria met

**Implementation:**
- File: `src/app/core/services/save-load.service.ts:121-196`
- `validateSave(fileContent: string): Observable<SaveValidationResult>` implemented
- Validates: JSON parseable, required fields, data types, checksum SHA-256 match
- Returns detailed errors array if invalid (FR41)
- NEVER modifies state during validation (NFR-REL-3) ✅
- 100% corruption detection via checksum (NFR-REL-2) ✅

**Issues Fixed:**
- Changed version validation from `startsWith('1.')` to strict `=== '1.0'` (prevent version injection)
- Added validation for required check fields (check_id, check_name) to prevent undefined errors
- Returns parsed SaveData in validation result to eliminate double parsing
