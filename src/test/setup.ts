import '@testing-library/jest-dom/vitest'
import { toHaveNoViolations } from 'vitest-axe/dist/matchers.js';
import { expect } from 'vitest';

expect.extend({ toHaveNoViolations });