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
    ],
  },
  { path: '/receiving', component: Receiving },
  { path: '/customer-orders', component: CustomerOrders },
  { path: '/inventory', component: Inventory },
  { path: '/customers', component: Customers },
    { path: '/utilities', component: Utilities },
    { path: '/themeswitch', component: ThemeSwitcher },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
