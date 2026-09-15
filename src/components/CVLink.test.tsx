import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CVLink } from './CVLink'
import { personal } from '../data/personal'

describe('CVLink', () => {
  it('points at the personal record cvUrl and opens in a new tab', () => {
    render(<CVLink label="View CV" />)

    const link = screen.getByRole('link', { name: 'View CV' })
    expect(link).toHaveAttribute('href', personal.cvUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('uses the localized label as its accessible name', () => {
    render(<CVLink label="Ver CV" />)

    expect(screen.getByRole('link', { name: 'Ver CV' })).toBeInTheDocument()
  })

  it('keeps hero and footer links on the single personal cvUrl source', () => {
    render(
      <>
        <CVLink label="View CV" />
        <CVLink label="View CV footer" />
      </>,
    )

    const heroLink = screen.getByRole('link', { name: 'View CV' })
    const footerLink = screen.getByRole('link', { name: 'View CV footer' })
    expect(heroLink).toHaveAttribute('href', personal.cvUrl)
    expect(footerLink).toHaveAttribute('href', personal.cvUrl)
    expect(heroLink.getAttribute('href')).toBe(footerLink.getAttribute('href'))
  })
})
