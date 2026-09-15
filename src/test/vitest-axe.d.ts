/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

import { AxeResults } from 'axe-core';

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): T extends AxeResults ? void : never;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}