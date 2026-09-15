/**
 * Personal metadata and public links — data-driven (constitution §4).
 */

/** Public personal/brand metadata. */
export interface Personal {
  /** Full legal/professional name. */
  name: string
  /** One-line professional tagline (primary narrative). */
  roleLine: string
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

// TODO(content): replace with real CV-backed personal metadata (constitution §5)
export const personal: Personal = {
  name: 'Adilson Vargas Añez',
  roleLine: 'Data Engineering',
  // TODO(content): real external host direct link (Drive/Dropbox/OneDrive)
  cvUrl: 'https://example.com/cv',
  email: 'adilson.vargas@email.com',
  phone: '+591 7000 0000',
  socials: [
    { network: 'github', label: 'GitHub', href: 'https://github.com/adil2026' },
    { network: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/adilsonvargas' },
  ],
}
