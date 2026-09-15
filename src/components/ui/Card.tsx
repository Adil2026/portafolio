import * as React from 'react';
import { cn } from '../../lib/utils';

type DataSlotValue = 'card' | 'header' | 'title' | 'description' | 'content' | 'footer';

interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-slot'?: DataSlotValue;
}

/**
 * Card compound component with data-slot hooks for styling.
 *
 * Usage:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 *   <CardFooter>Footer</CardFooter>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardBaseProps>(
  ({ className, 'data-slot': dataSlot = 'card', ...props }, ref) => (
    <div
      ref={ref}
      data-slot={dataSlot}
      data-testid={dataSlot}
      className={cn('rounded-lg border border-border bg-surface text-surface-foreground shadow-sm', className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardBaseProps>(
  ({ className, 'data-slot': dataSlot = 'header', ...props }, ref) => (
    <div
      ref={ref}
      data-slot={dataSlot}
      data-testid={dataSlot}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { 'data-slot'?: DataSlotValue }>(
  ({ className, 'data-slot': dataSlot = 'title', ...props }, ref) => (
    <h3
      ref={ref}
      data-slot={dataSlot}
      data-testid={dataSlot}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { 'data-slot'?: DataSlotValue }>(
  ({ className, 'data-slot': dataSlot = 'description', ...props }, ref) => (
    <p
      ref={ref}
      data-slot={dataSlot}
      data-testid={dataSlot}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardBaseProps>(
  ({ className, 'data-slot': dataSlot = 'content', ...props }, ref) => (
    <div
      ref={ref}
      data-slot={dataSlot}
      data-testid={dataSlot}
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardBaseProps>(
  ({ className, 'data-slot': dataSlot = 'footer', ...props }, ref) => (
    <div
      ref={ref}
      data-slot={dataSlot}
      data-testid={dataSlot}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };