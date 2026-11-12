# Agents

Guidance for any coding agent working in this repository.

The agent contract is [CLAUDE.md](CLAUDE.md); the [estate contract](https://github.com/JorisJonkers-dev/workspace/blob/main/CLAUDE.md) applies too. `CONTEXT.md` defines the repository's vocabulary.

## Build and test

```sh
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm verify   # lint, typecheck, coverage, depcruise, build
```

These are the scripts in `package.json`. End-to-end tests use `playwright.config.ts`.
