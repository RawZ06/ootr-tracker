# Story 4.5: Create Export UI with Download Functionality

**Status:** done
**Epic:** 4 - Session Persistence & State Recovery
**Story ID:** 4.5
**Created:** 2026-01-10

---

## Story

As a player,
I want a clear export button that downloads my save file,
So that I can easily save my progress.

---

## Acceptance Criteria

**Given** the export functionality from Story 4.2
**When** I create the export UI
**Then** an "Export Save" button exists in the application header or menu
**And** clicking the button triggers SaveLoadService.exportSave()
**And** file downloads automatically with filename format: `notesallsanity-save-{YYYY-MM-DD}.json`
**And** a success message displays: "Save exported successfully - X checks, Y entrances saved"
**And** loading indicator shows during export generation (if processing takes >100ms)
**And** button is styled with PrimeNG Button component and Tailwind
**And** export works on Chrome, Firefox, Edge, Safari (NFR-COMPAT-7)
**And** unit tests verify export download triggers correctly

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 4, Story 4.5, lines 1136-1155)
- FRs: FR37
- NFRs: NFR-COMPAT-7

---

## Code Review Notes (2026-01-10)

**Status:** ✅ APPROVED - All acceptance criteria met

**Implementation:**
- File: `src/app/app.ts:77-95`, `src/app/app.html:53-59`
- "Export Save" button in header with PrimeNG styling
- Triggers SaveLoadService.exportSave()
- File downloads with format `notesallsanity-save-{YYYY-MM-DD}.json` ✅
- Success message displays with check/entrance counts ✅
- Auto-hides after 5 seconds
- Works cross-browser (NFR-COMPAT-7) ✅

**Issues Fixed:**
- Added success message "Save exported successfully - X checks, Y entrances saved" (was missing)
- Added success toast in app.html with green p-message
- Fixed app.spec.ts tests (renamed onButtonClick → exportSave)
