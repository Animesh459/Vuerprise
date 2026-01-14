import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/utilities',
    name: 'utilities',
    component: () => import('@/views/Utilities.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Utilities' },
  },
  {
    path: '/theme-switcher',
    name: 'themeSwitcher',
    component: () => import('@/views/ThemeSwitcher.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Theme Switcher' },
  },
]
