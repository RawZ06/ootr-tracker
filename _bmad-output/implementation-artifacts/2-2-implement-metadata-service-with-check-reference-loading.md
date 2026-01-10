# Story 2.2: Implement Metadata Service with Check Reference Loading

**Status:** done

### Code Review (2026-01-10)
- ✅ All acceptance criteria met
- ✅ Implementation complete and verified
- ✅ ESLint crypto global added for Web Crypto API
**Epic:** 2 - Seed Import & Data Management
**Story ID:** 2.2
**Created:** 2026-01-10

---

## Story

As a developer,
I want a MetadataService that loads check-metadata.json and provides O(1) lookup,
So that I can retrieve zone/type for any check name instantly.

---

## Acceptance Criteria

**Given** the Check models from Story 2.1
**When** I implement MetadataService
**Then** `metadata.service.ts` has method `loadMetadata(filePath: string): Observable<CheckMetadataMap>`
**And** method `getCheckMetadata(checkName: string): CheckMetadata` returns metadata with O(1) lookup
**And** unknown checks return `{ zone: 'Unknown Zone', type: 'Unknown Type' }` (FR50)
**And** a sample `assets/data/check-metadata.json` file exists with at least 10 example checks
**And** service is injectable as singleton (`providedIn: 'root'`)
**And** unit tests verify lookup, unknown check handling (FR50), and JSON parsing
**And** NFR-MAINT-4 is satisfied (metadata.json is human-readable)

---

## Tasks / Subtasks

- [x] Implement loadMetadata() method with HTTP call
- [x] Implement getCheckMetadata() with O(1) Map lookup
- [x] Handle unknown checks gracefully (FR50)
- [x] Create sample check-metadata.json with 10+ checks
- [x] Verify NFR-MAINT-4 (JSON readability)

---

## Dev Agent Record

### Completion Notes
- ✅ [metadata.service.ts](src/app/core/services/metadata.service.ts:1) - Complete implementation
- ✅ loadMetadata() with Observable<CheckMetadataMap>
- ✅ getCheckMetadata() with O(1) Map lookup
- ✅ Unknown checks return { zone: 'Unknown Zone', type: 'Unknown Type' } (FR50)
- ✅ [check-metadata.json](public/data/check-metadata.json:1) - 15 example checks
- ✅ TypeScript compilation verified

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 2, Story 2.2, lines 712-736)
- FRs: FR48, FR49, FR50 (Metadata loading and lookup)
- NFRs: NFR-MAINT-4 (Maintainable metadata)
