/**
 * English message dictionary.
 *
 * Placeholder copy only — real content lands in a later change
 * (TODO(content), constitution §5). Keys mirror `Languages` exactly.
 */
import type { Messages } from './types'

export const messages: Messages = {
  nav: {
    home: 'Home',
  },
  hero: {
    // TODO(content): replace placeholder headline with CV-backed copy
    title: 'Data Engineering Portfolio',
    subtitle: 'Placeholder intro — content lands in a later change.',
    cta: 'View CV',
    viewWork: 'View Projects',
  },
  projects: {
    title: 'Projects',
  },
  skills: {
    title: 'Skills',
  },
  experience: {
    title: 'Experience',
  },
  footer: {
    // TODO(content): full name substituted at runtime (see App footer)
    rights: '© {year} Adilson Vargas Añez',
  },
}
