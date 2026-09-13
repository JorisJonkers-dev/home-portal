/**
 * Project metadata for the estate overview.
 *
 * Everything a translator would never change lives here: id, status, tags,
 * repos and links. The locale files hold only `projects.entries.<id>` with
 * `title` and `description`, in English and Dutch — see ADR-0001.
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
      { name: 'platform/fleet-infra', private: true },
      { name: 'platform/nix-config', private: true },
      { name: 'platform/homelab-inventory', private: true },
      { name: 'platform/homelab-collections', private: true },
      { name: 'platform/flux-modules', url: gh('flux-modules') },
      { name: 'platform/nixos-modules', url: gh('nixos-modules') },
    ],
    githubUrl: gh('flux-modules'),
  },
  {
    id: 'deployment',
    status: 'in-progress',
    technologies: ['TypeScript', 'JSON Schema', 'Flux CD', 'Kustomize'],
    repos: [
      { name: 'libs/deploy-config-schema', url: gh('deploy-config-schema') },
      { name: 'libs/deploy-kit', url: gh('deploy-kit') },
      { name: 'platform/homelab-collections', private: true },
    ],
    githubUrl: gh('deploy-config-schema'),
  },
  {
    id: 'agents',
    status: 'production',
    technologies: ['Hermes Agent', 'MCP', 'Python', 'Kotlin', 'Spring Boot', 'Vue.js', 'k3s'],
    repos: [
      { name: 'libs/agent-kit', url: gh('agent-kit') },
      { name: 'inbox/openrouter-model-catalog', url: gh('openrouter-model-catalog') },
    ],
    githubUrl: gh('agent-kit'),
  },
  {
    id: 'knowledge',
    status: 'production',
    technologies: ['Kotlin', 'Spring Boot', 'Python', 'MCP', 'PostgreSQL', 'RabbitMQ', 'Obsidian'],
    repos: [
      { name: 'services/knowledge', url: gh('knowledge') },
      { name: 'data/knowledge-vault', private: true },
    ],
    githubUrl: gh('knowledge'),
  },
  {
    id: 'auth',
    status: 'production',
    technologies: ['Kotlin', 'Spring Boot', 'Vue.js', 'TypeScript', 'PostgreSQL'],
    repos: [
      { name: 'services/auth-api', url: gh('auth-api') },
      { name: 'ui/auth-ui', url: gh('auth-ui') },
      { name: 'libs/authz-model', url: gh('authz-model') },
      { name: 'ui/home-portal', url: gh('home-portal') },
    ],
    githubUrl: gh('auth-api'),
  },
  {
    id: 'backup-dr',
    status: 'production',
    technologies: ['k3s', 'Vault', 'PostgreSQL', 'RabbitMQ', 'Garage', 'Bash'],
    repos: [
      { name: 'platform/flux-modules', url: gh('flux-modules') },
      { name: 'platform/fleet-infra', private: true },
    ],
    githubUrl: gh('flux-modules'),
  },
  {
    id: 'tooling',
    status: 'production',
    technologies: ['Gradle', 'GitHub Actions', 'Renovate', 'OpenAPI', 'Kotlin', 'TypeScript'],
    repos: [
      { name: 'tooling/repo-template', url: gh('repo-template') },
      { name: 'tooling/github-workflows', url: gh('github-workflows') },
      { name: 'tooling/github-defaults', url: gh('.github') },
      { name: 'tooling/gradle-conventions', url: gh('gradle-conventions') },
      { name: 'tooling/openapi-client-gradle', url: gh('openapi-client-gradle') },
      { name: 'tooling/api-contract-checks', url: gh('api-contract-checks') },
      { name: 'tooling/renovate-config', url: gh('renovate-config') },
      { name: 'libs/kotlin-spring-commons', url: gh('kotlin-spring-commons') },
      { name: 'libs/vue-web-commons', url: gh('vue-web-commons') },
      { name: 'tools/stalwart-provisioner', url: gh('stalwart-provisioner') },
      { name: 'tests/stack-integration-tests', url: gh('stack-integration-tests') },
      { name: 'workspace', url: gh('workspace') },
    ],
    githubUrl: gh('repo-template'),
  },
  {
    id: 'esa-blueshell',
    status: 'production',
    technologies: ['Spring Boot', 'Kotlin', 'Vue.js', 'TypeScript', 'k3s', 'Flux CD'],
    repos: [{ name: 'ESA-Blueshell/website', url: 'https://github.com/ESA-Blueshell/website' }],
    githubUrl: 'https://github.com/ESA-Blueshell/website',
    liveUrl: 'https://esa-blueshell.nl',
  },
]
