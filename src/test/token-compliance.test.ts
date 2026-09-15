import { describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { globSync } from 'glob';
import { resolve } from 'node:path';

/**
 * Token Compliance Test
 *
 * Scans all .tsx files for Tailwind arbitrary values (e.g., p-[12px], text-[#fff], max-w-[640px]).
 * Arbitrary values bypass the design token system and must not exist in component code.
 *
 * Allowlist: documented exceptions with justification.
 */

const ARBITRARY_VALUE_PATTERN = /(?:^|\s)([a-z-]+)-\[([^\]]+)\]/g;

const ALLOWLIST: Array<{ file: string; pattern: RegExp; reason: string }> = [
  // No allowlist entries currently — Container now uses generated utilities
];

function findArbitraryValues(filePath: string): Array<{ line: number; match: string; column: number }> {
  const content = readFileSync(filePath, 'utf-8');
  const results: Array<{ line: number; match: string; column: number }> = [];
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    let match;
    while ((match = ARBITRARY_VALUE_PATTERN.exec(line)) !== null) {
      const [fullMatch] = match;
      // Skip if it's in a comment
      const beforeMatch = line.slice(0, match.index);
      if (beforeMatch.includes('//') || beforeMatch.includes('/*')) {
        continue;
      }
      results.push({
        line: lineIndex + 1,
        match: fullMatch.trim(),
        column: match.index + 1,
      });
    }
  });

  return results;
}

function isAllowlisted(filePath: string, match: string): boolean {
  const relativePath = filePath.replace(resolve('src') + '/', '');
  return ALLOWLIST.some((entry) => {
    if (!relativePath.includes(entry.file)) return false;
    return entry.pattern.test(match);
  });
}

describe('Token Compliance', () => {
  it('should have no arbitrary values in component files', () => {
    const tsxFiles = globSync('src/**/*.tsx', { absolute: true });
    const violations: Array<{ file: string; line: number; match: string }> = [];

    tsxFiles.forEach((file) => {
      const arbitraryValues = findArbitraryValues(file);
      arbitraryValues.forEach((av) => {
        if (!isAllowlisted(file, av.match)) {
          violations.push({ file, line: av.line, match: av.match });
        }
      });
    });

    if (violations.length > 0) {
      const details = violations
        .map((v) => `  ${v.file}:${v.line}  ${v.match}`)
        .join('\n');
      throw new Error(
        `Token compliance failed: ${violations.length} arbitrary value(s) found\n` +
          `All design values must use @theme tokens, not arbitrary values.\n\n${details}`
      );
    }
  });
});