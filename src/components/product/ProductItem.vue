<template>
  <div class="">

    <div class="sticky py-6 px-4 top-0 z-20 backdrop-blur-md bg-[#0D121C] border-b border-slate-700/30 shadow-xl">
        <div class="">
          <div class="flex flex-col gap-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h1 class="text-2xl font-bold text-white">Product Catalog</h1>
                <p class="text-slate-400 text-sm mt-1">{{ filteredProducts.length }} items available</p>
              </div>
              <div class="px-4 py-2 bg-indigo-900/30 border border-indigo-700/50 rounded-lg text-indigo-300 text-sm font-semibold">
                {{ selectedProducts.size }} of {{ filteredProducts.length }} selected
              </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div class="flex-1 relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search products by name or SKU..."
                    class="w-full pl-10 pr-4 py-2.5 bg-[#10161F] text-white placeholder-slate-500 rounded-lg border border-gray-800 focus:border-gray-700 transition-all outline-none text-sm"
                />
              </div>

              <div class="flex flex-wrap gap-2">
                <button
                    @click="selectAll"
                    class="btn-success"
                >
                  Select All
                </button>
                <button
                    @click="unselectAll"
                    class="btn-danger"
                >
                  Unselect All
                </button>
                <button
                    @click="cloneSelected"
                    :disabled="selectedProducts.size === 0"
                    class="btn-default flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Clone
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="p-4 pt-8">
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-slate-400 text-lg">No products found matching your search.</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6">
        <router-link
            v-for="product in filteredProducts"
            :key="product.id"
            :to="{ name: 'ProductDetail', params: { id: product.id } }"
            class="cursor-pointer transition-all relative"
        >
          <div class="absolute top-3 left-3 z-10">
            <CustomCheckbox
                :id="`product-${product.id}`"
                :isChecked="selectedProducts.has(product.id)"
                @toggle.prevent="toggleSelection(product.id)"
            />

          </div>

          <div
              :class="['bg-slate-800 group shadow-[0_4px_10px_rgba(0,0,0,0.25),0_8px_25px_-6px_rgba(2,132,199,0.45)] hover:shadow-[0_6px_30px_-4px_rgba(2,132,199,0.6)] rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border', selectedProducts.has(product.id) ? 'border-[#0284C7]' : 'border-slate-700 hover:border-[#0284C7]']"
          >
            <div class="relative group transition-all overflow-hidden bg-slate-700 h-64">
              <div class="pt-2 flex gap-2 absolute top-1 right-1 z-10" v-if="product.inStock">
                <span class="text-[14px] cursor-pointer px-4 py-1 rounded-full !bg-[#0284C7] text-white">
                  In Stock
                </span>
              </div>
              <img
                  :src="getProductImage(product.image)"
                  :alt="product.name"
                  class="w-full h-full object-cover  transition-transform will-change-transform duration-300"
              />
            </div>

            <div class="p-5 space-y-3">
              <!-- Product Name -->
              <h3 class="text-lg font-bold text-white truncate group-hover:text-[#0284C7] transition-colors">
                {{ product.name }}
              </h3>

              <div class="flex items-center gap-2">
                <span class="text-slate-400 text-sm">SKU:</span>
                <span class="text-[#0284C7] font-mono text-sm font-semibold">{{ product.sku }}</span>
              </div>

              <div class="flex items-center gap-2 pt-2 border-t border-slate-700">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-slate-400 text-xs">{{ formatDate(product.timestamp) }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {getProductImage} from "@/utils/helper.js";
import CustomCheckbox from "@/components/CustomCheckbox.vue";

const searchQuery = ref('')
const selectedProducts = ref(new Set())

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return products.value

  const query = searchQuery.value.toLowerCase().trim()
  return products.value.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
  )
})

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const toggleSelection = (productId) => {
  if (selectedProducts.value.has(productId)) {
    selectedProducts.value.delete(productId)
  } else {
    selectedProducts.value.add(productId)
  }
}

const selectAll = () => {
  filteredProducts.value.forEach(product => {
    selectedProducts.value.add(product.id)
  })
}

const unselectAll = () => {
  selectedProducts.value.clear()
}

const cloneSelected = () => {
  if (selectedProducts.value.size === 0) {
    alert('Please select products to clone')
    return
  }

  const clonedProducts = []
  selectedProducts.value.forEach(productId => {
    const original = products.value.find(p => p.id === productId)
    if (original) {
      clonedProducts.push({
        ...original,
        id: Math.max(...products.value.map(p => p.id)) + 1,
        name: original.name + ' Copy'
      })
    }
  })

  products.value.push(...clonedProducts)
  unselectAll()
}


