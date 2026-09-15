# Tasks: CV-Backed Site Identity

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~300–420 |
| 400-line budget risk | Medium (upper bound touches budget; single cohesive slice) |
| 800-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | auto-chain |
| Chain strategy | pending (single PR; no chain needed) |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | CV-backed identity end-to-end (data + i18n + CVLink + App + tests) | Single PR | `npx tsc -b; npx vitest run` | `npm run dev` check hero/footer in ES+EN; `npm run build` | Revert single PR; no migrations or external state |

Threat matrix: N/A per design (no RED-test tasks required).

## Phase 1: Foundation — data + i18n contracts

- [x] 1.1 Extend `src/data/personal.ts` with location, email, phone, `socials: SocialLink[]`, real `cvUrl`
- [x] 1.2 Update `src/lib/i18n/types.ts` to `hero { summary, cta }` + `footer { rightsReserved }`; drop retired keys
- [x] 1.3 Update `src/lib/i18n/es.ts` and `src/lib/i18n/en.ts` with CV-backed copy (EN summary one-line swap)

## Phase 2: Core implementation — CVLink + App rewire

- [x] 2.1 Create `src/components/CVLink.tsx` reading `personal.cvUrl` with `label` prop, `target="_blank"`, `rel="noopener noreferrer"`
- [x] 2.2 Rewire `src/App.tsx` header (name + roleLine) and hero (`h1` name, role, summary, CVLink CTA)
- [x] 2.3 Rewire `src/App.tsx` footer to compose year + name in JSX with contacts + CVLink, no `t()` interpolation

## Phase 3: Testing / verification

- [x] 3.1 Extend `src/data/content.test.ts` with real-facts assertions; reject `example.com/cv` placeholder
- [x] 3.2 Create `src/components/CVLink.test.tsx` for href/target/rel/name plus hero⊕footer single-source
- [x] 3.3 Update `src/test/App.test.tsx` and `src/lib/i18n/i18n.test.tsx` for h1 name, role, footer compose, parity no-leak
- [x] 3.4 Verify `npx tsc -b`, `npx vitest run`, `npm run build` green in ES and EN
