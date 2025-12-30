<template>
  <div class="p-6 bg-slate-900/40 rounded-xl border border-cyan-500/20 shadow-2xl mb-10">
    <!-- Header -->
    <header class="">
      <div class="mb-12">
        <h1 class="text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
          Category Manager
        </h1>
        <p class="text-slate-400 text-sm mt-1">Organize your product categories with drag and drop</p>
      </div>
    </header>

    <div class="">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Left Panel - Categories List with Collapsible -->
        <div class="lg:col-span-1">
          <div class="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div class="flex items-center gap-2 mb-6">
              <h2 class="text-xl font-bold">Categories</h2>
            </div>

            <p class="text-xs text-slate-400 mb-6 flex items-center gap-2">
              <span class="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
              Drag to sort. Click to edit.
            </p>

            <!-- Added draggable list with collapsible subcategories -->
            <div class="space-y-2">
              <div
                  v-for="(category, index) in categories"
                  :key="index"
                  draggable="true"
                  @dragstart="dragStart($event, index)"
                  @dragover.prevent="dragOver"
                  @drop="dragDrop($event, index)"
                  @dragend="dragEnd"
                  :class="[
                  'group relative cursor-move transition-all duration-300  rounded-xl overflow-hidden',
                  draggedIndex === index ? 'opacity-50 scale-95' : '',
                  dragOverIndex === index && draggedIndex !== index ? 'border-cyan-500/50 bg-cyan-500/10' : ''
                ]"
              >
                <div
                    @click="toggleCategory(index)"
                    :class="[
                    'p-2 rounded-xl transition-all duration-300  cursor-pointer',
                    selectedCategory === index
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20   shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800/30   hover:bg-slate-800/50'
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 flex-1">
                      <!-- Added collapse/expand arrow -->
                      <button
                          @click.stop="expandedCategories[index] = !expandedCategories[index]"
                          class="transition-transform duration-300"
                          :style="{ transform: expandedCategories[index] ? 'rotate(90deg)' : 'rotate(0deg)' }"
                      >
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                      <div>
                        <div class="font-semibold text-sm">{{ category.name }}</div>
                        <div class="text-xs text-slate-500 mt-0.5">{{ category.subcategories.length }} items</div>
                      </div>
                    </div>
                    <div class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <!-- Added edit button -->
                      <button
                          @click.stop="openEditModal(index)"
                          class="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>

                    </div>
                  </div>
                </div>

                <!-- Added collapsible subcategories dropdown -->
                <transition
                    enter-active-class="transition-all duration-300"
                    leave-active-class="transition-all duration-300"
                    enter-from-class="opacity-0 -translate-y-2"
                    leave-to-class="opacity-0 -translate-y-2"
                >
                  <div v-if="expandedCategories[index]" class="bg-slate-800/20 border-t border-slate-700/50 overflow-hidden">
                    <div class="p-3 space-y-2">
                      <div
                          v-for="(sub, subIndex) in category.subcategories"
                          :key="`${index}-${subIndex}`"
                          class="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/50 cursor-pointer transition-all text-sm text-slate-300 flex items-center justify-between group"
                      >
                        <span>{{ sub }}</span>
                        <span class="text-xs text-slate-500 group-hover:text-slate-400">→</span>
                      </div>

                    </div>
                  </div>
                </transition>
              </div>
            </div>

          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
            <div class="flex items-center gap-3 mb-8" v-if="selectedCategory !== null">
              <div>
                <h3 class="text-2xl font-bold">{{ categories[selectedCategory].name }}</h3>
                <p class="text-sm text-slate-400 mt-1">Selected category details</p>
              </div>
            </div>

            <div v-if="selectedCategory !== null" class="space-y-6">
              <div class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
                <p class="text-sm text-slate-400 mb-2">Subcategories</p>
                <div class="flex flex-wrap gap-2">
                  <span
                      v-for="(sub, idx) in categories[selectedCategory].subcategories"
                      :key="idx"
                      class="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg text-sm font-medium text-cyan-300"
                  >
                    {{ sub }}
                  </span>
                </div>
              </div>

              <!-- Added modal trigger button -->
              <button
                  @click="openEditModal(selectedCategory)"
                  class="btn-common"
              >
                Edit Category
              </button>
            </div>

            <div v-else class="flex items-center justify-center h-64">
              <div class="text-center">
                <div class="text-5xl mb-4">👈</div>
                <p class="text-slate-400">Select a category to view details</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Added Edit Modal Dialog -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 px-8 py-6 flex items-center justify-between z-10">
          <div class="flex items-center gap-3">
            <h3 class="text-2xl font-bold">Edit Category</h3>
          </div>
          <button
              @click="closeEditModal"
              class="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="px-8 py-8 space-y-3">
          <!-- Status -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">
              Status
            </label>
            <div class="flex gap-6">
              <CustomRadio
                  id="delivery-method"
                  label="Radio"
                  v-model="orderData.speed"
                  :options="[
                  { value: 'standard', text: 'Active' },
                  { value: 'express', text: 'Inactive' },
                ]"
              />
            </div>
          </div>

          <!-- Category Name -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">
              Category Name
            </label>
            <input
                v-model="editFormData.name"
                type="text"
                class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none"
                placeholder="Enter category name"
            />
          </div>

          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">Parent Category</label>
            <div class="relative">
              <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                <option value="">Select Parent</option>
                <option value="apparel">Apparel</option>
                <option value="accessories">Accessories</option>
              </select>
              <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
            </div>
          </div>

          <!-- Secondary Parent -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">Parent Category</label>
            <div class="relative">
              <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                <option value="">Select Secondary Parent</option>
                <option value="mens">Men's</option>
                <option value="womens">Women's</option>
              </select>
              <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
                v-model="editFormData.description"
                rows="5"
                class="flex-1 w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-4 text-sm resize-none focus:border-cyan-500/50 transition-all outline-none min-h-[150px]"
                placeholder="Enter category description..."
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">
              Category Image
            </label>
            <div class="relative">
              <input type="file" class="hidden" id="imageUpload" />
              <label
                  for="imageUpload"
                  class="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border-2 border-dashed border-slate-700/50 rounded-lg cursor-pointer hover:border-cyan-500/50 transition-all"
              >
                <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span class="text-sm text-slate-400">Click to upload or drag and drop</span>
              </label>
            </div>
          </div>
        </div>

        <div class="sticky bottom-0 bg-slate-950/80 backdrop-blur-lg border-t border-slate-800 px-8 py-6 flex items-end justify-end gap-4">
