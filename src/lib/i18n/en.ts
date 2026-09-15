/**
 * English message dictionary.
 *
 * CV-backed identity copy (identity change, constitution §5).
 * Keys mirror `Dictionary` exactly. The hero summary is a validation-pending
 * draft and can be swapped in one line pre-merge.
 */
import type { Messages } from './types'

export const messages: Messages = {
  nav: {
    home: 'Home',
  },
  hero: {
    summary:
      'Systems Engineer with 7+ years in software, databases, and information systems; advanced SQL, data modeling, ETL and Python (pandas), focused on growing as a Data Engineer.',
    cta: 'View CV',
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
    rightsReserved: 'All rights reserved',
  },
}
