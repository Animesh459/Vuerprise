<template>
  <div
    class="group relative flex flex-col bg-white rounded-md overflow-hidden transition-all duration-300 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 cursor-pointer"
    :class="{ 'ring-2 ring-blue-600 ring-offset-2': isSelected }"
  >
    <!-- Image Container -->
    <div class="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
      <img
        :src="getProductImage(product.image) || '/placeholder.svg'"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <!-- Gradient Overlay on Hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <!-- Stock Badge -->
      <div
        v-if="product.inStock"
        class="absolute top-2 right-2 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm"
      >
        <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
        <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wide">In Stock</span>
      </div>

      <!-- Out of Stock Badge -->
      <div
        v-else
        class="absolute top-2 right-2 flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full"
      >
        <span class="text-[10px] font-bold text-white uppercase tracking-wide">Sold Out</span>
      </div>

      <!-- Selection Checkbox -->
      <div class="absolute top-2 left-2 z-10">
        <BaseCheckbox label="" />
      </div>

    </div>

    <!-- Product Info -->
    <div class="flex flex-col p-4">
      <h3 class="text-sm font-semibold text-gray-900 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
        {{ product.name }}
      </h3>
      <p class="mt-1.5 text-xs font-medium text-gray-500 font-mono bg-gray-50 px-2 py-0.5 rounded w-fit">
        {{ product.sku }}
      </p>
      <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <p class="text-[11px] font-medium text-gray-400 tabular-nums flex items-center gap-1.5">
          <Calendar class="w-3 h-3" />
          {{ product.date }}
        </p>
      </div>
    </div>

    <!-- Selection Indicator Bar -->
    <div
      v-if="isSelected"
      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-500"
    ></div>
  </div>
</template>

<script setup>
import { Check, Eye, Pencil, Calendar, MoreHorizontal } from 'lucide-vue-next'
import { getProductImage } from "@/utils/helper.js"
import BaseCheckbox from "@/components/form/BaseCheckbox.vue";

defineProps({
  product: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-select'])
</script>
