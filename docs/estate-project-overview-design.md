# Estate project overview — design (grilled 2026-09-13)

Scope: `ui/home-portal` only. No code changes yet.
Data model, vocabulary and ADR: `CONTEXT.md`, `docs/adr/0001-…`.

## Model

```ts
type ProjectStatus = 'production' | 'in-progress' | 'parked'

interface ProjectRepo {
  name: string // workspace path form, e.g. 'platform/fleet-infra'
  url?: string // absent => private
  private?: true
}

interface Project {
  id: string // stable key; locale key is projects.entries.<id>
  title: string
  description: string
  technologies: string[] // canonical Tags
  status?: ProjectStatus // absent => production
  repos: ProjectRepo[]
  liveUrl?: string
  githubUrl?: string // card's own primary link, public
}
```

`src/features/home/data/projects.ts` owns everything except `title`/`description`;
`en.ts` / `nl.ts` hold `projects.entries.<id>.{title,description}`.

## Cards (order fixed)

### 1 `homelab-platform` — Homelab Platform

- status: production
- githubUrl: `flux-modules`
- repos: `platform/fleet-infra`_, `platform/nix-config`_, `platform/homelab-inventory`_, `platform/homelab-collections`_, `platform/flux-modules`, `platform/nixos-modules`
- tags: k3s, NixOS, Nix, Flux CD, Kustomize, Traefik, Vault, Longhorn, Garage, PostgreSQL, Grafana, Loki, Tempo
- EN: A k3s cluster on NixOS spanning seven nodes over two sites — a cloud VPS in Frankfurt and six machines on the home network — reconciled from git by Flux CD and Kustomize. Traefik terminates ingress with Let's Encrypt and forward-auth, MetalLB and cert-manager carry load balancing and certificates, Vault projects every secret through the Vault Secrets Operator, Longhorn and Garage provide block and object storage, and the whole fleet is observable end to end: Alloy collects, Loki and Tempo hold logs and traces, Pyroscope profiles, Gatus probes every route, and Grafana Operator renders the dashboards. Host inventory is the source of truth for nodes, roles and labels; Flux module packs and NixOS modules are shared, versioned artifacts rather than per-repo copies.
- NL: Een k3s-cluster op NixOS over zeven nodes verdeeld over twee locaties — een cloud-VPS in Frankfurt en zes machines in het thuisnetwerk — waarbij alle state vanuit git wordt gereconcilieerd door Flux CD en Kustomize. Traefik verzorgt ingress met Let's Encrypt en forward-auth, MetalLB en cert-manager regelen load balancing en certificaten, Vault projecteert secrets via de Vault Secrets Operator, Longhorn en Garage leveren block- en objectopslag, en de hele fleet is end-to-end observeerbaar: Alloy verzamelt, Loki en Tempo bewaren logs en traces, Pyroscope profileert, Gatus bewaakt elke route en Grafana Operator rendert de dashboards. Host-inventaris is de bron van waarheid voor nodes, rollen en labels; Flux-modulepacks en NixOS-modules zijn gedeelde, versiebeheerde artefacten in plaats van kopieën per repo.

### 2 `deployment` — Deployment Model & Compiler

- status: in-progress
- githubUrl: `deploy-config-schema` (it renders the estate today)
- repos: `libs/deploy-config-schema`, `libs/deploy-kit`, `platform/homelab-collections`*
- tags: TypeScript, JSON Schema, Flux CD, Kustomize
- EN: Deploying a service to the estate means writing intent, not manifests. The configuration is a typed model — service intent per domain, a resolved deployment derived as a pure function of pinned inputs, and a deliverable set of rendered Flux and Kustomize files — validated against JSON Schemas and locked by an immutable image lock. deploy-config-schema is the compiler that renders the estate today; deploy-kit is the successor: the same three-layer model written up as a specification, with a decision record behind every rule, and the compiler being ported into it. Collection specs for third-party and platform services live in their own source-of-truth repo.
- NL: Een service deployen op de estate betekent intent schrijven, geen manifests. De configuratie is een getypeerd model — service-intent per domein, een resolved deployment die als pure functie van gepinde inputs wordt afgeleid, en een deliverable set van gerenderde Flux- en Kustomize-bestanden — gevalideerd tegen JSON Schema's en vastgelegd met een onveranderlijke image lock. deploy-config-schema is de compiler die de estate vandaag rendert; deploy-kit is de opvolger: hetzelfde drielaagse model uitgeschreven als specificatie, met een decision record achter elke regel, en de compiler die daarheen wordt overgebracht. Collection specs voor third-party en platformservices staan in een eigen bron-van-waarheid-repo.

### 3 `agents` — Agent Platform

