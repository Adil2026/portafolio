import { CVLink } from './components/CVLink'
import { personal } from './data/personal'
import { useI18n } from './lib/i18n/LanguageContext'

/**
 * App shell — responsive layout with section slots.
 *
 * Identity (header/hero/footer) is CV-backed and data-driven: facts come
 * from `src/data/personal.ts`, copy from `useI18n` (defaults to English,
 * constitution §5). No name, contact, or CV URL is hardcoded here.
 */
function App() {
  const { t } = useI18n()
  const currentYear = new Date().getFullYear()
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <header className="border-b border-neutral-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-sm font-semibold tracking-wide">{personal.name}</p>
            <p className="text-xs text-neutral-400">{personal.roleLine}</p>
          </div>
          <p className="text-sm font-medium tracking-wide">{t('nav.home')}</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        <section aria-labelledby="hero-heading" className="py-24">
          <h1 id="hero-heading" className="text-4xl font-bold">
            {personal.name}
          </h1>
          <p className="mt-2 text-lg text-neutral-300">{personal.roleLine}</p>
          <p className="mt-1 text-sm text-neutral-500">{personal.location}</p>
          <p className="mt-4 text-neutral-400">{t('hero.summary')}</p>
          <p className="mt-6">
            <CVLink
              label={t('hero.cta')}
              className="inline-block rounded bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-950"
            />
          </p>
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
        <div className="mx-auto max-w-4xl space-y-3 px-6 text-sm text-neutral-500">
          <p>
            © {currentYear} {personal.name} — {t('footer.rightsReserved')}
          </p>
          <address className="flex flex-wrap gap-x-4 gap-y-1 not-italic">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <a href={`tel:${personal.phone.replace(/\s/g, '')}`}>{personal.phone}</a>
            {personal.socials.map((social) => (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
            <CVLink label={t('hero.cta')} />
          </address>
        </div>
      </footer>
    </div>
  )
}

export default App
