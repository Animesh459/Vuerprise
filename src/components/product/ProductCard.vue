<template>
  <div class="group relative flex flex-col border border-neutral-200 bg-white transition-all hover:border-black">
    <div class="relative aspect-[4/5] overflow-hidden bg-neutral-100">
      <img
          :src="getProductImage(product.image) || '/placeholder.svg'"
          :alt="product.name"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
          v-if="product.inStock"
          class="absolute top-2 right-2 bg-white/90 px-2 py-0.5 text-[10px] font-bold tracking-tight text-black backdrop-blur-sm"
      >
        IN STOCK
      </div>
      <div class="absolute bottom-2 left-2">
        <input
            type="checkbox"
            class="h-4 w-4 appearance-none border border-black/20 bg-white/50 checked:bg-black checked:after:content-['✓'] checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[10px] checked:after:text-white"
        />
      </div>
    </div>
    <div class="flex flex-col p-3">
      <h3 class="text-xs font-black tracking-tight uppercase text-black">{{ product.name }}</h3>
      <p class="mt-1 text-[10px] font-bold text-neutral-500 uppercase">{{ product.sku }}</p>
      <p class="mt-4 text-[9px] font-medium text-neutral-400 tabular-nums uppercase">{{ product.date }}</p>
    </div>
  </div>
</template>

<script setup>
import {getProductImage} from "@/utils/helper.js";

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>