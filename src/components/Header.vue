<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md min-w-[1300px]">
    <!-- Logo and Main Nav -->
    <div class="flex h-16 items-center justify-between px-4 lg:px-8">


      <nav class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <router-link to="/" class="block pr-4 py-2 text-sm text-black"><img src="/vendor-logo.png" class="w-[100px]" alt="" srcset=""></router-link>
        </div>
        <Dropdown ref="productDropdown" contentClasses="w-56 left-0 right-auto">
          <template #trigger>
            <button
                class="relative flex items-center gap-1 text-sm font-medium tracking-tight uppercase transition-colors text-black hover:text-neutral-400"
            >
              Product <ChevronDown :size="16" class="text-black group-hover:text-black transition-colors"/>
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
                class="relative flex items-center gap-1 text-sm font-medium tracking-tight uppercase transition-colors text-black hover:text-neutral-400"
            >
              Product Setting <ChevronDown :size="16" class="text-black group-hover:text-black transition-colors"/>
            </button>
          </template>

          <template #content>
            <div class="py-1">
              <DropdownItem
                  v-for="item in productSettingItems"
                  :key="item.label"
                  :item="item"
              />
            </div>
          </template>
        </Dropdown>

        <Dropdown ref="receivingDropdown" contentClasses="w-56 left-0 right-auto">
          <template #trigger>
            <button
                class="relative flex items-center gap-1 text-sm font-medium tracking-tight uppercase transition-colors text-black hover:text-neutral-400"
            >
              Receiving <ChevronDown :size="16" class="text-black group-hover:text-black transition-colors"/>
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

        <router-link to="/customer-orders" class="group relative flex items-center gap-1 text-sm font-medium tracking-tight uppercase transition-colors text-black hover:text-neutral-400">
          Customer Orders
        </router-link>

        <router-link to="/inventory" class="group relative flex items-center gap-1 text-sm font-medium tracking-tight uppercase transition-colors text-black hover:text-neutral-400">
          Inventory
        </router-link>

        <router-link to="/customers" class="group relative flex items-center gap-1 text-sm font-medium tracking-tight uppercase transition-colors text-black hover:text-neutral-400">
          Customers
        </router-link>

      </nav>
      <div class="flex items-center gap-4">


        <Dropdown ref="userDropdown">
          <template #trigger>
            <button
                class="flex items-center gap-2 rounded-full pl-2 pr-3 py-0 transition-all duration-200 border border-transparent "
            >
              <div class="w-7 h-7 rounded-full flex items-center justify-center bg-black">M</div>
              <span class="text-sm text-black font-medium">Mello</span>
              <svg
                  class="w-4 h-4 text-black transition-transform duration-300"
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
              <p class="text-sm text-black font-medium">Mello</p>
              <p class="text-xs text-black">mello@example.com</p>
            </div>

            <div class="py-1">
              <a
                  v-for="item in menuItems"
                  :key="item.label"
                  href="#"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-black hover:text-black hover:bg-zinc-50 transition-colors duration-150 group"
              >
                <component :is="item.icon" class="w-4 h-4 text-black group-hover:text-blue-400 transition-colors" />
                {{ item.label }}
              </a>
            </div>

            <div class="border-t border-border pt-1 mt-1">
              <a
                  href="#"
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
</template>

<script setup>

 import {h, ref, watch} from 'vue'
 import {User, Settings, LogOut, ChevronDown} from 'lucide-vue-next'

 import Dropdown from "@/components/Dropdown.vue";
 import DropdownItem from "@/components/DropdownItem.vue";
 import {useRoute} from "vue-router";


 const menuItems = [
   { label: 'Profile', icon: User },
   { label: 'Settings', icon: Settings },
 ]

 const productItems = [
   { label: 'Product List' , to: '/products/list' },
   { label: 'Dress',
     children: [
       { label: 'Parent 1',
         children: [
           { label: 'Child 1' },
           { label: 'Child 1' },
         ]
       },
       { label: 'Parent 2',
         children: [
           { label: 'Child 1' },
           { label: 'Child 1' },
         ]},
       { label: 'Parent 3'},

     ]
   },
   { label: 'Add Product'},
   { label: 'Bulk Import/Export'},
 ]

 const productSettingItems = [
   { label: 'Add Category' , to: '/category' },
   { label: 'Add Color', to: '/colors' },
   { label: 'Add Pack', to: '/packs'}
 ]

 const receivingItems = [
   { label: 'Purchase Orders' , to: '/purchase-order' },
   { label: 'Vendor Shipments', to: '/vendor-shipment' },
   { label: 'Warehouse Receiving', to: '/warehouse-receiving'},
   // { label: 'Vendor', to: '/packs'},
   // { label: 'Return to Vendor', to: '/packs'},
 ]

 const productDropdown = ref(null);
 const productSettingDropdown = ref(null);
  const receivingDropdown = ref(null);
 const userDropdown = ref(null);
 const route = useRoute();

 watch(() => route.fullPath, () => {
   if (productDropdown.value) {
     productDropdown.value.close();
   }
   if (productSettingDropdown.value) {
     productSettingDropdown.value.close();
   }
   if (receivingDropdown.value) {
     receivingDropdown.value.close();
   }
   if (userDropdown.value) {
     userDropdown.value.close();
   }
 });
</script>
<style scoped>
.router-link-active {
  color: #00b8db;
}
</style>