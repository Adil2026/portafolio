/**
 * Personal metadata and public links — data-driven (constitution §4).
 */

/** Public personal/brand metadata. */
export interface Personal {
  /** Full legal/professional name. */
  name: string
  /** One-line professional tagline (primary narrative). */
  roleLine: string
  /** Location (city, country). */
  location: string
  /** Direct URL to the externally-hosted CV PDF. */
  cvUrl: string
  /** Contact email. */
  email: string
  /** Contact phone in display format. */
  phone: string
  /** Social media links. */
  socials: Array<{
    network: string
    label: string
    href: string
  }>
}

// CV-backed personal metadata (constitution §5, §6)
export const personal: Personal = {
  name: 'Adilson Vargas Añez',
  roleLine: 'Analista de Datos | Ingeniero de Datos Junior | Ingeniero de Sistemas',
  location: 'Santa Cruz de la Sierra, Bolivia',
  cvUrl: 'https://drive.google.com/file/d/1jg10ogYu65Dc8WsecEroW7XprjF82wR9/view?usp=drive_link',
  email: 'adilsonva2016@gmail.com',
  phone: '+591 70917928',
  socials: [
    { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/adilson-vargas-añez' },
    { network: 'github', label: 'GitHub', href: 'https://github.com/Adil2026' },
  ],
}
