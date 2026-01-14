<template>
  <router-link 
    :to="`/products/${product.id}/edit`"
    class="group relative flex flex-col border border-neutral-200 bg-white transition-all hover:border-gray-900 cursor-pointer"
  >
    <div class="relative aspect-[4/5] overflow-hidden bg-neutral-100">
      <img
          :src="productImage"
          :alt="product.product_name || product.style_no"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <!-- Gradient Overlay on Hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <!-- Stock Badge -->
      <div
          v-if="categoryName"
          class="absolute top-2 right-2 bg-white/90 px-2 py-0.5 text-[10px] font-bold tracking-tight text-black backdrop-blur-sm"
      >
        {{ categoryName }}
      </div>
      <div class="absolute bottom-2 left-2" @click.prevent.stop>
        <input
            type="checkbox"
            :checked="selected"
            @change="$emit('toggle-select')"
            class="relative h-4 w-4 appearance-none border border-black/20 bg-white/50 rounded-sm cursor-pointer
    checked:bg-black checked:border-black
    after:content-['✓'] after:absolute after:inset-0
    after:flex after:items-center after:justify-center
    after:text-[10px] after:text-white after:font-bold
    after:opacity-0 checked:after:opacity-100"
        />
      </div>
    </div>
    <div class="flex flex-col p-3">
      <h3 class="text-sm font-medium tracking-tight text-gray-900 line-clamp-2">{{ product.product_name || product.style_no }}</h3>
      <p class="mt-1 text-xs font-medium text-gray-600 ">{{ product.style_no }}</p>
      <p v-if="product.preorder_date" class="mt-3 text-[11px] font-medium text-gray-400 tabular-nums ">
        Preorder Date: {{ formatDate(product.preorder_date) }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

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
