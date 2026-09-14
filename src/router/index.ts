import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/views/HomeView.vue'),
  },
  {
    path: '/apps',
    name: 'apps',
    component: () => import('@/features/apps/views/AppsView.vue'),
  },
  {
    // The index was removed: projects are reached from the home showcase.
    // Kept as a redirect so an old bookmark still lands on the overview.
    path: '/projects',
    redirect: { path: '/', hash: '#projects' },
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('@/features/home/views/ProjectDetailView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/features/account/views/AccountView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/features/admin/views/AdminView.vue'),
  },
  {
    path: '/callback',
    name: 'auth-callback',
    component: () => import('@/features/auth/views/AuthCallbackView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  // When a RouterLink targets an in-page hash (e.g. { path: '/', hash: '#about' })
  // from any route, scroll the destination element into view after navigation.
  // The top offset accounts for the sticky nav bar.
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { left: 0, top: 0 }
  },
})
