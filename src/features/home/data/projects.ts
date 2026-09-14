/**
 * Project metadata for the estate overview.
 *
 * Everything a translator would never change lives here: id, status, tags,
 * repos and links. The locale files hold only `projects.entries.<id>` with
 * `title` and `description`, in English and Dutch — see ADR-0001.
 *
 * Repo descriptions are the one exception: they are prose that still lives in
 * code, untranslated, because a repo's purpose is a technical identifier —
 * see ADR-0002.
 *
 * Tag spellings are canonical per `CONTEXT.md` and must also appear in
 * `data/skills.ts`; `src/__tests__/ProjectData.test.ts` enforces both.
 */
import type { ProjectRepo, ProjectStatus } from '../types'

/** A Project minus its translatable prose, which the locale supplies. */
export interface ProjectMeta {
  id: string
  status?: ProjectStatus
  technologies: string[]
  repos?: ProjectRepo[]
  githubUrl?: string
  liveUrl?: string
}

/** Public repos link; private ones are named but never linked (ADR: no 404s). */
const gh = (path: string): string => `https://github.com/JorisJonkers-dev/${path}`

export const PROJECTS: ProjectMeta[] = [
  {
    id: 'homelab-platform',
    status: 'production',
    technologies: [
      'k3s',
      'NixOS',
      'Nix',
      'Flux CD',
      'Kustomize',
      'Traefik',
      'Vault',
      'Longhorn',
      'Garage',
      'PostgreSQL',
      'Grafana',
      'Loki',
      'Tempo',
    ],
    repos: [
      {
        name: 'platform/fleet-infra',
        description: 'Flux manifests and cluster bootstrapping for the whole fleet',
        private: true,
      },
      {
        name: 'platform/nix-config',
        description: 'NixOS configurations for every machine in the fleet',
        private: true,
      },
      {
        name: 'platform/homelab-inventory',
        description: 'Host inventory recording every node, role and label',
        private: true,
      },
      {
        name: 'platform/homelab-collections',
        description: 'Collection specs for third-party and platform service deployments',
        private: true,
      },
      {
        name: 'platform/flux-modules',
        description: 'Versioned Flux module packs and the shared backup scripts',
        url: gh('flux-modules'),
      },
      {
        name: 'platform/nixos-modules',
        description: 'Shared, versioned NixOS modules every host consumes',
        url: gh('nixos-modules'),
      },
    ],
    githubUrl: gh('flux-modules'),
  },
  {
    id: 'deployment',
    status: 'in-progress',
    technologies: ['TypeScript', 'JSON Schema', 'Flux CD', 'Kustomize'],
    repos: [
      {
        name: 'libs/deploy-config-schema',
        description: 'JSON Schemas defining service intent and rendered deployments',
        url: gh('deploy-config-schema'),
      },
      {
        name: 'libs/deploy-kit',
        description: 'Successor compiler: three-layer deployment model and renderer',
        url: gh('deploy-kit'),
      },
      {
        name: 'platform/homelab-collections',
        description: 'Collection specs for third-party and platform service deployments',
        private: true,
      },
    ],
    githubUrl: gh('deploy-config-schema'),
  },
  {
    id: 'agents',
    status: 'production',
    technologies: ['Hermes Agent', 'MCP', 'Python', 'Kotlin', 'Spring Boot', 'Vue.js', 'k3s'],
    repos: [
      {
        name: 'libs/agent-kit',
        description: 'Generated skills and MCP server registry for every agent',
        url: gh('agent-kit'),
      },
      {
        name: 'inbox/openrouter-model-catalog',
        description: 'Generated catalogue of every tool-calling OpenRouter model',
        url: gh('openrouter-model-catalog'),
      },
    ],
    githubUrl: gh('agent-kit'),
  },
  {
    id: 'knowledge',
    status: 'production',
    technologies: ['Kotlin', 'Spring Boot', 'Python', 'MCP', 'PostgreSQL', 'RabbitMQ', 'Obsidian'],
    repos: [
      {
        name: 'services/knowledge',
        description: 'Kotlin and Spring API owning notes, search and MCP',
        url: gh('knowledge'),
      },
      {
        name: 'data/knowledge-vault',
        description: 'Obsidian vault that is the git source of truth',
        private: true,
      },
    ],
    githubUrl: gh('knowledge'),
  },
  {
    id: 'auth',
    status: 'production',
    technologies: ['Kotlin', 'Spring Boot', 'Vue.js', 'TypeScript', 'PostgreSQL'],
    repos: [
      {
        name: 'services/auth-api',
        description: 'Kotlin and Spring authorization server: login, sessions and OIDC',
        url: gh('auth-api'),
      },
      {
        name: 'ui/auth-ui',
        description: 'Vue frontend for login, profile and account flows',
        url: gh('auth-ui'),
      },
      {
        name: 'libs/authz-model',
        description: 'One model generating role and permission constants',
        url: gh('authz-model'),
      },
      {
        name: 'ui/home-portal',
        description: 'This portal: application launcher for the whole estate',
        url: gh('home-portal'),
      },
    ],
    githubUrl: gh('auth-api'),
  },
  {
    id: 'backup-dr',
    status: 'production',
    technologies: ['k3s', 'Vault', 'PostgreSQL', 'RabbitMQ', 'Garage', 'Bash'],
    repos: [
      {
        name: 'platform/flux-modules',
        description: 'Versioned Flux module packs and the shared backup scripts',
        url: gh('flux-modules'),
      },
      {
        name: 'platform/fleet-infra',
        description: 'Flux manifests and cluster bootstrapping for the whole fleet',
        private: true,
      },
    ],
    githubUrl: gh('flux-modules'),
  },
  {
    id: 'tooling',
    status: 'production',
    technologies: ['Gradle', 'GitHub Actions', 'Renovate', 'OpenAPI', 'Kotlin', 'TypeScript'],
    repos: [
      {
        name: 'tooling/repo-template',
        description: 'Bootstrap template: branch ruleset, checks and release-please',
        url: gh('repo-template'),
      },
      {
        name: 'tooling/github-workflows',
        description: 'Reusable CI and release workflows consumed by tag',
        url: gh('github-workflows'),
      },
      {
        name: 'tooling/github-defaults',
        description: 'Organisation defaults: issue templates, labels and policies',
        url: gh('.github'),
      },
      {
        name: 'tooling/gradle-conventions',
        description: 'Shared Gradle convention plugins for Kotlin and Spring builds',
        url: gh('gradle-conventions'),
      },
      {
        name: 'tooling/openapi-client-gradle',
        description: 'Gradle plugin generating OpenAPI clients for published specs',
        url: gh('openapi-client-gradle'),
      },
      {
        name: 'tooling/api-contract-checks',
        description: 'Contract-drift checks that fail the build, not the runtime',
        url: gh('api-contract-checks'),
      },
      {
        name: 'tooling/renovate-config',
        description: 'Shared Renovate preset every estate repository inherits',
        url: gh('renovate-config'),
      },
      {
        name: 'libs/kotlin-spring-commons',
        description: 'Shared Kotlin and Spring Boot library for services',
        url: gh('kotlin-spring-commons'),
      },
      {
        name: 'libs/vue-web-commons',
        description: 'Shared Vue components and composables for front ends',
        url: gh('vue-web-commons'),
      },
      {
        name: 'tools/stalwart-provisioner',
        description: 'Provisions Stalwart mail domains, accounts and aliases',
        url: gh('stalwart-provisioner'),
      },
      {
        name: 'tests/stack-integration-tests',
        description: 'Whole-stack tests gating deploys against pinned images',
        url: gh('stack-integration-tests'),
      },
      {
        name: 'workspace',
        description: 'Meta-repository assembling the estate as submodules',
        url: gh('workspace'),
      },
    ],
    githubUrl: gh('repo-template'),
  },
  {
    id: 'esa-blueshell',
    status: 'production',
    technologies: ['Spring Boot', 'Kotlin', 'Vue.js', 'TypeScript', 'k3s', 'Flux CD'],
    repos: [
      {
        name: 'ESA-Blueshell/website',
        description: 'Association site: membership, events, contributions and signups',
        url: 'https://github.com/ESA-Blueshell/website',
      },
    ],
    githubUrl: 'https://github.com/ESA-Blueshell/website',
    liveUrl: 'https://esa-blueshell.nl',
  },
]
