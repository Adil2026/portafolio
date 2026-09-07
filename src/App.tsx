import { useI18n } from './lib/i18n/LanguageContext'

/**
 * App shell — responsive layout with section slots.
 *
 * Section headings and the hero headline are localizable via `useI18n`
 * (defaults to English, constitution §5). The typed content data
 * (src/data/*) is test-covered at the module layer; list rendering lands in
 * a later content change.
 *
 * TODO(content): the CV link component will read `cvUrl` from
 * `src/data/personal.ts` and render in the header/footer (constitution §5).
 */
function App() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <header className="border-b border-neutral-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          {/* TODO(content): name + role line from src/data/personal.ts */}
          <p className="text-sm font-medium tracking-wide">{t('nav.home')}</p>
          {/* TODO(design): navigation slots */}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        <section aria-labelledby="hero-heading" className="py-24">
          <h1 id="hero-heading" className="text-4xl font-bold">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-neutral-400">{t('hero.subtitle')}</p>
        </section>

        <section aria-labelledby="projects-heading" className="py-12">
          <h2 id="projects-heading" className="text-2xl font-semibold">{t('projects.title')}</h2>
          {/* TODO(content): Localized<Project>[] list from src/data/projects.ts */}
        </section>

        <section aria-labelledby="skills-heading" className="py-12">
          <h2 id="skills-heading" className="text-2xl font-semibold">{t('skills.title')}</h2>
          {/* TODO(content): Localized<Skill>[] list from src/data/skills.ts */}
        </section>

        <section aria-labelledby="experience-heading" className="py-12">
          <h2 id="experience-heading" className="text-2xl font-semibold">{t('experience.title')}</h2>
          {/* TODO(content): Localized<Experience>[] list from src/data/experience.ts */}
        </section>
      </main>

      <footer className="border-t border-neutral-800 py-8">
        <div className="mx-auto max-w-4xl px-6 text-sm text-neutral-500">
          {/* TODO(content): social links; CV link reads cvUrl from src/data/personal.ts */}
          © {new Date().getFullYear()} Adilson Vargas Añez
        </div>
      </footer>
    </div>
  )
}

export default App