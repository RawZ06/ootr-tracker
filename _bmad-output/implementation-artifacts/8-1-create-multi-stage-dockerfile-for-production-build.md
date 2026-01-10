# Story 8.1: Create Multi-Stage Dockerfile for Production Build

**Status:** done
**Epic:** 8 - Production Deployment & DevOps Pipeline
**Story ID:** 8.1
**Created:** 2026-01-10

---

## Story

As a developer,
I want a multi-stage Dockerfile optimized for production,
So that the application can be deployed as a lightweight container.

---

## Acceptance Criteria

**Given** the Angular project from Epic 1
**When** I create the Dockerfile
**Then** `Dockerfile` exists at project root with multi-stage build:
- **Stage 1 (builder):** FROM node:20-alpine, Install pnpm globally, Copy package files, Run `pnpm install --frozen-lockfile`, Copy source files, Run production build
- **Stage 2 (serve):** FROM nginx:alpine, Copy built files from builder, Copy nginx.conf, Expose port 80
**And** `.dockerignore` exists excluding: node_modules, dist, .git, *.md, tests
**And** `docker build -t notesallsanity:latest .` completes successfully
**And** built image size is optimized (<100MB for nginx stage)
**And** container runs and serves application on port 80

---

## Tasks / Subtasks

- [x] Create Dockerfile with multi-stage build (builder + nginx)
- [x] Create .dockerignore file
- [x] Create nginx.conf for SPA routing
- [x] Verify Docker build completes successfully

---

## Dev Agent Record

### Implementation Plan
- Created multi-stage Dockerfile following architecture.md specs
- Stage 1: node:20-alpine builder with pnpm
- Stage 2: nginx:alpine serving from /usr/share/nginx/html
- Created .dockerignore excluding node_modules, dist, _bmad, etc.
- Created nginx.conf with SPA routing (try_files $uri $uri/ /index.html)

### Completion Notes
- ✅ Dockerfile created: [Dockerfile](Dockerfile)
- ✅ .dockerignore created: [.dockerignore](.dockerignore)
- ✅ nginx.conf created: [nginx.conf](nginx.conf)
- ✅ Docker build successful: `docker build -t notesallsanity:test .` (verified 2026-01-10)
- ✅ Image size optimized: 62.3MB (well below 100MB requirement)
- ✅ Container tested: Runs and serves on port 80 (verified with curl)
- ✅ Build output: `/app/dist/NotesAllSanity/browser` (PascalCase from angular.json)
- Note: Files follow project-context.md specifications exactly

### Code Review Fixes Applied (2026-01-10)
- ✅ Added security headers to nginx.conf (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy)
- ✅ Added /health endpoint for Dokploy monitoring
- ✅ Improved .dockerignore (added .vscode, .idea, *.swp, *.swo, .npmrc, .yarnrc)
- ✅ Made .md exclusion more selective (keeps README.md)
- ✅ Docker build verified: 62.3MB, serves correctly on port 80

---

## File List

- `Dockerfile` (created)
- `.dockerignore` (created)
- `nginx.conf` (created)

---

## Change Log

- 2026-01-10: Created Dockerfile, .dockerignore, nginx.conf for production deployment
- 2026-01-10: Code review fixes - Added security headers, /health endpoint, improved .dockerignore

---

## Reference

- Source: `_bmad-output/planning-artifacts/epics.md` (Epic 8, Story 8.1, lines 1651-1677)
