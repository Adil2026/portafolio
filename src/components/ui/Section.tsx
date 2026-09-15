import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** ID of the heading element for aria-labelledby wiring */
  headingId: string;
  /** Size variant for responsive padding */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to include the Container wrapper (default: true) */
  container?: boolean;
  /** Container size when container is true */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizePadding = {
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-24',
} as const;

/**
 * Section primitive — semantic <section> with built-in Container and aria-labelledby.
 *
 * Provides:
 * - Semantic section landmark
 * - Responsive padding from spacing tokens
 * - Container for max-width constraint and centering
 * - Accessibility wiring via headingId
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      headingId,
      size = 'lg',
      container = true,
      containerSize = 'lg',
      children,
      ...props
    },
    ref
  ) => (
    <section
      ref={ref}
      aria-labelledby={headingId}
      data-slot="section"
      data-testid="section"
      className={cn(sizePadding[size], className)}
      {...props}
    >
      {container ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  )
);

Section.displayName = 'Section';