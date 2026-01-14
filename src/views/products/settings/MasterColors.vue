<template>
  <div>
    <div class="space-y-6">
      <div class="flex flex-col  border-b border-b-border pb-4 mb-4 ">
        <h1 class="text-3xl font-bold tracking-tighter text-gray-900">Master Colors</h1>
        <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Manage master colors</p>
      </div>

      <!-- Add/Edit Form -->
      <div v-if="showForm" class="common-card-new">
        <div class="flex justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-900">
            {{ editingId ? 'Edit Master Color' : 'Add a New Master Color' }}
          </h2>
          <button @click="cancelForm" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-3 gap-6 lg:grid-cols-3">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Master Color Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter master color name"
                  class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none rounded"
                />
                <ErrorMessage :error="errors.name" />
              </div>
            </div>

            <div class="space-y-6">
              <!-- Color Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Color Code</label>
                <div class="flex gap-3">
                  <input type="color" v-model="form.code" class="w-20 h-9 border border-neutral-200 rounded-lg cursor-pointer" />
                  <input
                    v-model="form.code"
                    type="text"
                    placeholder="#000000"
                    class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none rounded"
                  />
                </div>
                <ErrorMessage :error="errors.code" />
              </div>
            </div>

            <div class="space-y-6">
              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>

                <input 
                  type="file" 
                  @change="handleImageChange"
                  accept="image/*"
                  ref="fileInput"
                  class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none" 
                />
                <ErrorMessage :error="errors.image" />
                
                <!-- Image Preview - Below input -->
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
          </div>

          <div class="flex justify-end gap-3">
            <button @click="cancelForm" class="btn-secondary-new">Cancel</button>
            <button @click="saveMasterColor" :disabled="loading" class="btn-primary-new">
              <span v-if="!loading">{{ editingId ? 'Update' : 'Save' }}</span>
              <span v-else>Saving...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- List Section - Always Visible -->
      <div class="space-y-4">
        <div class="flex items-center justify-between gap-4">
          <div class="relative flex-1 w-full">
            <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input 
              v-model="queryParams.search"
              @keyup.enter="fetchMasterColors"
              type="text"
              placeholder="Search master colors..."
              class="w-full pl-10 pr-4 py-2 h-9 border border-neutral-200 bg-neutral-50 rounded text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div class="flex gap-3">
            <button @click="fetchMasterColors" class="btn-primary-new whitespace-nowrap">Search</button>
            
            <div class="relative">
              <select 
                v-model="sortOption"
                class="h-9 border border-neutral-200 bg-neutral-50 pl-4 pr-10 text-sm transition-colors text-black focus:border-black focus:outline-none rounded appearance-none"
              >
                <option value="name_asc">Name A-Z</option>
                <option value="name_desc">Name Z-A</option>
                <option value="updated">Recently Updated</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            <div class="relative">
              <select 
                v-model="queryParams.per_page"
                class="h-9 border border-neutral-200 bg-neutral-50 pl-4 pr-10 text-sm transition-colors text-black focus:border-black focus:outline-none rounded appearance-none"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button @click="resetFilters" class="px-4 py-2 whitespace-nowrap text-gray-700 hover:text-gray-700 font-semibold text-sm">Reset All</button>
            <button @click="showForm = true" class="btn-primary-new whitespace-nowrap">+ Add New</button>
          </div>
        </div>

        <!-- Master Colors Grid -->
        <div v-if="loadingList" class="flex justify-center py-12">
          <span class="inline-block w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></span>
        </div>

        <div v-else-if="masterColors.length === 0" class="text-center py-12 text-gray-500">
          No master colors found. <a @click="showForm = true" class="text-blue-600 hover:text-blue-800 cursor-pointer">Add one now</a>
        </div>

        <div v-else class="grid grid-cols-6 gap-4 md:grid-cols-8 sm:grid-cols-4">
          <div
              v-for="item in masterColors"
              :key="item.id"
              @click="selectedColorCard = item.id"
              :class="[
              'bg-white border rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-1',
              selectedColorCard === item.id ? 'border-border bg-white' : 'border-border'
            ]"
          >
            <div 
              class="w-full h-20 rounded-lg mb-3 shadow-lg"
              :style="{ backgroundColor: item.code || '#374151' }"
            ></div>
            <span class="block text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">{{ item.name }}</span>
            <div class="flex justify-center gap-2 mt-3 pt-3 border-t border-border">
              <button @click.stop="editMasterColor(item)" class="text-xs text-gray-400 hover:text-gray-700 font-semibold transition-colors">Edit</button>
              <span class="text-gray-600">|</span>
              <button @click.stop="confirmDelete(item)" class="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <Pagination :pagination="pagination" @change-page="changePage" />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
    :show="showDeleteModal"
    title="Delete Master Color"
    message="Are you sure you want to delete this master color? This action cannot be undone."
    :confirmText="'Delete'"
    :cancelText="'Cancel'"
    @confirm="deleteMasterColor"
    @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Search, ChevronDown } from "lucide-vue-next"
