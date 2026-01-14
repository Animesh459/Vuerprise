<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between pb-6">
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
          <PaletteIcon :size="24" class="text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Color Manager</h1>
          <p class="text-sm text-gray-500 mt-0.5">Create and manage your product colors</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 text-xs font-medium">
          <SwatchBookIcon :size="12" />
          {{ colors.length }} Colors
        </span>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Add New Color Card -->
      <div class="common-card-new">
        <div class="flex justify-between items-start mb-6">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
              <PaletteIcon :size="18" class="text-white" />
            </div>
            <h2 class="text-lg font-semibold text-gray-900">Add a New Color</h2>
          </div>
          <div class="flex items-center gap-4 p-1.5 rounded-full border border-zinc-200">
            <button
              @click="status = 'active'"
              :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                status === 'active' ? 'bg-blue-500 text-white ' : 'text-slate-500 hover:text-slate-300'
              ]"
            >
              <div class="w-2 h-2 rounded-full" :class="status === 'active' ? 'bg-white' : 'bg-slate-600'"></div>
              ACTIVE
            </button>
            <button
              @click="status = 'inactive'"
              :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                status === 'inactive' ? 'bg-rose-500 text-white ' : 'text-slate-500 hover:text-slate-300'
              ]"
            >
              <div class="w-2 h-2 rounded-full" :class="status === 'inactive' ? 'bg-white' : 'bg-slate-600'"></div>
              INACTIVE
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-6 lg:grid-cols-2">
            <div class="space-y-6">
              <BaseInput label="Color Name" placeholder="Enter color name" />
              <!-- Master Color -->
              <BaseSelect
                label="Master Color"
                :options="['Select Size', 'S', 'M']"
              />
            </div>

            <div class="space-y-6">
              <!-- Color Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Color Code</label>
                <div class="flex gap-3">
                  <input type="color" v-model="selectedColor" class="w-20 h-9 border border-neutral-200 rounded-lg cursor-pointer" />
                  <BaseInput placeholder="#000000" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Upload Color Image</label>
                <input type="file" class="h-9 w-full border border-border bg-white pl-4 pr-4 rounded-xl text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-blue-600 focus:outline-none" />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button class="btn-secondary-new">Cancel</button>
            <button class="btn-primary-new">Save</button>
          </div>
        </div>
      </div>

      <!-- Colors List Section -->
      <div class="space-y-4">
        <!-- Filters Row -->
        <div class="common-card-new">
          <div class="flex items-center justify-between gap-4">
            <div class="relative flex-1 w-full">
              <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <BaseInput customClass="pl-8" placeholder="Search colors..." />
            </div>
            <div class="flex gap-3 items-center">
              <div class="relative">
                <BaseSelect
                  :options="['Name A-Z', 'Recently Added', 'Popular']"
                />
              </div>
              <div class="relative">
                <BaseSelect
                  :options="['10', '20', '30']"
                />
              </div>
              <button class="px-4 py-2 whitespace-nowrap text-gray-700 hover:text-gray-700 font-semibold text-sm">Reset All</button>
            </div>
          </div>
        </div>

        <!-- Colors Grid -->
        <div class="grid grid-cols-6 gap-4 md:grid-cols-8 sm:grid-cols-4">
          <div
            v-for="color in filteredColors"
            :key="color.id"
            @click="selectedColorCard = color.id"
            :class="[
              'bg-white border rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg',
              selectedColorCard === color.id ? 'border-blue-300 ring-2 ring-blue-100' : 'border-border hover:border-blue-200'
            ]"
          >
            <div class="w-full h-20 rounded-lg mb-3 shadow-lg" :style="{ backgroundColor: color.code }"></div>
            <span class="block text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">{{ color.name }}</span>
            <div class="flex justify-center gap-2 mt-3 pt-3 border-t border-border">
              <button class="text-xs text-gray-400 hover:text-blue-600 font-semibold transition-colors">Edit</button>
              <span class="text-gray-300">|</span>
              <button class="text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronDownIcon, Search, PaletteIcon, SwatchBookIcon } from "lucide-vue-next";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseSelect from "@/components/form/BaseSelect.vue";

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
