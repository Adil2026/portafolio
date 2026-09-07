import { render, screen } from '@testing-library/react'
import App from '../App.tsx'
import { LanguageProvider } from '../lib/i18n/LanguageContext'

describe('App shell', () => {
  it('renders the section slots (English-neutral default)', () => {
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>,
    )
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
  })
})