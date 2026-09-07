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
}

// TODO(content): replace with real CV-backed personal metadata (constitution §5)
export const personal: Personal = {
  name: 'Adilson Vargas Añez',
  roleLine: 'Data Engineering',
  // TODO(content): real external host direct link (Drive/Dropbox/OneDrive)
  cvUrl: 'https://example.com/cv',
}
