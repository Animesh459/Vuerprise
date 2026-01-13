<template>
<div>
  <div class="flex flex-col   pb-4 ">
    <h1 class="text-3xl font-bold tracking-tighter text-gray-900">Packs Manager</h1>
    <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Organize your product Packs Here</p>
  </div>

  <main class="">

      <div class="common-card-new mb-8">
        <div class="mb-5">
          <h2 class="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <span class="flex items-center justify-center ">+</span>
            Create New Pack
          </h2>
          <p class="text-sm text-gray-700 mt-1">Configure size options and pack specifications</p>
        </div>

        <div class="space-y-5">
          <div>
            <BaseSelect
                label="Size Configuration"
                :options="['Small, Medium, Large', 'Small to Extra Large', 'Medium to 2XL']"
            />
          </div>
          <!-- Pack Grid -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Packs</label>
            <div class="grid grid-cols-5 md:grid-cols-10 gap-3">
              <button
                  v-for="i in 10"
                  :key="i"
                  @click="togglePack(`P${i}`)"
                  :class="[
                  '',
                  newPack.packs.includes(`P${i}`)
                    ? 'btn-primary-new'
                    : 'btn-secondary-new'
                ]"
              >
                P{{ i }}
              </button>
            </div>
          </div>

          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-border">
            <button class="text-blue-500 font-medium text-sm flex items-center gap-2 transition-colors">
              <span class="text-lg">+</span>
              <span>Add More Options</span>
            </button>
            <div class="flex gap-3 w-full md:w-auto">
              <button
                  @click="resetForm"
                  class="btn-secondary-new"
              >
                Cancel
              </button>
              <button
                  @click="savePack"
                  class="btn-primary-new"
              >
                Save Pack
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="common-card-new mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search Input -->
          <div>
            <BaseInput label="Search" placeholder="Search" />
          </div>

          <div>
            <BaseSelect
                label="Sort By"
                :options="['Name (A-Z)', 'Date Added', 'Size']"
            />

          </div>

          <div>
            <BaseSelect
                label="Status"
                :options="['All Packs', 'Active', 'Inactive']"
            />

          </div>

          <div>
            <BaseSelect
                label="Per Page"
                :options="['10 items', '20 items', '50 items']"
            />
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr class="">
            <th v-for="header in tableHeaders" :key="header" class="">
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          <tr v-for="(row, index) in inventoryData" :key="index" class="">
            <td class="px-6 py-5">
          <span class="text-sm font-semibold text-gray-700 tracking-tight">
            {{ row.sizeName }}
          </span>
            </td>

            <td class="">
          <span class="text-sm text-gray-700 font-medium">
            {{ row.details }}
          </span>
            </td>

            <td class="">
              <div class="inline-block text-gray-700 px-3 py-1 ">
                {{ row.packConfig }}
              </div>
            </td>

            <td class="">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                <span :class="statusColor(row.status)" class="text-xs font-bold tracking-wide">
              {{ row.status }}
            </span>
              </div>
            </td>

            <td class="">
              <div class="flex items-center gap-2">
                <button class="p-2  text-gray-700  transition-all">
                  <EditIcon :size="16" />
                </button>
                <button @click="deleteRow(index)" class="p-2  text-gray-700 hover:text-rose-500 transition-all">
                  <TrashIcon :size="16" />
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <Pagination />

    </main>

</div>
</template>

<script setup>
import { ref, computed } from 'vue'

import {
  ZapIcon, ArrowDownCircleIcon, AlertCircleIcon,
  ChevronDownIcon, TrashIcon, EditIcon, CalendarIcon
} from 'lucide-vue-next';
import Pagination from "@/components/Pagination.vue";
import BaseSelect from "@/components/form/BaseSelect.vue";
import BaseInput from "@/components/form/BaseInput.vue";
// Form data
const newPack = ref({
  size: '',
  packs: []
})

// Data
const packs = ref([
  { id: 1, sizeName: 'S-M-L', sizeDetails: 'Small, Medium, Large', pack: '2-2-2', status: 'active' },
  { id: 2, sizeName: 'S-M-L-XL', sizeDetails: 'Small to Extra Large', pack: '1-2-2-1', status: 'active' },
  { id: 3, sizeName: 'M-L-XL', sizeDetails: 'Medium to Extra Large', pack: '3-2-1', status: 'active' },
  { id: 4, sizeName: 'XS-S-M', sizeDetails: 'Extra Small to Medium', pack: '2-3-2', status: 'active' },
  { id: 5, sizeName: 'L-XL-XXL', sizeDetails: 'Large to 2XL', pack: '1-2-3', status: 'active' },
])

// Filters & Search
const searchQuery = ref('')
const sortBy = ref('name')
const filterCategory = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

// Toggle pack selection
const togglePack = (packValue) => {
  const index = newPack.value.packs.indexOf(packValue)
  if (index > -1) {
    newPack.value.packs.splice(index, 1)
  } else {
    newPack.value.packs.push(packValue)
  }
}

// Reset form
const resetForm = () => {
  newPack.value = { size: '', packs: [] }
}

// Save pack
const savePack = () => {
  if (newPack.value.size && newPack.value.packs.length > 0) {
    const packString = newPack.value.packs.map(p => p.replace('P', '')).join('-')
    packs.value.push({
      id: Math.max(...packs.value.map(p => p.id), 0) + 1,
      sizeName: newPack.value.size,
      sizeDetails: newPack.value.size,
      pack: packString,
      status: 'active'
    })
    resetForm()
  }
}

// Delete pack
const deletePack = (id) => {
  packs.value = packs.value.filter(p => p.id !== id)
}

// Filtered packs
const filteredPacks = computed(() => {
  let filtered = packs.value.filter(pack => {
    const matchSearch = pack.sizeName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        pack.pack.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchFilter = filterCategory.value === '' || pack.status === filterCategory.value
    return matchSearch && matchFilter
  })

  // Sort
  if (sortBy.value === 'name') {
    filtered.sort((a, b) => a.sizeName.localeCompare(b.sizeName))
  }

  return filtered
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredPacks.value.length / itemsPerPage.value))

const paginatedPacks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPacks.value.slice(start, end)
})

const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredPacks.value.length))

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const tableHeaders = [
  'Size Name', 'Size Details', 'Pack Config', 'Status', 'Actions'
];

const inventoryData = ref([
  {
    sizeName: 'L-XL-XXL',
    details: 'Large to 2XL',
    packConfig: '1-2-3',
    status: 'Active'
  },
  {
    sizeName: 'M-L-XL',
    details: 'Medium to Extra Large',
    packConfig: '3-2-1',
    status: 'Active'
  },
  {
    sizeName: 'S-M-L',
    details: 'Small, Medium, Large',
    packConfig: '2-2-2',
    status: 'Active'
  },
  {
    sizeName: 'S-M-L-XL',
    details: 'Small to Extra Large',
    packConfig: '1-2-2-1',
    status: 'Active'
  },
  {
    sizeName: 'XS-S-M',
    details: 'Extra Small to Medium',
    packConfig: '2-3-2',
    status: 'Active'
  }
]);

const statusColor = (status) => {
  return status === 'Active' ? 'text-emerald-400' : 'text-gray-700';
};

const deleteRow = (index) => {
  inventoryData.value.splice(index, 1);
};


</script>