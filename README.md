# portafolio

Professional portfolio website for Adilson Vargas Añez.

- **Primary narrative**: Data Engineering
- **Secondary line**: Data Analytics
- **Technical base**: Software Engineering

Built with React + TypeScript + Vite + Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 22 (see `.nvmrc`). `npx nvm use` will pick it up if you use nvm.
- npm (ships with Node).

### Install

```bash
npm ci
```

`npm ci` installs dependencies exactly from the committed `package-lock.json` for a reproducible build.

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm test` | Run Vitest once (hermetic, CI-safe) |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run typecheck` | Type-check the project (`tsc -b`) |
| `npm run build` | Type-check + build for production (`tsc -b && vite build`), output to `dist/` |

### Testing

```bash
npm test
```

Coverage is report-only. Run `npx vitest run --coverage` to view a coverage report locally; it is not a CI gate.

## Deployment (Vercel)

The site deploys automatically from GitHub via Vercel:

- **Framework**: auto-detected (Vite).
- **Build command**: `npm run build` (already set in `package.json`; Vercel detects it from the framework default).
- **Output directory**: `dist`.
- **Production branch**: `main`. Pushes to `main` deploy to production; pull requests get preview deployments automatically.

No manual configuration is required beyond importing the repo into Vercel — the framework defaults match this project.

## CI

Every pull request and push to `main` runs a GitHub Actions workflow (`.github/workflows/ci.yml`):

1. `npm ci`
2. `npx tsc -b` (typecheck)
3. `npx vitest run` (tests)
4. `npm run build`

Lint and coverage are intentionally NOT CI gates (constitution §8 — the baseline is typecheck + tests + build).

## CV / Assets

The CV PDF lives outside the repository (constitution §5) and is therefore NOT
deployable by Vercel (Vercel builds from GitHub). To present the CV publicly it
must be hosted on an external service and linked via a direct URL:

- Google Drive / Dropbox / OneDrive "direct link" to the PDF, OR
- a personal file host.

Recommendation: Google Drive direct link (widely accessible, stable, no auth).
Fill the real URL in `src/data/personal.ts` `cvUrl` (currently a
`https://example.com/cv` placeholder). The PDF stays untracked; `dist/` and the
build never include it.

## Repository Structure

```
├── .github/workflows/ci.yml   # CI pipeline
├── specs/                     # Governance — constitution (source of truth)
├── openspec/                  # SDD artifacts
├── src/
│   ├── lib/i18n/              # Typed bilingual localization (es/en)
│   ├── types/content.ts       # Project, Skill, Experience types
│   ├── data/                  # Data-driven content modules (placeholders)
│   └── App.tsx                # App shell
└── ...
```

Content is separated from presentation (constitution §4): projects, skills, and
experience live in typed, data-driven structures under `src/data/`, never
hardcoded in components.

## License

Private project. All rights reserved.
