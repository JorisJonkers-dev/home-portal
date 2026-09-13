/**
 * Skill vocabulary for the Skills section.
 *
 * Every technology tag used by a project card must appear in one of these
 * categories, spelled identically — `src/__tests__/ProjectData.test.ts`
 * enforces it. Spellings follow the canonical tag list in `CONTEXT.md`:
 * unversioned, one spelling each.
 */
export interface Skill {
  name: string
  years?: number
}

export interface SkillCategory {
  /** i18n key under `skills.categories`. */
  key: string
  /** Heading colour class. */
  accent: string
  /** Languages carry tenure bars; every other category is pills. */
  display: 'bars' | 'pills'
  skills: Skill[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: 'languages',
    display: 'bars',
    accent: 'text-terminal-cyan',
    skills: [
      { name: 'JavaScript / TypeScript', years: 6 },
      { name: 'Java', years: 6 },
      { name: 'Python', years: 6 },
      { name: 'Bash', years: 6 },
      { name: 'Ruby', years: 4 },
      { name: 'Kotlin', years: 3 },
      { name: 'Nix', years: 1 },
    ],
  },
  {
    key: 'frameworks',
    display: 'pills',
    accent: 'text-terminal-purple',
    skills: [
      { name: 'Spring Boot' },
      { name: 'Vue.js' },
      { name: 'Ruby on Rails' },
      { name: 'Angular' },
      { name: 'PyTorch' },
      { name: 'Nomad' },
    ],
  },
  {
    key: 'platform',
    display: 'pills',
    accent: 'text-terminal-amber',
    skills: [
      { name: 'k3s' },
      { name: 'NixOS' },
      { name: 'Flux CD' },
      { name: 'Kustomize' },
      { name: 'Traefik' },
      { name: 'Vault' },
      { name: 'Longhorn' },
      { name: 'Garage' },
      { name: 'MetalLB' },
      { name: 'cert-manager' },
      { name: 'PostgreSQL' },
      { name: 'RabbitMQ' },
    ],
  },
  {
    key: 'observability',
    display: 'pills',
    accent: 'text-terminal-green',
    skills: [
      { name: 'Grafana' },
      { name: 'Loki' },
      { name: 'Tempo' },
      { name: 'Pyroscope' },
      { name: 'Alloy' },
      { name: 'Gatus' },
    ],
  },
  {
    key: 'agents',
    display: 'pills',
    accent: 'text-accent-light',
    skills: [
      { name: 'Hermes Agent' },
      { name: 'MCP' },
      { name: 'Ollama' },
      { name: 'Obsidian' },
      { name: 'JSON Schema' },
    ],
  },
  {
    key: 'delivery',
    display: 'pills',
    accent: 'text-terminal-cyan',
    skills: [
      { name: 'Gradle' },
      { name: 'GitHub Actions' },
      { name: 'Renovate' },
      { name: 'OpenAPI' },
      { name: 'pnpm' },
      { name: 'Docker' },
    ],
  },
]

export const SOFT_SKILLS = [
  'Project Management',
  'Public Relations',
  'Communication',
  'Critical Thinking',
]

/** Widest bar in the Languages category; matches the longest tenure. */
const MAX_YEARS = 6

export function barWidth(years: number): string {
  return `${(years / MAX_YEARS) * 100}%`
}

/**
 * Every name a project tag may use. A slash-joined row such as
 * "JavaScript / TypeScript" answers to either half.
 */
export const ALL_SKILL_NAMES: string[] = [
  ...SKILL_CATEGORIES.flatMap((c) => c.skills.flatMap((s) => s.name.split(' / '))),
  ...SOFT_SKILLS,
]
