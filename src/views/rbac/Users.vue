<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <button
        @click="openCreateModal"
        class="px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Create User
      </button>
    </div>

    <!-- Users Table -->
    <DataTable
      :columns="columns"
      :items="users"
      :loading="loading"
      :pagination="pagination"
      searchable
      v-model:searchQuery="searchQuery"
      searchPlaceholder="Search users..."
      itemName="users"
      loadingText="Loading users..."
      emptyText="No users found"
      @page-change="goToPage"
    >
      <!-- User Column with Avatar -->
      <template #cell-user="{ item }">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <img v-if="item.profile_image" class="h-10 w-10 rounded-full object-cover" :src="item.profile_image" :alt="item.name" />
            <div v-else class="h-10 w-10 rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-white font-semibold">
              {{ item.name.charAt(0).toUpperCase() }}
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
          </div>
        </div>
      </template>

      <!-- Email Column -->
      <template #cell-email="{ item }">
        <div class="text-sm text-gray-600">{{ item.email }}</div>
      </template>

      <!-- Role Column -->
      <template #cell-role="{ item }">
        <span v-if="item.roles && item.roles.length > 0" class="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
          {{ item.roles[0].name }}
        </span>
        <span v-else class="text-sm text-gray-400">No role</span>
      </template>

      <!-- Status Column -->
      <template #cell-status="{ item }">
        <span
          :class="[
            item.status === 1
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800',
            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
          ]"
        >
          {{ item.status === 1 ? 'Active' : 'Inactive' }}
        </span>
      </template>

      <!-- Actions Column -->
      <template #cell-actions="{ item }">
        <button
          v-if="!item.roles?.some(role => role.name === 'Super Admin')"
          @click="toggleStatus(item)"
          :class="item.status === 1 ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
          class="mr-4"
        >
          {{ item.status === 1 ? 'Deactivate' : 'Activate' }}
        </button>
        <button
          @click="openEditModal(item)"
          class="text-gray-600 hover:text-gray-900 mr-4"
        >
          Edit
        </button>
        <button
          v-if="!item.roles?.some(role => role.name === 'Super Admin')"
          @click="confirmDelete(item)"
          class="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </template>
    </DataTable>

    <!-- User Modal -->
    <CustomModal
      :show="showModal"
      @close="closeModal"
      :title="isEditing ? 'Edit User' : 'Create User'"
      size="2xl"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              :class="{
                'border-red-300 bg-red-50': errors.name,
                'border-gray-200': !errors.name
              }"
              class="w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
              placeholder="Enter full name"
            />
            <ErrorMessage :error="errors.name" />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              :class="{
                'border-red-300 bg-red-50': errors.email,
                'border-gray-200': !errors.email
              }"
              class="w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
              placeholder="Enter email address"
            />
            <ErrorMessage :error="errors.email" />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password <span v-if="!isEditing" class="text-red-500">*</span>
              <span v-else class="text-gray-400 font-normal ml-1">(Leave blank to keep current)</span>
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              :class="{
                'border-red-300 bg-red-50': errors.password,
                'border-gray-200': !errors.password
              }"
              class="w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
              placeholder="Enter password"
            />
            <ErrorMessage :error="errors.password" />
          </div>

          <!-- Role -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
              Role <span class="text-red-500">*</span>
            </label>
            <select
              id="role"
              v-model="form.role_id"
              :disabled="isEditing && editingUser?.roles?.some(r => r.name === 'Super Admin')"
              :class="{
                'border-red-300 bg-red-50': errors.role_id,
                'border-gray-200': !errors.role_id,
                'bg-gray-100 cursor-not-allowed': isEditing && editingUser?.roles?.some(r => r.name === 'Super Admin')
              }"
              class="w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
            >
              <option :value="null">Select a role</option>
              <option v-for="role in allRoles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
            <ErrorMessage :error="errors.role_id" />
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div class="flex items-center gap-4 p-1.5 rounded-full border border-zinc-200 w-fit">
              <button
                  type="button"
                  @click="form.status = 1"
                  :class="[
                        'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                        form.status === 1 ? 'bg-blue-500 text-white ' : 'text-slate-500 hover:text-slate-300'
                      ]"
              >
                <div class="w-2 h-2 rounded-full" :class="form.status === 1 ? 'bg-white' : 'bg-slate-600'"></div>
                ACTIVE
              </button>
              <button
                  type="button"
                  @click="form.status = 0"
                  :class="[
                        'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                        form.status === 0 ? 'bg-rose-500 text-white ' : 'text-slate-500 hover:text-slate-300'
                      ]"
              >
                <div class="w-2 h-2 rounded-full" :class="form.status === 0 ? 'bg-white' : 'bg-slate-600'"></div>
                INACTIVE
              </button>
            </div>
          </div>

          <!-- Profile Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div class="flex items-start gap-4">
              <!-- Image Preview -->
              <div v-if="imagePreview || (isEditing && form.current_image)" class="relative">
                <img
                  :src="imagePreview || form.current_image"
                  alt="Profile preview"
                  class="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                />
                <button
                  type="button"
                  @click="removeImage"
                  class="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-sm"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Upload Button -->
              <div class="flex-1">
                <input
                  ref="imageInput"
                  type="file"
                  accept="image/*"
                  @change="handleImageChange"
                  class="hidden"
                />
                <button
                  type="button"
                  @click="$refs.imageInput.click()"
                  class="w-full px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-sm">{{ imagePreview || form.current_image ? 'Change' : 'Upload' }}</span>
                </button>
                <p class="mt-2 text-xs text-center text-gray-500">Max 2MB</p>
              </div>
            </div>
            <ErrorMessage :error="errors.profile_image" />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
          >
            <span v-if="!submitting">{{ isEditing ? 'Update User' : 'Create User' }}</span>
            <span v-else class="flex items-center gap-2">
              <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
              {{ isEditing ? 'Updating...' : 'Creating...' }}
            </span>
          </button>
          <button
            type="button"
            @click="closeModal"
            class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </CustomModal>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="deleteUser"
      title="Delete User"
      message="Are you sure you want to delete this user? This action cannot be undone."
      confirmText="Delete"
      variant="danger"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { userService } from '@/services/userService'
