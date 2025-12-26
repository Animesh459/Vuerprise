<template>
  <div class="space-y-6">
    <!-- Add New Color Form Section -->
    <div class="common-card">
      <div class="flex justify-between mb-8">
        <h2 class="text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
          <span class="text-xl">🎨</span>
          Add a New Color
        </h2>
        <div class="flex items-center gap-4 bg-slate-900/20 p-1.5 rounded-full border border-slate-800">
          <button
              @click="status = 'active'"
              :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                status === 'active' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'
              ]"
          >
            <div class="w-2 h-2 rounded-full" :class="status === 'active' ? 'bg-white' : 'bg-slate-600'"></div>
            ACTIVE
          </button>
          <button
              @click="status = 'inactive'"
              :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                status === 'inactive' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-500 hover:text-slate-300'
              ]"
          >
            <div class="w-2 h-2 rounded-full" :class="status === 'inactive' ? 'bg-white' : 'bg-slate-600'"></div>
            INACTIVE
          </button>
        </div>
      </div>


      <div class="space-y-6">
        <div class="grid grid-cols-2 gap-8 lg:grid-cols-2">
          <div class="space-y-6">
            <!-- Color Name -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Color Name</label>
              <input type="text" placeholder="Enter color name" class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none" />
            </div>

            <!-- Master Color -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Master Color</label>
              <div class="relative">
                <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                  <option>Select Size</option>
                </select>
                <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Color Code -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Color Code</label>
              <div class="flex gap-3">
                <input type="color" v-model="selectedColor" class="w-20 h-12 border border-cyan-500/20 rounded-lg cursor-pointer" />
                <input type="text" v-model="selectedColor" placeholder="#000000" class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none" />
              </div>
            </div>

            <!-- Upload Color Image -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Upload Color Image</label>
              <input type="file" class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button class="btn-secondary-transparent">Cancel</button>
          <button class="btn-common">Save</button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="flex items-center justify-between gap-4">
        <input type="text" v-model="searchQuery" placeholder="Search colors, variants, stock codes..." class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none" />
        <div class="flex gap-3">

          <div class="relative">
            <select v-model="sortBy" class="w-full min-w-[100px] bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
              <option>Name A-Z</option>
              <option>Recently Added</option>
              <option>Popular</option>
            </select>
            <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
          </div>
          <div class="relative">
            <select v-model="itemsPerPage" class="w-full min-w-[100px] bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
          </div>

          <button class="px-4 py-2 whitespace-nowrap text-cyan-400 hover:text-cyan-300 font-semibold text-sm">Reset All</button>
        </div>
      </div>

      <!-- Colors Grid -->
      <div class="grid grid-cols-6 gap-4 md:grid-cols-8 sm:grid-cols-4">
        <div
            v-for="color in filteredColors"
            :key="color.id"
            @click="selectedColorCard = color.id"
            :class="[
            'bg-gray-950/80 border-2 rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20',
            selectedColorCard === color.id ? 'border-cyan-400 shadow-lg shadow-cyan-500/30 bg-cyan-500/10' : 'border-cyan-500/20'
          ]"
        >
          <div class="w-full h-20 rounded-lg mb-3 shadow-lg" :style="{ backgroundColor: color.code }"></div>
          <span class="block text-xs font-semibold text-gray-300 text-center uppercase tracking-wider">{{ color.name }}</span>
          <div class="flex justify-center gap-2 mt-3 pt-3 border-t border-cyan-500/10">
            <button class="text-xs text-gray-400 hover:text-cyan-400 font-semibold transition-colors">Edit</button>
            <span class="text-gray-600">|</span>
            <button class="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {ChevronDownIcon} from "lucide-vue-next";

const selectedColor = ref('#000000')
const selectedColorCard = ref(null)
const searchQuery = ref('')
const sortBy = ref('name')
const itemsPerPage = ref('10')
const status = ref('active')

const colors = ref([
  { id: 1, name: 'Ivory', code: '#F5F5DC' },
  { id: 2, name: 'Green', code: '#00BCD4' },
  { id: 3, name: 'Beige/Dust Green', code: '#F5E6D3' },
  { id: 4, name: 'Denim-Red', code: '#8B0000' },
  { id: 5, name: 'Dark Green/Red', code: '#556B2F' },
  { id: 6, name: 'Cream/Red', code: '#FFFFFF' },
  { id: 7, name: 'Navy Blue', code: '#000080' },
  { id: 8, name: 'Charcoal', code: '#36454F' },
])

const filteredColors = computed(() => {
  let result = colors.value.filter(c =>
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  }

  return result.slice(0, parseInt(itemsPerPage.value))
})
</script>
