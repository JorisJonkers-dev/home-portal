---
status: accepted
date: 2026-09-13
---

# Project metadata lives in code; locales hold only prose

Project cards used to be entirely i18n data (`projects.entries[]` in `en.ts`
and `nl.ts`), so every URL, technology tag and link was duplicated per language
and kept in step by hand. We split the card: `src/features/home/data/projects.ts`
owns `id`, `status`, `technologies`, `repos` and `liveUrl`; the locale files
hold only `projects.entries.<id>.{title,description}`. Anything a translator
would never change is not translatable data, and one copy cannot drift from
itself. A unit test can now enforce that every project `id` has both
translations and that every tag on a card is also listed in the Skills section.

## Considered options

- Keep everything in the locale files (status quo): simplest, but two copies of
  every URL and tag, and no way to test completeness across languages.
- Generate the locale entries from `projects.ts` at build time: solves drift but
  adds a build step for two languages of prose; not worth it at this size.