import { roleService } from '@/services/roleService'
import { useToast } from '@/composables/useToast'
import DataTable from '@/components/DataTable.vue'
import CustomModal from '@/components/CustomModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const toast = useToast()

const columns = [
  { key: 'user', label: 'User' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', headerClass: 'text-right', cellClass: 'text-right text-sm font-medium' }
]

const loading = ref(false)
const users = ref([])
const allRoles = ref([])
const pagination = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0,
})
const searchQuery = ref('')

const showModal = ref(false)
const isEditing = ref(false)
const editingUser = ref(null)
const submitting = ref(false)
const errors = ref({})

// Image handling
const imageInput = ref(null)
const imagePreview = ref(null)
const imageFile = ref(null)

const form = ref({
  name: '',
  email: '',
  password: '',
  role_id: null,
  status: 1,
  current_image: null,
  remove_image: false,
})

const showDeleteModal = ref(false)
const deletingUser = ref(null)

// Fetch users
const fetchUsers = async (page = 1) => {
  loading.value = true
  try {
    const response = await userService.getUsers({
      page,
      per_page: pagination.value.per_page,
      search: searchQuery.value,
    })
    users.value = response.data
    
    // Handle pagination structure (response.meta for Resources)
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
    toast.error('Failed to fetch users')
  } finally {
    loading.value = false
  }
}

// Fetch all roles
const fetchAllRoles = async () => {
  try {
    allRoles.value = await roleService.getAllRoles()
  } catch (error) {
    toast.error('Failed to fetch roles')
  }
}

// Search debounce
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchUsers(1)
  }, 300)
}

// Watch search query
import { watch } from 'vue'
watch(searchQuery, () => {
  debouncedSearch()
})

// Pagination
const goToPage = (page) => {
  fetchUsers(page)
}

// Image handling functions
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    form.value.remove_image = false
  }
}

const removeImage = () => {
  imageFile.value = null
  imagePreview.value = null
  form.value.current_image = null
  form.value.remove_image = true
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

// Modal handlers
const openCreateModal = async () => {
  isEditing.value = false
  editingUser.value = null
  form.value = {
    name: '',
    email: '',
    password: '',
    role_id: null,
    status: 1,
    current_image: null,
    remove_image: false,
  }
  imagePreview.value = null
  imageFile.value = null
  errors.value = {}
  await fetchAllRoles()
  showModal.value = true
}

const openEditModal = async (user) => {
  isEditing.value = true
  editingUser.value = user
  form.value = {
    name: user.name,
    email: user.email,
    password: '',
    role_id: user.role_id || null,
    status: user.status,
    current_image: user.profile_image || null,
    remove_image: false,
  }
  imagePreview.value = null
  imageFile.value = null
  errors.value = {}
  await fetchAllRoles()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  form.value = {
    name: '',
    email: '',
    password: '',
    role_id: null,
    status: 1,
    current_image: null,
    remove_image: false,
  }
  imagePreview.value = null
  imageFile.value = null
  errors.value = {}
  editingUser.value = null
}

// Submit form
const handleSubmit = async () => {
  submitting.value = true
  errors.value = {}

  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    if (form.value.password) {
      formData.append('password', form.value.password)
    }
    if (form.value.role_id) {
      formData.append('role_id', form.value.role_id)
    }
    formData.append('status', form.value.status)
    
    // Add image handling
    if (imageFile.value) {
      formData.append('profile_image', imageFile.value)
    } else if (form.value.remove_image) {
      formData.append('remove_image', '1')
    }

    if (isEditing.value) {
      await userService.updateUser(editingUser.value.id, formData)
      toast.success('User updated successfully')
    } else {
      await userService.createUser(formData)
      toast.success('User created successfully')
    }
    closeModal()
    fetchUsers(pagination.value.current_page)
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error('Failed to save user')
    }
  } finally {
    submitting.value = false
  }
}

// Toggle status
const toggleStatus = async (user) => {
  try {
    await userService.updateUserStatus(user.id, { status: user.status === 1 ? 0 : 1 })
    toast.success(`User ${user.status === 1 ? 'deactivated' : 'activated'} successfully`)
    fetchUsers(pagination.value.current_page)
  } catch (error) {
    toast.error('Failed to update user status')
  }
}

// Delete user
const confirmDelete = (user) => {
  deletingUser.value = user
  showDeleteModal.value = true
}

const deleteUser = async () => {
  try {
    await userService.deleteUser(deletingUser.value.id)
    toast.success('User deleted successfully')
    showDeleteModal.value = false
    deletingUser.value = null
    fetchUsers(pagination.value.current_page)
  } catch (error) {
    toast.error('Failed to delete user')
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
