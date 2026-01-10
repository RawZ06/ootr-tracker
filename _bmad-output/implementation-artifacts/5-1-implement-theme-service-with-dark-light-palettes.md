# Story 5.1: Implement Theme Service with Dark/Light Palettes

**Status:** ready-for-dev
**Epic:** 5 - Theme System & Extended Sessions
**Story ID:** 5.1
**Created:** 2026-01-10

---

## Story

As a developer,
I want a ThemeService managing Dark and Light theme palettes,
So that the application can switch themes programmatically.

---

## Acceptance Criteria

**Given** the core services skeleton from Epic 1
**When** I implement ThemeService
**Then** `theme.service.ts` has enum `Theme { DARK = 'dark', LIGHT = 'light' }`
**And** service has BehaviorSubject `private currentThemeSubject = new BehaviorSubject<Theme>(Theme.DARK)`
**And** service has public observable `currentTheme$ = this.currentThemeSubject.asObservable()`
**And** service has method `setTheme(theme: Theme): void` that updates subject and applies CSS class to document body
**And** service has method `toggleTheme(): void` that switches between Dark and Light
**And** Dark and Light CSS palettes are defined in `styles.css` with sufficient contrast (NFR-UX-2)
**And** service is injectable as singleton (`providedIn: 'root'`)
**And** unit tests verify theme switching logic

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 5, Story 5.1, lines 1223-1245)
- FRs: FR44
- NFRs: NFR-UX-2 (Sufficient contrast)
