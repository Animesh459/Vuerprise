<template>
  <div>
    <div class="space-y-6">
      <div class="flex flex-col border-b border-b-border pb-4 mb-4">
        <h1 class="text-3xl font-bold tracking-tighter text-gray-900">Sizes</h1>
        <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Manage product sizes with dynamic values</p>
      </div>

      <!-- Add/Edit Form -->
      <div v-if="showForm" class="common-card-new">
        <div class="flex justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-900">
            {{ editingId ? 'Edit Size' : 'Add a New Size' }}
          </h2>
          <div class="flex items-center gap-4 p-1.5 rounded-full border border-zinc-200">
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

        <div class="space-y-6">
          <!-- Size Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Size Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter size name (e.g., S-M-L, XS-XXL)"
              class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none rounded"
            />
            <ErrorMessage :error="errors.name" />
          </div>

          <!-- Dynamic Size Values -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Size Values <span class="text-red-500">*</span>
            </label>
            <div class="space-y-3">
              <div v-for="(sizeValue, index) in form.sizeValues" :key="index" class="flex gap-2">
                <input
                  v-model="form.sizeValues[index]"
                  type="text"
                  :placeholder="`Size ${index + 1} (e.g., ${getSizePlaceholder(index)})`"
                  class="h-9 flex-1 border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-black focus:outline-none rounded"
                />
                <button
                  v-if="form.sizeValues.length > 1"
                  @click="removeSizeValue(index)"
                  class="px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  type="button"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <ErrorMessage :error="errors.s1" />
            </div>
            <button
              @click="addSizeValue"
              class="mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              type="button"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Size Value
            </button>
          </div>

          <!-- Default Toggle -->
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_default"
              v-model="form.is_default"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="is_default" class="text-sm font-medium text-gray-700">
              Set as default size
            </label>
          </div>

          <div class="flex justify-end gap-3">
            <button @click="cancelForm" class="btn-secondary-new">Cancel</button>
            <button @click="saveSize" :disabled="loading" class="btn-primary-new">
              <span v-if="!loading">{{ editingId ? 'Update' : 'Save' }}</span>
              <span v-else>Saving...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- List Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between gap-4">
          <div class="relative flex-1 w-full">
            <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input 
              v-model="searchQuery"
              @keyup.enter="fetchSizes"
              type="text"
              placeholder="Search sizes..."
              class="w-full pl-10 pr-4 py-2 h-9 border border-neutral-200 bg-neutral-50 rounded text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div class="flex gap-3">
            <button @click="fetchSizes" class="btn-primary-new whitespace-nowrap">Search</button>
            
            <div class="relative">
              <select 
                v-model="filterStatus"
                @change="fetchSizes"
                class="h-9 border border-neutral-200 bg-neutral-50 pl-4 pr-10 text-sm transition-colors text-black focus:border-black focus:outline-none rounded appearance-none"
              >
                <option value="">All Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button @click="resetFilters" class="px-4 py-2 whitespace-nowrap text-gray-700 hover:text-gray-900 font-semibold text-sm">Reset</button>
            <button @click="showForm = true" class="btn-primary-new whitespace-nowrap">+ Add New</button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loadingList" class="flex justify-center py-12">
          <span class="inline-block w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></span>
        </div>

        <!-- Empty State -->
        <div v-else-if="sizes.length === 0" class="text-center py-12 text-gray-500">
          No sizes found. <a @click="showForm = true" class="text-blue-600 hover:text-blue-800 cursor-pointer">Add one now</a>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto border border-border rounded-lg">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
            <tr class="border-b border-gray-200">
              <th class="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th class="px-6 py-3 text-left font-semibold text-gray-700">Size Values</th>
              <th class="px-6 py-3 text-left font-semibold text-gray-700">Pack Ratios</th>
              <th class="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th class="px-6 py-3 text-center font-semibold text-gray-700">Default</th>
              <th class="px-6 py-3 text-right font-semibold text-gray-700">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="item in sizes" :key="item.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <span class="text-sm font-semibold text-gray-900">{{ item.name }}</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-1 flex-wrap">
                  <span v-for="(sizeItem, idx) in item.size_items" :key="idx" class="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    {{ sizeItem.value }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-1 flex-wrap">
                  <span v-for="(pack, idx) in item.pack" :key="idx" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {{ formatPackRatio(pack.pack_items) }}
                  </span>
                  <span v-if="!item.pack || item.pack.length === 0" class="text-xs text-gray-400">No packs</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <button 
                  @click="toggleStatus(item)"
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-bold transition-all',
                    item.status === 1 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  ]"
                >
                  {{ item.status === 1 ? 'Active' : 'Inactive' }}
                </button>
              </td>
              <td class="px-6 py-4 text-center">
                <button
                  @click="setAsDefault(item)"
                  :disabled="item.is_default === 1"
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-bold transition-all',
                    item.is_default === 1
                      ? 'bg-blue-100 text-blue-700 cursor-default'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  {{ item.is_default === 1 ? 'Default' : 'Set Default' }}
                </button>
              </td>
              <td class="px-6 py-4">
                <div class="flex justify-end gap-2">
                  <button @click="editSize(item)" class="text-sm text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                  <span class="text-gray-400">|</span>
                  <button @click="confirmDelete(item)" class="text-sm text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <Pagination :pagination="pagination" @change-page="changePage" />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
    :show="showDeleteModal"
    title="Delete Size"
    message="Are you sure you want to delete this size? This will also delete all associated packs. This action cannot be undone."
    :confirmText="'Delete'"
    :cancelText="'Cancel'"
    @confirm="deleteSize"
    @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, ChevronDown } from "lucide-vue-next"
