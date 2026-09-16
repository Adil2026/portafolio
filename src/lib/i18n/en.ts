/**
 * English message dictionary.
 *
 * CV-backed content (constitution §5). Keys mirror `Dictionary` exactly.
 */
import type { Messages } from './types'

export const messages: Messages = {
  nav: {
    home: 'Home',
  },
  hero: {
    title: 'Data Engineering Portfolio',
    subtitle: 'Systems Engineer with 7+ years of experience in software development, databases, and information systems.',
    summary: 'Data engineering, analytics, and software specialist. Building robust pipelines, actionable dashboards, and maintainable systems.',
    cta: 'View CV',
    viewWork: 'View Projects',
  },
  projects: {
    title: 'Projects',
    problem: 'Problem or objective',
    dataAndContext: 'Data and context',
    stack: 'Tech stack',
    role: 'Role',
    outcome: 'Measurable outcome',
    repo: 'Repository',
    demo: 'Demo',
    viewProject: 'View project',
  },
  skills: {
    title: 'Skills',
    category: 'Category',
    level: 'Level',
    dataEngineering: 'Data Engineering',
    dataAnalytics: 'Data Analytics',
    softwareEngineering: 'Software Engineering',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
  },
  experience: {
    title: 'Experience',
    role: 'Role',
    company: 'Company',
    period: 'Period',
    highlights: 'Key achievements',
  },
  footer: {
    rightsReserved: 'All rights reserved.',
  },
}