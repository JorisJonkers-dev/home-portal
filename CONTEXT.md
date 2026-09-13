# Home Portal

The public portfolio and application launcher for `jorisjonkers.dev`. This
context is about how the portal *presents* the estate to a visitor; it owns no
platform vocabulary of its own beyond the presentation terms below.

## Language

### The thing being presented

**Estate**:
The complete set of JorisJonkers-dev repositories, as tracked by the
`workspace` repo.
_Avoid_: Personal Stack, stack, monorepo

**Homelab Platform**:
The k3s-on-NixOS cluster and everything that runs it, presented as one Project.
_Avoid_: Personal Stack, cluster (when meaning the whole platform)

**Fleet**:
The set of physical and virtual hosts the Homelab Platform runs on.
_Avoid_: nodes (when meaning all hosts collectively), servers

### Presentation

**Project**:
One card in the Projects section: a product line of the estate, not a
repository. Has a Status and one or more Repos.
_Avoid_: repo, card, entry

**Repo**:
A repository listed on a Project. Public Repos link to GitHub; Private Repos are
named but not linked.
_Avoid_: project, module, submodule

**Private Repo**:
A Repo whose GitHub page is not publicly reachable. Shown with a `private`
marker and no link.

**Status**:
Where a Project is in its life: `production` (running, unmarked),
`in-progress` (being built, amber), or `parked` (scaled to zero, kept
intact, grey).
_Avoid_: state, phase, WIP, deprecated, archived

**Tag**:
A canonical technology name shown on a Project or in the Skills section. One
spelling, no version number.
_Avoid_: technology, badge, chip

**Skill**:
A Tag or soft skill listed in the Skills section under a category. Every Tag
on a Project must also be a Skill.

**Archived Repo**:
A predecessor repository that is archived on GitHub (the two `legacy/`
monorepos). Not a Repo: never listed on a Project.
_Avoid_: legacy, old stack

### Canonical Tag spellings

Languages: `Kotlin`, `TypeScript`, `JavaScript`, `Python`, `Nix`, `Bash`, `Ruby`, `Java`.
Frameworks: `Spring Boot`, `Vue.js`, `Ruby on Rails`, `Angular`, `PyTorch`,
`Nomad`.
Platform: `k3s`, `NixOS`, `Flux CD`, `Kustomize`, `Traefik`, `Vault`,
`Longhorn`, `Garage`, `MetalLB`, `cert-manager`, `PostgreSQL`, `RabbitMQ`.
Observability: `Grafana`, `Loki`, `Tempo`, `Pyroscope`, `Alloy`, `Gatus`.
Agents & AI: `Hermes Agent`, `MCP`, `Ollama`, `Obsidian`.
Build & Delivery: `Gradle`, `GitHub Actions`, `Renovate`, `OpenAPI`,
`JSON Schema`.
_Avoid_: `Kubernetes (k3s)`, `Kubernetes`, `Vue.js 3`, `Vue 3`, `Spring Boot 4`,
`Flux`, `FluxCD`, `HashiCorp Vault`, `Postgres`, `Hermes`, `Keel`