<!--          <button-->
<!--              @click="deleteCategory"-->
<!--              class="btn-danger-transparent"-->
<!--          >-->
<!--            Delete-->
<!--          </button>-->
          <button
              @click="closeEditModal"
              class="btn-secondary-transparent"
          >
            Cancel
          </button>
          <button
              @click="updateCategory"
              class="btn-common"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {ChevronDownIcon} from "lucide-vue-next";
import CustomRadio from "@/components/CustomRadio.vue";

const selectedCategory = ref(0)
const showEditModal = ref(false)
const draggedIndex = ref(null)
const dragOverIndex = ref(null)
const expandedCategories = ref({})

const categories = ref([
  { name: 'TOP', subcategories: ['T-Shirt', 'Shirt', 'Tank Top', 'Sweater'] },
  { name: 'DRESS', subcategories: ['Casual Dress', 'Formal Dress', 'Maxi Dress'] },
  { name: 'BOTTOM', subcategories: ['Jeans', 'Pants', 'Shorts', 'Skirt'] },
  { name: 'OUTERWEAR', subcategories: ['Jacket', 'Coat', 'Blazer', 'Cardigan'] },
  { name: 'FOOTWEAR', subcategories: ['Sneakers', 'Boots', 'Heels', 'Sandals'] },
  { name: 'ACCESSORIES', subcategories: ['Bag', 'Belt', 'Hat', 'Jewelry'] }
])

const editFormData = ref({
  status: 'active',
  name: '',
  parent: '',
  secondary: '',
  description: ''
})

const orderData = ref({
  speed: 'standard',
});

const dragStart = (e, index) => {
  draggedIndex.value = index
  e.dataTransfer.effectAllowed = 'move'
}

const dragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}

const dragDrop = (e, index) => {
  e.preventDefault()
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    const draggedItem = categories.value[draggedIndex.value]
    categories.value.splice(draggedIndex.value, 1)
    categories.value.splice(index, 0, draggedItem)
    selectedCategory.value = index
  }
  dragOverIndex.value = null
}

const dragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}

const openEditModal = (index) => {
  selectedCategory.value = index
  editFormData.value = {
    status: 'active',
    name: categories.value[index].name,
    parent: '',
    secondary: '',
    description: ''
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const updateCategory = () => {
  categories.value[selectedCategory.value].name = editFormData.value.name
  closeEditModal()
}

const deleteCategory = () => {
  if (categories.value.length > 1) {
    categories.value.splice(selectedCategory.value, 1)
    selectedCategory.value = 0
    closeEditModal()
  }
}

const addCategory = () => {
  categories.value.push({ name: 'New Category', subcategories: [] })
}

const toggleCategory = (index) => {
  selectedCategory.value = index
}

const addSubcategory = (index) => {
  const newSub = prompt('Enter subcategory name:')
  if (newSub) {
    categories.value[index].subcategories.push(newSub)
  }
}
</script>

<style scoped>
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
