<template>
  <div class="overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-2xl">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-700/50">
        <thead class="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm">
        <tr>
          <th v-for="header in headers" :key="header.key"
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-300 transition-colors duration-200"
          >
            {{ header.label }}
          </th>
        </tr>
        </thead>

        <tbody class="divide-y divide-slate-700/30">
        <tr v-for="(item, index) in data" :key="index"
            class="group bg-slate-900/40 transition-all duration-300 ease-out hover:bg-slate-800/60 hover:shadow-lg"
        >
          <td v-for="header in headers" :key="header.key"
              class="px-6 py-5 whitespace-nowrap text-sm text-slate-300 transition-colors duration-200 group-hover:text-slate-100"
          >
            <slot :name="`cell-${header.key}`" :item="item">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>

        <tr v-if="!data || data.length === 0">
          <td :colspan="headers.length" class="px-6 py-12 text-center">
            <div class="flex flex-col items-center justify-center gap-2">
              <svg class="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-sm text-slate-500">No data available.</p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  }
});
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
