import { createRouter, createWebHistory } from 'vue-router'
import { requirePermission } from './guards/permission'

// Import route modules
import authRoutes from './modules/auth'
import dashboardRoutes from './modules/dashboard'
import productRoutes from './modules/products'
import productSettingRoutes from './modules/productSettings'
import receivingRoutes from './modules/receiving'
import orderRoutes from './modules/orders'
import customerRoutes from './modules/customers'
import inventoryRoutes from './modules/inventory'
import utilityRoutes from './modules/utilities'
import profileRoutes from './modules/profile'
import userManagementRoutes from './modules/userManagement'

// Combine all routes
const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  ...productRoutes,
  ...productSettingRoutes,
  ...receivingRoutes,
  ...orderRoutes,
  ...customerRoutes,
  ...inventoryRoutes,
  ...utilityRoutes,
  ...profileRoutes,
  ...userManagementRoutes,
  // Unauthorized page
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/Unauthorized.vue'),
    meta: {
      title: 'Access Denied'
    }
  },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Set page title from route meta
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vlan24 ERP`
  } else {
    document.title = 'Vlan24 ERP'
  }
  
  // Check permissions if route requires them
  if (to.meta.permissions && to.meta.permissions.length > 0) {
    requirePermission(to, from, next)
  } else {
    next()
  }
})

export default router
