<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0D121C] to-[#1a2332] text-white font-sans">

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-8 py-8">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <span class="text-4xl">📦</span>
        <h1 class="text-3xl font-bold text-white">Packs</h1>
      </div>

      <!-- Add Pack Form -->
      <div class="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 mb-8 shadow-2xl shadow-black/30">
        <h2 class="text-xl font-bold text-white mb-6 pb-4 border-b border-cyan-500/20">Add a New Pack</h2>

        <div class="space-y-6">
          <!-- Size Dropdown -->
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Size</label>
            <select v-model="newPack.size" class="w-full bg-gray-950/80 border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all">
              <option value="">Select a Size</option>
              <option value="S-M-L">S-M-L</option>
              <option value="S-M-L-XL">S-M-L-XL</option>
              <option value="XS-S-M-L-XL">XS-S-M-L-XL</option>
              <option value="M-L-XL-XXL">M-L-XL-XXL</option>
            </select>
          </div>

          <!-- Pack Selection Grid -->
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pack</label>
            <div class="grid grid-cols-10 gap-2">
              <button
                  v-for="i in 10"
                  :key="i"
                  @click="togglePack(`P${i}`)"
                  :class="[
                  'py-2 px-3 border rounded-lg text-sm font-semibold transition-all',
                  newPack.packs.includes(`P${i}`)
                    ? 'bg-cyan-400 border-cyan-300 text-black shadow-lg shadow-cyan-500/50'
                    : 'bg-gray-950/80 border-cyan-500/20 text-gray-300 hover:border-cyan-400 hover:text-cyan-300'
                ]"
              >
                P{{ i }}
              </button>
            </div>
          </div>

          <!-- Add More & Action Buttons -->
          <div class="flex justify-between items-center pt-4">
            <button class="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              <span class="text-2xl">+</span>
              <span>Add More</span>
            </button>
            <div class="flex gap-4">
              <button @click="resetForm" class="btn-transparent-default">Cancel</button>
              <button @click="savePack" class="btn-common">Save</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <div class="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-black/30">
        <div class="flex gap-4 items-end">
          <!-- Search -->
          <div class="flex-1">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none"
            />
          </div>

          <!-- Sort -->
          <div class="w-48">
            <select v-model="sortBy" class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none">
              <option value="name">Name A-Z</option>
              <option value="date">Date</option>
              <option value="size">Size</option>
            </select>
          </div>

          <!-- Filter -->
          <div class="w-32">
            <select v-model="filterCategory" class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none">
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Items Per Page -->
          <div class="w-32">
            <select v-model.number="itemsPerPage" class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
        <!-- Table Header -->
        <div class="bg-black/40 border-b border-cyan-500/20 grid grid-cols-12 gap-4 px-8 py-4">
          <div class="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Size Name</div>
          <div class="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Size Details</div>
          <div class="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Pack</div>
          <div class="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</div>
          <div class="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Action</div>
        </div>

        <!-- Table Body -->
        <div class="divide-y divide-cyan-500/10">
          <div v-for="pack in paginatedPacks" :key="pack.id" class="grid grid-cols-12 gap-4 px-8 py-4 hover:bg-gray-900/30 transition-colors">
            <div class="col-span-3">
              <span class="text-white font-medium">{{ pack.sizeName }}</span>
            </div>
            <div class="col-span-3">
              <span class="text-gray-300">{{ pack.sizeDetails }}</span>
            </div>
            <div class="col-span-2">
              <span class="bg-gray-800 text-white px-3 py-1 rounded text-sm font-semibold">{{ pack.pack }}</span>
            </div>
            <div class="col-span-2">
              <span class="text-cyan-400">✓</span>
            </div>
            <div class="col-span-2 flex gap-3">
              <button class="text-cyan-400 hover:text-cyan-300 transition-colors">
                <span class="text-lg">✏️</span>
              </button>
              <button @click="deletePack(pack.id)" class="text-red-400 hover:text-red-300 transition-colors">
                <span class="text-lg">🗑️</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="bg-black/40 border-t border-cyan-500/20 px-8 py-4 flex items-center justify-between">
          <span class="text-sm text-gray-400">{{ startItem }}-{{ endItem }} of {{ filteredPacks.length }}</span>
          <div class="flex gap-2">
            <button @click="previousPage" class="px-3 py-1 bg-gray-950/80 border border-cyan-500/20 text-gray-400 rounded hover:border-cyan-400 hover:text-cyan-400 transition-all">←</button>
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="['px-3 py-1 rounded font-semibold transition-all', currentPage === page ? 'bg-cyan-400 text-black' : 'bg-gray-950/80 border border-cyan-500/20 text-gray-400 hover:border-cyan-400']">
              {{ page }}
            </button>
            <button @click="nextPage" class="btn-common">→</button>
          </div>
          <span class="text-sm text-gray-400">{{ totalPages }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Form data
const newPack = ref({
  size: '',
  packs: []
})

// Data
const packs = ref([
  { id: 1, sizeName: 'S-M-L', sizeDetails: 'S-M-L', pack: '2-2-2', status: 'active' },
  { id: 2, sizeName: 'S-M-L-XL', sizeDetails: 'S-M-L-XL', pack: '1-2-2-1', status: 'active' },
  { id: 3, sizeName: 'M-L-XL', sizeDetails: 'M-L-XL', pack: '3-2-1', status: 'active' },
  { id: 4, sizeName: 'XS-S-M', sizeDetails: 'XS-S-M', pack: '2-3-2', status: 'active' },
  { id: 5, sizeName: 'L-XL-XXL', sizeDetails: 'L-XL-XXL', pack: '1-2-3', status: 'active' },
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
