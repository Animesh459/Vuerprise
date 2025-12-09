<template>
  <div class=" py-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-4">
      <div
          v-for="product in products"
          :key="product.id"
          class=" border border-[#3b394e] rounded-sm overflow-hidden hover:shadow-sm transition-shadow"
      >
        <!-- Header with checkbox and title -->
        <div class="px-3 py-2 border-b border-[#3b394e] flex items-center justify-between ">
          <div class="flex items-center gap-2 flex-1">
            <CustomCheckbox id="product.id" v-model="formData.terms">
            </CustomCheckbox>
            <span class="text-sm font-medium text-white">{{ product.category }}</span>
          </div>
          <div class="flex items-center gap-1">
            <button class="p-1  rounded">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button class="p-1  rounded">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Product Image -->
        <div class="aspect-square  overflow-hidden">
          <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
          />
        </div>

        <!-- Product Info -->
        <div class="px-3 py-3 ">
          <h3 class="text-xs font-medium mb-2 line-clamp-2">
            {{ product.name }}
          </h3>
          <div class="mb-2">
            <span class="text-sm font-semibold ">${{ product.price }}</span>
          </div>
          <p class="text-xs ">
            {{ product.timestamp }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomCheckbox from "@/components/CustomCheckbox.vue";
const formData = ref({
  newsletter: false,
  terms: false,
});
const products = ref([
  {
    id: 1,
    category: 'Dress',
    name: 'MJ10240..-Clone-Clone-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:32:08 AM'
  },
  {
    id: 2,
    category: 'Dress',
    name: 'MT40162-Clone-Clone-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:32:06 AM'
  },
  {
    id: 3,
    category: 'Dress',
    name: 'MJ10240..-Clone-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:32:03 AM'
  },
  {
    id: 4,
    category: 'Dress',
    name: 'MT40162-Clone-Clone-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:32:01 AM'
  },
  {
    id: 5,
    category: 'Dress',
    name: 'MJ10240..-Clone-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:31:57 AM'
  },
  {
    id: 6,
    category: 'Dress',
    name: 'MT40162-Clone-Clone-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:31:55 AM'
  },
  {
    id: 7,
    category: 'Dress',
    name: 'MJ10240..-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:31:52 AM'
  },
  {
    id: 8,
    category: 'Dress',
    name: 'MT40162-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:31:49 AM'
  },
  {
    id: 9,
    category: 'Dress',
    name: 'MJ10240..-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:31:46 AM'
  },
  {
    id: 10,
    category: 'Dress',
    name: 'MT40162-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:31:44 AM'
  },
  {
    id: 11,
    category: 'Dress',
    name: 'MT40162-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:31:40 AM'
  },
  {
    id: 12,
    category: 'Dress',
    name: 'MT40162-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:31:32 AM'
  },
  {
    id: 13,
    category: 'Dress',
    name: 'MJ10240..-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:31:46 AM'
  },
  {
    id: 14,
    category: 'Dress',
    name: 'MT40162-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:31:44 AM'
  },
  {
    id: 15,
    category: 'Dress',
    name: 'MT40162-Clone-Clone',
    price: 15.00,
    image: '/product/1.jpg',
    timestamp: '2025-12-02 06:31:40 AM'
  },
  {
    id: 16,
    category: 'Dress',
    name: 'MT40162-Clone-Clone',
    price: 15.00,
    image: '/product/2.jpg',
    timestamp: '2025-12-02 06:31:32 AM'
  },
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>