<template>
  <router-link 
    :to="`/products/${product.id}/edit`"
    class="group relative flex flex-col bg-white rounded-md overflow-hidden transition-all duration-300 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 cursor-pointer"
  >
    <div class="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
      <img
          :src="productImage"
          :alt="product.product_name || product.style_no"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <!-- Gradient Overlay on Hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
<!--      <div class="absolute top-2 right-2 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">-->
<!--        <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>-->
<!--        <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wide">In Stock</span>-->
<!--      </div>-->
      <!-- Stock Badge -->
      <div
          v-if="categoryName"
          class="absolute top-2 right-2 bg-white/90 px-2 py-0.5 text-[10px] font-bold tracking-tight text-black backdrop-blur-sm"
      >
        {{ categoryName }}
      </div>
      <div class="absolute top-2 left-2" @click.prevent.stop>
        <input
            type="checkbox"
            :checked="selected"
            @change="$emit('toggle-select')"
            class="relative h-5 w-5 appearance-none border border-black/20 bg-white/50 rounded-sm cursor-pointer
    checked:bg-blue-600 checked:border-blue-600
    after:content-['✓'] after:absolute after:inset-0
    after:flex after:items-center after:justify-center
    after:text-[10px] after:text-white after:font-bold
    after:opacity-0 checked:after:opacity-100"
        />
      </div>
    </div>
    <div class="flex flex-col p-2">
      <h3 class="text-sm font-semibold text-gray-900 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{{ product.product_name || product.style_no }}</h3>
      <p class="mt-1.5 text-xs font-medium text-gray-500 font-mono bg-gray-50 px-2 py-0.5 rounded w-fit">{{ product.style_no }}</p>
      <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <p v-if="product.preorder_date" class="text-[11px] font-medium text-gray-400 tabular-nums flex items-center gap-1.5 ">
          <Calendar :size="12" /> {{ formatDate(product.preorder_date) }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import {Calendar} from 'lucide-vue-next'
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-select'])

// Get the first product image URL
const productImage = computed(() => {
  if (props.product.images && props.product.images.length > 0) {
    const firstImage = props.product.images[0];
    // Use compressed_image_sf if available, otherwise use thumbs_image or original image
    return firstImage.compressed_image_sf || firstImage.thumbs_image || firstImage.image || '/placeholder.svg';
  }
  
  // Return placeholder if no image
  return '/placeholder.svg';
});

// Get category breadcrumb path
const categoryName = computed(() => {
  const breadcrumbs = [];
  
  // Build breadcrumb from parent to most specific
  if (props.product.parent_category && props.product.parent_category.name) {
    breadcrumbs.push(props.product.parent_category.name);
  }
  
  if (props.product.second_category && props.product.second_category.name) {
    breadcrumbs.push(props.product.second_category.name);
  }
  
  if (props.product.third_category && props.product.third_category.name) {
    breadcrumbs.push(props.product.third_category.name);
  }
  
  return breadcrumbs.join(' / ');
});

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).toUpperCase();
};
</script>
