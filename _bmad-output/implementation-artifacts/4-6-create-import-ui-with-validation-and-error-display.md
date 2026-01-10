# Story 4.6: Create Import UI with Validation and Error Display

**Status:** done
**Epic:** 4 - Session Persistence & State Recovery
**Story ID:** 4.6
**Created:** 2026-01-10

---

## Story

As a player,
I want to import a save file with clear validation feedback,
So that I know if my save file is valid before loading it.

---

## Acceptance Criteria

**Given** the validation and import from Stories 4.3-4.4
**When** I create the import UI
**Then** an "Import Save" button exists in the application header or menu
**And** clicking button opens file picker accepting `.json` files
**And** after file selection, validation runs automatically (FR39)
**And** if validation succeeds, confirmation dialog displays save metadata (FR43): Save date, Total checks count, Completed checks count, "Load this save?" confirmation
**And** if validation fails, error dialog displays all validation errors (FR41, NFR-UX-5) with clear, actionable messages
**And** user must explicitly confirm before state is restored (NFR-REL-3 protection)
**And** loading indicator shows during validation and import
**And** unit tests verify UI validation flow and error display

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 4, Story 4.6, lines 1157-1183)
- FRs: FR39, FR41, FR43
- NFRs: NFR-REL-3, NFR-UX-5

---

## Code Review Notes (2026-01-10)

**Status:** ✅ APPROVED - All acceptance criteria met

**Implementation:**
- File: `src/app/app.ts:103-147`, `src/app/app.html:60-66, 90-152`
- "Import Save" button in header
- Opens file picker for .json files ✅
- Validation runs automatically (FR39) ✅
- Success: Confirmation dialog with save metadata (date, checks count) (FR43) ✅
- Failure: Error dialog with all validation errors (FR41, NFR-UX-5) ✅
- Explicit confirmation required before restore (NFR-REL-3) ✅
- Loading indicator during validation ✅

**Issues Fixed:**
- Eliminated double JSON parsing (now uses result.saveData from validation)
- Added FileReader.onerror handler (was missing)
- Changed warning from plain text to p-message severity="warn" for better visibility
- Added setTimeout to eslint globals
