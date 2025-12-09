<template>
  <nav class="flex items-center justify-center space-x-2">

    <button
        @click="$emit('update:currentPage', currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded-lg text-gray-400 border border-gray-700
             hover:bg-gray-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous Page"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>

    <template v-for="(page, index) in visiblePages" :key="index">

      <span v-if="page === '...'"
            class="px-3 py-1 text-gray-400 select-none"
      >
        ...
      </span>

      <button v-else
              @click="$emit('update:currentPage', page)"
              :class="{
          'font-semibold border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-500/50': page === currentPage,
          'text-gray-300 border-gray-700 bg-gray-800 hover:bg-gray-700': page !== currentPage
        }"
              class="px-4 py-1 rounded-lg border transition duration-200 ease-in-out"
              :aria-current="page === currentPage ? 'page' : null"
      >
        {{ page }}
      </button>

    </template>

    <button
        @click="$emit('update:currentPage', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-lg text-gray-400 border border-gray-700
             hover:bg-gray-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next Page"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>

  </nav>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  maxVisibleButtons: { type: Number, default: 5 }, // Max page numbers to show at once
});

defineEmits(['update:currentPage']);

const visiblePages = computed(() => {
  const { totalPages, currentPage, maxVisibleButtons } = props;
  const pages = [];


  if (totalPages <= maxVisibleButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }


  const half = Math.floor(maxVisibleButtons / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 1) {
    start = 1;
    end = maxVisibleButtons;
  }
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxVisibleButtons + 1;
  }

  start = Math.max(1, start);

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push('...');
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  const uniquePages = [...new Set(pages)].filter(p => p === '...' || (p >= 1 && p <= totalPages));

  return uniquePages;
});
</script>