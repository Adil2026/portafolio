# Tasks: ui-redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 800-1200 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (tokens + primitives) → PR 2 (sections) → PR 3 (content + a11y) |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Design tokens + 6 primitives | PR 1 | `npm run test -- src/components/ui/` | `npm run dev` (visual) | Revert app.css + ui/ |
| 2 | 5 section components | PR 2 | `npm run test -- src/components/sections/` | `npm run dev` (visual) | Revert sections/ |
| 3 | Content + a11y audit | PR 3 | `npm run test -- src/data/` | `npm run dev` + axe | Revert data/ + App.tsx |

## Phase 1: Foundation — Design Tokens & Primitives

- [x] 1.1 Install shadcn/ui: `npx shadcn@latest add button card` + dependencies (cva, tailwind-merge)
- [x] 1.2 Define @theme tokens in `src/app.css`: colors (OKLCH light/dark), spacing (4/8px), fluid typography (clamp), shadows, radii, motion tokens
- [x] 1.3 Create `src/components/ui/button.tsx` with cva variants (default/secondary/outline/ghost/destructive/link), sizes (default/sm/lg/icon), Slot/asChild, data-slot, forwardRef
- [x] 1.4 Create `src/components/ui/card.tsx` compound: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter with data-slot hooks
- [x] 1.5 Create `src/components/ui/section.tsx` with Container, aria-labelledby wiring, responsive padding tokens
- [x] 1.6 Create `src/components/ui/container.tsx` with size variants (sm/md/lg/xl/full), centered, container queries
- [x] 1.7 Create `src/components/ui/heading.tsx` polymorphic (as h1-h6), size variants mapped to fluid type tokens
- [x] 1.8 Create `src/components/ui/link.tsx` with underline-offset, hover:underline, focus ring, asChild support
- [x] 1.9 Write unit tests for primitives: variant output, Slot behavior, focus styles, data-slot presence
- [x] 1.10 Token compliance test: grep for arbitrary values (e.g., `p-[`, `text-[#`, `bg-[#`) in ui/ — must return zero matches
- [x] 1.11 Add @utility max-w-container-* utilities for token-compliant max-width
- [x] 1.12 axe-core integration: a11y tests for all primitives + full App
- [x] 1.13 WCAG AA contrast validation: compute ratios from OKLCH tokens

**✅ Phase 1 complete — PR #4 created: https://github.com/Adil2026/portafolio/pull/4**

## Phase 2: Core Implementation — Section Components

- [x] 2.1 Create `src/components/sections/Hero.tsx` using Section, Container, Heading, Link, CVLink; render personal data + i18n
- [x] 2.2 Create `src/components/sections/Projects.tsx` using Section, Container, Card; map Localized<Project>[] to grid (1/2/3 cols responsive)
- [x] 2.3 Create `src/components/sections/Skills.tsx` using Section, Container, Card; group skills by category, render level badges
- [x] 2.4 Create `src/components/sections/Experience.tsx` using Section, Container, Card; timeline layout, reverse-chron order
- [x] 2.5 Create `src/components/sections/Footer.tsx` using Section, Container, Heading, CVLink; copyright year + name from data, contacts, socials
- [x] 2.6 Update `src/App.tsx` to compose Hero, Projects, Skills, Experience, Footer; remove inline section markup
- [x] 2.7 Write unit tests for sections: data rendering, i18n switching, responsive classes, empty states
- [x] 2.8 Add i18n keys for hero.cta, hero.viewWork; update Personal type with email, phone, socials

**✅ Phase 2 complete — PR #X created: (pending push)**

## Phase 3: Content Integration & Accessibility

### PR3A — Content Integration (data + i18n) ✅
- [x] 3.1 Replace `src/data/projects.ts` placeholder with CV-backed projects (problem, dataAndContext, stack[], role, outcome, repoUrl?, demoUrl?)
- [x] 3.2 Replace `src/data/skills.ts` placeholder with CV-backed skills (name, category, level)
- [x] 3.3 Replace `src/data/experience.ts` placeholder with CV-backed experience (role, company, period, highlights[])
- [x] 3.4 Extend `src/lib/i18n/types.ts` Dictionary with new keys: projects, skills, experience fields, hero summary/cta, footer
- [x] 3.5 Add ES translations in `src/lib/i18n/es.ts` for all new keys
- [x] 3.6 Add EN translations in `src/lib/i18n/en.ts` for all new keys
- [x] 3.7 TypeScript compile check: `npm run typecheck` — must pass with zero missing locale keys

### PR3B — Accessibility Polish ✅
- [x] 3.8 Accessibility audit: run axe-core on all components/pages; fix violations (contrast, focus, landmarks, ARIA)
  - Added explicit axe tests for Projects, Skills, Experience, Footer sections
  - All 141 tests pass (137 original + 4 new section a11y tests)
  - Full App axe test passes
- [x] 3.9 Responsive QA: verified responsive grid patterns at all breakpoints
  - Projects: 1 col (<640px) / 2 cols (640-1024px) / 3 cols (>1024px)
  - Skills: 1 col (<1024px) / 3 cols (>1024px)
  - Experience: single-column timeline (appropriate for all sizes)
  - Footer: stacked on mobile, horizontal on desktop
  - Touch targets use min-w-button-sm (160px) for buttons
- [x] 3.10 LCP budget check: `npm run build` + preview analysis
  - Bundle: 250 kB JS (77 kB gzipped) — well within budget
  - CSS: 26 kB (5.4 kB gzipped)
  - No heavy deps (no animation libs, no heavy UI frameworks)
  - Critical CSS inlined via Vite + Tailwind v4 @theme

## Phase 4: Verification & Polish

- [ ] 4.1 Full test suite: `npm run test` — all unit + component + a11y tests pass
- [ ] 4.2 Typecheck: `npm run typecheck` — zero errors
- [ ] 4.3 Lint: `npm run lint` — zero warnings
- [ ] 4.4 Build: `npm run build` — succeeds
- [ ] 4.5 CI simulation: run GitHub Actions workflow locally (act or push test branch)
- [ ] 4.6 Update README with component usage notes (optional)