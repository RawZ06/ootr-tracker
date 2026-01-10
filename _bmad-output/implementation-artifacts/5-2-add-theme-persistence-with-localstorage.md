# Story 5.2: Add Theme Persistence with localStorage

**Status:** ready-for-dev
**Epic:** 5 - Theme System & Extended Sessions
**Story ID:** 5.2
**Created:** 2026-01-10

---

## Story

As a player,
I want my selected theme to persist across browser sessions,
So that I don't have to reselect my preferred theme every time.

---

## Acceptance Criteria

**Given** the ThemeService from Story 5.1
**When** I add persistence functionality
**Then** ThemeService has method `loadThemeFromStorage(): Theme` that reads from localStorage
**And** ThemeService has method `saveThemeToStorage(theme: Theme): void` that saves to localStorage
**And** `setTheme()` method calls `saveThemeToStorage()` automatically (FR45)
**And** on service initialization, saved theme is loaded and applied automatically
**And** theme persists across: Browser refresh, Close and reopen browser, Different tabs (same origin)
**And** optional: detect system theme preference on first load
**And** unit tests verify localStorage persistence
**And** NFR-PERF-5 is satisfied (toggle instantaneous <50ms)

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 5, Story 5.2, lines 1247-1272)
- FRs: FR45
- NFRs: NFR-PERF-5
