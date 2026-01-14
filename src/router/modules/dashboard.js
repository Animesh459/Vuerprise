import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Welcome.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Dashboard' },
  },
]
