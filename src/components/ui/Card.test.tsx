import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders Card with data-slot', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('data-slot', 'card');
  });

  it('renders CardHeader with data-slot', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    );
    const header = screen.getByTestId('header');
    expect(header).toHaveAttribute('data-slot', 'header');
  });

  it('renders CardTitle with data-slot', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    const title = screen.getByText('Title');
    expect(title).toHaveAttribute('data-slot', 'title');
  });

  it('renders CardDescription with data-slot', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Description</CardDescription>
        </CardHeader>
      </Card>
    );
    const desc = screen.getByText('Description');
    expect(desc).toHaveAttribute('data-slot', 'description');
  });

  it('renders CardContent with data-slot', () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  it('renders CardFooter with data-slot', () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('composes compound components correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Main content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Footer actions')).toBeInTheDocument();
  });

  it('applies spacing tokens for padding', () => {
    render(<Card><CardContent>Content</CardContent></Card>);
    const content = screen.getByText('Content').closest('[data-slot="content"]');
    expect(content).toHaveClass('p-6');
    expect(content).toHaveClass('pt-0');
  });

  it('applies semantic color tokens', () => {
    render(<Card>Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border-border');
    expect(card).toHaveClass('bg-surface');
    expect(card).toHaveClass('text-surface-foreground');
  });

  it('accepts custom className on each part', () => {
    render(
      <Card className="card-custom">
        <CardHeader className="header-custom">
          <CardTitle className="title-custom">Title</CardTitle>
        </CardHeader>
        <CardContent className="content-custom">Content</CardContent>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('card-custom');
    expect(screen.getByTestId('header')).toHaveClass('header-custom');
    expect(screen.getByText('Title')).toHaveClass('title-custom');
    expect(screen.getByTestId('content')).toHaveClass('content-custom');
  });
});