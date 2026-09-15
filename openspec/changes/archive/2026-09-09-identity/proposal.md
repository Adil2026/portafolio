# Proposal: CV-Backed Site Identity

## Intent

Replace placeholder hero/header/footer with CV-backed identity; fix §4 hardcoded footer name.

## Scope

### In Scope
- Extend `Personal`; wire header/hero/footer to data
- i18n: add `hero.summary`+`hero.cta`, retire dead `footer.rights`
- New `CVLink` (hero CTA + footer)
- Update/extend Vitest coverage

### Out of Scope
- Language switcher UI, nav anchors, meta tags
- Projects/skills/experience content

## Capabilities

### New Capabilities
- `site-identity`: CV-backed name, stacked role, summary, contacts, CV link, rights footer

### Modified Capabilities
- None (no `openspec/specs/` yet)

## Approach

Facts in data, copy in i18n. Header/`h1` use name + single-line roleLine; hero adds summary + `CVLink`; footer composes year+name (no interpolation).

## Confirmed Decisions (do NOT reopen)

1. CV URL = https://drive.google.com/file/d/1jg10ogYu65Dc8WsecEroW7XprjF82wR9/view?usp=drive_link (Drive viewer, new tab; file ID `1jg10ogYu65Dc8WsecEroW7XprjF82wR9` if direct download needed)
2. Role line = single line, DE-first per §1 (CV literal: Analista de Datos | Ingeniero de Datos Junior | Ingeniero de Sistemas)
3. Hero summary = trimmed 1–2 sentences from Perfil Profesional + EN draft below for validation
4. Contact surface = +591 70917928 + adilsonva2016@gmail.com + LinkedIn www.linkedin.com/in/adilson-vargas-añez + GitHub https://github.com/Adil2026 + Santa Cruz de la Sierra, Bolivia
5. Footer = with rights reserved (localized), year+name composed in component (no `t()` interpolation)

## Summary Drafts

- ES: «Ingeniero de Sistemas con más de 7 años en software, bases de datos y sistemas de información; SQL avanzado, modelado de datos, ETL y Python (pandas), enfocado en desarrollarse como Ingeniero de Datos.»
- EN (DRAFT — needs validation): "Systems Engineer with 7+ years in software, databases, and information systems; advanced SQL, data modeling, ETL and Python (pandas), focused on growing as a Data Engineer."

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/personal.ts` | Modified | Location, email, phone, socials, real cvUrl |
| `src/lib/i18n/types.ts`, `es.ts`, `en.ts` | Modified | Add summary/cta; drop dead rights |
| `src/App.tsx` | Modified | Data-driven header/hero/footer |
| `src/components/CVLink.tsx` | New | New-tab viewer link from `cvUrl` |
| `src/**/*.test.*` | Modified | Personal block; CVLink/a11y-name tests |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| EN draft rejected | Med | One-line swap pre-merge |
| Viewer-vs-download | Low | Default viewer; file ID reserved |
| CI billing block (obs #80) | Med | Local `tsc -b`, tests, build |

## Rollback Plan

Revert single PR. No migrations or external state.

## Dependencies

- None. Drive sharing already established.

## Success Criteria

- [ ] Header/hero/footer render CV facts in ES+EN, no hardcoding
- [ ] CV CTA opens Drive viewer in new tab
- [ ] `tsc -b`, tests, build green; single PR ~300–420 lines
