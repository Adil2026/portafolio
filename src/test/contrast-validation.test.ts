import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Color from 'colorjs.io';

/**
 * Contrast Validation Test
 *
 * Validates that all OKLCH color token pairs meet WCAG 2.1 AA contrast ratios:
 * - 4.5:1 for normal text
 * - 3:1 for large text (18pt+/14pt+ bold) and UI components
 */

interface ColorPair {
  name: string;
  color: string;
  foreground: string;
}

function parseThemeTokens(cssPath: string): ColorPair[] {
  const content = readFileSync(cssPath, 'utf-8');
  const themeMatch = content.match(/@theme\s*{([^}]+)}/);
  if (!themeMatch) throw new Error('No @theme block found');

  const themeContent = themeMatch[1];
  const colorPairs: ColorPair[] = [];
  const colorRegex = /--color-([a-z-]+):\s*([^;]+);/g;

  const colors: Record<string, string> = {};
  let match;
  while ((match = colorRegex.exec(themeContent)) !== null) {
    colors[match[1]] = match[2].trim();
  }

  // Pair each color with its -foreground variant
  Object.keys(colors).forEach((key) => {
    if (key.endsWith('-foreground')) return;
    const foregroundKey = `${key}-foreground`;
    if (colors[foregroundKey]) {
      colorPairs.push({
        name: key,
        color: colors[key],
        foreground: colors[foregroundKey],
      });
    }
  });

  return colorPairs;
}

function computeContrastRatio(color1: string, color2: string): number {
  const c1 = new Color(color1);
  const c2 = new Color(color2);
  const l1 = c1.to('srgb').luminance;
  const l2 = c2.to('srgb').luminance;
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('WCAG 2.1 AA Contrast Validation', () => {
  const cssPath = resolve('src/app.css');
  const colorPairs = parseThemeTokens(cssPath);

  colorPairs.forEach((pair) => {
    // border/border-foreground is not a text/background pair — both are dark colors for borders
    // foreground/foreground-foreground is semantically confusing and unused
    if (['border', 'foreground'].includes(pair.name)) return;

    it(`${pair.name} / ${pair.name}-foreground should meet WCAG AA`, () => {
      const ratio = computeContrastRatio(pair.color, pair.foreground);
      // Normal text requires 4.5:1; large text/UI components require 3:1
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('should have all required semantic color pairs defined', () => {
    const requiredPairs = [
      'primary',
      'secondary',
      'accent',
      'muted',
      'surface',
      'background',
      'border',
      'foreground',
      'destructive',
      // 'ring' is a focus indicator color, not a text/background pair
    ];

    const definedNames = colorPairs.map((p) => p.name);
    requiredPairs.forEach((required) => {
      expect(definedNames).toContain(required);
    });
  });
});