/**
 * Typed content data model — content is data-driven, never hardcoded in
 * components (constitution §4). Each shape honors the constitution's field
 * requirements; `Project` carries all six §6 fields.
 *
 * This module defines SHAPES only. Concrete, CV-backed entries live in
 * `src/data/*` as placeholders (TODO(content), constitution §5).
 */

/** A documented professional project. */
export interface Project {
  /** URL-safe identifier for anchors/links. */
  slug: string
  /** Problem or objective the project addressed (§6). */
  problem: string
  /** Data source, volume, and constraints (§6). */
  dataAndContext: string
  /** Real tools and technologies used (§6). */
  stack: string[]
  /** The author's role in the project (§6). */
  role: string
  /** Measurable result/outcome (§6). */
  outcome: string
  /** Repository link (optional). */
  repoUrl?: string
  /** Live demo link (optional). */
  demoUrl?: string
}

/** Skill categories supporting the site's primary/secondary narrative. */
export type SkillCategory = 'data-engineering' | 'data-analytics' | 'software-engineering'

/** Proficiency levels used to tag skills. */
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

/** A professional skill. */
export interface Skill {
  /** URL-safe identifier for anchors/links. */
  slug: string
  /** Display name of the skill. */
  name: string
  /** Which of the three narrative categories this skill belongs to. */
  category: SkillCategory
  /** Author's proficiency in the skill. */
  level: SkillLevel
}

/** A position in the author's professional history. */
export interface Experience {
  /** URL-safe identifier for anchors/links. */
  slug: string
  /** Job title. */
  role: string
  /** Employer or client name. */
  company: string
  /** Time span, e.g. "2020 – Present". */
  period: string
  /** Notable achievements in bullet form. */
  highlights: string[]
}
