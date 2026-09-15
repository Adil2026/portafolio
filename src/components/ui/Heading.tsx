import * as React from 'react';
import { cn } from '../../lib/utils';

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'as'> {
  /** Heading level (semantic) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Size variant mapped to fluid typography tokens */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  /** Override default weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const sizeClass = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
} as const;

const weightClass = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

/**
 * Heading primitive — polymorphic heading with fluid typography tokens.
 *
 * Enforces semantic heading hierarchy via `as` prop while allowing
 * visual size to be controlled independently via `size` prop.
 *
 * @example
 * <Heading as="h2" size="xl">Section Title</Heading>
 * // Renders <h2> with text-2xl fluid clamp
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size = 'xl', weight = 'semibold', children, ...props }, ref) => (
    <Component
      ref={ref}
      data-slot="heading"
      className={cn(sizeClass[size], weightClass[weight], 'tracking-tight', className)}
      {...props}
    >
      {children}
    </Component>
  )
);

Heading.displayName = 'Heading';