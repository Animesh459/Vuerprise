<template>
  <div class="flex min-h-screen flex-col bg-white font-sans text-black selection:bg-black selection:text-white">


    <main class="flex-1 px-4 py-8 lg:px-8">
      <!-- Page Title & Actions -->
      <div class="mb-10 flex flex-col justify-between gap-6 border-b border-black pb-8 lg:flex-row lg:items-end">
        <div>
          <h1 class="text-4xl font-black tracking-tighter uppercase sm:text-6xl">Product Catalog</h1>
          <p class="mt-2 text-[11px] font-black text-neutral-400 uppercase">10 of 50 items selected</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button class="h-9 border border-black px-5 text-[11px] font-black uppercase transition-all hover:bg-black hover:text-white">
            Select All
          </button>
          <button class="h-9 border border-black px-5 text-[11px] font-black uppercase transition-all hover:bg-black hover:text-white">
            Unselect All
          </button>
          <button class="h-9 bg-black px-6 text-[11px] font-black uppercase text-white transition-all hover:bg-neutral-800">
            Clone Selected
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
              type="text"
              placeholder="SEARCH PRODUCTS BY NAME OR SKU..."
              class="h-11 w-full border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-[11px] font-black uppercase placeholder:text-neutral-300 focus:border-black focus:outline-none"
          />
        </div>
<!--        <div class="flex items-center gap-2">-->
<!--          <button class="flex h-11 w-11 items-center justify-center border border-neutral-200 hover:border-black transition-colors">-->
<!--            <Grid class="h-4 w-4" />-->
<!--          </button>-->
<!--          <button class="flex h-11 w-11 items-center justify-center border border-neutral-200 hover:border-black transition-colors">-->
<!--            <List class="h-4 w-4" />-->
<!--          </button>-->
<!--          <button class="flex h-11 items-center gap-2 border border-black px-5 text-[11px] font-black uppercase hover:bg-black hover:text-white transition-all">-->
<!--            <Filter class="h-4 w-4" />-->
<!--            Filter-->
<!--          </button>-->
<!--        </div>-->
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>


    </main>

  </div>
</template>

<script setup>
import { ChevronDown, Search, Grid, List, Filter } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'

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
]
</script>