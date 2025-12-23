<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
    <!-- Header -->
    <header class="border-b border-slate-800 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-8 py-6">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Category Manager
        </h1>
        <p class="text-slate-400 text-sm mt-1">Organize your product categories with drag and drop</p>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Left Panel - Categories List with Collapsible -->
        <div class="lg:col-span-1">
          <div class="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
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
                  'group relative cursor-move transition-all duration-300 border rounded-xl overflow-hidden',
                  draggedIndex === index ? 'opacity-50 scale-95' : '',
                  dragOverIndex === index && draggedIndex !== index ? 'border-cyan-500/50 bg-cyan-500/10' : ''
                ]"
              >
                <div
                    @click="toggleCategory(index)"
                    :class="[
                    'p-4 rounded-xl transition-all duration-300 border cursor-pointer',
                    selectedCategory === index
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/50'
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
                      <svg class="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
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
                      <!-- Added add subcategory button -->
                      <button
                          @click.stop="addSubcategory(index)"
                          class="w-full p-2 rounded-lg bg-slate-800/20 border border-dashed border-slate-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-xs text-slate-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
                      >
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                        </svg>
                        Add Sub
                      </button>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <button
                @click="addCategory"
                class="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              + Add Category
            </button>
          </div>
        </div>

        <!-- Right Panel - Info Display (not edit form) -->
        <div class="lg:col-span-2">
          <div class="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
            <div class="flex items-center gap-3 mb-8" v-if="selectedCategory !== null">
              <div class="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
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
                  class="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all font-semibold text-sm transform hover:scale-105 active:scale-95"
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
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 px-8 py-6 flex items-center justify-between z-10">
          <div class="flex items-center gap-3">
            <div class="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
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
        <div class="px-8 py-8 space-y-8">
          <!-- Status -->
          <div class="space-y-3">
            <label class="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span class="w-1 h-4 bg-purple-500 rounded"></span>
              Status
            </label>
            <div class="flex gap-6">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input v-model="editFormData.status" type="radio" value="active" class="w-4 h-4 accent-cyan-500" />
                <span class="text-sm font-medium">Active</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input v-model="editFormData.status" type="radio" value="inactive" class="w-4 h-4 accent-slate-600" />
                <span class="text-sm font-medium">Inactive</span>
              </label>
            </div>
          </div>

          <!-- Category Name -->
          <div class="space-y-3">
            <label class="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span class="w-1 h-4 bg-blue-500 rounded"></span>
              Category Name
            </label>
            <input
                v-model="editFormData.name"
                type="text"
                class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white placeholder-slate-500"
                placeholder="Enter category name"
            />
          </div>

          <!-- Parent Category -->
          <div class="space-y-3">
            <label class="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span class="w-1 h-4 bg-blue-500 rounded"></span>
              Parent Category
            </label>
            <select v-model="editFormData.parent" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white">
              <option value="">Select Parent</option>
              <option value="apparel">Apparel</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <!-- Secondary Parent -->
          <div class="space-y-3">
            <label class="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span class="w-1 h-4 bg-pink-500 rounded"></span>
              Secondary Parent
            </label>
            <select v-model="editFormData.secondary" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white">
              <option value="">Select Secondary Parent</option>
              <option value="mens">Men's</option>
              <option value="womens">Women's</option>
            </select>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <label class="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span class="w-1 h-4 bg-purple-500 rounded"></span>
              Description
            </label>
            <textarea
                v-model="editFormData.description"
                rows="5"
                class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white placeholder-slate-500 resize-none"
                placeholder="Enter category description..."
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div class="space-y-3">
            <label class="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span class="w-1 h-4 bg-cyan-500 rounded"></span>
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

        <!-- Modal Footer -->
        <div class="sticky bottom-0 bg-slate-950/80 backdrop-blur-lg border-t border-slate-800 px-8 py-6 flex gap-4">
          <button
              @click="deleteCategory"
              class="flex-1 py-3 px-6 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-red-900/30 hover:border-red-700/50 transition-all font-semibold text-sm text-red-400"
          >
            Delete
          </button>
          <button
              @click="closeEditModal"
              class="flex-1 py-3 px-6 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition-all font-semibold text-sm"
          >
            Cancel
          </button>
          <button
              @click="updateCategory"
              class="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all font-semibold text-sm transform hover:scale-105 active:scale-95"
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

const selectedCategory = ref(0)
const showEditModal = ref(false)
const draggedIndex = ref(null)
const dragOverIndex = ref(null)
const expandedCategories = ref({})

const categories = ref([
  { name: 'TOP', subcategories: ['T-Shirt', 'Shirt', 'Tank Top', 'Sweater'] },
  { name: 'DRESS', subcategories: ['Casual Dress', 'Formal Dress', 'Maxi Dress'] },
  { name: 'BOTTOM', subcategories: ['Jeans', 'Pants', 'Shorts', 'Skirt'] }
])

const editFormData = ref({
  status: 'active',
  name: '',
  parent: '',
  secondary: '',
  description: ''
})

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
