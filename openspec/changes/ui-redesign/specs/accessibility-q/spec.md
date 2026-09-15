# accessibility-q Specification

## Purpose

WCAG 2.1 AA compliance, responsive breakpoint matrix, token compliance tests. Automated + manual audit checklist.

## Requirements

### Requirement: Color contrast AA

The system MUST ensure all text/background combinations meet WCAG 2.1 AA: 4.5:1 for normal text, 3:1 for large text (18pt+), 3:1 for UI components. OKLCH tokens MUST be validated against contrast ratios.

#### Scenario: Token contrast validated

- GIVEN design tokens defined
- WHEN contrast test runs
- THEN all semantic color pairs pass AA thresholds

### Requirement: Keyboard navigation

The system MUST ensure all interactive elements are keyboard accessible: focusable, visible focus indicator (ring token), logical tab order, no keyboard traps. `Button`, `Link`, `Card` (if interactive) MUST have focus-visible styles.

#### Scenario: Tab order is logical

- GIVEN page rendered
- WHEN user tabs through
- THEN focus moves header → hero CTA → project cards → skills → experience → footer links

### Requirement: ARIA landmarks and structure

The system MUST use semantic HTML5 landmarks: `<header>`, `<main>`, `<section>` with `aria-labelledby`, `<footer>`, `<nav>` where appropriate. Heading hierarchy MUST be h1 → h2 → h3 without skipping levels.

#### Scenario: Landmarks present

- GIVEN page rendered
- WHEN axe-core scans
- THEN header, main, sections (4), footer landmarks detected

### Requirement: Focus management

The system MUST ensure focus is never lost: skip link for main content, focus visible on all interactive elements, focus trap not needed (no modals). External links (`target="_blank"`) MUST have `rel="noopener noreferrer"`.

#### Scenario: Skip link works

- GIVEN page loaded
- WHEN user presses Tab first time
- THEN skip link appears, jumps to main

### Requirement: Responsive breakpoint matrix

The system MUST render correctly at: 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide). Container queries for component-level responsiveness. Fluid typography via clamp. Grid: 1 col (320), 2 col (768), 3 col (1024+).

#### Scenario: Layout adapts at breakpoints

- GIVEN viewport resized
- WHEN tested at 320/768/1024/1440
- THEN no horizontal overflow, readable text, touch targets ≥44px

### Requirement: Token compliance tests

The system MUST have automated tests verifying: all components use design tokens (no arbitrary values), spacing uses 4/8px scale, colors use semantic tokens, typography uses fluid scale. Fail build on violations.

#### Scenario: Token compliance enforced

- GIVEN component uses `p-[12px]` or `text-[#fff]`
- WHEN token compliance test runs
- THEN test fails with offending file/line

### Requirement: Automated accessibility testing

The system MUST integrate axe-core in Vitest. Test suite MUST run on every component and page. CI MUST fail on violations.

#### Scenario: Axe catches regression

- GIVEN component missing alt text
- WHEN `npm run test` runs
- THEN axe violation fails the test

### Requirement: LCP < 2.5s budget

The system MUST meet LCP < 2.5s in production (constitution §7). Bundle size monitored. No heavy animation libraries. Critical CSS inlined. Images optimized.

#### Scenario: LCP budget met

- GIVEN production build deployed
- WHEN Lighthouse runs
- THEN LCP < 2.5s, no layout shift, minimal blocking resources