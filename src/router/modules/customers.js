import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/Customers.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Customers' },
  },
]