- status: production
- githubUrl: `agent-kit`
- repos: `libs/agent-kit`, `inbox/openrouter-model-catalog`
- tags: Hermes Agent, MCP, Python, Kotlin, Spring Boot, Vue.js, k3s
- EN: A self-hosted agent platform built around Hermes Agent, running as a long-lived in-cluster gateway with its web dashboard, bring-your-own-key against OpenRouter. Skills and MCP servers are generated from a single registry so one addition reaches the gateway and the workstation at once; the model catalog is a full generated manifest of every tool-calling model the provider advertises. An earlier runner platform — a Kotlin/Spring orchestration API, a Vue workspace UI and per-workspace runner pods — is parked at zero replicas, superseded by this one and kept intact rather than deleted.
- NL: Een zelfgehost agentplatform rond Hermes Agent, draaiend als langlopende in-cluster gateway met een webdashboard, bring-your-own-key tegen OpenRouter. Skills en MCP-servers worden gegenereerd vanuit één registry, zodat een toevoeging tegelijk de gateway en de workstation bereikt; de modelcatalogus is een volledig gegenereerd manifest van elk tool-calling model dat de provider aanbiedt. Een eerder runner-platform — een Kotlin/Spring-orchestratie-API, een Vue-workspace-UI en runner-pods per workspace — is geparkeerd op nul replicas, overbodig gemaakt door dit platform en intact gehouden in plaats van verwijderd.

### 4 `knowledge` — Knowledge System

- status: production
- githubUrl: `knowledge`
- repos: `services/knowledge`, `data/knowledge-vault`*
- tags: Kotlin, Spring Boot, Python, MCP, PostgreSQL, RabbitMQ, Obsidian
- EN: A knowledge base that is a git repository first: notes are written in Obsidian — in-cluster in the browser, or on the desktop through LiveSync — and served to agents over MCP as read and write tools. A Kotlin/Spring API owns persistence, search and the MCP surface on PostgreSQL and RabbitMQ; a Python ingest worker consumes messages, writes notes and updates metadata. Retrieval and enrichment run alongside it as in-cluster services — LightRAG, Ollama, and Hindsight — so agents query the same vault a human edits.
- NL: Een knowledge base die in de eerste plaats een git-repository is: notities worden geschreven in Obsidian — in-cluster in de browser, of op de desktop via LiveSync — en via MCP aan agents aangeboden als lees- en schrijftools. Een Kotlin/Spring-API beheert persistentie, zoeken en het MCP-oppervlak op PostgreSQL en RabbitMQ; een Python-ingestworker verbruikt berichten, schrijft notities en werkt metadata bij. Retrieval en verrijking draaien ernaast als in-cluster services — LightRAG, Ollama en Hindsight — zodat agents dezelfde vault bevragen die een mens bewerkt.

### 5 `auth` — Auth Platform

- status: production
- githubUrl: `auth-api`
- repos: `services/auth-api`, `ui/auth-ui`, `libs/authz-model`, `ui/home-portal`
- tags: Kotlin, Spring Boot, Vue.js, TypeScript, PostgreSQL
- EN: One identity for everything on the domain: a Kotlin/Spring authorization server handling login, session, profile, TOTP MFA, password reset, email confirmation and OAuth2/OIDC, with Traefik forward-auth putting it in front of every internal route. The authorization vocabulary is published as generated TypeScript and Kotlin constants from one model, so no consumer copies a role or permission string. A Vue frontend covers the login and account flows, and this portal uses the same session to become the estate's application launcher.
- NL: Eén identiteit voor alles op het domein: een Kotlin/Spring authorization server voor login, sessie, profiel, TOTP MFA, wachtwoordreset, e-mailbevestiging en OAuth2/OIDC, waarbij Traefik forward-auth hem voor elke interne route zet. De autorisatievocabulaire wordt vanuit één model gepubliceerd als gegenereerde TypeScript- en Kotlin-constanten, zodat geen enkele consumer een rol- of permissiestring kopieert. Een Vue-frontend verzorgt de login- en accountflows, en dit portaal gebruikt dezelfde sessie om de applicatie-launcher van de estate te worden.

### 6 `backup-dr` — Backup & Disaster Recovery

