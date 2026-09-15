# site-identity Specification

## Purpose

CV-backed public identity: name, single-line DE-first role, summary, contacts, CV link, and rights footer. Facts live in data; copy lives in i18n; components render from data with no hardcoding (constitution §4, §5).

## Requirements

### Requirement: CV-backed personal facts

The system MUST source identity facts from a typed `Personal` record: name `Adilson Vargas Añez`, single-line role (DE-first), location `Santa Cruz de la Sierra, Bolivia`, email, phone `+591 70917928`, socials (LinkedIn, GitHub), and `cvUrl` `https://drive.google.com/file/d/1jg10ogYu65Dc8WsecEroW7XprjF82wR9/view?usp=drive_link`. Components MUST NOT hardcode name, contacts, or CV URL.

#### Scenario: Identity renders from data

- GIVEN the personal record with CV facts
- WHEN header, hero, or footer renders
- THEN displayed name, contacts, and CV URL equal the record values

#### Scenario: Placeholder CV URL rejected

- GIVEN any `cvUrl` of `https://example.com/cv`
- WHEN validation runs
- THEN the build MUST fail or the test MUST flag it as placeholder

### Requirement: Header and hero identity rendering

The header MUST show name plus single-line role; the hero MUST render name in `h1`, single-line role, `hero.summary`, and a CV CTA. Role order MUST be DE-first per §1.

#### Scenario: Hero shows CV identity (ES)

- GIVEN locale ES
- WHEN the hero renders
- THEN `h1` is the name, role line is visible, and summary matches the ES draft

#### Scenario: No placeholder identity remains

- GIVEN the change applied
- WHEN header or hero renders in either locale
- THEN no `example.com` URL and no generic role placeholder appear

### Requirement: Footer identity rendering

The footer MUST compose `© {year} {name}` from runtime year plus data name, show the localized rights phrase, and link email, LinkedIn, GitHub, and CV. It MUST NOT hardcode the name and MUST NOT use `t()` interpolation for year/name.

#### Scenario: Footer composes year and name

- GIVEN any calendar year
- WHEN the footer renders in ES or EN
- THEN it shows the current year, the data name, and the localized rights phrase

### Requirement: CVLink external viewer behavior

`CVLink` MUST open the Drive viewer `cvUrl` in a new tab with `rel="noopener"` and a localized accessible name, and MUST be reused for hero CTA and footer CV link.

#### Scenario: CV link opens viewer in new tab

- GIVEN the CVLink rendered
- WHEN activated
- THEN it opens the exact Drive viewer URL in a new tab with `noopener`

#### Scenario: Single CV source

- GIVEN hero CTA and footer CV link rendered
- WHEN their `href` values are compared
- THEN both equal the personal record `cvUrl`

### Requirement: Bilingual identity copy

The system MUST provide `hero.summary` and `hero.cta` in ES and EN with full key parity, and MUST retire the dead `footer.rights` template. The EN summary draft is validation-pending and MUST be swappable in one line pre-merge.

#### Scenario: Bilingual parity holds

- GIVEN either locale
- WHEN header, hero, or footer renders
- THEN every identity string exists in that locale with no fallback leak

#### Scenario: Dead rights template gone

- GIVEN the i18n dictionaries
- WHEN inspected
- THEN no `{year}`-style interpolated `footer.rights` key remains

### Requirement: Identity test coverage

Vitest MUST cover the personal facts block, CVLink attributes, and accessible names of header/hero/footer identity elements.

#### Scenario: Coverage catches regression

- GIVEN a changed name, URL, or missing locale key
- WHEN the suite runs
- THEN the personal, CVLink, or parity test fails with the offending value
