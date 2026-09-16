import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Heading } from '../ui/Heading';
import { experience } from '../../data/experience';
import { useI18n } from '../../lib/i18n/LanguageContext';
import type { Experience as ExperienceType } from '../../types/content';

/**
 * Experience timeline item.
 */
function TimelineItem({ item, index, total }: { item: ExperienceType; index: number; total: number }) {
  const { t } = useI18n();
  const isLast = index === total - 1;

  return (
    <div className="relative flex gap-6">
      {/* Timeline line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
          {index + 1}
        </div>
        {!isLast && (
          <div className="absolute left-1/2 top-10 h-full w-0.5 -translate-x-1/2 bg-border" />
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 min-w-0">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-baseline gap-3 flex-wrap">
              <CardTitle className="text-lg">{item.role}</CardTitle>
              <span className="text-sm text-muted-foreground">{item.company}</span>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              {item.period}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {t('experience.highlights')}
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm">
              {item.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Experience section — reverse-chronological timeline.
 *
 * Composed from primitives: Section, Container, Card, Heading.
 * Data from Localized<Experience>[] (experience.ts).
 * Timeline: numbered dots with connecting line, most recent first.
 */
export function Experience() {
  const { t } = useI18n();
  const currentLang = t('nav.home') === 'Home' ? 'en' : 'es';
  const localizedExperience = experience.map((e) => e[currentLang as 'es' | 'en']);

  return (
    <Section headingId="experience-heading" size="lg">
      <Container size="xl">
        <div className="space-y-8">
          <Heading as="h2" id="experience-heading" size="3xl" weight="semibold">
            {t('experience.title')}
          </Heading>
          <div className="space-y-8">
            {localizedExperience.map((item, i) => (
              <TimelineItem key={item.slug ?? i} item={item} index={i} total={localizedExperience.length} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Experience;