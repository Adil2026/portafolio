import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Heading';
import { Link } from '../components/ui/Link';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: '100%' }}>{children}</div>
);

describe('Automated Accessibility (axe-core)', () => {
  const components = [
    { name: 'Button', component: () => <Button>Test Button</Button> },
    { name: 'Button (variant)', component: () => <Button variant="outline">Outline</Button> },
    { name: 'Button (asChild)', component: () => <Button asChild><a href="/">Link Button</a></Button> },
    { name: 'Card', component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )},
    { name: 'Section', component: () => (
      <Section headingId="test-heading">
        <h2 id="test-heading">Section Title</h2>
        <p>Section content</p>
      </Section>
    )},
    { name: 'Container', component: () => (
      <Container size="md">Container content</Container>
    )},
    { name: 'Heading (h1)', component: () => <Heading as="h1" size="3xl">Heading 1</Heading> },
    { name: 'Heading (h2)', component: () => <Heading as="h2" size="2xl">Heading 2</Heading> },
    { name: 'Link', component: () => <Link href="/test">Test Link</Link> },
    { name: 'Link (underline)', component: () => <Link href="/test" underline="always">Always Underline</Link> },
  ];

  components.forEach(({ name, component }) => {
    it(`${name} should have no axe violations`, async () => {
      const { container } = render(<TestWrapper>{component()}</TestWrapper>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('full App should have no axe violations', async () => {
    const AppModule = await import('../App');
    const App = AppModule.default;
    const { LanguageProvider } = await import('../lib/i18n/LanguageContext');
    const { container } = render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});