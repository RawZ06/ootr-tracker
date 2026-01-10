# Story 2.3: Implement Spoiler Parser Service

**Status:** done

### Code Review (2026-01-10)
- ✅ parseSpoiler() and validateFormat() fully implemented
- ✅ FR2, FR3, FR49 requirements satisfied
- ✅ Proper error handling with Observable pattern
- ✅ Uses MetadataService for enrichment
**Epic:** 2 - Seed Import & Data Management
**Story ID:** 2.3
**Created:** 2026-01-10

---

## Story

As a developer,
I want a SpoilerParserService that parses spoiler.json and extracts checks and entrances,
So that I can load OOT Randomizer spoiler files.

---

## Acceptance Criteria

**Given** the models and MetadataService from Stories 2.1-2.2
**When** I implement SpoilerParserService
**Then** `spoiler-parser.service.ts` has method `parseSpoiler(fileContent: string): Observable<{ checks: Check[], entrances: Entrance[] }>`
**And** method `validateFormat(fileContent: string): { valid: boolean, errors: string[] }` checks JSON structure (FR4)
**And** parser extracts check names from spoiler.json (FR2)
**And** parser extracts entrance mappings from spoiler.json (FR3)
**And** parser enriches checks with metadata via MetadataService (FR49)
**And** parser handles malformed JSON gracefully with detailed error messages (NFR-REL-6, NFR-UX-5)
**And** unit tests verify parsing with sample spoiler.json (at least 20 checks, 5 entrances)
**And** unit tests verify format validation rejects invalid JSON (FR4)

---

## Tasks / Subtasks

- [ ] Implement parseSpoiler() method
- [ ] Implement validateFormat() with JSON validation
- [ ] Extract check data from spoiler.json (FR2)
- [ ] Extract entrance mappings (FR3)
- [ ] Enrich checks with metadata (FR49)
- [ ] Implement graceful error handling (NFR-REL-6)
- [ ] Create sample spoiler.json for testing
- [ ] Write comprehensive unit tests

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 2, Story 2.3, lines 738-757)
- FRs: FR2, FR3, FR4, FR49 (Parse and validate spoiler.json)
- NFRs: NFR-REL-6, NFR-UX-5 (Error handling)

## Dev Agent Record

### Completion Notes
- ✅ [spoiler-parser.service.ts](src/app/core/services/spoiler-parser.service.ts:1) - Complete implementation
- ✅ parseSpoiler() method extracts checks + entrances
- ✅ validateFormat() with JSON validation (FR4)
- ✅ Enriches checks with metadata via MetadataService (FR49)
- ✅ Graceful error handling with detailed messages
- ✅ TypeScript compilation verified
