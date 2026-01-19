import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/settings/payment-terms',
    name: 'settings.payment-terms',
    component: () => import('@/views/settings/PaymentTerms.vue'),
    beforeEnter: requireAuth,
    meta: {
      title: 'Payment Terms',
      permissions: ['payment-terms.view']
    }
  },
  {
    path: '/settings/shipping-methods',
    name: 'settings.shipping-methods',
    component: () => import('@/views/settings/ShippingMethods.vue'),
    beforeEnter: requireAuth,
    meta: {
      title: 'Shipping Methods',
      permissions: ['shipping-methods.view']
    }
  },
  {
    path: '/settings/warehouses',
    name: 'settings.warehouses',
    component: () => import('@/views/settings/Warehouses.vue'),
    beforeEnter: requireAuth,
    meta: {
      title: 'Warehouses',
      permissions: ['warehouses.view']
    }
  }
]
