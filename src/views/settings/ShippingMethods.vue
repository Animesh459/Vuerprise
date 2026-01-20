<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Shipping Methods</h1>
      <button
        v-if="hasPermission('shipping-methods.create')"
        @click="openCreateModal"
        class="btn-primary-new"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Create Shipping Method
      </button>
    </div>

    <!-- Shipping Methods Table -->
    <DataTable
      :columns="columns"
      :items="shippingMethods"
      :loading="loading"
      :pagination="pagination"
      searchable
      v-model:searchQuery="searchQuery"
      searchPlaceholder="Search shipping methods..."
      itemName="shipping methods"
      loadingText="Loading shipping methods..."
      emptyText="No shipping methods found"
      @page-change="goToPage"
    >
      <!-- Status Column -->
      <template #cell-status="{ item }">
        <span
          :class="item.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
          class="px-2 py-1 text-xs font-medium rounded-full"
        >
          {{ item.status === 1 ? 'Active' : 'Inactive' }}
        </span>
      </template>

      <!-- Actions Column -->
      <template #cell-actions="{ item }">
        <button
          v-if="hasPermission('shipping-methods.update')"
          @click="toggleStatus(item)"
          :class="item.status === 1 ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
          class="mr-4"
        >
          {{ item.status === 1 ? 'Deactivate' : 'Activate' }}
        </button>
        <button
          v-if="hasPermission('shipping-methods.update')"
          @click="openEditModal(item)"
          class="text-gray-600 hover:text-gray-900 mr-4"
        >
          Edit
        </button>
        <button
          v-if="hasPermission('shipping-methods.delete')"
          @click="confirmDelete(item)"
          class="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </template>
    </DataTable>

    <!-- Shipping Method Modal -->
    <BaseModal
      :show="showModal"
      @close="closeModal"
      size="lg"
    >
      <template #header>
        <h3 class="text-xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Shipping Method' : 'Create Shipping Method' }}
        </h3>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6 p-6">
        <BaseInput
          v-model="form.name"
          label="Shipping Method Name"
          placeholder="e.g., Standard Shipping"
          required
          :error="errors.name?.[0]"
        />

        <BaseTextArea
          v-model="form.description"
          label="Description"
          placeholder="Enter description"
          rows="3"
          :error="errors.description?.[0]"
        />
      </form>

      <template #footer>
        <button
          @click="handleSubmit"
          :disabled="submitting"
          class="btn-primary-new"
        >
          {{ submitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update' : 'Create') }}
        </button>
        <button
          type="button"
          @click="closeModal"
          class="btn-secondary-new"
        >
          Cancel
        </button>
      </template>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="deleteShippingMethod"
      title="Delete Shipping Method"
      message="Are you sure you want to delete this shipping method? This action cannot be undone."
      confirmText="Delete"
      variant="danger"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { settingsCrudService } from '@/services/settingsCrudService'
import { useToast } from '@/composables/useToast'
import { useAuth } from '@/composables/useAuth'
import DataTable from '@/components/DataTable.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseTextArea from '@/components/form/BaseTextArea.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const toast = useToast()
const { hasPermission } = useAuth()

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Actions', class: 'text-right' }
]

const shippingMethods = ref([])
const loading = ref(false)
const searchQuery = ref('')
const pagination = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 10,
  total: 0
})

const showModal = ref(false)
const isEditing = ref(false)
const editingItem = ref(null)
const submitting = ref(false)
const errors = ref({})

const form = ref({
  name: '',
  description: ''
})

const showDeleteModal = ref(false)
const deletingItem = ref(null)

const fetchShippingMethods = async (page = 1) => {
  loading.value = true
  try {
    const data = await settingsCrudService.getShippingMethods({
      page,
      search: searchQuery.value
    })
    shippingMethods.value = data.data
    pagination.value = {
      currentPage: data.current_page,
      lastPage: data.last_page,
      perPage: data.per_page,
      total: data.total
    }
  } catch (error) {
    toast.error('Failed to fetch shipping methods')
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  fetchShippingMethods(page)
}

const openCreateModal = () => {
  isEditing.value = false
  editingItem.value = null
  form.value = {
    name: '',
    description: ''
  }
  errors.value = {}
  showModal.value = true
}

const openEditModal = (item) => {
  isEditing.value = true
  editingItem.value = item
  form.value = {
    name: item.name,
    description: item.description || ''
  }
  errors.value = {}
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  editingItem.value = null
  form.value = {
    name: '',
    description: ''
  }
  errors.value = {}
}

const handleSubmit = async () => {
  submitting.value = true
  errors.value = {}

  try {
    if (isEditing.value) {
      await settingsCrudService.updateShippingMethod(editingItem.value.id, form.value)
      toast.success('Shipping method updated successfully')
    } else {
      await settingsCrudService.createShippingMethod(form.value)
      toast.success('Shipping method created successfully')
    }
    closeModal()
    fetchShippingMethods(pagination.value.currentPage)
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error(isEditing.value ? 'Failed to update shipping method' : 'Failed to create shipping method')
    }
  } finally {
    submitting.value = false
  }
}

const toggleStatus = async (item) => {
  try {
    await settingsCrudService.updateShippingMethodStatus(item.id)
    toast.success('Status updated successfully')
    fetchShippingMethods(pagination.value.currentPage)
  } catch (error) {
    toast.error('Failed to update status')
  }
}

const confirmDelete = (item) => {
  deletingItem.value = item
  showDeleteModal.value = true
}

const deleteShippingMethod = async () => {
  try {
    await settingsCrudService.deleteShippingMethod(deletingItem.value.id)
    toast.success('Shipping method deleted successfully')
    showDeleteModal.value = false
    deletingItem.value = null
    fetchShippingMethods(pagination.value.currentPage)
  } catch (error) {
    toast.error('Failed to delete shipping method')
  }
}

onMounted(() => {
  fetchShippingMethods()
})
</script>
