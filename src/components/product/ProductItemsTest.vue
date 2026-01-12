<template>
  <div class="flex flex-col bg-white font-sans text-black selection:bg-black selection:text-white">

    <main class="flex-1">

      <div class="flex flex-col justify-between gap-5 border-b border-border pb-5 mb-5">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold tracking-tighter ">
            {{ categoryName ? `${categoryName} Products` : 'Product Catalog' }}
          </h1>
          <p class="mt-2 font-semibold text-gray-600 uppercase">{{ products.length }} items</p>
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


      <!-- Product Grid -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="text-gray-500">Loading products...</div>
      </div>
      
      <div v-else-if="products.length === 0" class="flex justify-center items-center py-20">
        <div class="text-gray-500">No products found {{ categoryName ? `in ${categoryName}` : '' }}</div>
      </div>
      
      <div v-else class="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-10">
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
import BaseInput from "@/components/form/BaseInput.vue";
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/utils/axios';

const route = useRoute();
const products = ref([]);
const loading = ref(false);
const categoryName = ref('');

// Fetch products with optional category filter
const fetchProducts = async () => {
  loading.value = true;
  try {
    const categoryId = route.params.categoryId;
    let url = '/products';
    
    if (categoryId) {
      // Fetch products by category
      url = `/products?category_id=${categoryId}`;
      // Also fetch category name
      await fetchCategoryName(categoryId);
    } else {
      categoryName.value = '';
    }
    
    const response = await apiClient.get(url);
    products.value = response.data.data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    products.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch category name for display
const fetchCategoryName = async (categoryId) => {
  try {
    const response = await apiClient.get(`/categories/${categoryId}`);
    categoryName.value = response.data.data?.name || '';
  } catch (error) {
    console.error('Failed to fetch category:', error);
    categoryName.value = '';
  }
};

// Fetch products on mount
onMounted(() => {
  fetchProducts();
});

// Watch for route changes and refetch
watch(() => route.params.categoryId, () => {
  fetchProducts();
});

const navItems = ["Product", "Product Setting", "Receiving", "Customer Orders", "Inventory", "Customers"]

// Keep static data as fallback for development
// const products = [
//   { id: "1", name: "Zenith-X Edition", sku: "S01Y4M4-GREEN", date: "DEC 2, 2025", image: "1.jpg", inStock: true },
//   ... (rest of static data commented out)
// ]
</script>