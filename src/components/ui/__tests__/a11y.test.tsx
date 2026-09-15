import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';
import { Button } from '../Button';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { Link } from '../Link';
import { Section } from '../Section';

/**
 * Accessibility Tests with axe-core
 *
 * Runs axe accessibility checks on all UI primitives.
 * Fails CI on any WCAG 2.1 AA violations.
 */

describe('Accessibility (axe-core)', () => {
  // Card compound component
  describe('Card', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Main content</CardContent>
          <CardFooter>Footer actions</CardFooter>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with minimal content', async () => {
      const { container } = render(<Card>Simple card</Card>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Button with all variants
  describe('Button', () => {
    const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;

    for (const variant of variants) {
      it(`should have no accessibility violations (variant: ${variant})`, async () => {
        const { container } = render(<Button variant={variant}>Button</Button>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    }

    it('should have no accessibility violations with asChild', async () => {
      const { container } = render(
        <Button asChild>
          <a href="#test">Link as button</a>
        </Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Container
  describe('Container', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Container size="lg">
          <div>Container content</div>
        </Container>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all size variants', async () => {
      const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
      for (const size of sizes) {
        const { container } = render(<Container size={size}>Content</Container>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });
  });

  // Heading
  describe('Heading', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Heading as="h1" size="3xl">Main Heading</Heading>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations for all heading levels', async () => {
      const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
      for (const level of levels) {
        const { container } = render(<Heading as={level} size="lg">Heading</Heading>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('should have no accessibility violations with custom weight', async () => {
      const { container } = render(<Heading as="h2" size="xl" weight="bold">Bold Heading</Heading>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Link
  describe('Link', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Link href="#test">Link text</Link>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with underline variants', async () => {
      const variants = ['always', 'hover', 'none'] as const;
      for (const variant of variants) {
        const { container } = render(<Link href="#test" underline={variant}>Link</Link>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('should have no accessibility violations with asChild', async () => {
      const { container } = render(
        <Link asChild href="#test">
          <Button>Button as link</Button>
        </Link>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Section
  describe('Section', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Section headingId="test-heading" size="lg">
          <Heading id="test-heading" as="h2" size="xl">
            Section Title
          </Heading>
          <p>Section content</p>
        </Section>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations without container', async () => {
      const { container } = render(
        <Section headingId="test-heading" container={false} size="md">
          <Heading id="test-heading" as="h2" size="lg">
            Section Title
          </Heading>
        </Section>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all size variants', async () => {
      const sizes = ['sm', 'md', 'lg', 'xl'] as const;
      for (const size of sizes) {
        const { container } = render(
          <Section headingId="test-heading" size={size}>
            <Heading id="test-heading" as="h2" size="lg">
              Section Title
            </Heading>
          </Section>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });
  });
});