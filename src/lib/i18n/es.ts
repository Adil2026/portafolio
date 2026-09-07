/**
 * Spanish message dictionary.
 *
 * Placeholder copy only — real content lands in a later change
 * (TODO(content), constitution §5). Keys mirror `Languages` exactly.
 */
import type { Messages } from './types'

export const messages: Messages = {
  nav: {
    home: 'Inicio',
  },
  hero: {
    // TODO(content): replace placeholder headline with CV-backed copy
    title: 'Portafolio de Ingeniería de Datos',
    subtitle: 'Introducción provisional — el contenido llega en un cambio posterior.',
  },
  projects: {
    title: 'Proyectos',
  },
  skills: {
    title: 'Habilidades',
  },
  experience: {
    title: 'Experiencia',
  },
  footer: {
    // TODO(content): full name substituted at runtime (see App footer)
    rights: '© {year} Adilson Vargas Añez',
  },
}
