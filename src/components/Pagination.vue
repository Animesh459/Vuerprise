<template>
  <div v-if="pagination && pagination.last_page > 1" class="flex justify-center items-center gap-2 pt-4">
    <button 
      @click="$emit('change-page', pagination.current_page - 1)"
      :disabled="pagination.current_page === 1"
      class="px-3 py-2 text-sm border border-gray-300 rounded hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
    >
      Previous
    </button>
    
    <span class="text-sm text-gray-600">
      Page {{ pagination.current_page }} of {{ pagination.last_page }}
    </span>
    
    <button 
      v-for="page in paginationPages"
      :key="page"
      @click="$emit('change-page', page)"
      :class="[
        'px-3 py-2 text-sm border rounded transition-colors hover:border-blue-600',
        page === pagination.current_page 
          ? 'bg-blue-600 text-white border-blue-600'
          : 'border-gray-300 hover:bg-gray-50'
      ]"
    >
      {{ page }}
    </button>
    
    <button 
      @click="$emit('change-page', pagination.current_page + 1)"
      :disabled="pagination.current_page === pagination.last_page"
      class="px-3 py-2 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 hover:bg-gray-50 transition-colors"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pagination: {
    type: [Object, null],
    required: false,
    default: null
  }
})

defineEmits(['change-page'])

const paginationPages = computed(() => {
  if (!props.pagination) return []
  
  const current = props.pagination.current_page
  const last = props.pagination.last_page
  const pages = []
  
  // Show max 5 pages
  let start = Math.max(1, current - 2)
  let end = Math.min(last, start + 4)
  
  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>
