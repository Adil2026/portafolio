# primitive-components Specification

## Purpose

Accessible UI primitives built on shadcn/ui (Radix UI) with custom extensions: Button, Card, Section, Container, Heading, Link. TypeScript APIs, cva variants, data-slot pattern, compound components where needed.

## Requirements

### Requirement: Button primitive

The system MUST provide a `Button` component with variants: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`. Sizes: `default`, `sm`, `lg`, `icon`. MUST support `asChild` for polymorphic rendering (Slot pattern). MUST forward ref. MUST have accessible focus-visible ring using `ring` token.

#### Scenario: Button renders with variant and size

- GIVEN `<Button variant="outline" size="sm">Click</Button>`
- WHEN rendered
- THEN correct classes applied, focus ring visible on keyboard focus

#### Scenario: Button asChild wraps link

- GIVEN `<Button asChild><a href="/">Link</a></Button>`
- WHEN rendered
- THEN `<a>` receives Button styles and focus behavior

### Requirement: Card primitive

The system MUST provide `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` as compound components. MUST use `data-slot` for styling hooks. MUST support semantic padding from spacing tokens.

#### Scenario: Card composes correctly

- GIVEN `<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Content</CardContent></Card>`
- WHEN rendered
- THEN semantic structure with correct spacing tokens

### Requirement: Section primitive

The system MUST provide a `Section` component wrapping `<section>` with built-in `Container`, `aria-labelledby` wiring, and responsive padding from tokens. MUST accept `headingId` prop for accessibility.

#### Scenario: Section provides landmark

- GIVEN `<Section headingId="my-heading"><h2 id="my-heading">Title</h2>Content</Section>`
- WHEN rendered
- THEN `<section>` with proper ARIA and responsive padding

### Requirement: Container primitive

The system MUST provide a `Container` component with max-width constraints (sm, md, lg, xl, full) using container queries where supported. MUST center horizontally with auto margins.

#### Scenario: Container constrains width

- GIVEN `<Container size="lg">Content</Container>`
- WHEN rendered at 1440px viewport
- THEN content max-width matches `lg` token, centered

### Requirement: Heading primitive

The system MUST provide `Heading` component (polymorphic `as` prop: h1-h6) with size variants mapped to fluid typography tokens. MUST enforce semantic heading hierarchy.

#### Scenario: Heading uses fluid type

- GIVEN `<Heading as="h2" size="xl">Title</Heading>`
- WHEN rendered
- THEN fluid `text-2xl` clamp applied, correct heading level

### Requirement: Link primitive

The system MUST provide `Link` component with `underline-offset`, `hover:underline`, focus-visible ring, and `asChild` support. MUST integrate with `CVLink` pattern for external links.

#### Scenario: Link shows accessible states

- GIVEN `<Link href="/">Internal</Link>`
- WHEN hovered/focused
- THEN underline appears, focus ring uses `ring` token