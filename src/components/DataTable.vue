<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header with Search -->
    <div v-if="searchable || $slots.header" class="p-6 border-b border-gray-200">
      <slot name="header">
        <div class="flex items-center gap-4">
          <div v-if="searchable" class="flex-1">
            <input
              :value="searchQuery"
              @input="$emit('update:searchQuery', $event.target.value)"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
            />
          </div>
          <slot name="actions"></slot>
        </div>
      </slot>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-12 text-center">
      <div class="inline-block w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"/>
      <p class="mt-4 text-gray-600">{{ loadingText }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!items || items.length === 0" class="p-12 text-center">
      <slot name="empty">
        <p class="text-gray-600">{{ emptyText }}</p>
      </slot>
    </div>

    <!-- Table -->
    <table v-else class="w-full">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              column.headerClass
            ]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(item, index) in items"
          :key="getItemKey(item, index)"
          class="hover:bg-gray-50 transition-colors"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="['px-6 py-4 whitespace-nowrap', column.cellClass]"
          >
            <slot :name="`cell-${column.key}`" :item="item" :index="index">
              {{ getCellValue(item, column.key) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div v-if="pagination && pagination.total > pagination.per_page" class="px-6 py-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-600">
          Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} {{ itemName }}
        </div>
        <Pagination
          :pagination="pagination"
          @change-page="$emit('page-change', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Pagination from '@/components/Pagination.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    // Example: [{ key: 'name', label: 'Name', headerClass: '', cellClass: '' }]
  },
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    default: null
    // Example: { current_page: 1, per_page: 10, total: 100, from: 1, to: 10, last_page: 5 }
  },
  searchable: {
    type: Boolean,
    default: false
  },
  searchQuery: {
    type: String,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...'
  },
  itemKey: {
    type: String,
    default: 'id'
  },
  itemName: {
    type: String,
    default: 'items'
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  emptyText: {
    type: String,
    default: 'No items found'
  }
})

const emit = defineEmits(['update:searchQuery', 'page-change'])

// paginationPages computed property removed as it is handled by Pagination component

const getItemKey = (item, index) => {
  return item[props.itemKey] || index
}

const getCellValue = (item, key) => {
  return key.split('.').reduce((obj, k) => obj?.[k], item) || '-'
}
</script>
