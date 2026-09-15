import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'as'> {
  /** Render as a different element via Radix Slot (e.g., Button asChild) */
  asChild?: boolean;
  /** Underline variant */
  underline?: 'always' | 'hover' | 'none';
}

const underlineVariants = {
  always: 'underline underline-offset-2',
  hover: 'underline-offset-2 hover:underline',
  none: 'no-underline',
} as const;

/**
 * Link primitive — accessible link with focus ring and underline variants.
 *
 * Supports asChild for polymorphic rendering (e.g., wrapping in Button).
 * Uses ring token for focus-visible state.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, asChild = false, underline = 'hover', children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        ref={ref}
        data-slot="link"
        className={cn(
          'text-primary transition-colors duration-fast ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          underlineVariants[underline],
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Link.displayName = 'Link';