# Design: ui-redesign

## Technical Approach

Build a design system from tokens up: Tailwind v4 `@theme` for semantic tokens, shadcn/ui (Radix) for accessible primitives, custom compound components for sections. Composition over inheritance. Strict TypeScript APIs with cva variants and data-slot pattern. Bilingual content via existing `Localized<T>` enforcement.

## Architecture Decisions

### Decision: shadcn/ui as primitive foundation

**Choice**: Install shadcn/ui components, extend with custom primitives
**Alternatives considered**: Build all primitives from scratch; use Radix directly; use Headless UI
**Rationale**: shadcn/ui provides WCAG 2.1 AA Radix primitives, copy-paste ownership (no vendor lock-in), Tailwind v4 native, community patterns. Building from scratch duplicates accessibility work.

### Decision: Tailwind v4 @theme for tokens

**Choice**: Define all design tokens in `src/app.css` `@theme` block
**Alternatives considered**: tailwind.config.js (v3 style); CSS custom properties only; separate theme file
**Rationale**: Tailwind v4 is CSS-first; `@theme` generates utilities automatically; single source of truth; works with container queries; no config file needed.

### Decision: CSS-only motion tokens

**Choice**: Define `duration-*` and `ease-*` tokens, use CSS transitions
**Alternatives considered**: Framer Motion; Motion One; native Web Animations API
**Rationale**: Portfolio is content-first, not animation-heavy. CSS transitions cover hover/focus states. Zero JS bundle cost. Simpler maintenance.

### Decision: Dark mode from start (class strategy)

**Choice**: `html.dark` class toggle, tokens define both modes
**Alternatives considered**: Media query only; defer to later
**Rationale**: Consumer expectation for portfolio. Class strategy works with SSR/SSG. Tokens already define both modes.

### Decision: Minimal semantic token set

**Choice**: ~30 tokens (colors, spacing, type, shadows, radii, motion)
**Alternatives considered**: Comprehensive design token spec (100+ tokens)
**Rationale**: Portfolio scope is bounded. Semantic tokens map directly to component needs. Avoids token bloat.

### Decision: Portfolio-scoped component library

**Choice**: Components in `src/components/ui/` and `src/components/sections/` only
**Alternatives considered**: Publishable npm package; shared monorepo package
**Rationale**: No reuse outside this portfolio. Keeps architecture simple. Can extract later if needed.

## Data Flow

```
src/data/*.ts (CV-backed Localized<T>[])
         │
         ▼
src/components/sections/*.tsx (compose primitives)
         │
         ├── Hero → personal data + i18n
         ├── Projects → projects[] + Card
         ├── Skills → skills[] grouped by category
         ├── Experience → experience[] timeline
         └── Footer → personal data + i18n + CVLink
         │
         ▼
src/App.tsx (assembles sections)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app.css` | Modify | Add @theme design tokens (colors, spacing, type, shadows, radii, motion) |
| `src/components/ui/button.tsx` | Create | Button primitive with cva variants, Slot, data-slot |
| `src/components/ui/card.tsx` | Create | Card compound primitive (Card, Header, Title, Description, Content, Footer) |
| `src/components/ui/section.tsx` | Create | Section primitive with Container, aria-labelledby |
| `src/components/ui/container.tsx` | Create | Container primitive with size variants |
| `src/components/ui/heading.tsx` | Create | Heading primitive (polymorphic as, size variants) |
| `src/components/ui/link.tsx` | Create | Link primitive with underline, focus ring, asChild |
| `src/components/sections/Hero.tsx` | Create | Hero section from primitives |
| `src/components/sections/Projects.tsx` | Create | Projects grid section |
| `src/components/sections/Skills.tsx` | Create | Skills grouped section |
| `src/components/sections/Experience.tsx` | Create | Experience timeline section |
| `src/components/sections/Footer.tsx` | Create | Footer section |
| `src/data/projects.ts` | Modify | Replace placeholder with CV-backed projects |
| `src/data/skills.ts` | Modify | Replace placeholder with CV-backed skills |
| `src/data/experience.ts` | Modify | Replace placeholder with CV-backed experience |
| `src/App.tsx` | Modify | Compose section components, remove inline markup |
| `src/lib/i18n/es.ts` | Modify | Add new i18n keys for sections |
| `src/lib/i18n/en.ts` | Modify | Add new i18n keys for sections |
| `src/lib/i18n/types.ts` | Modify | Extend Dictionary with new keys |

## Interfaces / Contracts

```typescript
// cva variant pattern for all primitives
type ButtonVariants = {
  variant: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size: 'default' | 'sm' | 'lg' | 'icon';
};

// data-slot pattern for styling hooks
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-slot'?: 'card' | 'header' | 'title' | 'description' | 'content' | 'footer';
}

// Polymorphic Heading
interface HeadingProps extends Omit<React.HTMLAttributes<HTMLElement>, 'as'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

// Section with accessibility wiring
interface SectionProps extends React.HTMLAttributes<HTMLSectionElement> {
  headingId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Primitive variants, token compliance, cva output | Vitest + class-variance-authority test utils |
| Unit | Section composition, data rendering | Vitest + React Testing Library |
| Integration | Full page render, i18n switching, dark mode | Vitest + RTL + jsdom |
| A11y | axe-core on all components/pages | Vitest + axe-core/playwright |
| Token | No arbitrary values, token usage | Custom ESLint rule / grep check in CI |
| Visual | Responsive at 320/768/1024/1440 | Playwright + pixelmatch (optional) |

## Threat Matrix

N/A — no routing, shell commands, subprocesses, VCS/PR automation, executable-file classification, or process-integration boundary. Pure frontend UI change.

## Migration / Rollout

No migration required. New components replace inline markup in App.tsx. Data files updated in place. i18n keys added. Feature flag not needed — single deploy.

## Open Questions

- [ ] Exact CV project/skill/experience content (awaits user input from CV)
- [ ] Whether to add project images/assets (scope: optional enhancement)
- [ ] Exact OKLCH color values (design review needed before token finalization)