import { fileURLToPath } from 'node:url'

/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  // Stryker's `break` defaults to null, which means the mutation score never
  // fails the build. The floor is set just under the current score (62.86% over
  // ~175 mutants) so it catches a regression without demanding an immediate
  // improvement. Raise it as the score rises; never lower it to make a red
  // build green.
  thresholds: { high: 80, low: 60, break: 58 },
  mutate: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    // Translation catalogues. A mutated Dutch string is a mutant no reasonable
    // test kills, and there are 262 of them here -- enough to dominate the score
    // and hide what the logic files are doing. Excluded so the number measures
    // behaviour. src/i18n/index.ts stays in scope: it picks the locale and has
    // real branches.
    '!src/i18n/locales/**',
    // Barrel files that only re-export components.
    '!src/features/*/index.ts',
    // Application bootstrap: wires plugins into createApp and has no branch a
    // unit test can meaningfully assert.
    '!src/main.ts',
  ],
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
