import { describe, expect, it } from 'vitest'
import { experience } from './experience'
import { personal } from './personal'
import { projects } from './projects'
import { skills } from './skills'

describe('data modules — personal', () => {
  it('exports placeholder personal metadata with the expected fields', () => {
    expect(personal.name).toBe('Adilson Vargas Añez')
    expect(personal.roleLine).toBe('Data Engineering')
    expect(personal.cvUrl).toBe('https://example.com/cv') // TODO(content) placeholder
  })
})

describe('data modules — projects', () => {
  it('is a non-empty Localized<Project>[] (default locale en)', () => {
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
    const first = projects[0]
    // Localized<T> completeness: both languages present and populated
    expect(typeof first.en.slug).toBe('string')
    expect(typeof first.es.slug).toBe('string')
    expect(first.en.slug).toBe(first.es.slug)
    // §6 fields present on each localized entry
    expect(typeof first.en.problem).toBe('string')
    expect(typeof first.en.dataAndContext).toBe('string')
    expect(Array.isArray(first.en.stack)).toBe(true)
    expect(typeof first.en.role).toBe('string')
    expect(typeof first.en.outcome).toBe('string')
  })
})

describe('data modules — skills', () => {
  it('is a non-empty Localized<Skill>[] (default locale en)', () => {
    expect(Array.isArray(skills)).toBe(true)
    expect(skills.length).toBeGreaterThan(0)
    const first = skills[0]
    expect(typeof first.en.slug).toBe('string')
    expect(typeof first.es.slug).toBe('string')
    expect(typeof first.en.name).toBe('string')
    expect(['data-engineering', 'data-analytics', 'software-engineering']).toContain(first.en.category)
    expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(first.en.level)
  })
})

describe('data modules — experience', () => {
  it('is a non-empty Localized<Experience>[] (default locale en)', () => {
    expect(Array.isArray(experience)).toBe(true)
    expect(experience.length).toBeGreaterThan(0)
    const first = experience[0]
    expect(typeof first.en.slug).toBe('string')
    expect(typeof first.es.slug).toBe('string')
    expect(typeof first.en.role).toBe('string')
    expect(typeof first.en.company).toBe('string')
    expect(typeof first.en.period).toBe('string')
    expect(Array.isArray(first.en.highlights)).toBe(true)
  })
})
