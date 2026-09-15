import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { CVLink } from '../CVLink';
import { personal } from '../../data/personal';
import { useI18n } from '../../lib/i18n/LanguageContext';

/**
 * Footer section — copyright, contacts, socials, CV link.
 *
 * Composed from primitives: Section, Container, Heading, Link, CVLink.
 * All data from `personal` + i18n; no hardcoded values.
 */
export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <Section headingId="footer-heading" size="sm" container={false} className="border-t border-border">
      <Container size="xl" className="py-8">
        <Heading as="h2" id="footer-heading" className="sr-only">
          {t('footer.rights')}
        </Heading>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {t('footer.rights')
              .replace('{year}', String(currentYear))
              .replace('Adilson Vargas Añez', personal.name)}
          </p>

          <address className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground not-italic">
            <a href={`mailto:${personal.email}`} className="hover:text-foreground transition-colors">
              {personal.email}
            </a>
            <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">
              {personal.phone}
            </a>
            {personal.socials.map((social) => (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {social.label}
              </a>
            ))}
            <CVLink
              label={t('hero.cta')}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            />
          </address>
        </div>
      </Container>
    </Section>
  );
}

export default Footer;