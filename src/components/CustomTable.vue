<template>
  <div class="overflow-x-auto rounded-xl border border-gray-700 shadow-xl">
    <table class="min-w-full divide-y divide-gray-700 bg-gray-900">

      <thead class="bg-gray-800">
      <tr>
        <th v-for="header in headers" :key="header.key"
            class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
        >
          {{ header.label }}
        </th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-800">
      <tr v-for="(item, index) in data" :key="index"
          class="bg-gray-900 transition duration-150 ease-in-out hover:bg-gray-800/70"
      >
        <td v-for="header in headers" :key="header.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
        >
          <slot :name="`cell-${header.key}`" :item="item">
            {{ item[header.key] }}
          </slot>
        </td>
      </tr>

      <tr v-if="!data || data.length === 0">
        <td :colspan="headers.length" class="px-6 py-8 text-center text-sm text-gray-500">
          No data available.
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  headers: {
    type: Array,
    required: true,
    // Expected format: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, ...]
  },
  data: {
    type: Array,
    required: true,
    // Expected format: [{ id: 1, name: 'Project A', ... }, ...]
  }
});
</script>