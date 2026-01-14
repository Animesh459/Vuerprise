import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('@/views/Inventory.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Inventory' },
  },
]
