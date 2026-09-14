---
status: accepted
date: 2026-09-14
---

# Repository descriptions live in code and are not translated

Every `ProjectRepo` in `src/features/home/data/projects.ts` carries a one-line
`description` naming what that repository is for, next to `name`, `url` and
`private`. It is not in `en.ts` or `nl.ts`, and no translation key exists for
it.

This is a deliberate, documented exception to ADR-0001, which put `id`,
`status`, `technologies`, `repos` and links in code but reserved prose for the
locale files. The rule in ADR-0001 is about the split, not about prose as a
category: it asks of every string whether a translator would ever change it.
For a repository description the answer is no.

Two reasons. First, a repository's purpose is a technical identifier, not copy:
`platform/fleet-infra` is "Flux manifests and cluster bootstrapping for the
whole fleet" in English and the same fact in Dutch, and a Dutch rendering of it
would be a second string saying the identical thing to a reader who has just
read the repo path it belongs to. Second, the descriptions are required, so
translating them means two edits per repository in two files — and the estate
gains repositories far more often than it changes languages. One mandatory edit
can be enforced by a test; two cannot, and the list would drift the moment a
repo is added to `projects.ts` without its locale counterparts.

Every project on the portal is a personal project. These lines describe the
work rather than address a reader, so there is no audience to localise for: the
visitor is being shown what was built, not being sold or instructed.

The escape hatch stays open. If a repo description ever grows into real prose —
a sentence written for the visitor rather than a label for the work — it moves
to the locale files and this decision is revisited.

## Verification

The guard was shown to fail before being satisfied, then the data reverted:
emptying the description of `platform/fleet-infra` failed `describes every
repo`. `ProjectRepo.description` is required in TypeScript as well, so a new
repo cannot be added without one.

## Considered options

- Put the descriptions in the locale files (strict ADR-0001): consistent with
  the rule, but two mandatory edits per repo and no test that can force them
  to agree.
- Put them in the locale files as optional keys with a code-side fallback:
  still two places to edit, plus a fallback path that is only ever exercised
  when something has already gone wrong.
