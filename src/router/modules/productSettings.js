import { requireAuth } from '../guards/auth'

export default [
  // Categories
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/AddCategory.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Categories' },
  },
  
  // Colors
  {
    path: '/colors',
    name: 'colors',
    component: () => import('@/views/ColorsCategory.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Colors' },
  },
  
  // Packs
  {
    path: '/packs',
    name: 'packs',
    component: () => import('@/views/PacksCategory.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Packs' },
  },
  
  // Sizes (placeholder for future)
  {
    path: '/sizes',
    name: 'sizes',
    component: () => import('@/views/Welcome.vue'), // Replace with actual component
    beforeEnter: requireAuth,
    meta: { title: 'Sizes' },
  },
]
