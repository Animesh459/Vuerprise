<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md min-w-[1300px]">
    <!-- Logo and Main Nav -->
    <div class="flex h-16 items-center justify-between px-6">
      <nav class="flex items-center gap-6">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <router-link to="/" class="flex items-center gap-2">
            <div v-if="siteSettings?.logo" class="h-10 flex items-center">
              <img
                :src="siteSettings.logo"
                :alt="siteSettings.site_name || 'Logo'"
                class="h-full w-auto object-contain"
              />
            </div>
            <div v-else class="flex items-center gap-2">
              <div class="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">{{ (siteSettings?.site_name || 'VE').substring(0, 2) }}</span>
              </div>
              <span class="text-xl font-bold text-gray-900">{{ siteSettings?.site_name || 'Vlan24 ERP' }}</span>
            </div>
          </router-link>
        </div>

        <!-- Product Dropdown -->
        <Dropdown ref="productDropdown" contentClasses="w-56 left-0 right-auto">
          <template #trigger>
            <button
                class="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition group"
            >
              <Boxes :size="18" class="transition-colors" />
              Product <ChevronDown :size="16" class="opacity-50 group-hover:opacity-70 transition-opacity"/>
            </button>
          </template>

          <template #content>
            <div class="py-1">
              <DropdownItem
                  v-for="item in productItems"
                  :key="item.label"
                  :item="item"
              />
            </div>
          </template>
        </Dropdown>

        <Dropdown ref="productSettingDropdown" contentClasses="w-56 left-0 right-auto">
          <template #trigger>
            <button
                class="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition group"
            >
              <Settings2 :size="18" class="transition-colors" />
              Product Setting <ChevronDown :size="16" class="opacity-50 group-hover:opacity-70 transition-opacity"/>
            </button>
          </template>
        </Dropdown>

        <Dropdown ref="receivingDropdown" contentClasses="w-56 left-0 right-auto">
          <template #trigger>
            <button
                class="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition group"
            >
              <PackageCheck :size="18" class="transition-colors" />
              Receiving <ChevronDown :size="16" class="opacity-50 group-hover:opacity-70 transition-opacity"/>
            </button>
          </template>

          <template #content>
            <div class="py-1">
              <DropdownItem
                  v-for="item in receivingItems"
                  :key="item.label"
                  :item="item"
              />
            </div>
          </template>
        </Dropdown>

        <router-link to="/customer-orders" class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
          <ShoppingBag :size="18" />
          Customer Orders
        </router-link>

        <router-link to="/inventory" class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
          <Warehouse :size="18" />
          Inventory
        </router-link>

        <router-link to="/customers" class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
          <UsersRound :size="18" />
          Customers
        </router-link>

        <!-- User Management Dropdown -->
        <Dropdown ref="userManagementDropdown" contentClasses="w-56 left-0 right-auto">
          <template #trigger>
            <button
                class="relative flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              User Management <ChevronDown :size="16" class="text-zinc-500 group-hover:text-zinc-500 transition-colors"/>
            </button>
          </template>

          <template #content>
            <div class="py-1">
              <DropdownItem
                  v-for="item in userManagementItems"
                  :key="item.label"
                  :item="item"
              />
            </div>
          </template>
        </Dropdown>

      </nav>
      <div class="flex items-center gap-4">


        <Dropdown ref="userDropdown">
          <template #trigger>
            <button
                class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  v-if="user?.profile_image"
                  :src="user.profile_image"
                  :alt="user?.name || 'User'"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-gradient-to-br from-black to-gray-800 text-white font-semibold text-sm"
                >
                  {{ (user?.name || 'U').charAt(0).toUpperCase() }}
                </div>
              </div>
              <span class="text-sm text-zinc-500 font-medium">{{ user?.name || 'User' }}</span>
              <svg
                  class="w-4 h-4 text-zinc-500 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </template>

          <template #content>
            <div class="px-4 py-3 border-b border-border">
              <p class="text-sm text-zinc-500 font-medium">{{ user?.name || 'User' }}</p>
              <p class="text-xs text-zinc-500">{{ user?.email || '' }}</p>
            </div>

            <div class="py-1">
              <router-link
                  v-for="item in menuItems"
                  :key="item.label"
                  :to="item.route"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-500 hover:bg-zinc-50 transition-colors duration-150 group"
              >
                <component :is="item.icon" class="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                {{ item.label }}
              </router-link>
            </div>

            <div class="border-t border-border pt-1 mt-1">
              <a
                  href="#"
                  @click.prevent="showLogoutModal = true"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-150 group"
              >
                <LogOut class="w-4 h-4" />
                Logout
              </a>
            </div>
          </template>
        </Dropdown>


      </div>
    </div>
  </header>

  <!-- Logout Confirmation Modal -->
  <ConfirmModal
    :show="showLogoutModal"
    title="Logout Confirmation"
    message="Are you sure you want to logout? You will need to login again to access your account."
    :confirmText="'Logout'"
    :cancelText="'Cancel'"
    @confirm="confirmLogout"
    @cancel="showLogoutModal = false"
  />
