import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Token Compliance Test
 *
 * Scans all UI component files for arbitrary Tailwind values (pattern: `\[.*\]`).
 * Arbitrary values bypass the design token system and should not be used.
 *
 * Known exceptions (documented with justification):
 * - Container.tsx: Uses `max-w-[...]` for container queries mapping to `--container-*` tokens.
 *   This is a Tailwind v4 limitation — container queries don't have a native utility mapping.
 *   Tracked as known exception; should be revisited when Tailwind adds container query support.
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const UI_COMPONENTS_DIR = join(__dirname, '..');
// Match arbitrary Tailwind values like `p-[12px]`, `max-w-[640px]`, `text-[#ff0000]`
// but NOT bracket notation for object property access like `sizeClass[size]`
// Use negative lookbehind to avoid matching the 'w-' in 'max-w-[...]'
const ARBITRARY_VALUE_PATTERN = /(?<!max-)\b\w+-\s*\[.*?\]/g;

// Known exceptions with file and pattern justification
interface KnownException {
  file: string;
  pattern: RegExp;
  justification: string;
}

const KNOWN_EXCEPTIONS: KnownException[] = [
  {
    file: 'Container.tsx',
    pattern: /max-w-\[.*?\]/g,
    justification: 'Maps to --container-* tokens; Tailwind v4 lacks native container query utility',
  },
];

function isKnownException(fileName: string, match: string): boolean {
  const exception = KNOWN_EXCEPTIONS.find((exc) => exc.file === fileName);
  if (!exception) return false;
  return exception.pattern.test(match);
}

function getUiComponentFiles(): string[] {
  return readdirSync(UI_COMPONENTS_DIR)
    .filter((file: string) => file.endsWith('.tsx') && !file.includes('.test.'))
    .map((file: string) => join(UI_COMPONENTS_DIR, file));
}

function findArbitraryValues(filePath: string): { line: number; match: string; context: string }[] {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const results: { line: number; match: string; context: string }[] = [];
  const fileName = filePath.split(/[\\/]/).pop() || '';

  lines.forEach((line: string, index: number) => {
    let match;
    while ((match = ARBITRARY_VALUE_PATTERN.exec(line)) !== null) {
      if (!isKnownException(fileName, match[0])) {
        results.push({
          line: index + 1,
          match: match[0],
          context: line.trim(),
        });
      }
    }
  });

  return results;
}

describe('Token Compliance', () => {
  it('should have no arbitrary Tailwind values in UI components (except documented exceptions)', () => {
    const files = getUiComponentFiles();
    const allViolations: { file: string; line: number; match: string; context: string }[] = [];

    for (const file of files) {
      const violations = findArbitraryValues(file);
      if (violations.length > 0) {
        allViolations.push(
          ...violations.map((v) => ({
            file: file.split(/[\\/]/).pop() || '',
            ...v,
          }))
        );
      }
    }

    if (allViolations.length > 0) {
      const report = allViolations
        .map((v) => `  ${v.file}:${v.line} — "${v.match}" in "${v.context}"`)
        .join('\n');
      throw new Error(
        `Found ${allViolations.length} arbitrary Tailwind value(s) in UI components:\n${report}\n\n` +
          'Use design tokens from @theme instead. If this is a legitimate exception, document it in KNOWN_EXCEPTIONS.'
      );
    }

    expect(allViolations.length).toBe(0);
  });

  it('should document known exceptions with justification', () => {
    expect(KNOWN_EXCEPTIONS.length).toBeGreaterThan(0);
    for (const exc of KNOWN_EXCEPTIONS) {
      expect(exc.file).toBeTruthy();
      expect(exc.justification).toBeTruthy();
      expect(exc.justification.length).toBeGreaterThan(10);
    }
  });
});