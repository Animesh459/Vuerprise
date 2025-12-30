

<script setup>
import { ref } from 'vue';
import {getProductImage} from "@/utils/helper.js";
import CustomCheckbox from "@/components/CustomCheckbox.vue";

const products = ref([
  { id: 1, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: true, img: '1.jpg' },
  { id: 2, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: true, img: '2.jpg' },
  { id: 3, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '3.jpg' },
  { id: 4, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: true, img: '4.jpg' },
  { id: 5, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: true, img: '5.jpg' },
  { id: 6, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '1.jpg' },
  { id: 7, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: false, img: '1.jpg' },
  { id: 8, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: false, img: '2.jpg' },
  { id: 9, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '3.jpg' },
  { id: 10, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: false, img: '4.jpg' },
  { id: 11, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: false, img: '5.jpg' },
  { id: 12, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '1.jpg' },
  { id: 13, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: false, img: '1.jpg' },
  { id: 14, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: false, img: '2.jpg' },
  { id: 15, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '3.jpg' },
  { id: 16, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: false, img: '4.jpg' },
  { id: 17, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: false, img: '5.jpg' },
  { id: 18, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '1.jpg' },
  { id: 19, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '1.jpg' },
  { id: 20, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: false, img: '1.jpg' },
  { id: 21, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: false, img: '2.jpg' },
  { id: 22, name: 'BTR-250 Redux', sku: 'S01Y4M4-BLUE', date: 'Dec 4, 2025', stock: false, img: '3.jpg' },
  { id: 23, name: 'Zenith-X Edition', sku: 'S01Y4M4-GREEN', date: 'Dec 2, 2025', stock: false, img: '4.jpg' },
  { id: 24, name: 'MJK0240-Clone', sku: 'S01Y4M4-BLACK', date: 'Dec 3, 2025', stock: false, img: '5.jpg' },
]);
</script>

<template>
  <div>

    <div class="sticky py-6 px-4 top-0 z-20 backdrop-blur-md  border-b border-slate-700/30 shadow-xl">
      <div class="">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-white">Product Catalog</h1>
              <p class="text-slate-400 text-sm mt-1"> items available</p>
            </div>
            <div class="btn-common">
              10 of 50 selected
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div class="flex-1 relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  class="w-full pl-10 pr-4 py-2.5 bg-[#10161F] text-white placeholder-slate-500 rounded-lg border border-gray-800 focus:border-gray-700 transition-all outline-none text-sm"
              />
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                  class="btn-info-transparent"
              >
                Select All
              </button>
              <button
                  class="btn-danger-transparent"
              >
                Unselect All
              </button>
              <button
                  class="btn-default-transparent flex items-center gap-2"
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

    <div class=" text-slate-200 selection:bg-indigo-500/30 font-sans py-8 px-4 relative overflow-hidden">
<!--    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>-->
<!--    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>-->
    <div class="relative z-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <router-link
            v-for="product in products"
            :key="product.id"
            :to="{ name: 'ProductDetail', params: { id: product.id } }"
            class="group relative bg-white/[0.03] backdrop-blur-xl border-2 border-white/20 hover:border-cyan-500/20 rounded-md p-2 transition-all duration-500 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/20"
        >
        <div class="relative aspect-square mb-6 overflow-hidden rounded-sm shadow-2xl">
          <img
              :src="getProductImage(product.img)"
              class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />

          <div class="absolute top-4 right-4">
            <span v-if="product.stock" class="text-[14px] cursor-pointer px-4 py-1 rounded-full !bg-[#0284C7] text-white">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              In stock
            </span>
          </div>
        </div>

        <div class="px-2 pb-2">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-bold text-white leading-tight">{{ product.name }}</h3>
            <span class="text-xs font-mono text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">#{{ product.id }}</span>
          </div>

          <div class="flex items-center gap-2 text-slate-400 text-xs mb-4">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            {{ product.sku }}
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-white/5">
            <span class="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{{ product.date }}</span>
<!--            <button class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">-->
<!--              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>-->
<!--            </button>-->
            <CustomCheckbox id="product.id" >
            </CustomCheckbox>
          </div>
        </div>
        </router-link>
    </div>
  </div>

  </div>

</template>

