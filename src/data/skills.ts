/**
 * Skill entries — Localized<Skill>[] (constitution §4, §5).
 *
 * Placeholder-only: every entry is marked placeholder and asserts NO real
 * CV facts. Real, CV-backed skills land in a later change.
 */
import type { Localized } from '../lib/i18n/types'
import type { Skill } from '../types/content'

// TODO(content): replace placeholder array with real CV-backed skills
export const skills: Localized<Skill>[] = [
  {
    es: {
      slug: 'placeholder-skill',
      name: 'Habilidad (pendiente de contenido)',
      category: 'software-engineering',
      level: 'intermediate',
    },
    en: {
      slug: 'placeholder-skill',
      name: 'Skill (content pending)',
      category: 'software-engineering',
      level: 'intermediate',
    },
  },
]
