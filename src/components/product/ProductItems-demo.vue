<template>
  <div class="">
    <!-- Header -->
    <div class="sticky top-0 z-10 backdrop-blur-md bg-slate-900/80">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold text-white">Product Catalog</h1>
            <p class="text-slate-400 mt-1">{{ products.length }} items available</p>
          </div>
          <div class="flex gap-3">
            <button class="px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors">
              Filter
            </button>
            <button class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
              Sort
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="">
      <div
          v-for="product in products"
          :key="product.id"
          class="group cursor-pointer"
      >
        <div class="bg-slate-800 rounded-xl overflow-hidden shadow-xl transition-all duration-500 border border-slate-700 group-hover:shadow-blue-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] group-hover:border-blue-500">

          <div class="relative h-60 overflow-hidden bg-slate-700">
            <div class="absolute top-1 left-1 z-10">
              <CustomCheckbox
                  id="news-check"
                  label=""
              />
            </div>

            <img
                :src="getProductImage(product.image)"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out will-change-transform"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <button class="w-full py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>

          <div class="p-5 space-y-3">
            <h3 class="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
              {{ product.name }}
            </h3>

            <div class="flex items-center gap-2">
              <span class="text-slate-400 text-sm">SKU:</span>
              <span class="text-blue-400 font-mono text-sm font-semibold">{{ product.sku }}</span>
            </div>

            <div class="flex items-center gap-2 pt-2 border-t border-slate-700">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-slate-400 text-xs">{{ formatDate(product.timestamp) }}</span>
            </div>

            <div class="pt-2 flex gap-2">
        <span class="inline-block px-3 py-1 bg-green-900/30 text-green-400 text-xs font-semibold rounded-full border border-green-800">
          In Stock
        </span>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {getProductImage} from "@/utils/helper.js";
import CustomCheckbox from "@/components/CustomCheckbox.vue";

const products = ref([
  {
    id: 1,
    name: 'MJI0240.-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:32:08Z',
    image: '1.jpg'
  },
  {
    id: 2,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:32:06Z',
    image: '1.jpg'
  },
  {
    id: 3,
    name: 'MJI0240.-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:32:03Z',
    image: '1.jpg'
  },
  {
    id: 4,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:32:01Z',
    image: '1.jpg'
  },
  {
    id: 5,
    name: 'MJI0240.-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:57Z',
    image: '1.jpg'
  },
  {
    id: 6,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:55Z',
    image: '1.jpg'
  },
  {
    id: 7,
    name: 'MJI0240.-Clone-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:52Z',
    image: '1.jpg'
  },
  {
    id: 8,
    name: 'MT40I62-Clone-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:49Z',
    image: '1.jpg'
  },
  {
    id: 9,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:32:01Z',
    image: '1.jpg'
  },
  {
    id: 10,
    name: 'MJI0240.-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:57Z',
    image: '1.jpg'
  },
  {
    id: 11,
    name: 'MT40I62-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:55Z',
    image: '1.jpg'
  },
  {
    id: 12,
    name: 'MJI0240.-Clone-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:52Z',
    image: '1.jpg'
  },
  {
    id: 13,
    name: 'MT40I62-Clone-Clone',
    sku: '$DT43088-BLACK',
    timestamp: '2025-12-02T06:31:49Z',
    image: '1.jpg'
  },
])

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>