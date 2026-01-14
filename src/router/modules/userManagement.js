export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/rbac/Users.vue'),
    meta: {
      requiresAuth: true,
      title: 'Users',
      permissions: ['users.list']
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('@/views/rbac/roles/List.vue'),
    meta: {
      requiresAuth: true,
      title: 'Roles & Permissions',
      permissions: ['roles.list']
    }
  },
  {
    path: '/roles/create',
    name: 'CreateRole',
    component: () => import('@/views/rbac/roles/Form.vue'),
    meta: {
      requiresAuth: true,
      title: 'Create Role',
      permissions: ['roles.create']
    }
  },
  {
    path: '/roles/:id/edit',
    name: 'EditRole',
    component: () => import('@/views/rbac/roles/Form.vue'),
    meta: {
      requiresAuth: true,
      title: 'Edit Role',
      permissions: ['roles.update']
    }
  }
]
