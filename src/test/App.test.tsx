import { render, screen } from '@testing-library/react'
import App from '../App.tsx'

describe('App shell', () => {
  it('renders the section slots', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
  })
})