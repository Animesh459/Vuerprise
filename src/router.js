import { createRouter, createWebHistory } from 'vue-router';
import Receiving from './views/Receiving.vue';
import CustomerOrders from './views/CustomerOrders.vue';
import Inventory from './views/Inventory.vue';
import Customers from './views/Customers.vue';
import Welcome from './views/Welcome.vue';
import Products from './views/products/Products.vue';
import ProductList from './views/products/ProductList.vue';
import AddProduct from './views/products/AddProduct.vue';
import ProductSettings from './views/products/ProductSettings.vue';
import BulkImportExport from './views/products/BulkImportExport.vue';
import ThemeSwitcher from './views/ThemeSwitcher.vue';
import Utilities from './views/Utilities.vue';
import Login from "@/views/Login.vue";
import ProductDetail from "@/views/products/ProductDetail.vue";
import AddCategory from "@/views/AddCategory.vue";
import ColorsCategory from "@/views/ColorsCategory.vue";
import PacksCategory from "@/views/PacksCategory.vue";
import PurchangeOrders from "@/views/receiving/PurchangeOrders.vue";
import VendorShipments from "@/views/receiving/VendorShipments.vue";
import WarehouseReceiving from "@/views/receiving/WarehouseReceiving.vue";
import CreateOrders from "@/views/receiving/CreateOrders.vue";

const routes = [
    { path: '/login',
        component: Login,
        meta: {
            hideHeader: true
        }
    },
  { path: '/', component: Welcome },
  {
    path: '/products',
    component: Products,
      redirect: '/products/list',
    children: [
      { path: 'list', component: ProductList },
      { path: 'add', component: AddProduct },
      { path: 'settings', component: ProductSettings },
      { path: 'import-export', component: BulkImportExport },
        { path: ':id', component: ProductDetail, name: 'ProductDetail' },
    ],
  },
  { path: '/receiving', component: Receiving },
  { path: '/customer-orders', component: CustomerOrders },
  { path: '/inventory', component: Inventory },
  { path: '/customers', component: Customers },
  { path: '/utilities', component: Utilities },
  { path: '/themeswitch', component: ThemeSwitcher },
    { path: '/category', component: AddCategory },
  { path: '/colors', component: ColorsCategory },
  { path: '/packs', component: PacksCategory },
  { path: '/purchase-order', component: PurchangeOrders },
    { path: '/create-orders', component: CreateOrders },
    { path: '/vendor-shipment', component: VendorShipments },
    { path: '/warehouse-receiving', component: WarehouseReceiving },
];

const router = createRouter({
  history: createWebHistory(),
    // history: createWebHistory('/vlan24-erp-admin-front/'),

  routes,
});

export default router;
