export type ProjectStatus = 'production' | 'in-progress' | 'parked'

export interface ProjectRepo {
  /** Workspace path, e.g. `platform/fleet-infra`. Displayed verbatim. */
  name: string
  /** Absent for a private repo, which is named but never linked. */
  url?: string
  private?: boolean
}

export interface Project {
  /** Stable key; the locale entry lives at `projects.entries.<id>`. */
  id: string
  status?: ProjectStatus
  title: string
  description: string
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
