# Story 5.3: Create Theme Toggle UI Component

**Status:** ready-for-dev
**Epic:** 5 - Theme System & Extended Sessions
**Story ID:** 5.3
**Created:** 2026-01-10

---

## Story

As a player,
I want a visible toggle to switch between Dark and Light modes,
So that I can easily change themes based on my environment and comfort.

---

## Acceptance Criteria

**Given** the ThemeService with persistence from Story 5.2
**When** I create the theme toggle UI
**Then** a theme toggle button/switch exists in the application header (visible on all routes)
**And** toggle clearly indicates current theme (e.g., moon icon for Dark, sun icon for Light)
**And** clicking toggle calls ThemeService.toggleTheme() (FR44)
**And** theme changes immediately without flash or flicker (<50ms - NFR-PERF-5)
**And** toggle is styled with PrimeNG (ToggleButton or InputSwitch) and Tailwind
**And** toggle is keyboard accessible (Space/Enter to toggle)
**And** current theme persists after toggle (localStorage updated via Story 5.2)
**And** all application components respect theme (PrimeNG components + custom components use CSS variables)
**And** contrast is sufficient for extended gameplay (NFR-UX-2): Dark mode no eye strain, Light mode clear visibility
**And** unit tests verify toggle UI triggers theme change
**And** visual test confirms both themes display correctly across all routes

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 5, Story 5.3, lines 1274-1298)
- FRs: FR44, FR45
- NFRs: NFR-PERF-5, NFR-UX-2
