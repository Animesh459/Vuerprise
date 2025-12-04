<template>
  <header class="flex items-center justify-between px-6 py-4 border-b border-slate-700">
    <!-- Logo and Main Nav -->
    <div class="flex items-center gap-8">
      <!-- Logo -->
      <div class="flex items-center gap-2">

        <a href="/" class="text-xl font-semibold"><img src="/vendor-logo.png" alt="" srcset=""></a>
      </div>

      <!-- Main Navigation Menu -->
      <nav class="flex items-center gap-1">
        <!-- Products Dropdown -->
        <div class="relative" @mouseenter="openDropdown('products')" @mouseleave="closeDropdown">
          <button class="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white rounded hover:bg-slate-800">
            Products
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Products Dropdown Menu -->
          <div v-if="activeDropdown === 'products'" class="absolute top-full left-0 mt-1 w-56 bg-rose-900 rounded-md shadow-lg py-2 z-50">
            <!-- Product List with submenu -->
            <div>
              <router-link to="/products/list" @click="toggleSubmenu('productList')" class="flex items-center justify-between w-full px-4 py-2 text-sm text-white hover:bg-rose-800">
                Product List
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="openSubmenus.productList ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'" />
                </svg>
              </router-link>

              <div v-if="openSubmenus.productList" class="pl-4 bg-rose-950">
                <!-- Parent 1 -->
                <button @click="toggleSubmenu('parent1')" class="flex items-center gap-1 w-full px-4 py-2 text-sm text-gray-300 hover:text-white">
                  <span>{{ openSubmenus.parent1 ? '-' : '+' }}</span>
                  Parent 1
                </button>

                <!-- Parent 2 with Child -->
                <button @click="toggleSubmenu('parent2')" class="flex items-center gap-1 w-full px-4 py-2 text-sm text-gray-300 hover:text-white">
                  <span>{{ openSubmenus.parent2 ? '-' : '+' }}</span>
                  Parent 2
                </button>
                <div v-if="openSubmenus.parent2" class="pl-6">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-400 hover:text-white">Child 1</a>
                </div>
              </div>
            </div>

            <router-link to="/products/add" class="block px-4 py-2 text-sm text-white hover:bg-rose-800">Add Product</router-link>
            <router-link to="/products/settings" class="block px-4 py-2 text-sm text-white hover:bg-rose-800">Product Setting</router-link>
            <router-link to="/products/import-export" class="block px-4 py-2 text-sm text-white hover:bg-rose-800">Bulk Import/Export</router-link>
          </div>
        </div>

        <!-- Receiving -->
        <router-link to="/receiving" class="px-3 py-2 text-sm text-gray-300 hover:text-white rounded hover:bg-slate-800">
          Receiving
        </router-link>

        <!-- Customer Orders -->
        <router-link to="/customer-orders" class="px-3 py-2 text-sm text-gray-300 hover:text-white rounded hover:bg-slate-800">
          Customer Orders
        </router-link>

        <!-- Inventory -->
        <router-link to="/inventory" class="px-3 py-2 text-sm text-gray-300 hover:text-white rounded hover:bg-slate-800">
          Inventory
        </router-link>

        <!-- Customers -->
        <router-link to="/customers" class="px-3 py-2 text-sm text-gray-300 hover:text-white rounded hover:bg-slate-800">
          Customers
        </router-link>
      </nav>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Product
      </button>

      <button class="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
        Support
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <button class="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
        English (US)
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div class="relative" @mouseenter="openDropdown('mello')" @mouseleave="closeDropdown">
      <button class="flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
        <span class="text-sm">Mello</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
        <div v-if="activeDropdown === 'mello'" class="absolute top-full right-0 mt-1 w-56 bg-rose-900 rounded-md shadow-lg py-2 z-50">
          <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-rose-800">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-rose-800">Settings</a>
          <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-rose-800">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const activeDropdown = ref(null)
  const openSubmenus = reactive({
    productList: false,
    parent1: false,
    parent2: false
  })

  const openDropdown = (name) => {
    activeDropdown.value = name
  }

  const closeDropdown = () => {
    activeDropdown.value = null
  }

  const toggleSubmenu = (name) => {
    openSubmenus[name] = !openSubmenus[name]
  }

</script>