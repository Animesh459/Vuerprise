import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/customer-orders',
    name: 'orders.customer',
    component: () => import('@/views/CustomerOrders.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Customer Orders' },
  },
]
