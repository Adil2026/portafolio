import { personal } from '../data/personal'

export interface CVLinkProps {
  /** Localized accessible label (copy lives in i18n, URL lives in data). */
  label: string
  className?: string
}

/**
 * CVLink — single-source link to the externally-hosted CV.
 *
 * The `href` always reads `personal.cvUrl` internally so hero and footer
 * cannot drift to different URLs (site-identity spec: single CV source).
 * Opens the Drive viewer in a new tab with `noopener noreferrer`.
 */
export function CVLink({ label, className }: CVLinkProps) {
  return (
    <a
      href={personal.cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  )
}

export default CVLink
