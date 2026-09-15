import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Footer } from './components/sections/Footer';
import { useI18n } from './lib/i18n/LanguageContext';

/**
 * App shell — composes section components.
 *
 * All sections are data-driven and use primitives from the design system.
 * Content comes from `src/data/*` (Localised<T>[]) and i18n dictionaries.
 * No hardcoded copy, names, or URLs in this file (constitution §4, §5).
 */
function App() {
  useI18n(); // ensure LanguageContext is initialized

  return (
    <div className="min-h-screen bg-background text-background-foreground antialiased">
      <Hero />
      <main>
        <Projects />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

export default App;