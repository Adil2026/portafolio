# content-integration Specification

## Purpose

Replace all placeholder content with CV-backed data. Enforce bilingual ES/EN via `Localized<T>` type system. Asset strategy for CV PDF and project images.

## Requirements

### Requirement: CV-backed projects data

The system MUST replace `src/data/projects.ts` placeholder array with real `Localized<Project>[]` sourced from CV. Each project MUST include: slug, problem, dataAndContext, stack[], role, outcome, repoUrl?, demoUrl?. MUST satisfy constitution §6 minimums.

#### Scenario: Projects data is CV-backed

- GIVEN projects array loaded
- WHEN inspected
- THEN zero placeholders, all fields populated, stack non-empty, outcome measurable

### Requirement: CV-backed skills data

The system MUST replace `src/data/skills.ts` placeholder with real `Localized<Skill>[]` from CV. Each skill: slug, name, category (data-engineering|data-analytics|software-engineering|tools), level (beginner|intermediate|advanced|expert).

#### Scenario: Skills data is CV-backed

- GIVEN skills array loaded
- WHEN inspected
- THEN zero placeholders, categories distributed, levels accurate

### Requirement: CV-backed experience data

The system MUST replace `src/data/experience.ts` placeholder with real `Localized<Experience>[]` from CV. Each entry: slug, role, company, period, highlights[]. Reverse chronological.

#### Scenario: Experience data is CV-backed

- GIVEN experience array loaded
- WHEN inspected
- THEN zero placeholders, highlights non-empty, periods accurate

### Requirement: Bilingual enforcement at compile time

The system MUST guarantee every published section exists in ES and EN via `Localized<T>` type. Missing locale key MUST be a TypeScript error under `tsc -b`. NO runtime fallbacks to other locale.

#### Scenario: Missing EN key fails build

- GIVEN a Project with only `es` field
- WHEN `npm run typecheck` runs
- THEN TypeScript error: Property 'en' is missing

#### Scenario: Missing ES key fails build

- GIVEN a Skill with only `en` field
- WHEN `npm run typecheck` runs
- THEN TypeScript error: Property 'es' is missing

### Requirement: CV PDF asset strategy

The system MUST serve the CV PDF from external host (Google Drive viewer) via `personal.cvUrl`. NO PDF in repo. `CVLink` component MUST be single source for all CV links (hero, footer).

#### Scenario: CV URL is external Drive viewer

- GIVEN personal.cvUrl
- WHEN validated
- THEN URL matches Drive viewer pattern, not local path

### Requirement: i18n dictionary completeness

The system MUST provide ES/EN keys for all new component copy: project fields, skill categories, experience fields, footer, hero summary/cta. Key parity enforced by `Dictionary` type.

#### Scenario: New i18n keys exist in both locales

- GIVEN updated `src/lib/i18n/es.ts` and `en.ts`
- WHEN typecheck runs
- THEN no missing keys, Dictionary satisfied