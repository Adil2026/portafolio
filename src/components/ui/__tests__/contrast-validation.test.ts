import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Contrast Validation Test
 *
 * Parses OKLCH color tokens from @theme in app.css and validates
 * all color pair combinations used in UI primitives meet WCAG 2.1 AA:
 * - 4.5:1 for normal text
 * - 3:1 for large text (18pt+/14pt+ bold) and UI components
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_CSS_PATH = join(__dirname, '..', '..', '..', 'app.css');

interface OklchColor {
  l: number; // Lightness 0-1
  c: number; // Chroma 0-0.4
  h: number; // Hue 0-360
}

interface ColorToken {
  name: string;
  light: OklchColor;
  dark: OklchColor;
}

interface ContrastResult {
  pair: string;
  lightRatio: number;
  darkRatio: number;
  passesAA: boolean;
  passesAALarge: boolean;
}

/**
 * Parse OKLCH string to object
 * Format: oklch(L C H) or oklch(L C H / alpha)
 */
function parseOklch(oklchStr: string): OklchColor | null {
  // Match: oklch(0.65 0.22 264) or oklch(0.65 0.22 264 / 0.5)
  // Handle case where closing paren might be missing from regex capture
  const cleaned = oklchStr.trim().replace(/\)$/, '');
  const match = cleaned.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\)?/);
  if (!match) return null;

  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
}

/**
 * Convert OKLCH to sRGB (for luminance calculation)
 * Using the algorithm from CSS Color Module Level 4
 */
function oklchToSrgb({ l, c, h }: OklchColor): { r: number; g: number; b: number } {
  // OKLCH to OKLAB
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // OKLAB to linear sRGB
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  // Linear sRGB
  let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let b_ = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  // sRGB companding (gamma correction)
  const compand = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

  r = compand(r);
  g = compand(g);
  b_ = compand(b_);

  // Clamp to [0, 1]
  return {
    r: Math.max(0, Math.min(1, r)),
    g: Math.max(0, Math.min(1, g)),
    b: Math.max(0, Math.min(1, b_)),
  };
}

/**
 * Calculate relative luminance from sRGB
 */
