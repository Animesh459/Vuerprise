import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/products/Products.vue'),
    redirect: '/products/list',
    beforeEnter: requireAuth,
    children: [
      {
        path: 'list',
        name: 'products.list',
        component: () => import('@/views/products/ProductList.vue'),
        meta: { title: 'Product List' },
      },
      {
        path: 'category/:categoryId',
        name: 'products.category',
        component: () => import('@/views/products/ProductList.vue'),
        meta: { title: 'Products by Category' },
      },
      {
        path: 'create',
        name: 'products.create',
        component: () => import('@/views/products/ProductForm.vue'),
        props: { type: 'create' },
        meta: { title: 'Create Product' },
      },
      {
        path: ':id/edit',
        name: 'products.edit',
        component: () => import('@/views/products/ProductForm.vue'),
        props: { type: 'edit' },
        meta: { title: 'Edit Product' },
      },
      {
        path: ':id/clone',
        name: 'products.clone',
        component: () => import('@/views/products/ProductForm.vue'),
        props: { type: 'clone' },
        meta: { title: 'Clone Product' },
      },
      {
        path: ':id',
        name: 'products.detail',
        component: () => import('@/views/products/ProductDetail.vue'),
        meta: { title: 'Product Detail' },
      },
      {
        path: 'settings',
        name: 'products.settings',
        component: () => import('@/views/products/ProductSettings.vue'),
        meta: { title: 'Product Settings' },
      },
      {
        path: 'import-export',
        name: 'products.importExport',
        component: () => import('@/views/products/BulkImportExport.vue'),
        meta: { title: 'Bulk Import/Export' },
      },
    ],
  },
]
