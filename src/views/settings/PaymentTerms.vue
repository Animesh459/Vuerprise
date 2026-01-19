<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Payment Terms</h1>
      <button
        v-if="hasPermission('payment-terms.create')"
        @click="openCreateModal"
        class="btn-primary-new"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Create Payment Term
      </button>
    </div>

    <!-- Payment Terms Table -->
    <DataTable
      :columns="columns"
      :items="paymentTerms"
      :loading="loading"
      :pagination="pagination"
      searchable
      v-model:searchQuery="searchQuery"
      searchPlaceholder="Search payment terms..."
      itemName="payment terms"
      loadingText="Loading payment terms..."
      emptyText="No payment terms found"
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
          v-if="hasPermission('payment-terms.update')"
          @click="toggleStatus(item)"
          :class="item.status === 1 ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
          class="mr-4"
        >
          {{ item.status === 1 ? 'Deactivate' : 'Activate' }}
        </button>
        <button
          v-if="hasPermission('payment-terms.update')"
          @click="openEditModal(item)"
          class="text-gray-600 hover:text-gray-900 mr-4"
        >
          Edit
        </button>
        <button
          v-if="hasPermission('payment-terms.delete')"
          @click="confirmDelete(item)"
          class="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </template>
    </DataTable>

    <!-- Payment Term Modal -->
    <BaseModal
      :show="showModal"
      @close="closeModal"
      size="lg"
    >
      <template #header>
        <h3 class="text-xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Payment Term' : 'Create Payment Term' }}
        </h3>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6 p-6">
        <BaseInput
          v-model="form.name"
          label="Payment Term Name"
          placeholder="e.g., Net 30"
          required
          :error="errors.name?.[0]"
        />

        <BaseInput
          v-model.number="form.days"
          type="number"
          label="Days"
          placeholder="e.g., 30"
          required
          min="0"
          :error="errors.days?.[0]"
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
      @confirm="deletePaymentTerm"
      title="Delete Payment Term"
      message="Are you sure you want to delete this payment term? This action cannot be undone."
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
  { key: 'days', label: 'Days', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Actions', class: 'text-right' }
]

const paymentTerms = ref([])
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
  days: '',
  description: ''
})

const showDeleteModal = ref(false)
const deletingItem = ref(null)

const fetchPaymentTerms = async (page = 1) => {
  loading.value = true
  try {
    const data = await settingsCrudService.getPaymentTerms({
      page,
      search: searchQuery.value
    })
    paymentTerms.value = data.data
    pagination.value = {
      currentPage: data.current_page,
      lastPage: data.last_page,
      perPage: data.per_page,
      total: data.total
    }
  } catch (error) {
    toast.error('Failed to fetch payment terms')
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  fetchPaymentTerms(page)
}

const openCreateModal = () => {
  isEditing.value = false
  editingItem.value = null
  form.value = {
    name: '',
    days: '',
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
    days: item.days,
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
    days: '',
    description: ''
  }
  errors.value = {}
}

const handleSubmit = async () => {
  submitting.value = true
  errors.value = {}

  try {
    if (isEditing.value) {
      await settingsCrudService.updatePaymentTerm(editingItem.value.id, form.value)
      toast.success('Payment term updated successfully')
    } else {
      await settingsCrudService.createPaymentTerm(form.value)
      toast.success('Payment term created successfully')
    }
    closeModal()
    fetchPaymentTerms(pagination.value.currentPage)
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error(isEditing.value ? 'Failed to update payment term' : 'Failed to create payment term')
    }
  } finally {
    submitting.value = false
  }
}

const toggleStatus = async (item) => {
  try {
    await settingsCrudService.updatePaymentTermStatus(item.id)
    toast.success('Status updated successfully')
    fetchPaymentTerms(pagination.value.currentPage)
  } catch (error) {
    toast.error('Failed to update status')
  }
}

const confirmDelete = (item) => {
  deletingItem.value = item
  showDeleteModal.value = true
}

const deletePaymentTerm = async () => {
  try {
    await settingsCrudService.deletePaymentTerm(deletingItem.value.id)
    toast.success('Payment term deleted successfully')
    showDeleteModal.value = false
    deletingItem.value = null
    fetchPaymentTerms(pagination.value.currentPage)
  } catch (error) {
    toast.error('Failed to delete payment term')
  }
}

onMounted(() => {
  fetchPaymentTerms()
})
</script>
