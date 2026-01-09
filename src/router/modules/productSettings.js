import { requireAuth } from '../guards/auth'

export default [
  // Master Colors
  {
    path: '/master-colors',
    name: 'masterColors',
    component: () => import('@/views/products/settings/MasterColors.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Master Colors' },
  },

  // Categories
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/products/settings/Categories.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Categories' },
  },
  
  // Colors
  {
    path: '/colors',
    name: 'colors',
    component: () => import('@/views/products/settings/Colors.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Colors' },
  },
  
  // Packs
  {
    path: '/packs',
    name: 'packs',
    component: () => import('@/views/products/settings/Packs.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Packs' },
  },
  
  // Sizes
  {
    path: '/sizes',
    name: 'sizes',
    component: () => import('@/views/products/settings/Sizes.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Sizes' },
  },
]

