import { describe, expect, it } from 'vitest'
import { router } from '../router'

describe('router', () => {
  it('has a home route at /', () => {
    const route = router.getRoutes().find((r) => r.path === '/')
    expect(route).toBeDefined()
    expect(route?.name).toBe('home')
  })

  it('has an apps route at /apps', () => {
    const route = router.getRoutes().find((r) => r.path === '/apps')
    expect(route).toBeDefined()
    expect(route?.name).toBe('apps')
  })

  it('has a projects index route at /projects', () => {
    const route = router.getRoutes().find((r) => r.path === '/projects')
    expect(route).toBeDefined()
    expect(route?.name).toBe('projects')
  })

  it('has a project detail route at /projects/:id', () => {
    const route = router.getRoutes().find((r) => r.path === '/projects/:id')
    expect(route).toBeDefined()
    expect(route?.name).toBe('project-detail')
  })

  it('has an auth callback route at /callback', () => {
    const route = router.getRoutes().find((r) => r.path === '/callback')
    expect(route).toBeDefined()
    expect(route?.name).toBe('auth-callback')
  })
})
