import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Profile' },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Site Settings' },
  },
]
