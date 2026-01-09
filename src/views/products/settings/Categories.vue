<template>
  <div>
    <div class="flex flex-col  border-b border-b-border pb-4 mb-4 ">
      <h1 class="text-3xl font-bold tracking-tighter text-gray-900">Category Manager</h1>
      <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Organize your product categories with drag and drop</p>
    </div>
    <div class="common-card-new">
      <div class="">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left Panel - Categories List with Collapsible -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-900">Categories</h2>
                <button @click="openCreateModal" class="btn-primary-new !px-3 !py-2 !text-xs">+ Add New</button>
              </div>

              <p class="text-xs text-gray-500 mb-6 flex items-center gap-2">
                <span class="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Drag to sort. Click to edit.
              </p>

              <div v-if="loadingList" class="flex justify-center py-12">
                <span class="inline-block w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></span>
              </div>

              <div v-else class="space-y-2">
                <div
                    v-for="(category, index) in categories"
                    :key="category.id"
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
                            v-if="category.sub_categories && category.sub_categories.length > 0"
                            @click.stop="expandedCategories[category.id] = !expandedCategories[category.id]"
                            class="transition-transform duration-300"
                            :style="{ transform: expandedCategories[category.id] ? 'rotate(90deg)' : 'rotate(0deg)' }"
                        >
                          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                        <div class="w-4" v-else></div>
                        <div>
                          <div class="font-semibold text-sm text-gray-900">{{ category.name }}</div>
                          <div class="text-xs text-gray-500 mt-0.5">{{ category.sub_categories?.length || 0 }} items</div>
                        </div>
                      </div>
                      <div class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                            @click.stop="openEditModal(category)"
                            class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button
                            @click.stop="confirmDelete(category)"
                            class="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
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
                    <div v-if="expandedCategories[category.id] && category.sub_categories && category.sub_categories.length > 0" class="bg-gray-50 border-t border-gray-200 overflow-hidden">
                      <div class="p-3 space-y-2">
                        <div
                            v-for="sub in category.sub_categories"
                            :key="sub.id"
                            class="p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all text-sm text-gray-700 flex items-center justify-between group"
                        >
                          <span>{{ sub.name }}</span>
                          <span class="text-xs text-gray-400 group-hover:text-gray-600">→</span>
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
            <div class="bg-white border border-gray-200 rounded-2xl p-8">
              <div class="flex items-center gap-3 mb-8" v-if="selectedCategory !== null">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">{{ categories[selectedCategory].name }}</h3>
                  <p class="text-sm text-gray-600 mt-1">Selected category details</p>
                </div>
              </div>

              <div v-if="selectedCategory !== null" class="space-y-6">
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <p class="text-sm font-semibold text-gray-700 mb-4">Category Information</p>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500">Status:</span>
                      <span :class="categories[selectedCategory].status === 1 ? 'text-green-600 font-semibold ml-2' : 'text-red-600 font-semibold ml-2'">
                        {{ categories[selectedCategory].status === 1 ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <div>
                      <span class="text-gray-500">Subcategories:</span>
                      <span class="text-gray-900 font-semibold ml-2">{{ categories[selectedCategory].sub_categories?.length || 0 }}</span>
                    </div>
                  </div>
                  <div v-if="categories[selectedCategory].description" class="mt-4 pt-4 border-t border-gray-200">
                    <p class="text-xs text-gray-500 mb-2">Description</p>
                    <p class="text-sm text-gray-700">{{ categories[selectedCategory].description }}</p>
                  </div>
                </div>

                <div v-if="categories[selectedCategory].sub_categories && categories[selectedCategory].sub_categories.length > 0" class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <p class="text-sm text-gray-600 mb-2">Subcategories</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                        v-for="sub in categories[selectedCategory].sub_categories"
                        :key="sub.id"
                        class="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700"
                    >
                      {{ sub.name }}
                    </span>
                  </div>
                </div>

                <button
                    @click="openEditModal(categories[selectedCategory])"
                    class="btn-primary-new"
                >
                  Edit Category
                </button>
              </div>

              <div v-else class="flex items-center justify-center h-64">
                <div class="text-center">
                  <div class="text-5xl mb-4">👈</div>
                  <p class="text-gray-500">Select a category to view details</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Edit/Create Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-60 flex items-center justify-center p-4">
        <div class="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 p-5 flex items-center justify-between z-10">
            <div class="flex items-center gap-3">
              <h3 class="text-2xl font-bold text-gray-900">{{ editingId ? 'Edit Category' : 'Create New Category' }}</h3>
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

          <div class="p-5 space-y-6">
            <!-- Status -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div class="flex items-center gap-4 p-1.5 rounded-full border border-zinc-200 w-fit">
                <button
                    @click="form.status = true"
                    :class="[
                      'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                      form.status === true ? 'bg-blue-500 text-white' : 'text-slate-500 hover:text-slate-700'
                    ]"
                >
                  <div class="w-2 h-2 rounded-full" :class="form.status === true ? 'bg-white' : 'bg-slate-600'"></div>
                  ACTIVE
                </button>
                <button
                    @click="form.status = false"
                    :class="[
                      'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                      form.status === false ? 'bg-rose-500 text-white' : 'text-slate-500 hover:text-slate-700'
                    ]"
                >
                  <div class="w-2 h-2 rounded-full" :class="form.status === false ? 'bg-white' : 'bg-slate-600'"></div>
                  INACTIVE
                </button>
              </div>
            </div>

            <!-- Category Name -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Category Name <span class="text-red-500">*</span>
              </label>
              <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter category name"
                  class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none rounded"
              />
              <ErrorMessage :error="errors.name" />
            </div>

            <!-- Parent Category -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Parent Category
              </label>
              <div class="relative">
                <select
                    v-model="form.parent"
                    class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-10 text-sm transition-colors text-black focus:border-black focus:outline-none rounded appearance-none"
                >
                  <option value="">Select Parent Category</option>
                  <option
                      v-for="cat in parentCategories"
                      :key="cat.id"
                      :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage :error="errors.parent" />
            </div>

            <!-- Secondary Parent -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Secondary Parent
              </label>
              <div class="relative">
                <select
                    v-model="form.second_parent_id"
                    class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-10 text-sm transition-colors text-black focus:border-black focus:outline-none rounded appearance-none"
                >
                  <option value="">Select Secondary Parent</option>
                  <option
                      v-for="cat in parentCategories"
                      :key="cat.id"
                      :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage :error="errors.second_parent_id" />
            </div>

            <!-- Description -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                  v-model="form.description"
                  placeholder="Enter category description..."
                  rows="3"
                  class="w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 pt-2 pb-2 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none rounded"
              ></textarea>
              <ErrorMessage :error="errors.description" />
            </div>

            <!-- Image Upload -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Category Image
              </label>
              <input
                  type="file"
                  @change="handleImageChange"
                  accept="image/*"
                  ref="fileInput"
                  class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none"
              />
              <ErrorMessage :error="errors.image" />

              <!-- Image Preview -->
              <div v-if="imagePreview" class="mt-3 relative inline-block">
                <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                <button
                    @click="removeImage"
                    type="button"
                    class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-8 py-6 flex items-end justify-end gap-4">
            <button
                @click="closeEditModal"
                class="btn-secondary-new"
            >
              Cancel
            </button>
            <button
                @click="saveCategory"
                :disabled="loading"
                class="btn-primary-new"
            >
              <span v-if="!loading">{{ editingId ? 'Update' : 'Create' }}</span>
              <span v-else>Saving...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <ConfirmModal
          :show="showDeleteModal"
          title="Delete Category"
          message="Are you sure you want to delete this category? This action cannot be undone."
          :confirmText="'Delete'"
          :cancelText="'Cancel'"
          @confirm="deleteCategory"
          @cancel="showDeleteModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ChevronDown } from "lucide-vue-next"
