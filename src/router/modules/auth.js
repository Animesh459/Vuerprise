import { requireGuest } from '../guards/auth'

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: requireGuest,
    meta: {
      hideHeader: true,
    },
  },
]
