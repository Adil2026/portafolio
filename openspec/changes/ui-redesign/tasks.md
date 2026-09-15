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

- [ ] 2.1 Create `src/components/sections/Hero.tsx` using Section, Container, Heading, Link, CVLink; render personal data + i18n
- [ ] 2.2 Create `src/components/sections/Projects.tsx` using Section, Container, Card; map Localized<Project>[] to grid (1/2/3 cols responsive)
- [ ] 2.3 Create `src/components/sections/Skills.tsx` using Section, Container, Card; group skills by category, render level badges
- [ ] 2.4 Create `src/components/sections/Experience.tsx` using Section, Container, Card; timeline layout, reverse-chron order
- [ ] 2.5 Create `src/components/sections/Footer.tsx` using Section, Container, Link, CVLink; copyright year + name from data, contacts, socials
- [ ] 2.6 Update `src/App.tsx` to compose Hero, Projects, Skills, Experience, Footer; remove inline section markup
- [ ] 2.7 Write unit tests for sections: data rendering, i18n switching, responsive classes, empty states

## Phase 3: Content Integration & Accessibility

- [ ] 3.1 Replace `src/data/projects.ts` placeholder with CV-backed projects (problem, dataAndContext, stack[], role, outcome, repoUrl?, demoUrl?)
- [ ] 3.2 Replace `src/data/skills.ts` placeholder with CV-backed skills (name, category, level)
- [ ] 3.3 Replace `src/data/experience.ts` placeholder with CV-backed experience (role, company, period, highlights[])
- [ ] 3.4 Extend `src/lib/i18n/types.ts` Dictionary with new keys: projects, skills, experience fields, hero summary/cta, footer
- [ ] 3.5 Add ES translations in `src/lib/i18n/es.ts` for all new keys
- [ ] 3.6 Add EN translations in `src/lib/i18n/en.ts` for all new keys
- [ ] 3.7 TypeScript compile check: `npm run typecheck` — must pass with zero missing locale keys
- [ ] 3.8 Accessibility audit: run axe-core on all components/pages; fix violations (contrast, focus, landmarks, ARIA)
- [ ] 3.9 Responsive QA: verify at 320px, 768px, 1024px, 1440px; no horizontal overflow, touch targets ≥44px
- [ ] 3.10 LCP budget check: `npm run build` + preview; ensure no heavy deps, critical CSS inlined

## Phase 4: Verification & Polish

- [ ] 4.1 Full test suite: `npm run test` — all unit + component + a11y tests pass
- [ ] 4.2 Typecheck: `npm run typecheck` — zero errors
- [ ] 4.3 Lint: `npm run lint` — zero warnings
- [ ] 4.4 Build: `npm run build` — succeeds
- [ ] 4.5 CI simulation: run GitHub Actions workflow locally (act or push test branch)
- [ ] 4.6 Update README with component usage notes (optional)