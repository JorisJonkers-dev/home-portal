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
  /**
   * Bars mean "years of hands-on use", which only makes sense for things you
   * write or operate directly — languages and frameworks. Everything else is a
   * pill: a runtime you deploy onto is not a skill you accumulate.
   */
  display: 'bars' | 'pills'
  /** Bar fill colour; only read when display is 'bars'. */
  bar?: string
  skills: Skill[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: 'languages',
    display: 'bars',
    accent: 'text-terminal-cyan',
    bar: 'from-accent to-terminal-cyan',
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
    display: 'bars',
    accent: 'text-terminal-purple',
    bar: 'from-terminal-purple to-terminal-pink',
    skills: [
      { name: 'Ruby on Rails', years: 4 },
      { name: 'Vue.js', years: 3 },
      { name: 'Angular', years: 3 },
      { name: 'Spring Boot', years: 3 },
      { name: 'PyTorch', years: 2 },
    ],
  },
  {
    key: 'platform',
    display: 'pills',
    accent: 'text-terminal-amber',
    skills: [
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
    key: 'infrastructure',
    display: 'pills',
    accent: 'text-terminal-amber',
    skills: [{ name: 'k3s' }, { name: 'NixOS' }, { name: 'Nomad' }, { name: 'Docker' }],
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
    ],
  },
]

export const SOFT_SKILLS = ['Project Management', 'Public Relations', 'Communication', 'Critical Thinking']

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
