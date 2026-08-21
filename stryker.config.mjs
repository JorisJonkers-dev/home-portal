import { fileURLToPath } from 'node:url'

/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  // Stryker's `break` defaults to null, which means the mutation score never
  // fails the build -- so the required Mutation Tests check could only fail if
  // Stryker itself errored, not if the score collapsed. The floor is set just
  // under the current score (26.25% over ~107 mutants) so it catches a
  // regression without demanding an immediate improvement. Raise it as the
  // score rises; never lower it to make a red build green.
  thresholds: { high: 80, low: 60, break: 22 },
  mutate: ['src/**/*.ts', '!src/**/*.test.ts'],
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