const products = ref([
  {
    id: 1,
    name: 'MJI0240',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:32:05Z',
    image: '1.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:32:02Z',
    image: '1.jpg'
  },
  {
    id: 3,
    name: 'AX9900',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:31:59Z',
    image: '2.jpg',
    inStock: true
  },
  {
    id: 4,
    name: 'BTR-250-Clone',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:31:56Z',
    image: '3.jpg'
  },
  {
    id: 5,
    name: 'Zenith-X Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:31:53Z',
    image: '4.jpg'
  },
  {
    id: 6,
    name: 'MJI0240-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:50Z',
    image: '1.jpg',
    inStock: true
  },
  {
    id: 7,
    name: 'NEW MT40I62',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:47Z',
    image: '1.jpg'
  },
  {
    id: 8,
    name: 'AX9900-Clone',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:31:44Z',
    image: '2.jpg'
  },
  {
    id: 9,
    name: 'BTR-250',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:31:41Z',
    image: '3.jpg'
  },
  {
    id: 10,
    name: 'Zenith-X-Clone Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:31:38Z',
    image: '4.jpg'
  },
  {
    id: 11,
    name: 'MJI0240',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:35Z',
    image: '1.jpg'
  },
  {
    id: 12,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:32Z',
    image: '1.jpg'
  },
  {
    id: 13,
    name: 'AX9900',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:31:29Z',
    image: '2.jpg',
    inStock: true
  },
  {
    id: 14,
    name: 'NEW BTR-250-Clone',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:31:26Z',
    image: '3.jpg'
  },
  {
    id: 15,
    name: 'Zenith-X Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:31:23Z',
    image: '4.jpg',
    inStock: true
  },
  {
    id: 16,
    name: 'MJI0240-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:20Z',
    image: '1.jpg'
  },
  {
    id: 17,
    name: 'MT40I62',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:17Z',
    image: '1.jpg'
  },
  {
    id: 18,
    name: 'AX9900-Clone',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:31:14Z',
    image: '2.jpg'
  },
  {
    id: 19,
    name: 'BTR-250',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:31:11Z',
    image: '3.jpg'
  },
  {
    id: 20,
    name: 'Zenith-X-Clone Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:31:08Z',
    image: '4.jpg',
    inStock: true
  },
  {
    id: 21,
    name: 'NEW MJI0240',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:05Z',
    image: '1.jpg'
  },
  {
    id: 22,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:02Z',
    image: '1.jpg'
  },
  {
    id: 23,
    name: 'AX9900',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:30:59Z',
    image: '2.jpg'
  },
  {
    id: 24,
    name: 'BTR-250-Clone',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:30:56Z',
    image: '3.jpg'
  },
  {
    id: 25,
    name: 'Zenith-X Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:30:53Z',
    image: '4.jpg'
  },
  {
    id: 26,
    name: 'MJI0240-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:50Z',
    image: '1.jpg'
  },
  {
    id: 27,
    name: 'MT40I62',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:47Z',
    image: '1.jpg'
  },
  {
    id: 28,
    name: 'AX9900-Clone',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:30:44Z',
    image: '2.jpg'
  },
  {
    id: 29,
    name: 'BTR-250',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:30:41Z',
    image: '3.jpg'
  },
  {
    id: 30,
    name: 'Zenith-X-Clone Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:30:38Z',
    image: '4.jpg'
  },
  {
    id: 31,
    name: 'MJI0240',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:35Z',
    image: '1.jpg'
  },
  {
    id: 32,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:32Z',
    image: '1.jpg'
  },
  {
    id: 33,
    name: 'NEW AX9900',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:30:29Z',
    image: '2.jpg'
  },
  {
    id: 34,
    name: 'BTR-250-Clone',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:30:26Z',
    image: '3.jpg'
  },
  {
    id: 35,
    name: 'Zenith-X Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:30:23Z',
    image: '4.jpg'
  },
  {
    id: 36,
    name: 'MJI0240-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:20Z',
    image: '1.jpg'
  },
  {
    id: 37,
    name: 'MT40I62',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:17Z',
    image: '1.jpg'
  },
  {
    id: 38,
    name: 'AX9900-Clone',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:30:14Z',
    image: '2.jpg'
  },
  {
    id: 39,
    name: 'BTR-250',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:30:11Z',
    image: '3.jpg'
  },
  {
    id: 40,
    name: 'Zenith-X-Clone Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:30:08Z',
    image: '4.jpg'
  },
  {
    id: 41,
    name: 'MJI0240',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:05Z',
    image: '1.jpg'
  },
  {
    id: 42,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:30:02Z',
    image: '1.jpg'
  },
  {
    id: 43,
    name: 'AX9900',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:29:59Z',
    image: '2.jpg'
  },
  {
    id: 44,
    name: 'NEW BTR-250-Clone',
    sku: '$DT43090-BLUE',
    timestamp: '2025-12-02T06:29:56Z',
    image: '3.jpg'
  },
  {
    id: 45,
    name: 'Zenith-X Edition',
    sku: '$DT43091-GREEN',
    timestamp: '2025-12-02T06:29:53Z',
    image: '4.jpg'
  },
  {
    id: 46,
    name: 'MJI0240-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:29:50Z',
    image: '1.jpg'
  },
  {
    id: 47,
    name: 'MT40I62',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:29:47Z',
    image: '1.jpg'
  },
  {
    id: 48,
    name: 'AX9900-Clone',
    sku: '$DT43089-RED',
    timestamp: '2025-12-02T06:29:44Z',
    image: '2.jpg'
  }

]);



</script>

<style scoped>
/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
