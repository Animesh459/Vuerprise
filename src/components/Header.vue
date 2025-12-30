<template>
  <header class="flex items-center justify-between px-6 py-4 border-b bg-[#0D121C] text-white fixed w-full z-50   border-[#000000] min-w-[1300px]">
    <!-- Logo and Main Nav -->
    <div class="flex items-center gap-8">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <router-link to="/" class="block pr-4 py-2 text-sm text-white"><img src="/vendor-logo.png" alt="" srcset=""></router-link>
      </div>

      <!-- Main Navigation Menu -->
      <nav class="flex items-center gap-1">

        <Dropdown ref="productDropdown" contentClasses="w-56 left-0 right-auto">
          <template #trigger>
            <button
                class="flex items-center text-[#b0b8c4] font-[14px] gap-2 pl-2 pr-3 py-1.5 transition-all duration-200 border border-transparent cursor-pointer"
            >
              Product <ChevronDown :size="16" class="text-slate-500 group-hover:text-white transition-colors"/>
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
                class="flex text-[#b0b8c4] font-[14px] items-center gap-2 pl-2 pr-3 py-1.5 transition-all duration-200 border border-transparent cursor-pointer"
            >
              Product Setting <ChevronDown :size="16" class="text-slate-500 group-hover:text-white transition-colors"/>
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
                class="flex text-[#b0b8c4] font-[14px] items-center gap-2 pl-2 pr-3 py-1.5 transition-all duration-200 border border-transparent cursor-pointer"
            >
              Receiving <ChevronDown :size="16" class="text-slate-500 group-hover:text-white transition-colors"/>
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

<!--        <router-link to="/receiving" class="px-3 bg-none border-none text-[#b0b8c4] cursor-pointer text-[0.95rem] transition-all duration-300 ease-in-out border-b-2 border-transparent">-->
<!--          Receiving-->
<!--        </router-link>-->

        <router-link to="/customer-orders" class="px-3 bg-none border-none text-[#b0b8c4] cursor-pointer text-[0.95rem] transition-all duration-300 ease-in-out border-b-2 border-transparent">
          Customer Orders
        </router-link>

        <router-link to="/inventory" class="px-3 bg-none border-none text-[#b0b8c4] cursor-pointer text-[0.95rem] transition-all duration-300 ease-in-out border-b-2 border-transparent">
          Inventory
        </router-link>

        <router-link to="/customers" class="px-3 bg-none border-none text-[#b0b8c4] cursor-pointer text-[0.95rem] transition-all duration-300 ease-in-out border-b-2 border-transparent">
          Customers
        </router-link>

      </nav>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center gap-4">


      <Dropdown ref="userDropdown">
        <template #trigger>
          <button
              class="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full pl-2 pr-3 py-1.5 transition-all duration-200 border border-transparent hover:border-slate-600"
          >
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 ring-2 ring-white/10"></div>
            <span class="text-sm text-white font-medium">Mello</span>
            <svg
                class="w-4 h-4 text-slate-400 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </template>

        <template #content>
          <div class="px-4 py-3 border-b border-slate-700/50">
            <p class="text-sm text-white font-medium">Mello</p>
            <p class="text-xs text-slate-400">mello@example.com</p>
          </div>

          <div class="py-1">
            <a
                v-for="item in menuItems"
                :key="item.label"
                href="#"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150 group"
            >
              <component :is="item.icon" class="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              {{ item.label }}
            </a>
          </div>

          <div class="border-t border-slate-700/50 pt-1 mt-1">
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