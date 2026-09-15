import 'vitest';
import type { AxeResults } from 'axe-core';

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): T extends AxeResults ? { pass: boolean; message: () => string } : never;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): any;
  }
}