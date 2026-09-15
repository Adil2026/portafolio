import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';
import { Link } from './Link';

describe('Heading', () => {
  it('renders as h2 by default', () => {
    render(<Heading>Default Heading</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Default Heading');
  });

  it('renders correct heading level via as prop', () => {
    const { rerender } = render(<Heading as="h1">H1</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('H1');

    rerender(<Heading as="h3">H3</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('H3');

    rerender(<Heading as="h6">H6</Heading>);
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('H6');
  });

  it('applies size variants mapped to fluid typography tokens', () => {
    const { rerender } = render(<Heading size="xs">XS</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-xs');

    rerender(<Heading size="sm">SM</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-sm');

    rerender(<Heading size="base">Base</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-base');

    rerender(<Heading size="lg">LG</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-lg');

    rerender(<Heading size="xl">XL</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-xl');

    rerender(<Heading size="2xl">2XL</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-2xl');

    rerender(<Heading size="3xl">3XL</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-3xl');

    rerender(<Heading size="4xl">4XL</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-4xl');

    rerender(<Heading size="5xl">5XL</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-5xl');
  });

  it('applies weight variants', () => {
    const { rerender } = render(<Heading weight="normal">Normal</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('font-normal');

    rerender(<Heading weight="medium">Medium</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('font-medium');

    rerender(<Heading weight="semibold">Semibold</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('font-semibold');

    rerender(<Heading weight="bold">Bold</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('font-bold');
  });

  it('has tracking-tight by default', () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('tracking-tight');
  });

  it('has data-slot attribute', () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole('heading')).toHaveAttribute('data-slot', 'heading');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>Title</Heading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it('accepts custom className', () => {
    render(<Heading className="custom-heading">Title</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('custom-heading');
  });

  it('semantic heading level independent of visual size', () => {
    render(<Heading as="h1" size="sm">Small H1</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Small H1');
    expect(heading).toHaveClass('text-sm');
  });
});

describe('Link', () => {
  it('renders as anchor by default', () => {
    render(<Link href="/test">Test Link</Link>);
    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('has data-slot attribute', () => {
    render(<Link href="/test">Test</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('data-slot', 'link');
  });

  it('applies primary color and transition', () => {
    render(<Link href="/test">Test</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-primary');
    expect(link).toHaveClass('transition-colors');
    expect(link).toHaveClass('duration-fast');
    expect(link).toHaveClass('ease-out');
  });

  it('has focus-visible ring using ring token', () => {
    render(<Link href="/test">Test</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('focus-visible:ring-2');
    expect(link).toHaveClass('focus-visible:ring-ring');
    expect(link).toHaveClass('focus-visible:ring-offset-2');
  });

  it('applies underline variants', () => {
    const { rerender } = render(<Link href="/test" underline="always">Always</Link>);
    expect(screen.getByRole('link')).toHaveClass('underline');
    expect(screen.getByRole('link')).toHaveClass('underline-offset-2');

    rerender(<Link href="/test" underline="hover">Hover</Link>);
    expect(screen.getByRole('link')).toHaveClass('underline-offset-2');
    expect(screen.getByRole('link')).toHaveClass('hover:underline');
    expect(screen.getByRole('link')).not.toHaveClass('underline');

    rerender(<Link href="/test" underline="none">None</Link>);
    expect(screen.getByRole('link')).toHaveClass('no-underline');
  });

  it('supports asChild for polymorphic rendering', () => {
    render(
      <Link asChild>
        <button>Button as link</button>
      </Link>
    );
    const button = screen.getByRole('button', { name: /button as link/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'link');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<Link ref={ref} href="/test">Test</Link>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('accepts custom className', () => {
    render(<Link href="/test" className="custom-link">Test</Link>);
    expect(screen.getByRole('link')).toHaveClass('custom-link');
  });

  it('passes through anchor props', () => {
    render(<Link href="/test" target="_blank" rel="noopener">External</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });
});

import * as React from 'react';