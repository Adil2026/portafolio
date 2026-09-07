/**
 * Project entries — Localized<Project>[] (constitution §4, §5, §6).
 *
 * Placeholder-only: every entry is marked placeholder and asserts NO real
 * CV facts. Real, CV-backed projects land in a later change.
 */
import type { Localized } from '../lib/i18n/types'
import type { Project } from '../types/content'

// TODO(content): replace placeholder array with real CV-backed projects (constitution §6)
export const projects: Localized<Project>[] = [
  {
    es: {
      slug: 'placeholder-project',
      problem: 'Problema u objetivo (pendiente de contenido).',
      dataAndContext: 'Fuente y contexto de datos (pendiente de contenido).',
      stack: [],
      role: 'Rol (pendiente de contenido).',
      outcome: 'Resultado medible (pendiente de contenido).',
    },
    en: {
      slug: 'placeholder-project',
      problem: 'Problem or objective (content pending).',
      dataAndContext: 'Data source and context (content pending).',
      stack: [],
      role: 'Role (content pending).',
      outcome: 'Measurable outcome (content pending).',
    },
  },
]