import ErrorMessage from "@/components/ErrorMessage.vue"
import ConfirmModal from "@/components/ConfirmModal.vue"
import Pagination from "@/components/Pagination.vue"
import { masterColorService } from '@/services'
import { useToast } from '@/composables/useToast'

const toast = useToast()

const showForm = ref(false)
const editingId = ref(null)
const loading = ref(false)
const loadingList = ref(false)
const selectedColorCard = ref(null)
const fileInput = ref(null)
const imagePreview = ref(null)
const sortOption = ref('updated')
const showDeleteModal = ref(false)
const deletingItem = ref(null)
const existingImageUrl = ref('') // Track existing image URL

const queryParams = ref({
  page: 1,
  search: '',
  search_columns: 'name,code',
  sort: 'updated_at',
  sort_order: 'desc',
  per_page: 50
})

const form = ref({
  name: '',
  code: '#000000',
  image: null,
})

const errors = ref({})
const masterColors = ref([])
const pagination = ref(null)

// Watch sort option
watch(sortOption, (newVal) => {
  if (newVal === 'name_asc') {
    queryParams.value.sort = 'name'
    queryParams.value.sort_order = 'asc'
  } else if (newVal === 'name_desc') {
    queryParams.value.sort = 'name'
    queryParams.value.sort_order = 'desc'
  } else if (newVal === 'updated') {
    queryParams.value.sort = 'updated_at'
    queryParams.value.sort_order = 'desc'
  }
  fetchMasterColors()
})

// Watch per_page
watch(() => queryParams.value.per_page, () => {
  queryParams.value.page = 1
  fetchMasterColors()
})

onMounted(() => {
  fetchMasterColors()
})

const fetchMasterColors = async () => {
  loadingList.value = true
  try {
    const response = await masterColorService.getAll(queryParams.value)
    masterColors.value = response.data.data || response.data
    pagination.value = response.data.meta || null
  } catch (error) {
    console.error('Failed to fetch master colors:', error)
    toast.error('Failed to fetch master colors')
  } finally {
    loadingList.value = false
  }
}

const changePage = (page) => {
  if (page < 1 || (pagination.value && page > pagination.value.last_page)) return
  queryParams.value.page = page
  fetchMasterColors()
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    
    // Create preview
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

const saveMasterColor = async () => {
  loading.value = true
  errors.value = {}

  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    
    if (form.value.code) {
      formData.append('code', form.value.code)
    }
    
    // Handle image field
    if (form.value.image instanceof File) {
      // New file selected - send the file
      formData.append('image', form.value.image)
    } else if (editingId.value) {
      // Updating without new file - send existing URL
      formData.append('image', existingImageUrl.value)
    }

    if (editingId.value) {
      await masterColorService.update(editingId.value, formData)
      toast.success('Master color updated successfully!')
    } else {
      await masterColorService.create(formData)
      toast.success('Master color created successfully!')
    }
    await fetchMasterColors()
    cancelForm()
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error('Failed to save master color')
    }
  } finally {
    loading.value = false
  }
}

const editMasterColor = (item) => {
  editingId.value = item.id
  form.value.name = item.name || ''
  form.value.code = item.code || '#000000'
  form.value.image = null
  
  // Store and show existing image
  if (item.image) {
    existingImageUrl.value = item.image
    imagePreview.value = item.image
  } else {
    existingImageUrl.value = ''
    imagePreview.value = null
  }
  
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const confirmDelete = (item) => {
  deletingItem.value = item
  showDeleteModal.value = true
}

const deleteMasterColor = async () => {
  if (!deletingItem.value) return

  try {
    await masterColorService.delete(deletingItem.value.id)
    toast.success('Master color deleted successfully!')
    showDeleteModal.value = false
    deletingItem.value = null
    await fetchMasterColors()
  } catch (error) {
    toast.error('Failed to delete master color')
    showDeleteModal.value = false
  }
}

const cancelForm = () => {
  showForm.value = false
  editingId.value = null
  form.value.name = ''
  form.value.code = '#000000'
  form.value.image = null
  imagePreview.value = null
  existingImageUrl.value = null
  errors.value = {}
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const resetFilters = () => {
  queryParams.value = {
    page: 1,
    search: '',
    search_columns: 'name,code',
    sort: 'updated_at',
    sort_order: 'desc',
    per_page: 50
  }
  sortOption.value = 'updated'
  fetchMasterColors()
}
</script>
