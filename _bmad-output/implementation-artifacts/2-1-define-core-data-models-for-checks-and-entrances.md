# Story 2.1: Define Core Data Models for Checks and Entrances

**Status:** done

### Code Review (2026-01-10)
- ✅ All acceptance criteria met
- ✅ Implementation complete and verified
- ✅ ESLint crypto global added for Web Crypto API
**Epic:** 2 - Seed Import & Data Management
**Story ID:** 2.1
**Created:** 2026-01-10

---

## Story

As a developer,
I want TypeScript interfaces defined for Check, Entrance, and related data structures,
So that I have type-safe models for spoiler.json parsing.

---

## Acceptance Criteria

**Given** the project structure from Epic 1
**When** I create the data models
**Then** `src/app/models/check.model.ts` exists with interfaces:
- `Check` (id: string, name: string, zone?: string, type?: string, isDone: boolean, completedAt?: string)
- `CheckMetadata` (zone: string, type: string)
- `CheckMetadataMap` (index signature: [checkName: string]: CheckMetadata)
**And** `src/app/models/entrance.model.ts` exists with interfaces:
- `Entrance` (from: string, to: string, discoveredAt: string, id?: string)
- `EntranceMapping` (format pour spoiler.json si nécessaire)
**And** `src/app/models/spoiler.model.ts` exists with interfaces:
- `SpoilerData` (structure parsing spoiler.json)
**And** all models use snake_case for JSON mapping compatibility (documented in comments)
**And** all files compile without TypeScript errors
**And** NFR-MAINT-3 is satisfied (strict mode types)

---

## Tasks / Subtasks

- [x] Create check.model.ts with all Check-related interfaces
- [x] Create entrance.model.ts with Entrance interfaces
- [x] Create spoiler.model.ts for spoiler.json structure
- [x] Document snake_case ↔ camelCase mapping in comments
- [x] Verify TypeScript compilation with strict mode

---

## Dev Agent Record

### Completion Notes
- ✅ [check.model.ts](src/app/models/check.model.ts:1) - Check, CheckMetadata, CheckMetadataMap
- ✅ [entrance.model.ts](src/app/models/entrance.model.ts:1) - Entrance, EntranceMapping
- ✅ [spoiler.model.ts](src/app/models/spoiler.model.ts:1) - SpoilerData, LocationsMap, EntrancesMap
- ✅ snake_case ↔ camelCase mapping documented
- ✅ TypeScript compilation verified (strict mode)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 2, Story 2.1, lines 688-710)
- FRs: Infrastructure for FR1-FR5, FR48-FR51
- NFRs: NFR-MAINT-3 (TypeScript strict mode)