function luminance({ r, g, b }: { r: number; g: number; b: number }): number {
  // Using sRGB luminance coefficients
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two luminances
 */
function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Parse all color tokens from app.css
 * Light mode: from @theme block
 * Dark mode: from @media (prefers-color-scheme: dark) and .dark class block
 */
function parseColorTokens(): ColorToken[] {
  const css = readFileSync(APP_CSS_PATH, 'utf-8');

  // Extract @theme block (light mode defaults)
  const themeStart = css.indexOf('@theme');
  if (themeStart === -1) throw new Error('Could not find @theme block in app.css');

  const braceStart = css.indexOf('{', themeStart);
  if (braceStart === -1) throw new Error('Could not find @theme opening brace');

  let depth = 0;
  let braceEnd = -1;
  for (let i = braceStart; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) {
        braceEnd = i;
        break;
      }
    }
  }
  if (braceEnd === -1) throw new Error('Could not find matching closing brace for @theme');

  const themeContent = css.substring(braceStart + 1, braceEnd);

  // Collect light mode colors from @theme
  const lightColors: Map<string, OklchColor> = new Map();
  const lightMatches = themeContent.matchAll(/--color-([^:]+):\s*(oklch\([^;]+)\)/g);
  for (const m of lightMatches) {
    const parsed = parseOklch(m[2]);
    if (parsed) lightColors.set(m[1], parsed);
  }

  // Collect dark mode colors from @media (prefers-color-scheme: dark)
  const darkColors: Map<string, OklchColor> = new Map();
  
  // First try @media block
  const mediaStart = css.indexOf('@media (prefers-color-scheme: dark)');
  if (mediaStart !== -1) {
    const mediaBraceStart = css.indexOf('{', mediaStart);
    if (mediaBraceStart !== -1) {
      depth = 0;
      let mediaEnd = -1;
      for (let i = mediaBraceStart; i < css.length; i++) {
        if (css[i] === '{') depth++;
        else if (css[i] === '}') {
          depth--;
          if (depth === 0) {
            mediaEnd = i;
            break;
          }
        }
      }
      if (mediaEnd !== -1) {
        const mediaContent = css.substring(mediaBraceStart + 1, mediaEnd);
        const mediaMatches = mediaContent.matchAll(/--color-([^:]+):\s*(oklch\([^;]+)\)/g);
        for (const m of mediaMatches) {
          const parsed = parseOklch(m[2]);
          if (parsed) darkColors.set(m[1], parsed);
        }
      }
    }
  }

  // Fallback to .dark class block if media query didn't yield colors
  if (darkColors.size === 0) {
    const darkStart = css.indexOf('.dark {');
    if (darkStart !== -1) {
      const darkBraceStart = css.indexOf('{', darkStart);
      if (darkBraceStart !== -1) {
        depth = 0;
        let darkEnd = -1;
        for (let i = darkBraceStart; i < css.length; i++) {
          if (css[i] === '{') depth++;
          else if (css[i] === '}') {
            depth--;
            if (depth === 0) {
              darkEnd = i;
              break;
            }
          }
        }
        if (darkEnd !== -1) {
          const darkContent = css.substring(darkBraceStart + 1, darkEnd);
          const darkMatches = darkContent.matchAll(/--color-([^:]+):\s*(oklch\([^;]+)\)/g);
          for (const m of darkMatches) {
            const parsed = parseOklch(m[2]);
            if (parsed) darkColors.set(m[1], parsed);
          }
        }
      }
    }
  }

  // Combine into ColorToken objects (only tokens present in both light and dark)
  const tokens: ColorToken[] = [];
  for (const [name, light] of lightColors) {
    const dark = darkColors.get(name);
    if (dark) {
      tokens.push({ name, light, dark });
    }
  }

  return tokens;
}

/**
 * Define the color pairs used in UI primitives that need contrast validation
 * These are the semantic token pairs actually used in components
 */
function getPrimitiveColorPairs(): Array<{ fg: string; bg: string; description: string; isLargeText?: boolean; isUI?: boolean }> {
  return [
    // Card: border-border, bg-surface, text-surface-foreground
    { fg: 'surface-foreground', bg: 'surface', description: 'Card text on surface', isLargeText: false },
    { fg: 'border', bg: 'surface', description: 'Card border on surface', isUI: true },

    // Button default: bg-primary, text-primary-foreground
    { fg: 'primary-foreground', bg: 'primary', description: 'Button default text on primary', isLargeText: false },
    // Button secondary: bg-secondary, text-secondary-foreground
    { fg: 'secondary-foreground', bg: 'secondary', description: 'Button secondary text on secondary', isLargeText: false },
    // Button outline: border-border, bg-background, text-accent-foreground (on hover)
    { fg: 'accent-foreground', bg: 'accent', description: 'Button outline hover text on accent', isLargeText: false },
    { fg: 'border', bg: 'background', description: 'Button outline border on background', isUI: true },
    // Button ghost: text-accent-foreground on hover bg-accent
    { fg: 'accent-foreground', bg: 'accent', description: 'Button ghost hover text on accent', isLargeText: false },
    // Button destructive: bg-destructive, text-destructive-foreground
    { fg: 'destructive-foreground', bg: 'destructive', description: 'Button destructive text on destructive', isLargeText: false },
    // Button link: text-primary
    { fg: 'primary', bg: 'background', description: 'Button link text on background', isLargeText: false },

    // Link: text-primary
    { fg: 'primary', bg: 'background', description: 'Link text on background', isLargeText: false },

    // Heading: text-foreground (default)
    { fg: 'foreground', bg: 'background', description: 'Heading text on background', isLargeText: true }, // Headings are large text

    // Section: bg-background, text-foreground
    { fg: 'foreground', bg: 'background', description: 'Section text on background', isLargeText: false },

    // Muted text
    { fg: 'muted-foreground', bg: 'background', description: 'Muted text on background', isLargeText: false },
    { fg: 'muted-foreground', bg: 'surface', description: 'Muted text on surface', isLargeText: false },

    // Focus ring
    { fg: 'ring', bg: 'background', description: 'Focus ring on background', isUI: true },
  ];
}

