import { fileURLToPath } from 'node:url'

/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  mutate: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/*.spec.ts', '!src/**/generated/**', '!src/**/*.d.ts'],
  ignoreStatic: true,
  ignorePatterns: ['/coverage', '/dist', '/playwright-report', '/test-results'],
  plugins: ['@stryker-mutator/vitest-runner'],
  testRunner: 'vitest',
  reporters: ['html', 'clear-text', 'progress'],
  coverageAnalysis: 'perTest',
  vitest: {
    configFile: fileURLToPath(new URL('./vitest.config.ts', import.meta.url)),
  },
}

export default config
