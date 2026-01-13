export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/rbac/Users.vue'),
    meta: {
      requiresAuth: true,
      title: 'Users'
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('@/views/rbac/roles/List.vue'),
    meta: {
      requiresAuth: true,
      title: 'Roles & Permissions'
    }
  },
  {
    path: '/roles/create',
    name: 'CreateRole',
    component: () => import('@/views/rbac/roles/Form.vue'),
    meta: {
      requiresAuth: true,
      title: 'Create Role'
    }
  },
  {
    path: '/roles/:id/edit',
    name: 'EditRole',
    component: () => import('@/views/rbac/roles/Form.vue'),
    meta: {
      requiresAuth: true,
      title: 'Edit Role'
    }
  }
]