- status: production
- githubUrl: `flux-modules`
- repos: `platform/flux-modules`, `platform/fleet-infra`*
- tags: k3s, Vault, PostgreSQL, RabbitMQ, Garage, Bash
- EN: Backups are scheduled jobs with a matching verify step, not a folder of dumps. Vault takes raft snapshots, PostgreSQL takes logical dumps, and RabbitMQ exports its definitions — each on its own CronJob — while the backup, restore and verify scripts live in a shared platform artifact that operates on caller-owned paths. A run is only done when the verify script says the archive is restorable, and the restore path is exercised the same way the backup is scheduled.
- NL: Backups zijn geplande jobs met een bijbehorende verify-stap, geen map vol dumps. Vault maakt raft-snapshots, PostgreSQL logische dumps en RabbitMQ exporteert zijn definities — elk met een eigen CronJob — terwijl de backup-, restore- en verify-scripts in een gedeeld platformartefact staan dat op caller-owned paden werkt. Een run is pas klaar als de verify-script zegt dat het archief terug te zetten is, en de restore-pad wordt op dezelfde manier geoefend als de backup gepland is.

### 7 `tooling` — Estate Tooling

- status: production
- githubUrl: `repo-template`
- repos: `tooling/repo-template`, `tooling/github-workflows`, `tooling/github-defaults`, `tooling/gradle-conventions`, `tooling/openapi-client-gradle`, `tooling/api-contract-checks`, `tooling/renovate-config`, `libs/kotlin-spring-commons`, `libs/vue-web-commons`, `tools/stalwart-provisioner`, `tests/stack-integration-tests`, `workspace`
- tags: Gradle, GitHub Actions, Renovate, OpenAPI, Kotlin, TypeScript
- EN: Conventions are repositories, not documents. Every repo is bootstrapped from a template carrying the shared branch ruleset, the single required `Pipeline Complete` check and release-please versioning; CI and release workflows, Gradle convention plugins, an OpenAPI client plugin, contract-drift checks and the Renovate preset are published once and consumed by tag. Shared Kotlin/Spring and Vue commons ship as real packages. Contract drift fails the build rather than the runtime, whole-stack integration tests gate a deploy PR against the same pinned images it is about to release, and the estate is assembled as a dev workspace of submodules so cross-repo change is one PR.
- NL: Conventies zijn repositories, geen documenten. Elke repo start vanuit een template met de gedeelde branch-ruleset, de enige verplichte check `Pipeline Complete` en release-please-versiebeheer; CI- en release-workflows, Gradle-conventionplugins, een OpenAPI-clientplugin, contract-driftchecks en de Renovate-preset worden één keer gepubliceerd en per tag geconsumeerd. Gedeelde Kotlin/Spring- en Vue-commons worden als echte pakketten geleverd. Contract-drift breekt de build in plaats van de runtime, hele-stack integratietests gaten een deploy-PR tegen dezelfde gepinde images die hij gaat releasen, en de estate is samengesteld als een dev workspace van submodules zodat een cross-repo wijziging één PR is.

### 8 `esa-blueshell` — ESA Blueshell Website

- status: production
- githubUrl: `ESA-Blueshell/website`, liveUrl: `https://esa-blueshell.nl`
- repos: `ESA-Blueshell/website`
- tags: Spring Boot, Kotlin, Vue.js, TypeScript, k3s, Flux CD
- EN: Full-stack platform for the Netherlands' largest student esports association: membership management, event administration, contribution tracking and online signups. Deployed to a k3s cluster with Flux CD and Kustomize, behind Traefik with Let's Encrypt TLS, plus Stalwart for email.
- NL: Full-stack platform voor de grootste studentenesportsvereniging van Nederland: ledenadministratie, evenementbeheer, contributies en online inschrijvingen. Uitgerold op een k3s-cluster met Flux CD en Kustomize, achter Traefik met Let's Encrypt TLS, plus Stalwart voor e-mail.

## Skills section

Six categories. **Languages** keeps years-bars (JS/TS 6, Java 6, Python 6, Bash 6, Ruby 4, Kotlin 3, Nix 1; MAX_YEARS stays 6). All others are pills.

- **Languages**: JavaScript / TypeScript 6, Java 6, Python 6, Bash 6, Ruby 4, Kotlin 3, Nix 1
- **Frameworks**: Spring Boot, Vue.js, Ruby on Rails, Angular, PyTorch, Nomad
- **Platform**: k3s, NixOS, Nix, Flux CD, Kustomize, Traefik, Vault, Longhorn, Garage, MetalLB, cert-manager, PostgreSQL, RabbitMQ, Docker
- **Observability**: Grafana, Loki, Tempo, Pyroscope, Alloy, Gatus
- **Agents & AI**: Hermes Agent, MCP, Ollama, Obsidian, JSON Schema
- **Build & Delivery**: Gradle, GitHub Actions, Renovate, OpenAPI, pnpm, Docker
- **Soft Skills**: Project Management, Public Relations, Communication, Critical Thinking

Keel, MATLAB dropped. Test: every project Tag appears in some skills list.

## Footer

`Built with Vue.js, Spring Boot & Kotlin — deployed with Flux CD on k3s`
