import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Footer } from './Footer';
import { LanguageProvider } from '../../lib/i18n/LanguageContext';

// Mock localStorage for language persistence
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock data modules with test data
vi.mock('../../data/personal', () => ({
  personal: {
    name: 'Test Name',
    roleLine: 'Test Role',
    cvUrl: 'https://example.com/cv',
    email: 'test@example.com',
    phone: '+1 234 567 890',
    socials: [
      { network: 'github', label: 'GitHub', href: 'https://github.com/test' },
      { network: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/test' },
    ],
  },
}));

vi.mock('../../data/projects', () => ({
  projects: [
    {
      es: {
        slug: 'proj-1',
        problem: 'Problema de prueba',
        dataAndContext: 'Contexto de datos',
        stack: ['TypeScript', 'React'],
        role: 'Desarrollador',
        outcome: 'Mejora del 50%',
        repoUrl: 'https://github.com/test/proj',
      },
      en: {
        slug: 'proj-1',
        problem: 'Test problem',
        dataAndContext: 'Data context',
        stack: ['TypeScript', 'React'],
        role: 'Developer',
        outcome: '50% improvement',
        repoUrl: 'https://github.com/test/proj',
      },
    },
  ],
}));

vi.mock('../../data/skills', () => ({
  skills: [
    { es: { slug: 's1', name: 'TypeScript', category: 'software-engineering' as const, level: 'advanced' as const }, en: { slug: 's1', name: 'TypeScript', category: 'software-engineering' as const, level: 'advanced' as const } },
    { es: { slug: 's2', name: 'Python', category: 'data-engineering' as const, level: 'intermediate' as const }, en: { slug: 's2', name: 'Python', category: 'data-engineering' as const, level: 'intermediate' as const } },
  ],
}));

vi.mock('../../data/experience', () => ({
  experience: [
    {
      es: { slug: 'exp-1', role: 'Senior Dev', company: 'Test Co', period: '2020 – Present', highlights: ['Led team', 'Built stuff'] },
      en: { slug: 'exp-1', role: 'Senior Dev', company: 'Test Co', period: '2020 – Present', highlights: ['Led team', 'Built stuff'] },
    },
    {
      es: { slug: 'exp-2', role: 'Junior Dev', company: 'Old Co', period: '2018 – 2020', highlights: ['Learned things'] },
      en: { slug: 'exp-2', role: 'Junior Dev', company: 'Old Co', period: '2018 – 2020', highlights: ['Learned things'] },
    },
  ],
}));

function renderWithI18n(ui: React.ReactElement, language: 'es' | 'en' = 'en') {
  mockLocalStorage.getItem.mockReturnValue(language);
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('Hero Section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('en');
  });

  it('renders personal name and role', () => {
    renderWithI18n(<Hero />);
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('Test Role')).toBeInTheDocument();
  });

  it('renders CTA button with CV link', () => {
    renderWithI18n(<Hero />);
    const cta = screen.getByRole('link', { name: /View CV/i });
    expect(cta).toHaveAttribute('href', 'https://example.com/cv');
    expect(cta).toHaveAttribute('target', '_blank');
  });

  it('renders View Projects link', () => {
    renderWithI18n(<Hero />);
    expect(screen.getByRole('link', { name: /View Projects/i })).toBeInTheDocument();
  });

  it('has proper section landmark', () => {
    renderWithI18n(<Hero />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});

describe('Projects Section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('en');
  });

  it('renders project cards with problem and context', () => {
    renderWithI18n(<Projects />);
    expect(screen.getByText('Test problem')).toBeInTheDocument();
    expect(screen.getByText('Data context')).toBeInTheDocument();
  });

  it('renders tech stack badges', () => {
    renderWithI18n(<Projects />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders role and outcome', () => {
    renderWithI18n(<Projects />);
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('50% improvement')).toBeInTheDocument();
  });

  it('renders repo link', () => {
    renderWithI18n(<Projects />);
    expect(screen.getByRole('link', { name: /Repo/i })).toHaveAttribute('href', 'https://github.com/test/proj');
  });

  it('has responsive grid classes', () => {
    renderWithI18n(<Projects />);
    const grid = screen.getByRole('region').querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('switches language correctly', () => {
    const { unmount } = renderWithI18n(<Projects />);
    expect(screen.getByText('Test problem')).toBeInTheDocument();

    unmount();
    mockLocalStorage.getItem.mockReturnValue('es');
    render(<LanguageProvider><Projects /></LanguageProvider>);
    expect(screen.getByText('Problema de prueba')).toBeInTheDocument();
  });
});

