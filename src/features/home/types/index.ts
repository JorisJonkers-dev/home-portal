export type ProjectStatus = 'production' | 'in-progress' | 'parked'

export interface ProjectRepo {
  /** Workspace path, e.g. `platform/fleet-infra`. Displayed verbatim. */
  name: string
  /**
   * One line on what the repo is for. Deliberately untranslated and kept
   * beside the metadata it describes — see ADR-0002.
   */
  description: string
  /** Absent for a private repo, which is named but never linked. */
  url?: string
  private?: boolean
}

export interface Project {
  /** Stable key; the locale entry lives at `projects.entries.<id>`. */
  id: string
  status?: ProjectStatus
  title: string
  /** One line for the index card; the whole card links to the detail page. */
  summary: string
  /** Full prose, shown only on the detail page. */
  description: string
  /** Bullet points on the detail page. */
  highlights: string[]
  technologies: string[]
  repos?: ProjectRepo[]
  githubUrl?: string
  liveUrl?: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  technologies: string[]
}
