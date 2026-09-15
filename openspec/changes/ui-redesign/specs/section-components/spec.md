# section-components Specification

## Purpose

Composed portfolio sections built from primitives: Hero, Projects, Skills, Experience, Footer. Data-driven rendering from CV-backed sources. Bilingual ES/EN enforced by `Localized<T>`.

## Requirements

### Requirement: Hero section

The system MUST provide `Hero` component rendering: name (h1), roleLine, location, summary (i18n), CV CTA (CVLink). MUST use `Section`, `Container`, `Heading`, `Link` primitives. MUST be first content section.

#### Scenario: Hero renders CV identity (ES)

- GIVEN locale ES, personal data loaded
- WHEN Hero renders
- THEN h1=name, roleLine visible, location, summary=ES, CTA=ES CVLink

#### Scenario: Hero renders CV identity (EN)

- GIVEN locale EN, personal data loaded
- WHEN Hero renders
- THEN h1=name, roleLine visible, location, summary=EN, CTA=EN CVLink

### Requirement: Projects section

The system MUST provide `Projects` component rendering `Localized<Project>[]` as Card grid. Each project card MUST show: problem, dataAndContext, stack badges, role, outcome, repo/demo links. MUST use `Section`, `Container`, `Card`, `Heading` primitives. Empty state MUST show helpful message.

#### Scenario: Projects grid renders from data

- GIVEN 3 CV-backed projects in current locale
- WHEN Projects renders
- THEN 3 cards with all required fields, responsive grid (1/2/3 cols)

#### Scenario: Empty projects shows message

- GIVEN projects array is empty
- WHEN Projects renders
- THEN "No projects published yet" in current locale

### Requirement: Skills section

The system MUST provide `Skills` component rendering `Localized<Skill>[]` grouped by category (data-engineering, data-analytics, software-engineering, tools). Each skill: name, level badge. MUST use `Section`, `Container`, `Heading`, `Card` primitives.

#### Scenario: Skills grouped by category

- GIVEN skills across 4 categories
- WHEN Skills renders
- THEN 4 category groups, each with skill cards showing name+level

### Requirement: Experience section

The system MUST provide `Experience` component rendering `Localized<Experience>[]` as timeline. Each entry: role, company, period, highlights list. MUST use `Section`, `Container`, `Card`, `Heading` primitives. Reverse chronological order.

#### Scenario: Experience timeline renders

- GIVEN 2 CV-backed experiences
- WHEN Experience renders
- THEN timeline with role, company, period, highlights in reverse-chron order

### Requirement: Footer section

The system MUST provide `Footer` component: copyright (runtime year + name from data), rightsReserved (i18n), email, phone, socials (LinkedIn, GitHub), CVLink. MUST use `Section`, `Container`, `Link`, `CVLink` primitives. NO hardcoded name/year.

#### Scenario: Footer composes from data

- GIVEN any locale, current year
- WHEN Footer renders
- THEN © {year} {name}, rightsReserved localized, contacts from data, CVLink