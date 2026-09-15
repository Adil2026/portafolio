import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Heading } from '../ui/Heading';
import { Link } from '../ui/Link';
import { projects } from '../../data/projects';
import { useI18n } from '../../lib/i18n/LanguageContext';
import type { Project } from '../../types/content';

interface ProjectCardProps {
  project: Project;
}

/**
 * Individual project card — composed from Card primitive.
 */
function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{project.problem}</CardTitle>
        <CardDescription className="text-sm max-h-16 overflow-hidden">
          {project.dataAndContext}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Role
          </p>
          <p className="text-sm">{project.role}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Outcome
          </p>
          <p className="text-sm font-medium text-primary">{project.outcome}</p>
        </div>
      </CardContent>
      {(project.repoUrl || project.demoUrl) && (
        <CardFooter className="flex items-center gap-4 pt-4">
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              className="text-sm font-medium"
            >
              Repo
            </Link>
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              className="text-sm font-medium"
            >
              Demo
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

/**
 * Projects section — responsive grid of project cards.
 *
 * Composed from primitives: Section, Container, Card, Heading, Link.
 * Data from Localized<Project>[] (projects.ts).
 * Grid: 1 col <640px, 2 cols 640-1024px, 3 cols >1024px.
 */
export function Projects() {
  const { t } = useI18n();
  const currentLang = t('nav.home') === 'Home' ? 'en' : 'es';
  const localizedProjects = projects.map((p) => p[currentLang as 'es' | 'en']);

  return (
    <Section headingId="projects-heading" size="lg">
      <Container size="xl">
        <div className="space-y-8">
          <Heading as="h2" id="projects-heading" size="3xl" weight="semibold">
            {t('projects.title')}
          </Heading>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {localizedProjects.map((project, i) => (
              <ProjectCard key={project.slug ?? i} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Projects;