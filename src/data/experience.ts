/**
 * Experience entries — Localized<Experience>[] (constitution §4, §5).
 *
 * Placeholder-only: every entry is marked placeholder and asserts NO real
 * CV facts. Real, CV-backed experience lands in a later change.
 */
import type { Localized } from '../lib/i18n/types'
import type { Experience } from '../types/content'

// TODO(content): replace placeholder array with real CV-backed experience
export const experience: Localized<Experience>[] = [
  {
    es: {
      slug: 'placeholder-experience',
      role: 'Rol (pendiente de contenido)',
      company: 'Empresa (pendiente de contenido)',
      period: 'YYYY – Presente',
      highlights: ['Logro (pendiente de contenido).'],
    },
    en: {
      slug: 'placeholder-experience',
      role: 'Role (content pending)',
      company: 'Company (content pending)',
      period: 'YYYY – Present',
      highlights: ['Achievement (content pending).'],
    },
  },
]