import ErrorMessage from "@/components/ErrorMessage.vue"
import ConfirmModal from "@/components/ConfirmModal.vue"
import { categoryService } from '@/services'
import { useToast } from '@/composables/useToast'

const toast = useToast()

const selectedCategory = ref(null)
const showEditModal = ref(false)
const draggedIndex = ref(null)
const dragOverIndex = ref(null)
const expandedCategories = ref({})
const loadingList = ref(false)
const loading = ref(false)
const editingId = ref(null)
const showDeleteModal = ref(false)
const deletingItem = ref(null)
const fileInput = ref(null)
const imagePreview = ref(null)
const existingImageUrl = ref('')

const categories = ref([])
const errors = ref({})

const form = ref({
  status: true,
  name: '',
  parent: '',
  second_parent_id: '',
  description: '',
  image: null
})

const parentCategories = computed(() => {
  return categories.value.filter(cat => !cat.parent || cat.parent === null)
})

onMounted(() => {
  fetchCategories()
})

const fetchCategories = async () => {
  loadingList.value = true
  try {
    const response = await categoryService.getAll()
    categories.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    toast.error('Failed to fetch categories')
  } finally {
    loadingList.value = false
  }
}

const dragStart = (e, index) => {
  draggedIndex.value = index
  e.dataTransfer.effectAllowed = 'move'
}

const dragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}

const dragDrop = async (e, index) => {
  e.preventDefault()
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    const draggedItem = categories.value[draggedIndex.value]
    const newOrder = categories.value.map((cat, idx) => {
      if (idx === draggedIndex.value) return null
      return cat
    }).filter(Boolean)
    
    newOrder.splice(index, 0, draggedItem)
    categories.value = newOrder
    selectedCategory.value = index
    
    // Update sort order in backend
    try {
      const sortData = newOrder.map((cat, idx) => ({
        id: cat.id,
        sort: idx + 1
      }))
      await categoryService.updateSort({ categories: sortData })
      toast.success('Category order updated')
    } catch (error) {
      console.error('Failed to update sort order:', error)
      await fetchCategories()
    }
  }
  dragOverIndex.value = null
}

const dragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}

const openCreateModal = () => {
  editingId.value = null
  form.value = {
    status: true,
    name: '',
    parent: '',
    second_parent_id: '',
    description: '',
    image: null
  }
  imagePreview.value = null
  existingImageUrl.value = ''
  errors.value = {}
  showEditModal.value = true
}

const openEditModal = (category) => {
  editingId.value = category.id
  form.value = {
    status: category.status === 1,
    name: category.name || '',
    parent: category.parent || '',
    second_parent_id: category.second_parent_id || '',
    description: category.description || '',
    image: null
  }
  
  if (category.image) {
    existingImageUrl.value = category.image
    imagePreview.value = category.image
  } else {
    existingImageUrl.value = ''
    imagePreview.value = null
  }
  
  errors.value = {}
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingId.value = null
  errors.value = {}
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  form.value.image = null
  existingImageUrl.value = ''
  imagePreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const saveCategory = async () => {
  loading.value = true
  errors.value = {}

  try {
    const formData = new FormData()
    formData.append('status', form.value.status ? '1' : '0')
    formData.append('name', form.value.name)
    
    if (form.value.parent) {
      formData.append('parent', form.value.parent)
    }
    
    if (form.value.second_parent_id) {
      formData.append('second_parent_id', form.value.second_parent_id)
    }
    
    if (form.value.description) {
      formData.append('description', form.value.description)
    }
    
    // Handle image field
    if (form.value.image instanceof File) {
      formData.append('image', form.value.image)
    } else if (editingId.value && existingImageUrl.value) {
      formData.append('image', existingImageUrl.value)
    }

    if (editingId.value) {
      // For update, we need to use POST with _method override for multipart/form-data
      formData.append('_method', 'PUT')
      await categoryService.update(editingId.value, formData)
      toast.success('Category updated successfully!')
    } else {
      await categoryService.create(formData)
      toast.success('Category created successfully!')
    }
    
    await fetchCategories()
    closeEditModal()
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error('Failed to save category')
    }
  } finally {
    loading.value = false
  }
}

const confirmDelete = (category) => {
  deletingItem.value = category
  showDeleteModal.value = true
}

const deleteCategory = async () => {
  if (!deletingItem.value) return

  try {
    await categoryService.delete(deletingItem.value.id)
    toast.success('Category deleted successfully!')
    showDeleteModal.value = false
    deletingItem.value = null
    selectedCategory.value = null
    await fetchCategories()
  } catch (error) {
    toast.error('Failed to delete category')
    showDeleteModal.value = false
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