</template>

<script setup>

 import {h, ref, watch, onMounted, computed} from 'vue'
 import {User, Settings, LogOut, ChevronDown} from 'lucide-vue-next'

 import Dropdown from "@/components/Dropdown.vue";
 import DropdownItem from "@/components/DropdownItem.vue";
 import ConfirmModal from "@/components/ConfirmModal.vue";
 import {useRoute} from "vue-router";
 import { useAuth } from '@/composables/useAuth';
 import { useSettings } from '@/composables/useSettings';
 import apiClient from '@/utils/axios';

 const { user, logout } = useAuth();
 const { settings: siteSettings, fetchSettings } = useSettings();
 const showLogoutModal = ref(false);
 const categories = ref([]);

 // Fetch site settings on mount
 onMounted(async () => {
   try {
     await fetchSettings();
     await fetchCategories();
   } catch (error) {
     console.error('Failed to load site settings:', error);
   }
 });

 // Fetch categories from API
 const fetchCategories = async () => {
   try {
     const response = await apiClient.get('/categories');
     categories.value = response.data.data || [];
   } catch (error) {
     console.error('Failed to fetch categories:', error);
     categories.value = [];
   }
 };

 const confirmLogout = async () => {
   showLogoutModal.value = false;
   await logout();
 };


 const menuItems = [
   { label: 'Profile', icon: User, route: '/profile' },
   { label: 'Settings', icon: Settings, route: '/settings' },
 ]

// Build product items with dynamic categories
const productItems = computed(() => {
  const items = [
    { label: 'Add New Product', to: '/products/create' },
    { label: 'Product List', to: '/products' },
  ];

  // Add categories dynamically
  const categoryItems = buildCategoryTree(categories.value);
  items.push(...categoryItems);

  // Add settings section
  items.push({
    label: 'Product Settings',
    children: [
      { label: 'Categories', to: '/categories' },
      { label: 'Master Color', to: '/master-colors' },
      { label: 'Color', to: '/colors' },
      { label: 'Size', to: '/sizes' },
      { label: 'Pack', to: '/packs' },
    ]
  });

  return items;
});

// Helper function to build category tree
const buildCategoryTree = (cats) => {
  return cats.map(category => {
    const item = {
      label: category.name,
      to: `/products/category/${category.id}`
    };

    if (category.sub_categories && category.sub_categories.length > 0) {
      item.children = buildCategoryTree(category.sub_categories);
    }

    return item;
  });
};

 const receivingItems = [
   { label: 'Purchase Orders' , to: '/purchase-order' },
   { label: 'Vendor Shipments', to: '/vendor-shipment' },
   { label: 'Warehouse Receiving', to: '/warehouse-receiving'},
   // { label: 'Vendor', to: '/packs'},
   // { label: 'Return to Vendor', to: '/packs'},
 ]

 const userManagementItems = [
   { label: 'Users', to: '/users' },
   { label: 'Roles', to: '/roles' },
 ]

 const productDropdown = ref(null);
 const receivingDropdown = ref(null);
 const userManagementDropdown = ref(null);
 const userDropdown = ref(null);
 const route = useRoute();

 watch(() => route.fullPath, () => {
   if (productDropdown.value) {
     productDropdown.value.close();
   }
   if (receivingDropdown.value) {
     receivingDropdown.value.close();
   }
   if (userManagementDropdown.value) {
     userManagementDropdown.value.close();
   }
   if (userDropdown.value) {
     userDropdown.value.close();
   }
 });
</script>
<style scoped>
.router-link-active {
  color: #2563eb;
}
</style>