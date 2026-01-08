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
        path: 'add',
        name: 'products.add',
        component: () => import('@/views/products/AddProduct.vue'),
        meta: { title: 'Add Product' },
      },
      {
        path: ':id',
        name: 'products.detail',
        component: () => import('@/views/products/ProductDetail.vue'),
        meta: { title: 'Product Detail' },
      },
      {
        path: ':id/edit',
        name: 'products.edit',
        component: () => import('@/views/products/ProductDetail.vue'),
        meta: { title: 'Edit Product' },
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
