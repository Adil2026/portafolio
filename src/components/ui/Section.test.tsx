import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';
import { Container } from './Container';

describe('Section', () => {
  it('renders semantic section with aria-labelledby', () => {
    render(
      <Section headingId="test-heading">
        <h2 id="test-heading">Title</h2>
        <p>Content</p>
      </Section>
    );
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'test-heading');
    expect(section).toHaveAttribute('data-slot', 'section');
  });

  it('applies size padding variants', () => {
    const { rerender } = render(
      <Section headingId="h1" size="sm">
        <h2 id="h1">Title</h2>
      </Section>
    );
    expect(screen.getByRole('region')).toHaveClass('py-12');

    rerender(
      <Section headingId="h1" size="md">
        <h2 id="h1">Title</h2>
      </Section>
    );
    expect(screen.getByRole('region')).toHaveClass('py-16');

    rerender(
      <Section headingId="h1" size="lg">
        <h2 id="h1">Title</h2>
      </Section>
    );
    expect(screen.getByRole('region')).toHaveClass('py-20');

    rerender(
      <Section headingId="h1" size="xl">
        <h2 id="h1">Title</h2>
      </Section>
    );
    expect(screen.getByRole('region')).toHaveClass('py-24');
  });

  it('includes Container by default', () => {
    render(
      <Section headingId="h1">
        <h2 id="h1">Title</h2>
        <p>Content</p>
      </Section>
    );
    expect(screen.getByText('Content').closest('[data-slot="container"]')).toBeInTheDocument();
  });

  it('omits Container when container=false', () => {
    render(
      <Section headingId="h1" container={false}>
        <h2 id="h1">Title</h2>
        <p>Content</p>
      </Section>
    );
    expect(screen.queryByTestId('container')).not.toBeInTheDocument();
  });

  it('passes containerSize to Container', () => {
    render(
      <Section headingId="h1" containerSize="xl">
        <h2 id="h1">Title</h2>
        <p>Content</p>
      </Section>
    );
    const container = screen.getByText('Content').closest('[data-slot="container"]');
    expect(container).toHaveClass('max-w-container-xl');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Section headingId="h1" ref={ref}><h2 id="h1">Title</h2></Section>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('accepts custom className', () => {
    render(
      <Section headingId="h1" className="custom-section">
        <h2 id="h1">Title</h2>
      </Section>
    );
    expect(screen.getByRole('region')).toHaveClass('custom-section');
  });
});

describe('Container', () => {
  it('renders with data-slot', () => {
    render(<Container>Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('applies size max-width variants', () => {
    const { rerender } = render(<Container size="sm">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-container-sm');

    rerender(<Container size="md">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-container-md');

    rerender(<Container size="lg">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-container-lg');

    rerender(<Container size="xl">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-container-xl');

    rerender(<Container size="full">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('max-w-container-full');
  });

  it('centers horizontally with auto margins', () => {
    render(<Container>Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('mx-auto');
  });

  it('applies responsive padding', () => {
    render(<Container>Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('px-4');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>Content</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('accepts custom className', () => {
    render(<Container className="custom-container">Content</Container>);
    expect(screen.getByTestId('container')).toHaveClass('custom-container');
  });
});

import * as React from 'react';