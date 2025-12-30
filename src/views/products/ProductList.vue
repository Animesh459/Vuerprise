<template>
  <div class="common-card p-0">
<!--    <ProductItem />-->

    <ProductItemsTest />
    <div class="flex flex-end justify-end px-4 pb-4">
      <Pagination />
    </div>
  </div>
</template>

<script setup>
  import ProductItem from "@/components/product/ProductItem.vue";
  import ProductItemsTest from "@/components/product/ProductItemsTest.vue";
  import Pagination from "@/components/Pagination.vue";
</script>