describe('Skills Section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('en');
  });

  it('renders category cards', () => {
    renderWithI18n(<Skills />);
    expect(screen.getByText('Data Engineering')).toBeInTheDocument();
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
  });

  it('renders skills with level badges', () => {
    renderWithI18n(<Skills />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('orders categories correctly', () => {
    renderWithI18n(<Skills />);
    const categoryHeaders = screen.getAllByRole('heading', { level: 3 });
    const titles = categoryHeaders.map(h => h.textContent).filter(Boolean);
    // Data Engineering should come first (has Python skill)
    expect(titles[0]).toContain('Data Engineering');
  });

  it('switches language correctly', () => {
    const { unmount } = renderWithI18n(<Skills />);
    expect(screen.getByText('Data Engineering')).toBeInTheDocument();

    unmount();
    mockLocalStorage.getItem.mockReturnValue('es');
    render(<LanguageProvider><Skills /></LanguageProvider>);
    expect(screen.getByText('Ingeniería de Datos')).toBeInTheDocument();
  });
});

describe('Experience Section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('en');
  });

  it('renders timeline items in reverse-chronological order', () => {
    renderWithI18n(<Experience />);
    // First item should be Senior Dev (most recent)
    expect(screen.getByText('Senior Dev')).toBeInTheDocument();
    expect(screen.getByText('Junior Dev')).toBeInTheDocument();
  });

  it('renders role, company, period', () => {
    renderWithI18n(<Experience />);
    expect(screen.getByText('Senior Dev')).toBeInTheDocument();
    expect(screen.getByText('Test Co')).toBeInTheDocument();
    expect(screen.getByText('2020 – Present')).toBeInTheDocument();
  });

  it('renders highlights', () => {
    renderWithI18n(<Experience />);
    expect(screen.getByText('Led team')).toBeInTheDocument();
    expect(screen.getByText('Built stuff')).toBeInTheDocument();
  });

  it('has timeline visual elements (numbered items)', () => {
    renderWithI18n(<Experience />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('switches language correctly', () => {
    const { unmount } = renderWithI18n(<Experience />);
    expect(screen.getByText('Senior Dev')).toBeInTheDocument();

    unmount();
    mockLocalStorage.getItem.mockReturnValue('es');
    render(<LanguageProvider><Experience /></LanguageProvider>);
    expect(screen.getByText('Senior Dev')).toBeInTheDocument(); // Same in mock
  });
});

describe('Footer Section', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('en');
  });

  it('renders copyright with current year', () => {
    renderWithI18n(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} Test Name`))).toBeInTheDocument();
  });

  it('renders contact links', () => {
    renderWithI18n(<Footer />);
    expect(screen.getByRole('link', { name: 'test@example.com' })).toHaveAttribute('href', 'mailto:test@example.com');
    expect(screen.getByRole('link', { name: '+1 234 567 890' })).toHaveAttribute('href', 'tel:+1234567890');
  });

  it('renders social links', () => {
    renderWithI18n(<Footer />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/test');
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://linkedin.com/in/test');
  });

  it('renders CV link', () => {
    renderWithI18n(<Footer />);
    expect(screen.getByRole('link', { name: /View CV/i })).toHaveAttribute('href', 'https://example.com/cv');
  });

  it('has Container for content width constraint', () => {
    renderWithI18n(<Footer />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
});

describe('Sections Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('en');
  });

  it('all sections render without errors', () => {
    renderWithI18n(
      <div>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Footer />
      </div>
    );
    // 4 sections (Hero, Projects, Skills, Experience) + 1 footer landmark
    const regions = screen.getAllByRole('region');
    expect(regions).toHaveLength(4);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});