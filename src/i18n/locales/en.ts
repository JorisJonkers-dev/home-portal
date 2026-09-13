export default {
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
    myApps: 'My Apps',
    admin: 'Admin',
    account: 'Account',
    login: 'Login',
    logout: 'Logout',
  },
  hero: {
    subtitle: 'Medior Software Engineer',
    name: 'Joris Jonkers',
    degree: 'BSc',
    tagline:
      'Building robust, scalable software, from self-hosted infrastructure to polished user-facing applications. Passionate about clean architecture, developer experience, and shipping things that last.',
    cta: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    scroll: 'Scroll to explore',
  },
  about: {
    title: 'About me',
    intro:
      'A motivated software engineer and MSc student seeking meaningful challenges that allow me to contribute to society and grow as a professional.',
    body: 'Highly focused on working in group settings, consistently leading teams at university and motivating project partners to produce the best possible outcomes. Invested in growing toward project management, having led every university project to excellent results through Agile principles with a preference for Kanban.',
    location: 'Enschede, Netherlands',
    languages: 'Dutch (native), English (fluent)',
    education: 'Education',
    educationEntries: [
      {
        period: '2024 - Present',
        institution: 'University of Twente',
        degree: 'MSc Software Technology',
      },
      {
        period: '2020 - 2024',
        institution: 'University of Twente',
        degree: 'BSc Technical Computer Science',
      },
      {
        period: '2010 - 2016',
        institution: 'Oscar Romero',
        degree: 'VWO NT/NG',
      },
    ],
  },
  experience: {
    title: 'Experience',
    subtitle: 'Where I have worked and what I have shipped.',
    entries: [
      {
        role: 'Medior Software Engineer',
        company: 'Nedap N.V.',
        period: 'June 2025 - Present',
        description:
          'Working on the migration of the ONS Plannen & Roosteren healthcare logistics application from single-tenant to multi-tenant architecture, as well as from bare-metal to Nomad-based container orchestration. Improving CI/CD pipelines and maintaining Docker images alongside regular Ruby on Rails development tasks.',
        technologies: ['Ruby on Rails', 'Nomad', 'Docker', 'CI/CD'],
      },
      {
        role: 'Junior Software Engineer',
        company: 'DynaLynx B.V.',
        period: 'May 2022 - July 2025',
        description:
          'Developed and refactored software for a transport company, including integrations with government portals for regulatory compliance. Improved query performance, enhanced test coverage, and optimized data serialization using JSON:API. Updated a React Native application through 11 major versions and contributed to UI design and business logic for a chemo drug mixing machine.',
        technologies: ['Ruby on Rails', 'Angular', 'React Native', '.NET', 'Aurelia'],
      },
      {
        role: 'Secretary & Commissioner of External Affairs',
        company: 'ESA Blueshell',
        period: 'September 2024 - September 2025',
        description:
          "Overhauled sponsor outreach using scraping techniques and targeted email templates, resulting in contact with over 100 companies. Handles official communications, meeting minutes, and monthly newsletters. Since April 2024, has been the primary developer of the association's full-stack website, built with Spring Boot 4 (Kotlin) and Vue.js 3 (TypeScript) and deployed to a k3s cluster with Flux CD and Kustomize.",
        technologies: ['Spring Boot', 'Kotlin', 'Vue.js', 'k3s', 'Traefik'],
      },
    ],
  },
  projects: {
    title: 'Projects',
    subtitle: 'Things I have built or am building.',
    status: {
      'in-progress': 'in progress',
      'parked': 'parked',
    },
    entries: {
      'homelab-platform': {
        title: 'Homelab Platform',
        description:
          'A k3s cluster on NixOS spanning seven nodes over two sites — a cloud VPS in Frankfurt and six machines on the home network — reconciled from git by Flux CD and Kustomize. Traefik terminates ingress with Let’s Encrypt and forward-auth, MetalLB and cert-manager carry load balancing and certificates, Vault projects every secret through the Vault Secrets Operator, and Longhorn and Garage provide block and object storage. The whole fleet is observable end to end: Alloy collects, Loki and Tempo hold logs and traces, Pyroscope profiles, Gatus probes every route, and Grafana Operator renders the dashboards. Host inventory is the source of truth for nodes, roles and labels; Flux module packs and NixOS modules are shared, versioned artifacts rather than per-repo copies.',
      },
      'deployment': {
        title: 'Deployment Model & Compiler',
        description:
          'Deploying a service means writing intent, not manifests. The configuration is a typed model — service intent per domain, a resolved deployment derived as a pure function of pinned inputs, and a deliverable set of rendered Flux and Kustomize files — validated against JSON Schemas and locked by an immutable image lock. The schema package is the compiler that renders the estate today; deploy-kit is the successor: the same three-layer model written up as a specification, with a decision record behind every rule, and the compiler being ported into it. Collection specs for third-party and platform services live in their own source-of-truth repository.',
      },
      'agents': {
        title: 'Agent Platform',
        description:
          'A self-hosted agent platform built around Hermes Agent, running as a long-lived in-cluster gateway with its web dashboard, bring-your-own-key against OpenRouter. Skills and MCP servers are generated from a single registry, so one addition reaches the gateway and the workstation at once, and the model catalog is a full generated manifest of every tool-calling model the provider advertises. An earlier runner platform — a Kotlin and Spring orchestration API, a Vue workspace UI and per-workspace runner pods — is parked at zero replicas, superseded by this one and kept intact rather than deleted.',
      },
      'knowledge': {
        title: 'Knowledge System',
        description:
          'A knowledge base that is a git repository first: notes are written in Obsidian, in-cluster in the browser or on the desktop through LiveSync, and served to agents over MCP as read and write tools. A Kotlin and Spring API owns persistence, search and the MCP surface on PostgreSQL and RabbitMQ; a Python ingest worker consumes messages, writes notes and updates metadata. Retrieval and enrichment run alongside it as in-cluster services, so agents query the same vault a human edits.',
      },
      'auth': {
        title: 'Auth Platform',
        description:
          'One identity for everything on the domain: a Kotlin and Spring authorization server handling login, session, profile, TOTP MFA, password reset, email confirmation and OAuth2/OIDC, with Traefik forward-auth putting it in front of every internal route. The authorization vocabulary is published as generated TypeScript and Kotlin constants from one model, so no consumer copies a role or permission string. A Vue frontend covers the login and account flows, and this portal uses the same session to become the estate’s application launcher.',
      },
      'backup-dr': {
        title: 'Backup & Disaster Recovery',
        description:
          'Backups are scheduled jobs with a matching verify step, not a folder of dumps. Vault takes raft snapshots, PostgreSQL takes logical dumps, and RabbitMQ exports its definitions, each on its own CronJob, while the backup, restore and verify scripts live in a shared platform artifact that operates on caller-owned paths. A run is only done when the verify script says the archive is restorable, and the restore path is exercised the same way the backup is scheduled.',
      },
      'tooling': {
        title: 'Estate Tooling',
        description:
          'Conventions are repositories, not documents. Every repo is bootstrapped from a template carrying the shared branch ruleset, a single required status check and release-please versioning; CI and release workflows, Gradle convention plugins, an OpenAPI client plugin, contract-drift checks and the Renovate preset are published once and consumed by tag. Shared Kotlin and Vue commons ship as real packages, contract drift fails the build rather than the runtime, whole-stack integration tests gate a deploy pull request against the same pinned images it is about to release, and the estate is assembled as a dev workspace of submodules so a cross-repo change is one pull request.',
      },
      'esa-blueshell': {
        title: 'ESA Blueshell Website',
        description:
          'Full-stack platform for the Netherlands’ largest student esports association: membership management, event administration, contribution tracking and online signups. Deployed to a k3s cluster with Flux CD and Kustomize, behind Traefik with Let’s Encrypt TLS, plus Stalwart for email.',
      },
    },
  },
  skills: {
    title: 'Skills',
    subtitle: 'Languages, frameworks, and tools I work with.',
    categories: {
      languages: 'Programming Languages',
      frameworks: 'Frameworks',
      platform: 'Platform & Infrastructure',
      observability: 'Observability',
      agents: 'Agents & AI',
      delivery: 'Build & Delivery',
      soft: 'Soft Skills',
    },
  },
  contact: {
    title: 'Get in touch',
    subtitle: "Whether it's a project idea, a collaboration, or just a chat, feel free to reach out.",
    email: 'info@jorisjonkers.dev',
    cta: 'Send me an email',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  language: {
    en: 'English',
    nl: 'Nederlands',
  },
  footer: {
    built: 'Built with Vue.js, Spring Boot & Kotlin — deployed with Flux CD on k3s',
    source: 'Source code',
  },
}
