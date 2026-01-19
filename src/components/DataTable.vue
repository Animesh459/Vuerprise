<template>
  <div class="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
    <!-- Header with Search -->
    <div v-if="searchable || $slots.header" class="p-4 border-b border-border">
      <slot name="header">
        <div class="flex items-center gap-4">
          <div v-if="searchable" class="flex-1">
            <input
              :value="searchQuery"
              @input="$emit('update:searchQuery', $event.target.value)"
              type="text"
              :placeholder="searchPlaceholder"
              class="h-9 w-full border border-border rounded-xl bg-white pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-blue-600 focus:outline-none"
            />
          </div>
          <slot name="actions"></slot>
        </div>
      </slot>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-12 text-center">
      <div class="inline-block w-8 h-8 border-4 border-border border-t-blue-600 rounded-full animate-spin"/>
      <p class="mt-4 text-gray-600">{{ loadingText }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!items || items.length === 0" class="p-12 text-center">
      <slot name="empty">
        <p class="text-gray-600">{{ emptyText }}</p>
      </slot>
    </div>

    <!-- Table -->
    <div v-else class="w-full p-4" >
      <div class="table-container">

        <table  class="table">
          <thead class="">
          <tr>
            <th
                v-for="column in columns"
                :key="column.key"
                :class="[
              '',
              column.headerClass
            ]"
            >
              {{ column.label }}
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-border">
          <tr
              v-for="(item, index) in items"
              :key="getItemKey(item, index)"
              class=""
          >
            <td
                v-for="column in columns"
                :key="column.key"
                :class="['', column.cellClass]"
            >
              <slot :name="`cell-${column.key}`" :item="item" :index="index">
                {{ getCellValue(item, column.key) }}
              </slot>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.total > pagination.per_page" class="px-6 py-4 border-t border-border">
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
