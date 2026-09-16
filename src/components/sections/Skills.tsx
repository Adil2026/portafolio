import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Heading } from '../ui/Heading';
import { skills } from '../../data/skills';
import { useI18n } from '../../lib/i18n/LanguageContext';
import type { Skill, SkillCategory, SkillLevel } from '../../types/content';

const CATEGORY_ORDER: SkillCategory[] = [
  'data-engineering',
  'data-analytics',
  'software-engineering',
];

const LEVEL_STYLES: Record<SkillLevel, string> = {
  beginner: 'bg-muted text-muted-foreground',
  intermediate: 'bg-secondary text-secondary-foreground',
  advanced: 'bg-accent text-accent-foreground',
  expert: 'bg-primary text-primary-foreground',
};

/**
 * Skill badge component — inline level indicator.
 */
function SkillBadge({ skill }: { skill: Skill }) {
  const { t } = useI18n();
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${LEVEL_STYLES[skill.level]}`}>
      {t(`skills.${skill.level}`)}
    </span>
  );
}

/**
 * Category card — groups skills by category.
 */
function CategoryCard({ category, skills: categorySkills }: { category: SkillCategory; skills: Skill[] }) {
  const { t } = useI18n();
  const categoryKeyMap: Record<SkillCategory, 'dataEngineering' | 'dataAnalytics' | 'softwareEngineering'> = {
    'data-engineering': 'dataEngineering',
    'data-analytics': 'dataAnalytics',
    'software-engineering': 'softwareEngineering',
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t(`skills.${categoryKeyMap[category]}`)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {categorySkills.map((skill, i) => (
            <div key={skill.slug ?? i} className="flex items-center gap-2">
              <span className="font-medium text-sm">{skill.name}</span>
              <SkillBadge skill={skill} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skills section — grouped by category with level badges.
 *
 * Composed from primitives: Section, Container, Card, Heading.
 * Data from Localized<Skill>[] (skills.ts).
 * Categories ordered: Data Engineering → Data Analytics → Software Engineering.
 */
export function Skills() {
  const { t } = useI18n();
  const currentLang = t('nav.home') === 'Home' ? 'en' : 'es';
  const localizedSkills = skills.map((s) => s[currentLang as 'es' | 'en']);

  const skillsByCategory = localizedSkills.reduce<Record<SkillCategory, Skill[]>>(
    (acc, skill) => {
      acc[skill.category].push(skill);
      return acc;
    },
    {
      'data-engineering': [],
      'data-analytics': [],
      'software-engineering': [],
    }
  );

  return (
    <Section headingId="skills-heading" size="lg">
      <Container size="xl">
        <div className="space-y-8">
          <Heading as="h2" id="skills-heading" size="3xl" weight="semibold">
            {t('skills.title')}
          </Heading>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {CATEGORY_ORDER.map((category) => {
              const categorySkills = skillsByCategory[category];
              if (categorySkills.length === 0) return null;
              return (
                <CategoryCard
                  key={category}
                  category={category}
                  skills={categorySkills}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Skills;