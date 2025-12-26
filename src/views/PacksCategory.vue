<template>
  <div class="common-card p-0">

    <div class="">
      <div class="w-full px-6 md:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
            📦
          </div>
          <h1 class="text-2xl font-bold text-white">Packs Manager</h1>
        </div>
<!--        <div class="text-sm text-slate-400">-->
<!--          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">-->
<!--            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>-->
<!--            Active-->
<!--          </span>-->
<!--        </div>-->
      </div>
    </div>

    <!-- Main Content -->
    <main class="w-full px-6 md:px-8 py-8 max-w-full">
      <!-- Add Pack Form Card -->
      <div class="mb-8 rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div class="bg-gradient-to-r from-slate-800/30 to-transparent border-b border-slate-800/50 px-8 py-6">
          <h2 class="text-xl font-semibold text-white flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400">+</span>
            Create New Pack
          </h2>
          <p class="text-sm text-slate-400 mt-1">Configure size options and pack specifications</p>
        </div>

        <div class="p-8 space-y-6">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Size Configuration</label>
            <div class="relative">
              <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                <option>Select a size preset...</option>
                <option>Small, Medium, Large</option>
                <option>Small to Extra Large</option>
                <option>Medium to 2XL</option>
              </select>
              <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
            </div>
          </div>
          <!-- Pack Grid -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Packs</label>
            <div class="grid grid-cols-5 md:grid-cols-10 gap-3">
              <button
                  v-for="i in 10"
                  :key="i"
                  @click="togglePack(`P${i}`)"
                  :class="[
                  '',
                  newPack.packs.includes(`P${i}`)
                    ? 'btn-common'
                    : 'btn-secondary-transparent'
                ]"
              >
                P{{ i }}
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-slate-700/30">
            <button class="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-2 transition-colors">
              <span class="text-lg">+</span>
              <span>Add More Options</span>
            </button>
            <div class="flex gap-3 w-full md:w-auto">
              <button
                  @click="resetForm"
                  class="btn-secondary-transparent"
              >
                Cancel
              </button>
              <button
                  @click="savePack"
                  class="btn-common"
              >
                Save Pack
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Controls Bar -->
      <div class="mb-8 rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl p-6 shadow-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search Input -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search</label>
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search packs..."
                class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort By</label>
            <div class="relative">
              <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                <option>Name (A-Z)</option>
                <option>Date Added</option>
                <option>Size</option>
              </select>
              <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
            </div>
          </div>
          <!-- Filter -->

          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
            <div class="relative">
              <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                <option>All Packs</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
            </div>
          </div>

          <!-- Items Per Page -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Per Page</label>
            <div class="relative">
              <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                <option>10 items</option>
                <option>20 items</option>
                <option>50 items</option>
              </select>
              <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
            </div>
          </div>
        </div>
      </div>

      <!-- Data Table Card -->
      <div class="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl shadow-2xl overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gradient-to-r from-slate-800/30 to-transparent border-b border-slate-800/50 px-8 py-4">
          <div class="grid grid-cols-12 gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <div class="col-span-3">Size Name</div>
            <div class="col-span-3">Size Details</div>
            <div class="col-span-2">Pack Config</div>
            <div class="col-span-2">Status</div>
            <div class="col-span-2">Actions</div>
          </div>
        </div>

        <!-- Table Rows -->
        <div class="divide-y divide-slate-800/30">
          <div
              v-for="pack in paginatedPacks"
              :key="pack.id"
              class="grid grid-cols-12 gap-4 px-8 py-4 hover:bg-slate-800/20 transition-colors duration-200 group"
          >
            <div class="col-span-3">
              <span class="font-medium text-white">{{ pack.sizeName }}</span>
            </div>
            <div class="col-span-3">
              <span class="text-slate-400">{{ pack.sizeDetails }}</span>
            </div>
            <div class="col-span-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-cyan-400">
                {{ pack.pack }}
              </span>
            </div>
            <div class="col-span-2">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span class="text-sm text-emerald-400 font-medium">Active</span>
              </div>
            </div>
            <div class="col-span-2 flex gap-2">
              <button class="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 hover:border-cyan-400/30 transition-all opacity-0 group-hover:opacity-100">
                ✎
              </button>
              <button
                  @click="deletePack(pack.id)"
                  class="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-400/30 transition-all opacity-0 group-hover:opacity-100"
              >
                🗑
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="paginatedPacks.length === 0" class="px-8 py-12 text-center">
            <p class="text-slate-400 text-sm">No packs found. Create one to get started!</p>
          </div>
        </div>

        <!-- Footer with Pagination -->
        <div class="bg-gradient-to-r from-slate-800/30 to-transparent border-t border-slate-800/50 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span class="text-sm text-slate-400">
            Showing <span class="font-semibold text-white">{{ startItem }}-{{ endItem }}</span> of <span class="font-semibold text-white">{{ filteredPacks.length }}</span>
          </span>
          <div class="flex gap-2 items-center">
            <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="p-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ←
            </button>
            <div class="flex gap-1">
              <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all',
                  currentPage === page
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-slate-600/50'
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="p-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {ChevronDownIcon} from "lucide-vue-next";

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
</script>