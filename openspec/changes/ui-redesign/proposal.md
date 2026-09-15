# Proposal: ui-redesign

## Intent

Redesign the portfolio UI with a professional, data-engineering aesthetic: design tokens, accessible primitive components, composed section components, CV-backed content integration, and WCAG 2.1 AA compliance. Current state has no design tokens, only one UI component (CVLink), placeholder content, and no component library.

## Scope

### In Scope
- Design tokens in Tailwind v4 `@theme` (colors OKLCH, spacing 4/8px, fluid typography clamp, shadows, radii, motion)
- Primitive components: Button, Card, Section, Container, Heading, Link
- Section components: Hero, Projects, Skills, Experience, Footer
- Content integration: replace placeholders with CV-backed data (bilingual ES/EN)
- Accessibility audit & fixes (WCAG 2.1 AA)
- Responsive QA (breakpoint matrix, token compliance tests)

### Out of Scope
- Blog/CMS (constitution §9)
- Authentication/login (constitution §9)
- Multi-theme support (constitution §9)
- Complex SSR/ISR (constitution §9)
- Animation library decision deferred to design phase

## Capabilities

### New Capabilities
- `design-tokens`: Semantic design tokens via Tailwind v4 @theme
- `primitive-components`: Accessible UI primitives (Button, Card, Section, Container, Heading, Link)
- `section-components`: Composed portfolio sections (Hero, Projects, Skills, Experience, Footer)
- `content-integration`: CV-backed data rendering with bilingual enforcement

### Modified Capabilities
- `site-identity`: Update hero/footer to use new primitives and tokens

## Approach

Install shadcn/ui as foundation for accessible primitives (Radix-based, WCAG 2.1 AA compliant). Extend with custom primitives where needed. Define minimal semantic token set in `@theme`. Compose sections from primitives using compound component patterns. Integrate CV data with strict bilingual enforcement. Include dark mode from start (consumer-facing portfolio expectation). Use CSS-only motion tokens (no Framer Motion) for performance and simplicity.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app.css` | Modified | Add @theme design tokens |
| `src/components/ui/` | New | Primitive components (Button, Card, Section, Container, Heading, Link) |
| `src/components/sections/` | New | Section components (Hero, Projects, Skills, Experience, Footer) |
| `src/data/projects.ts` | Modified | Replace placeholder with CV-backed projects |
| `src/data/skills.ts` | Modified | Replace placeholder with CV-backed skills |
| `src/data/experience.ts` | Modified | Replace placeholder with CV-backed experience |
| `src/App.tsx` | Modified | Compose new section components |
| `src/lib/i18n/` | Modified | Add bilingual keys for new components |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Token drift between design and implementation | Medium | Token compliance tests in CI |
| Bilingual key parity drift | Medium | TypeScript `Localized<T>` enforces compile-time parity |
| Accessibility regressions | Low | axe-core in tests, manual audit checklist |
| shadcn/ui version lock-in | Low | Wrap primitives, own component APIs |

## Rollback Plan

Revert `openspec/changes/ui-redesign/` changes. `git revert` the change commit. Tailwind `@theme` tokens are additive — old utility classes still work. Primitive components are new files — no existing imports to break.

## Dependencies

- shadcn/ui (Radix UI primitives) — install via `npx shadcn@latest add`
- class-variance-authority (cva) for variant APIs
- tailwind-merge for className merging

## Success Criteria

- [ ] Design tokens defined in `@theme` and used across all components
- [ ] 6 primitive components with TypeScript APIs, cva variants, data-slot pattern
- [ ] 5 section components composed from primitives, rendering CV data
- [ ] Zero placeholder content in projects, skills, experience
- [ ] WCAG 2.1 AA: color contrast, focus order, ARIA landmarks, keyboard nav
- [ ] Responsive at 320px, 768px, 1024px, 1440px breakpoints
- [ ] LCP < 2.5s (constitution §7)
- [ ] Type-safe, tests pass, CI green