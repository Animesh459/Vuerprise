<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
      <button
        v-if="hasPermission('roles.create')"
        @click="createRole"
        class="btn-primary-new"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Create Role
      </button>
    </div>

    <!-- Roles Table -->
    <DataTable
      :columns="columns"
      :items="roles"
      :loading="loading"
      :pagination="pagination"
      searchable
      v-model:searchQuery="searchQuery"
      searchPlaceholder="Search roles..."
      itemName="roles"
      loadingText="Loading roles..."
      emptyText="No roles found"
      @page-change="goToPage"
    >
      <!-- Role Name Column -->
      <template #cell-name="{ item }">
        <div class="flex items-center">
          <span class="text-sm font-medium text-gray-900">{{ item.name }}</span>
          <span v-if="item.name === 'Super Admin'" class="ml-2 px-2 py-0.5 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">System</span>
        </div>
      </template>

      <!-- Permissions Count Column -->
      <template #cell-permissions="{ item }">
        <span class="text-sm text-gray-600">{{ item.permissions?.length || 0 }} permissions</span>
      </template>

      <!-- Created At Column -->
      <template #cell-created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>

      <!-- Actions Column -->
      <template #cell-actions="{ item }">
        <button
          v-if="hasPermission('roles.update')"
          @click="editRole(item)"
          class="text-gray-600 hover:text-gray-900 mr-4"
        >
          Edit
        </button>
        <button
          v-if="hasPermission('roles.delete') && item.name !== 'Super Admin'"
          @click="confirmDelete(item)"
          class="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </template>
    </DataTable>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="deleteRole"
      title="Delete Role"
      message="Are you sure you want to delete this role? This action cannot be undone."
      confirmText="Delete"
      variant="danger"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { roleService } from '@/services/roleService'
import { useToast } from '@/composables/useToast'
import { useAuth } from '@/composables/useAuth'
import DataTable from '@/components/DataTable.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const router = useRouter()
const toast = useToast()
const { hasPermission } = useAuth()

const columns = [
  { key: 'name', label: 'Role Name' },
  { key: 'permissions', label: 'Permissions' },
  { key: 'created_at', label: 'Created At' },
  { key: 'actions', label: 'Actions', headerClass: 'text-right', cellClass: 'text-right text-sm font-medium' }
]

const loading = ref(false)
const roles = ref([])
const pagination = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0,
})
const searchQuery = ref('')

const showDeleteModal = ref(false)
const deletingRole = ref(null)

// Fetch roles
const fetchRoles = async (page = 1) => {
  loading.value = true
  try {
    const response = await roleService.getRoles({
      page,
      per_page: pagination.value.per_page,
      search: searchQuery.value,
    })
    roles.value = response.data
    // Handle both direct and Resource-wrapped pagination
    const meta = response.meta || response
    pagination.value = {
      current_page: meta.current_page,
      per_page: meta.per_page,
      total: meta.total,
      from: meta.from,
      to: meta.to,
      last_page: meta.last_page,
    }
  } catch (error) {
    toast.error('Failed to fetch roles')
  } finally {
    loading.value = false
  }
}

// Search debounce
let searchTimeout
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchRoles(1)
  }, 300)
})

// Pagination
const goToPage = (page) => {
  fetchRoles(page)
}

// Navigate to create page
const createRole = () => {
  router.push('/roles/create')
}

// Navigate to edit page
const editRole = (role) => {
  router.push(`/roles/${role.id}/edit`)
}

// Delete role
const confirmDelete = (role) => {
  deletingRole.value = role
  showDeleteModal.value = true
}

const deleteRole = async () => {
  try {
    await roleService.deleteRole(deletingRole.value.id)
    toast.success('Role deleted successfully')
    showDeleteModal.value = false
    deletingRole.value = null
    fetchRoles(pagination.value.current_page)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete role')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(() => {
  fetchRoles()
})
</script>
