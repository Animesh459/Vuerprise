<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between pb-6">
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
          <FolderTreeIcon :size="24" class="text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Category Manager</h1>
          <p class="text-sm text-gray-500 mt-0.5">Organize your product categories with drag and drop</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-medium">
          <LayoutGridIcon :size="12" />
          {{ categories.length }} Categories
        </span>
      </div>
    </div>

    <div class="common-card-new">
      <div class="">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left Panel - Categories List with Collapsible -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <div class="flex items-center gap-3 mb-6">
                <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900">Categories</h2>
              </div>

              <p class="text-xs text-gray-500 mb-6 flex items-center gap-2">
                <span class="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Drag to sort. Click to edit.
              </p>

              <!-- Category list -->
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
                    'group relative cursor-move transition-all duration-300 rounded-xl overflow-hidden',
                    draggedIndex === index ? 'opacity-50 scale-95' : '',
                    dragOverIndex === index && draggedIndex !== index ? 'border-blue-300 bg-blue-50' : ''
                  ]"
                >
                  <div
                    @click="toggleCategory(index)"
                    :class="[
                      'p-2 rounded-xl transition-all duration-300 cursor-pointer',
                      selectedCategory === index
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3 flex-1">
                        <button
                          @click.stop="expandedCategories[index] = !expandedCategories[index]"
                          class="transition-transform duration-300"
                          :style="{ transform: expandedCategories[index] ? 'rotate(90deg)' : 'rotate(0deg)' }"
                        >
                          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                        <div>
                          <div class="font-semibold text-sm text-gray-900">{{ category.name }}</div>
                          <div class="text-xs text-gray-500 mt-0.5">{{ category.subcategories.length }} items</div>
                        </div>
                      </div>
                      <div class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          @click.stop="openEditModal(index)"
                          class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Subcategories dropdown -->
                  <transition
                    enter-active-class="transition-all duration-300"
                    leave-active-class="transition-all duration-300"
                    enter-from-class="opacity-0 -translate-y-2"
                    leave-to-class="opacity-0 -translate-y-2"
                  >
                    <div v-if="expandedCategories[index]" class="bg-gray-50 border-t border-gray-200 overflow-hidden">
                      <div class="p-3 space-y-2">
                        <div
                          v-for="(sub, subIndex) in category.subcategories"
                          :key="`${index}-${subIndex}`"
                          class="p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer transition-all text-sm text-gray-700 flex items-center justify-between group"
                        >
                          <span>{{ sub }}</span>
                          <span class="text-xs text-gray-400 group-hover:text-blue-500">→</span>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Panel - Category Details -->
          <div class="lg:col-span-2">
            <div class="bg-white border border-gray-200 rounded-xl p-8">
              <div class="flex items-center gap-3 mb-8" v-if="selectedCategory !== null">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">{{ categories[selectedCategory].name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">Selected category details</p>
                </div>
              </div>

              <div v-if="selectedCategory !== null" class="space-y-6">
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <p class="text-sm font-medium text-gray-600 mb-3">Subcategories</p>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="(sub, idx) in categories[selectedCategory].subcategories"
                      :key="idx"
                      class="btn-secondary-new"
                    >
                      {{ sub }}
                    </button>
                  </div>
                </div>

                <button
                  @click="openEditModal(selectedCategory)"
                  class="btn-primary-new"
                >
                  Edit Category
                </button>
              </div>

              <div v-else class="flex items-center justify-center h-64">
                <div class="text-center">
                  <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </div>
                  <p class="text-gray-500">Select a category to view details</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-60 flex items-center justify-center p-4">
        <div class="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 p-5 flex items-center justify-between z-10">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">Edit Category</h3>
            </div>
            <button
              @click="closeEditModal"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-6">
            <!-- Status -->
            <div class="space-y-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
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

            <div class="space-y-2">
              <BaseInput label="Category Name" placeholder="Category Name" />
            </div>

            <div class="space-y-2">
              <BaseSelect
                label="Parent Category"
                :options="['Select Parent', 'Apparel', 'Accessories']"
              />
            </div>

            <div class="space-y-2">
              <BaseSelect
                label="Secondary Parent"
                :options="['Men', 'Women']"
              />
            </div>

            <div class="space-y-2">
              <BaseTextArea label="Description" customClass=" !h-[85px]" placeholder="Enter category description..." />
            </div>

            <!-- Image Upload -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Category Image
              </label>
              <div class="relative">
                <input type="file" class="hidden" id="imageUpload" />
                <label
                  for="imageUpload"
                  class="flex items-center gap-3 px-4 py-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
                >
                  <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 group-hover:border-blue-200 transition-colors">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-700">Click to upload or drag and drop</span>
                    <p class="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-6 py-4 flex items-end justify-end gap-3">
            <button
              @click="closeEditModal"
              class="btn-secondary-new"
            >
              Cancel
            </button>
            <button
              @click="updateCategory"
              class="btn-primary-new"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FolderTreeIcon, LayoutGridIcon } from 'lucide-vue-next'
import BaseInput from "@/components/form/BaseInput.vue";
import BaseSelect from "@/components/form/BaseSelect.vue";
import BaseTextArea from "@/components/form/BaseTextArea.vue";
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

const orderData = ref({
  speed: 'standard',
});

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

const toggleCategory = (index) => {
  selectedCategory.value = index
}
</script>

<style scoped>
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
