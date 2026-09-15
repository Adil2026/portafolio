# design-tokens Specification

## Purpose

Semantic design tokens via Tailwind v4 `@theme` — colors (OKLCH), spacing (4/8px scale), fluid typography (clamp), shadows, radii, motion tokens. Single source of truth for all UI decisions.

## Requirements

### Requirement: OKLCH color palette

The system MUST define a semantic color palette in OKLCH space with light/dark mode pairs: `primary`, `secondary`, `accent`, `muted`, `surface`, `background`, `border`, `foreground`, `destructive`, `ring`. Each color MUST have `--color-{name}` and `--color-{name}-foreground` CSS custom properties.

#### Scenario: Color tokens available in CSS

- GIVEN the design tokens defined
- WHEN any component uses `bg-primary`, `text-primary-foreground`, `border-border`
- THEN the correct OKLCH values resolve in both light and dark mode

#### Scenario: Dark mode via class strategy

- GIVEN `html.dark` class on document
- WHEN tokens are resolved
- THEN dark variants apply without media query dependency

### Requirement: Spacing scale (4/8px)

The system MUST define spacing tokens on a 4px base with 8px rhythm: `space-1` (4px), `space-2` (8px), `space-3` (12px), `space-4` (16px), `space-5` (20px), `space-6` (24px), `space-8` (32px), `space-10` (40px), `space-12` (48px), `space-16` (64px), `space-20` (80px), `space-24` (96px).

#### Scenario: Spacing tokens used consistently

- GIVEN components use `p-4`, `gap-6`, `my-8`, `py-12`
- WHEN rendered
- THEN all spacing aligns to 4/8px grid

### Requirement: Fluid typography with clamp

The system MUST define fluid type scale using CSS `clamp()`: `text-xs` (0.75rem), `text-sm` (0.875rem), `text-base` (1rem), `text-lg` (1.125rem), `text-xl` (1.25rem), `text-2xl` (1.5rem), `text-3xl` (clamp(1.875rem, 1.5rem + 2vw, 2.25rem)), `text-4xl` (clamp(2.25rem, 1.75rem + 3vw, 3rem)), `text-5xl` (clamp(3rem, 2rem + 4vw, 4rem)). Line heights MUST follow 1.5 base ratio.

#### Scenario: Typography scales fluidly

- GIVEN viewport from 320px to 1440px
- WHEN text renders
- THEN font sizes scale smoothly without breakpoints

### Requirement: Shadow and radius tokens

The system MUST define shadow scale: `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`. Radius scale: `radius-none` (0), `radius-sm` (2px), `radius` (4px), `radius-md` (6px), `radius-lg` (8px), `radius-xl` (12px), `radius-2xl` (16px), `radius-full` (9999px).

#### Scenario: Shadows and radii compose

- GIVEN Card uses `shadow-md rounded-lg`
- WHEN rendered in both themes
- THEN shadow depth and corner radius match token values

### Requirement: Motion tokens (CSS-only)

The system MUST define motion tokens: `duration-fast` (150ms), `duration-normal` (200ms), `duration-slow` (300ms), `ease-out` (cubic-bezier(0.16, 1, 0.3, 1)), `ease-in-out` (cubic-bezier(0.4, 0, 0.2, 1)). NO Framer Motion or animation library — CSS transitions only.

#### Scenario: Motion tokens available

- GIVEN Button uses `transition-colors duration-fast ease-out`
- WHEN hovered
- THEN color transition uses token values