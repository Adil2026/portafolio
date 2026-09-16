import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { LanguageProvider, useI18n } from './LanguageContext'
import { messages as esMessages } from './es'
import { messages as enMessages } from './en'
import { DEFAULT_LANGUAGE } from './LanguageContext'

/** Helper component that surfaces the active language and a `t` lookup result. */
function Probe() {
  const { language, setLanguage, t } = useI18n()
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="hero-summary">{t('hero.summary')}</span>
      <button type="button" onClick={() => setLanguage('es')}>
        to-es
      </button>
      <button type="button" onClick={() => setLanguage('en')}>
        to-en
      </button>
    </div>
  )
}

describe('i18n dictionaries', () => {
  it('both dictionaries carry the same top-level and nested keys', () => {
    const keysOf = (value: unknown, prefix = ''): string[] =>
      Object.keys(value as Record<string, unknown>).flatMap((key) => {
        const child = (value as Record<string, unknown>)[key]
        const path = prefix ? `${prefix}.${key}` : key
        return child && typeof child === 'object' && !Array.isArray(child)
          ? keysOf(child, path)
          : [path]
      })

    const esKeys = keysOf(esMessages).sort()
    const enKeys = keysOf(enMessages).sort()
    expect(esKeys).toEqual(enKeys)
    expect(esKeys.length).toBeGreaterThan(0)
  })

  it('carries identity keys with parity and no retired interpolation keys', () => {
    const keysOf = (value: unknown, prefix = ''): string[] =>
      Object.keys(value as Record<string, unknown>).flatMap((key) => {
        const child = (value as Record<string, unknown>)[key]
        const path = prefix ? `${prefix}.${key}` : key
        return child && typeof child === 'object' && !Array.isArray(child)
          ? keysOf(child, path)
          : [path]
      })

    const esKeys = keysOf(esMessages)
    expect(esKeys).toContain('hero.summary')
    expect(esKeys).toContain('hero.cta')
    expect(esKeys).toContain('footer.rightsReserved')
    expect(esKeys).not.toContain('footer.rights')
    expect(esMessages.footer.rightsReserved).not.toContain('{year}')
    expect(enMessages.footer.rightsReserved).not.toContain('{year}')
    expect(esMessages.hero.summary).not.toBe(enMessages.hero.summary)
  })
})

describe('LanguageProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('lang')
  })

  it('defaults to English and exposes it as the active language', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(DEFAULT_LANGUAGE).toBe('en')
    expect(screen.getByTestId('language')).toHaveTextContent('en')
    expect(screen.getByTestId('hero-summary')).toHaveTextContent(enMessages.hero.summary)
  })

  it('reads a persisted locale from localStorage on mount', () => {
    window.localStorage.setItem('lang', 'es')
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(screen.getByTestId('language')).toHaveTextContent('es')
    expect(screen.getByTestId('hero-summary')).toHaveTextContent(esMessages.hero.summary)
  })

  it('switches locale, re-renders copy, and persists the choice', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )

    expect(screen.getByTestId('language')).toHaveTextContent('en')
    fireEvent.click(screen.getByRole('button', { name: 'to-es' }))
    expect(screen.getByTestId('language')).toHaveTextContent('es')
    expect(screen.getByTestId('hero-summary')).toHaveTextContent(esMessages.hero.summary)
    expect(window.localStorage.getItem('lang')).toBe('es')

    fireEvent.click(screen.getByRole('button', { name: 'to-en' }))
    expect(screen.getByTestId('language')).toHaveTextContent('en')
    expect(screen.getByTestId('hero-summary')).toHaveTextContent(enMessages.hero.summary)
    expect(window.localStorage.getItem('lang')).toBe('en')
  })

  it('keeps document.documentElement.lang in sync with the active locale', () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    )
    expect(document.documentElement.lang).toBe('en')
    fireEvent.click(screen.getByRole('button', { name: 'to-es' }))
    expect(document.documentElement.lang).toBe('es')
  })
})
