/**
 * Personal metadata and public links — data-driven (constitution §4).
 *
 * Locale-neutral facts (identity change): name, role, contacts, and CV URL
 * live here once. Copy lives in `src/lib/i18n/*`; components render from
 * this record with no hardcoding.
 */

/** Public social link (locale-neutral URL, localized label at render). */
export interface SocialLink {
  network: 'linkedin' | 'github'
  href: string
  label: string
}

/** Public personal/brand metadata. */
export interface Personal {
  /** Full legal/professional name. */
  name: string
  /** Single-line professional tagline (DE-first, CV literal). */
  roleLine: string
  /** City and country (locale-neutral fact). */
  location: string
  /** Public contact email. */
  email: string
  /** Public contact phone (E.164 display format). */
  phone: string
  /** Public social profiles. */
  socials: SocialLink[]
  /** Direct URL to the externally-hosted CV PDF (Drive viewer). */
  cvUrl: string
}

export const personal: Personal = {
  name: 'Adilson Vargas Añez',
  roleLine: 'Analista de Datos | Ingeniero de Datos Junior | Ingeniero de Sistemas',
  location: 'Santa Cruz de la Sierra, Bolivia',
  email: 'adilsonva2016@gmail.com',
  phone: '+591 70917928',
  socials: [
    {
      network: 'linkedin',
      href: 'https://www.linkedin.com/in/adilson-vargas-añez',
      label: 'LinkedIn',
    },
    {
      network: 'github',
      href: 'https://github.com/Adil2026',
      label: 'GitHub',
    },
  ],
  cvUrl: 'https://drive.google.com/file/d/1jg10ogYu65Dc8WsecEroW7XprjF82wR9/view?usp=drive_link',
}
