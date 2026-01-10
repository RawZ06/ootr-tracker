# Story 2.4: Create Import UI Component with File Upload

**Status:** review
**Epic:** 2 - Seed Import & Data Management
**Story ID:** 2.4
**Created:** 2026-01-10

---

## Story

As a developer,
I want an Import UI component allowing file upload,
So that users can import their spoiler.json files.

---

## Acceptance Criteria

**Given** the SpoilerParserService from Story 2.3
**When** I create the Import UI component
**Then** `src/app/shared/components/import-dialog/import-dialog.component.ts` exists
**And** component has file input accepting `.json` files
**And** component has "Import Spoiler" button
**And** component displays loading state while parsing (spinner/progress indicator)
**And** component is styled with PrimeNG (FileUpload) and Tailwind
**And** component can be opened via open() method
**And** component compiles and renders without errors
**And** NFR-UX-4 is addressed (intuitive file selection workflow)

---

## Dev Agent Record

### Completion Notes
- ✅ [import-dialog.component.ts](src/app/shared/components/import-dialog/import-dialog.component.ts:1) - Standalone component
- ✅ PrimeNG FileUpload with .json accept
- ✅ Loading state with ProgressSpinner
- ✅ Error display with PrimeNG Message
- ✅ Integrates MetadataService + SpoilerParserService
- ✅ Validation before parsing (FR4)
- ✅ TypeScript compilation verified
- ⏭️ State management integration in Story 2.5

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 2, Story 2.4, lines 759-779)
- FRs: FR1, FR4 (Import and validate)
- NFRs: NFR-UX-4 (Intuitive workflow)
