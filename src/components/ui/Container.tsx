import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width constraint */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeMaxWidth = {
  sm: 'max-w-container-sm',
  md: 'max-w-container-md',
  lg: 'max-w-container-lg',
  xl: 'max-w-container-xl',
  full: 'max-w-container-full',
} as const;

/**
 * Container primitive — responsive max-width wrapper with horizontal centering.
 *
 * Uses container queries where supported for true responsive behavior.
 * Falls back to viewport-based max-width.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="container"
      data-testid="container"
      className={cn('mx-auto px-4', sizeMaxWidth[size], className)}
      {...props}
    >
      {children}
    </div>
  )
);

Container.displayName = 'Container';