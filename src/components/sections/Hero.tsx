import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Link } from '../ui/Link';
import { CVLink } from '../CVLink';
import { personal } from '../../data/personal';
import { useI18n } from '../../lib/i18n/LanguageContext';

/**
 * Hero section — identity and primary CTA.
 *
 * Composed from primitives: Section, Container, Heading, Link, CVLink.
 * All copy from i18n; name/role/CV URL from `personal` data (single source).
 */
export function Hero() {
  const { t } = useI18n();

  return (
    <Section headingId="hero-heading" size="xl" aria-labelledby="hero-heading">
      <Container size="lg">
        <div className="text-center space-y-6">
          <Heading as="h1" id="hero-heading" size="4xl" weight="bold">
            {personal.name}
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {personal.roleLine}
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t('hero.summary')}
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <CVLink
              label={t('hero.cta')}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-w-button-sm"
            />
            <Link
              href="#projects"
              underline="hover"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-w-button-sm"
            >
              {t('hero.viewWork')}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Hero;