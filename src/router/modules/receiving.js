import { requireAuth } from '../guards/auth'

export default [
  {
    path: '/receiving',
    name: 'receiving',
    component: () => import('@/views/Receiving.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Receiving' },
  },
  {
    path: '/purchase-orders',
    name: 'receiving.purchaseOrders',
    component: () => import('@/views/receiving/PurchangeOrders.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Purchase Orders' },
  },
  {
    path: '/create-orders',
    name: 'receiving.createOrders',
    component: () => import('@/views/receiving/CreateOrders.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Create Orders' },
  },
  {
    path: '/vendor-shipments',
    name: 'receiving.vendorShipments',
    component: () => import('@/views/receiving/VendorShipments.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Vendor Shipments' },
  },
  {
    path: '/warehouse-receiving',
    name: 'receiving.warehouseReceiving',
    component: () => import('@/views/receiving/WarehouseReceiving.vue'),
    beforeEnter: requireAuth,
    meta: { title: 'Warehouse Receiving' },
  },
]