describe('Contrast Validation (WCAG 2.1 AA)', () => {
  let tokens: ColorToken[];
  let colorMap: Map<string, ColorToken>;

  beforeAll(() => {
    tokens = parseColorTokens();
    colorMap = new Map(tokens.map((t) => [t.name, t]));
    expect(tokens.length).toBeGreaterThan(0);
  });

  it('should parse all required color tokens from @theme', () => {
    const requiredTokens = [
      'primary',
      'primary-foreground',
      'secondary',
      'secondary-foreground',
      'accent',
      'accent-foreground',
      'muted',
      'muted-foreground',
      'surface',
      'surface-foreground',
      'background',
      'background-foreground',
      'border',
      'border-foreground',
      'foreground',
      'foreground-foreground',
      'destructive',
      'destructive-foreground',
      'ring',
    ];

    for (const name of requiredTokens) {
      expect(colorMap.has(name)).toBe(true);
    }
  });

  it('should validate all primitive color pairs meet WCAG AA', () => {
    const pairs = getPrimitiveColorPairs();
    const results: ContrastResult[] = [];
    const failures: ContrastResult[] = [];

    for (const pair of pairs) {
      const fgToken = colorMap.get(pair.fg);
      const bgToken = colorMap.get(pair.bg);

      if (!fgToken || !bgToken) {
        throw new Error(`Missing token: fg=${pair.fg} bg=${pair.bg}`);
      }

      // Calculate luminance for light mode
      const fgLight = luminance(oklchToSrgb(fgToken.light));
      const bgLight = luminance(oklchToSrgb(bgToken.light));
      const lightRatio = contrastRatio(fgLight, bgLight);

      // Calculate luminance for dark mode
      const fgDark = luminance(oklchToSrgb(fgToken.dark));
      const bgDark = luminance(oklchToSrgb(bgToken.dark));
      const darkRatio = contrastRatio(fgDark, bgDark);

      // WCAG AA thresholds
      const aaThreshold = pair.isLargeText || pair.isUI ? 3 : 4.5;

      const passesAA = lightRatio >= aaThreshold && darkRatio >= aaThreshold;
      const passesAALarge = lightRatio >= 3 && darkRatio >= 3;

      const result: ContrastResult = {
        pair: `${pair.fg} on ${pair.bg} (${pair.description})`,
        lightRatio: Math.round(lightRatio * 100) / 100,
        darkRatio: Math.round(darkRatio * 100) / 100,
        passesAA,
        passesAALarge,
      };

      results.push(result);

      if (!passesAA) {
        failures.push(result);
      }
    }

    // Report all results
    console.log('\n=== Contrast Validation Results ===');
    for (const r of results) {
      const status = r.passesAA ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${r.pair}: light=${r.lightRatio}, dark=${r.darkRatio} (AA: ${r.passesAA ? 'yes' : 'no'})`);
    }

    if (failures.length > 0) {
      const failureReport = failures
        .map((f) => `  ${f.pair}: light=${f.lightRatio}, dark=${f.darkRatio} (need ${f.passesAALarge ? '3:1' : '4.5:1'})`)
        .join('\n');
      throw new Error(
        `${failures.length} color pair(s) fail WCAG 2.1 AA contrast:\n${failureReport}\n\n` +
          'Adjust OKLCH tokens in app.css @theme to meet contrast requirements.'
      );
    }

    expect(failures.length).toBe(0);
  });
});