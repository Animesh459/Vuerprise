<template>

  <!-- Welcome Section -->
  <div class="flex items-start justify-between mb-8">
    <div>
      <h1 class="text-3xl font-semibold italic mb-1">Welcome, Mello user 👋</h1>
      <p class="text-default-text-primary data-[theme=bw]:text-bw-text-primary">Good to see you boss!</p>
    </div>
    <button class="flex items-center gap-2 bg-default-button-primary-bg data-[theme=bw]:bg-bw-button-primary-bg hover:bg-default-button-primary-bg data-[theme=bw]:hover:bg-bw-button-primary-bg text-white px-5 py-2.5 rounded-full font-medium">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Create Item
    </button>
  </div>

  <!-- Table Section -->
    <Table />
</template>


<script setup>
    import Table from "@/components/Table.vue";
</script>

