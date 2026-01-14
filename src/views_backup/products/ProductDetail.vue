<template>

<!--  <ProductInfo />-->
<!--  <Inventory />-->
  <div class="bg-white">

    <div class="flex flex-col  border-b border-b-border pb-4 mb-4 ">
        <h1 class="text-3xl font-bold tracking-tighter text-gray-900">Create New Product</h1>
        <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Fill in the details below to add a new product to the inventory.</p>
    </div>

    <div class="">

      <div class="mb-8 p-4 border col-span-8 border-zinc-200 bg-white  transition-colors group ">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-1">
              <div class="w-10 h-10 rounded-lg  flex items-center justify-center">
                <PackageIcon class="text-blue-500" :size="24" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Product Info</h2>
            </div>
            <div class="flex gap-3">
              <div class="flex items-center gap-4  p-1.5 rounded-full border border-zinc-200">
                <button
                    @click="status = 'active'"
                    :class="[
                    'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                    status === 'active' ? 'bg-blue-500 text-white ' : 'text-slate-500 hover:text-slate-300'
                  ]"
                >
                  <div class="w-2 h-2 rounded-full" :class="status === 'active' ? 'bg-white' : 'bg-slate-600'"></div>
                  ACTIVE
                </button>
                <button
                    @click="status = 'inactive'"
                    :class="[
                    'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                    status === 'inactive' ? 'bg-rose-500 text-white ' : 'text-slate-500 hover:text-slate-300'
                  ]"
                >
                  <div class="w-2 h-2 rounded-full" :class="status === 'inactive' ? 'bg-white' : 'bg-slate-600'"></div>
                  INACTIVE
                </button>
              </div>
            </div>
          </div>

          <!-- Product Essentials Section -->
          <div class="grid grid-cols-12 gap-8">
            <div class="p-4 border col-span-8 border-zinc-200 bg-white  transition-colors group">
              <h3 class="text-lg font-bold text-gray-900 mb-6">Product Essentials</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <BaseInput label="Style No" placeholder="MJ7024D. Clone Clone Clone" />
                </div>
                <div>
                  <BaseInput label="SKU" placeholder="SKU" />
                </div>

                <!-- Select Size -->
                <BaseSelect
                    label="Select Size"
                    :options="['XS', 'S', 'M']"
                />


                <!-- Product Name -->
                <div>
                  <BaseInput label="Product Name" placeholder="Short Sleeve Knit Top with Daisy Patch" />
                </div>

                <div>
                  <BaseInput label="FOB Price" placeholder="15.00" />
                </div>

                <div>
                  <BaseInput label="Price" placeholder="22.80" />
                </div>

              </div>
            </div>
            <div class="p-4 border col-span-4 border-zinc-200 bg-white  transition-colors group">
                <BaseTextArea label="Detailed Feedback" customClass="min-h-[275px]" placeholder="Enter internal description or feedback..." />
            </div>
          </div>
      </div>

      <Inventory />


      <!-- Media Management Section -->
      <div class="common-card-new">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900">Media Management</h3>
        </div>

        <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-blue-300 transition cursor-pointer bg-gray-50">
          <div class="flex flex-col items-center justify-center gap-3">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
            </svg>
            <button class="btn-primary-new">
              UPLOAD IMAGES OR VIDEOS
            </button>
          </div>
        </div>

        <!-- Image Gallery -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/2.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/3.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
            <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/4.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/5.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
            <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/6.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/5.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
            <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/6.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/5.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
        </div>

        <p class="text-xs text-gray-500 mt-4 text-center">Max 20 assets max limit automatic name through APIV</p>
      </div>

      <!-- Drag & Drop Info -->
      <div class="text-center py-8 border-t border-border">
        <div class="flex items-center justify-center gap-2 mb-2">
          <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 2.586V4h.5A1.5 1.5 0 0115 5.5v13a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 013 18.5v-13A1.5 1.5 0 014.5 4H5V2.586A2 2 0 016.586 2H9a1 1 0 000-2H6a4 4 0 00-4 4v14a3 3 0 003 3h8a3 3 0 003-3v-13a3 3 0 00-3-3H4z" />
          </svg>
          <p class="text-sm font-semibold text-gray-700">DRAG & DROP ASSETS</p>
        </div>
        <p class="text-xs text-gray-500">Drag your files or folders here to upload</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between mt-8 pt-8 border-t border-border">
        <button class="btn-secondary-new">← Back to list</button>
        <div class="flex gap-4">
          <button class="btn-secondary-new">
            Previous
          </button>
          <button class="btn-primary-new">
            Save Item
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from "@/components/form/BaseInput.vue";
import BaseSelect from "@/components/form/BaseSelect.vue";
import ProductInfo from "@/components/product/ProductInfo.vue";
import {PackageIcon} from "lucide-vue-next";
import BaseTextArea from "@/components/form/BaseTextArea.vue";
import Inventory from "@/components/product/Inventory.vue";

// Component is reactive with Vue 3 Composition API
const activeTab = ref('essentials')


const status = ref('active')

</script>

<style scoped>
/* Smooth transitions for all interactive elements */
:deep(*) {
  transition: all 0.2s ease-out;
}
</style>