import ErrorMessage from "@/components/ErrorMessage.vue"
import ConfirmModal from "@/components/ConfirmModal.vue"
import Pagination from "@/components/Pagination.vue"
import { sizeService } from '@/services'
import { useToast } from '@/composables/useToast'

const toast = useToast()

const showForm = ref(false)
const editingId = ref(null)
const loading = ref(false)
const loadingList = ref(false)
const searchQuery = ref('')
const filterStatus = ref('')
const showDeleteModal = ref(false)
const deletingItem = ref(null)

const form = ref({
  name: '',
  status: true,
  is_default: false,
  sizeValues: [''], // Dynamic size values array
})

const errors = ref({})
const sizes = ref([])
const pagination = ref(null)

onMounted(() => {
  fetchSizes()
})

const getSizePlaceholder = (index) => {
  const placeholders = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32']
  return placeholders[index] || `Value ${index + 1}`
}

const addSizeValue = () => {
  form.value.sizeValues.push('')
}

const removeSizeValue = (index) => {
  if (form.value.sizeValues.length > 1) {
    form.value.sizeValues.splice(index, 1)
  }
}

const fetchSizes = async () => {
  loadingList.value = true
  try {
    const params = {}
    if (searchQuery.value) params.search = searchQuery.value
    if (filterStatus.value !== '') params.status = filterStatus.value
    
    const response = await sizeService.getAll(params)
    sizes.value = response.data.data || response.data
    pagination.value = response.data.meta || null
  } catch (error) {
    console.error('Failed to fetch sizes:', error)
    toast.error('Failed to fetch sizes')
  } finally {
    loadingList.value = false
  }
}

const changePage = (page) => {
  if (page < 1 || (pagination.value && page > pagination.value.last_page)) return
  fetchSizes()
}

const saveSize = async () => {
  loading.value = true
  errors.value = {}

  try {
    const data = {
      name: form.value.name,
      status: form.value.status,
      is_default: form.value.is_default,
    }

    // Add dynamic size values as s1, s2, s3, etc.
    form.value.sizeValues.forEach((value, index) => {
      if (value.trim()) {
        data[`s${index + 1}`] = value.trim()
      }
    })

    if (editingId.value) {
      await sizeService.update(editingId.value, data)
      toast.success('Size updated successfully!')
    } else {
      await sizeService.create(data)
      toast.success('Size created successfully!')
    }
    await fetchSizes()
    cancelForm()
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      const errorMsg = error.response?.data?.message || 'Failed to save size'
      toast.error(errorMsg)
    }
  } finally {
    loading.value = false
  }
}

const editSize = (item) => {
  editingId.value = item.id
  form.value.name = item.name || ''
  form.value.status = item.status === 1 || item.status === true
  form.value.is_default = item.is_default === 1 || item.is_default === true
  
  // Load size items
  if (item.size_items && item.size_items.length > 0) {
    form.value.sizeValues = item.size_items.map(si => si.value)
  } else {
    form.value.sizeValues = ['']
  }
  
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleStatus = async (item) => {
  try {
    await sizeService.updateStatus(item.id)
    toast.success('Status updated successfully!')
    await fetchSizes()
  } catch (error) {
    toast.error('Failed to update status')
  }
}

const setAsDefault = async (item) => {
  if (item.is_default === 1) return
  
  try {
    await sizeService.setDefault(item.id)
    toast.success('Default size updated!')
    await fetchSizes()
  } catch (error) {
    toast.error('Failed to set default')
  }
}

const confirmDelete = (item) => {
  deletingItem.value = item
  showDeleteModal.value = true
}

const deleteSize = async () => {
  if (!deletingItem.value) return

  try {
    await sizeService.delete(deletingItem.value.id)
    toast.success('Size deleted successfully!')
    showDeleteModal.value = false
    deletingItem.value = null
    await fetchSizes()
  } catch (error) {
    showDeleteModal.value = false
    const errorMessage = error.response?.data?.message || 'Failed to delete size'
    toast.error(errorMessage)
  }
}

const cancelForm = () => {
  showForm.value = false
  editingId.value = null
  form.value.name = ''
  form.value.status = true
  form.value.is_default = false
  form.value.sizeValues = ['']
  errors.value = {}
}

const resetFilters = () => {
  searchQuery.value = ''
  filterStatus.value = ''
  fetchSizes()
}

const formatPackRatio = (packItems) => {
  if (!packItems || packItems.length === 0) return ''
  return packItems.map(pi => pi.quantity).join('-')
}
</script>
