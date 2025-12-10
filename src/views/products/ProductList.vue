<template>
  <div class="common-card">
    <h1 class="text-2xl font-bold">Product List</h1>
    <ProductItems />
  </div>
</template>

<script setup>
import ProductItems from "@/components/product/ProductItems.vue";
</script>

<style scoped>

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

* {
  animation: fadeIn 0.6s ease-out;
}
</style>