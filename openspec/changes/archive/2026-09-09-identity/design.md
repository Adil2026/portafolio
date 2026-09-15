# Design: CV-Backed Site Identity

## Technical Approach

Facts in data, copy in i18n, per proposal. Extend `Personal` with CV contacts, add `hero.summary`/`hero.cta` + `footer.rightsReserved` (retiring `hero.title`/`subtitle` and interpolated `footer.rights`), rewire `App.tsx` header/hero/footer to data, and add a single `CVLink` reused in hero + footer. Covers spec `site-identity` (6 reqs / 10 scenarios).

## Architecture Decisions

### Personal shape (locale-neutral facts)

| Option | Tradeoff | Decision |
|---|---|---|
| `Localized` role/contacts | Localizes facts; duplicates URLs per locale | Reject — facts are locale-neutral |
| Flat `Personal` + `SocialLink[]` | One source; footer iterates | **Accept** |

`roleLine` stays a single DE-first string (confirmed CV literal, not reopened).

### i18n delta

| Option | Tradeoff | Decision |
|---|---|---|
| Keep `hero.title`/`subtitle` | Dead keys after h1→name | Reject |
| Add `summary`/`cta`, retire `title`/`subtitle` + `footer.rights` | Minimal live surface; parity via `Messages` type + `keysOf` test | **Accept** |

`footer.rightsReserved` is a plain phrase (no `{year}`); year+name compose in JSX, never via `t()` interpolation. EN summary remains a one-line swap in `en.ts`.

### CVLink binding

| Option | Tradeoff | Decision |
|---|---|---|
| `href` prop from callers | Flexible; single-source depends on callers | Reject |
| Read `personal.cvUrl` internally, `label` prop | Guarantees spec "Single CV source"; label stays localized | **Accept** |

Anchor: `target="_blank"`, `rel="noopener noreferrer"` (satisfies `noopener` requirement).

## Data Flow

    personal.ts ──→ App.tsx (header/hero/footer) ──→ CVLink ──→ Drive viewer (new tab)
    es.ts / en.ts ──→ useI18n(t) ──→ hero.summary / hero.cta / footer.rightsReserved

Parity: `Messages` type makes a missing ES/EN key a `tsc -b` error; existing `keysOf` test fails on drift.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/personal.ts` | Modify | Extend `Personal`: `location`, `email`, `phone`, `socials: SocialLink[]`, real `cvUrl` |
| `src/lib/i18n/types.ts` | Modify | `hero: { summary, cta }`; `footer: { rightsReserved }`; drop retired keys |
| `src/lib/i18n/es.ts`, `en.ts` | Modify | CV-backed copy; EN summary one-line swappable draft |
| `src/components/CVLink.tsx` | Create | New-tab viewer link from `personal.cvUrl`, localized `label` prop |
| `src/App.tsx` | Modify | Data-driven header (name+role), hero (`h1` name, role, summary, CVLink), footer (year+name compose, contacts) |
| `src/data/content.test.ts` | Modify | Real-facts assertions; reject `example.com/cv` placeholder |
| `src/components/CVLink.test.tsx` | Create | `href`/`target`/`rel`/accessible-name + single-source test |
| `src/test/App.test.tsx`, `src/lib/i18n/i18n.test.tsx` | Modify | `h1` name, role, footer compose, parity expectations |

## Interfaces / Contracts

```ts
export interface SocialLink { network: 'linkedin' | 'github'; href: string; label: string }
export interface Personal {
  name: string; roleLine: string; location: string;
  email: string; phone: string; socials: SocialLink[]; cvUrl: string;
}
// CVLink: ({ label, className }: { label: string; className?: string }) => <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer">
```

Contacts: `+591 70917928`, `adilsonva2016@gmail.com`, LinkedIn normalized to `https://www.linkedin.com/in/adilson-vargas-añez`, GitHub `https://github.com/Adil2026`, `cvUrl` = confirmed Drive viewer URL.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Personal facts; placeholder-URL rejection | `content.test.ts` assertions on record values |
| Unit | CVLink `href`/`target`/`rel`/name; hero⊕footer same `cvUrl` | `CVLink.test.tsx` with Testing Library |
| Integration | Parity: every identity string in ES+EN, no fallback leak | Existing `keysOf` test + `Messages` type (`tsc -b`) |
| Component/a11y | `h1` = name, role visible, footer year+name+rights phrase | `App.test.tsx` via `getByRole`, per-locale render |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Single PR (~300–420 lines); rollback = revert PR. Verify locally via `tsc -b`, `vitest run`, `vite build`.

## Open Questions

- [ ] EN summary draft validation pre-merge (non-blocking; one-line swap in `en.ts`)
- [ ] Confirm LinkedIn canonical URL (`www.linkedin.com/in/...` → `https://...` normalization assumed)
