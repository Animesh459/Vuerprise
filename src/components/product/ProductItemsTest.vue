<template>
  <div class="flex text-black">

    <main class="flex-1">

      <div class="flex flex-col justify-between gap-5 border-b border-border pb-5 mb-5">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
              <ShoppingBagIcon :size="24" class="text-white" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Product Catalog</h1>
              <p class="text-sm text-gray-500 mt-0.5">Browse and manage your product inventory</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-medium">
              <PackageIcon :size="12" />
              {{ products.length }} Products
            </span>
            <span class="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">10 of 50 selected</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <div class="flex flex-1">
              <div class="relative flex-1 w-full">
                <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <BaseInput customClass="pl-8" />
              </div>
          </div>
          <div class="flex gap-2">
            <button class="btn-secondary-new">
              Select All
            </button>
            <button class="btn-secondary-new">
              Unselect All
            </button>
            <button class="btn-primary-new">
              Clone Selected
            </button>
          </div>
        </div>
      </div>

      <div class="common-card-new">
        <!-- Product Grid -->
        <div class="grid gap-x-4 gap-y-4 grid-cols-10">
          <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
          />
        </div>
      </div>

    </main>

  </div>
</template>

<script setup>
import { ChevronDown, Search, Grid, List, Filter, ShoppingBagIcon, PackageIcon } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'
import BaseInput from "@/components/form/BaseInput.vue";

const navItems = ["Product", "Product Setting", "Receiving", "Customer Orders", "Inventory", "Customers"]


const products = [
  { id: "1", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "1.jpg", inStock: true },
  { id: "2", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "2.jpg", inStock: true },
  { id: "3", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "3.jpg", inStock: false },
  { id: "4", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "4.jpg", inStock: true },
  { id: "5", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "5.jpg", inStock: true },
  { id: "6", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "6.jpg", inStock: false },
  { id: "7", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "1.jpg", inStock: true },
  { id: "8", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "2.jpg", inStock: true },
  { id: "9", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "3.jpg", inStock: false },
  { id: "10", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "4.jpg", inStock: true },
  { id: "11", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "5.jpg", inStock: true },
  { id: "12", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "6.jpg", inStock: false },
  { id: "13", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "1.jpg", inStock: true },
  { id: "14", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "2.jpg", inStock: true },
  { id: "15", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "3.jpg", inStock: false },
  { id: "16", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "4.jpg", inStock: true },
  { id: "17", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "5.jpg", inStock: true },
  { id: "18", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "6.jpg", inStock: false },
  { id: "19", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "4.jpg", inStock: true },
  { id: "20", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "5.jpg", inStock: true },
  { id: "21", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "6.jpg", inStock: false },
  { id: "22", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "1.jpg", inStock: true },
  { id: "23", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "2.jpg", inStock: true },
  { id: "24", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "3.jpg", inStock: false },
  { id: "25", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "4.jpg", inStock: true },
  { id: "26", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "5.jpg", inStock: true },
  { id: "27", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "6.jpg", inStock: false },
  { id: "28", name: "BTR-250 Redux", sku: "S01Y4M4-BLUE", date: "DEC 4, 2025", image: "6.jpg", inStock: false },
  { id: "29", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "1.jpg", inStock: true },
  { id: "30", name: "MJK0240-Clone", sku: "S01Y4M4-BLACK", date: "DEC 3, 2025", image: "2.jpg", inStock: true },
]
</script>