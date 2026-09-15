import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../App.tsx'
import { personal } from '../data/personal'
import { LanguageProvider } from '../lib/i18n/LanguageContext'
import { messages as enMessages } from '../lib/i18n/en'
import { messages as esMessages } from '../lib/i18n/es'

function renderApp() {
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  )
}

describe('App shell', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the section slots (English-neutral default)', () => {
    renderApp()
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
  })

  it('renders CV identity in the header and hero (EN)', () => {
    renderApp()

    expect(screen.getByRole('heading', { level: 1, name: personal.name })).toBeInTheDocument()
    expect(screen.getAllByText(personal.roleLine).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(enMessages.hero.summary)).toBeInTheDocument()

    const cvLinks = screen.getAllByRole('link', { name: enMessages.hero.cta })
    expect(cvLinks.length).toBe(2)
    for (const link of cvLinks) {
      expect(link).toHaveAttribute('href', personal.cvUrl)
    }
  })

  it('composes the footer from runtime year plus data name (EN)', () => {
    renderApp()

    const year = String(new Date().getFullYear())
    const footer = screen.getByRole('contentinfo')
    expect(footer.textContent).toContain(year)
    expect(footer.textContent).toContain(personal.name)
    expect(footer.textContent).toContain(enMessages.footer.rightsReserved)
    expect(screen.getByRole('link', { name: personal.email })).toHaveAttribute(
      'href',
      `mailto:${personal.email}`,
    )
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/adilson-vargas-añez',
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/Adil2026',
    )
  })

  it('renders CV identity in Spanish with no fallback leak', () => {
    window.localStorage.setItem('lang', 'es')
    renderApp()

    expect(screen.getByRole('heading', { level: 1, name: personal.name })).toBeInTheDocument()
    expect(screen.getByText(esMessages.hero.summary)).toBeInTheDocument()
    const footer = screen.getByRole('contentinfo')
    expect(footer.textContent).toContain(esMessages.footer.rightsReserved)

    const cvLinks = screen.getAllByRole('link', { name: esMessages.hero.cta })
    expect(cvLinks.length).toBe(2)
    for (const link of cvLinks) {
      expect(link).toHaveAttribute('href', personal.cvUrl)
    }
  })
})
