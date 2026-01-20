<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <button
          @click="goBack"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Role' : 'Create Role' }}
        </h1>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Role Name Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Role Information</h2>
        <BaseInput
          v-model="form.name"
          label="Role Name"
          placeholder="Enter role name (e.g., Manager, Sales)"
          required
          :disabled="editingRole?.name === 'Super Admin'"
          :error="errors.name?.[0]"
          custom-class="max-w-md"
        />
      </div>

      <!-- Permissions Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Permissions</h2>
          <div class="flex gap-2">
            <button
              type="button"
              @click="selectAllPermissions"
              class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Select All
            </button>
            <button
              type="button"
              @click="clearAllPermissions"
              class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        <div v-if="loadingPermissions" class="text-center py-12">
          <div class="inline-block w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"/>
          <p class="mt-4 text-gray-600">Loading permissions...</p>
        </div>

        <div v-else class="space-y-6">
          <!-- Module Level -->
          <div
            v-for="(moduleData, moduleName) in permissionStructure"
            :key="moduleName"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <!-- Module Header -->
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="isModuleSelected(moduleName)"
                    :indeterminate.prop="isModuleIndeterminate(moduleName)"
                    @change="toggleModule(moduleName, $event.target.checked)"
                    class="w-5 h-5 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                  />
                  <span class="ml-3 text-lg font-bold text-gray-900">{{ moduleName }}</span>
                  <span class="ml-3 text-sm text-gray-500">({{ getModulePermissionCount(moduleName) }} permissions)</span>
                </label>
                <button
                  type="button"
                  @click="toggleModuleExpand(moduleName)"
                  class="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <svg 
                    class="w-5 h-5 transition-transform"
                    :class="{ 'rotate-180': expandedModules.includes(moduleName) }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sub-modules -->
            <div v-show="expandedModules.includes(moduleName)" class="p-6">
              <div class="space-y-6">
                <div
                  v-for="(subModuleData, subModuleName) in moduleData"
                  :key="subModuleName"
                  class="pl-6 border-l-4 border-gray-200"
                >
                  <!-- Check if this is a direct array of permissions or nested sub-modules -->
                  <template v-if="Array.isArray(subModuleData)">
                    <!-- Direct permissions array -->
                    <label class="flex items-center cursor-pointer mb-3">
                      <input
                        type="checkbox"
                        :checked="isSubModuleSelected(subModuleData)"
                        :indeterminate.prop="isSubModuleIndeterminate(subModuleData)"
                        @change="toggleSubModule(subModuleData, $event.target.checked)"
                        class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                      />
                      <span class="ml-3 text-base font-semibold text-gray-800">{{ subModuleName }}</span>
                      <span class="ml-2 text-sm text-gray-500">({{ subModuleData.length }} permissions)</span>
                    </label>

                    <!-- Individual Permissions Grid -->
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ml-7">
                      <label
                        v-for="permission in subModuleData"
                        :key="permission"
                        class="flex items-center cursor-pointer py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          :value="permission"
                          v-model="form.permissions"
                          class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                        />
                        <span class="ml-2 text-sm text-gray-700">{{ formatPermissionName(permission) }}</span>
                      </label>
                    </div>
                  </template>

                  <!-- Nested sub-modules (e.g., Product Settings) -->
                  <template v-else>
                    <div class="mb-4">
                      <label class="flex items-center cursor-pointer mb-3">
                        <input
                          type="checkbox"
                          :checked="isNestedModuleSelected(subModuleData)"
                          :indeterminate.prop="isNestedModuleIndeterminate(subModuleData)"
                          @change="toggleNestedModule(subModuleData, $event.target.checked)"
                          class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                        />
                        <span class="ml-3 text-base font-semibold text-gray-800">{{ subModuleName }}</span>
                        <span class="ml-2 text-sm text-gray-500">({{ getNestedModulePermissionCount(subModuleData) }} permissions)</span>
                      </label>

                      <!-- Nested sub-module items -->
                      <div class="ml-7 space-y-4">
                        <div
                          v-for="(nestedPermissions, nestedSubModuleName) in subModuleData"
                          :key="nestedSubModuleName"
                          class="pl-4 border-l-2 border-gray-200"
                        >
                          <label class="flex items-center cursor-pointer mb-2">
                            <input
                              type="checkbox"
                              :checked="isSubModuleSelected(nestedPermissions)"
                              :indeterminate.prop="isSubModuleIndeterminate(nestedPermissions)"
                              @change="toggleSubModule(nestedPermissions, $event.target.checked)"
                              class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                            />
                            <span class="ml-2 text-sm font-medium text-gray-700">{{ nestedSubModuleName }}</span>
                            <span class="ml-2 text-xs text-gray-500">({{ nestedPermissions.length }})</span>
                          </label>

                          <!-- Nested permissions grid -->
                          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ml-6">
                            <label
                              v-for="permission in nestedPermissions"
                              :key="permission"
                              class="flex items-center cursor-pointer py-1.5 px-2 hover:bg-gray-50 rounded transition-colors"
                            >
                              <input
                                type="checkbox"
                                :value="permission"
                                v-model="form.permissions"
                                class="w-3.5 h-3.5 text-black border-gray-300 rounded focus:ring-black focus:ring-1"
                              />
                              <span class="ml-2 text-xs text-gray-600">{{ formatPermissionName(permission) }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>


        <small v-if="errors.permissions" class="text-red-500 text-xs mt-1 block">{{ errors.permissions[0] }}</small>
      </div>

      <!-- Actions - Sticky Bar -->
      <div class="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-10">
        <button
          type="submit"
          :disabled="submitting || loadingPermissions"
          class="btn-primary-new"
        >
          {{ submitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Role' : 'Create Role') }}
        </button>
        <button
          type="button"
          @click="goBack"
          class="btn-secondary-new"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { roleService } from '@/services/roleService'
import { useToast } from '@/composables/useToast'
import BaseInput from '@/components/form/BaseInput.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const isEditing = ref(false)
const editingRole = ref(null)
const submitting = ref(false)
const errors = ref({})
const loadingPermissions = ref(false)

const form = ref({
  name: '',
  permissions: [],
})

const permissionStructure = ref({})
const expandedModules = ref([])

// Fetch permissions
const fetchPermissions = async () => {
  loadingPermissions.value = true
  try {
    const response = await roleService.getPermissions()
    permissionStructure.value = response
    // Expand all modules by default
    expandedModules.value = Object.keys(response)
  } catch (error) {
    toast.error('Failed to fetch permissions')
  } finally {
    loadingPermissions.value = false
  }
}

// Fetch role for editing
const fetchRole = async (id) => {
  try {
    const roleData = await roleService.getRole(id)
    editingRole.value = roleData
    form.value = {
      name: roleData.name,
      permissions: roleData.permissions?.map(p => p.name) || [],
    }
  } catch (error) {
    toast.error('Failed to fetch role details')
    router.push('/roles')
  }
}

// Submit form
const handleSubmit = async () => {
  submitting.value = true
  errors.value = {}

  try {
    if (isEditing.value) {
      await roleService.updateRole(route.params.id, form.value)
      toast.success('Role updated successfully')
    } else {
      await roleService.createRole(form.value)
      toast.success('Role created successfully')
    }
    router.push('/roles')
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error(error.response?.data?.message || 'Failed to save role')
    }
  } finally {
    submitting.value = false
  }
}

// Permission helpers
const getAllPermissionsInModule = (moduleData) => {
  const permissions = []
  Object.values(moduleData).forEach(subModule => {
    if (Array.isArray(subModule)) {
      // Direct array of permissions
      permissions.push(...subModule)
    } else if (typeof subModule === 'object') {
      // Nested object containing more sub-modules
      Object.values(subModule).forEach(nestedPerms => {
        if (Array.isArray(nestedPerms)) {
          permissions.push(...nestedPerms)
        }
      })
    }
  })
  return permissions
}

const getModulePermissionCount = (moduleName) => {
  return getAllPermissionsInModule(permissionStructure.value[moduleName]).length
}

const isModuleSelected = (moduleName) => {
  const modulePermissions = getAllPermissionsInModule(permissionStructure.value[moduleName])
  return modulePermissions.length > 0 && modulePermissions.every(p => form.value.permissions.includes(p))
}

const isModuleIndeterminate = (moduleName) => {
  const modulePermissions = getAllPermissionsInModule(permissionStructure.value[moduleName])
  const selectedCount = modulePermissions.filter(p => form.value.permissions.includes(p)).length
  return selectedCount > 0 && selectedCount < modulePermissions.length
}

const toggleModule = (moduleName, checked) => {
  const modulePermissions = getAllPermissionsInModule(permissionStructure.value[moduleName])
  if (checked) {
    form.value.permissions = [...new Set([...form.value.permissions, ...modulePermissions])]
  } else {
    form.value.permissions = form.value.permissions.filter(p => !modulePermissions.includes(p))
  }
}

// Nested module helpers (for Product Settings, etc.)
const getNestedModulePermissionCount = (nestedModuleData) => {
  let count = 0
  Object.values(nestedModuleData).forEach(perms => {
    if (Array.isArray(perms)) {
      count += perms.length
    }
  })
  return count
}

const isNestedModuleSelected = (nestedModuleData) => {
  const allPermissions = []
  Object.values(nestedModuleData).forEach(perms => {
    if (Array.isArray(perms)) {
      allPermissions.push(...perms)
    }
  })
  return allPermissions.length > 0 && allPermissions.every(p => form.value.permissions.includes(p))
}

const isNestedModuleIndeterminate = (nestedModuleData) => {
  const allPermissions = []
  Object.values(nestedModuleData).forEach(perms => {
    if (Array.isArray(perms)) {
      allPermissions.push(...perms)
    }
  })
  const selectedCount = allPermissions.filter(p => form.value.permissions.includes(p)).length
  return selectedCount > 0 && selectedCount < allPermissions.length
}

const toggleNestedModule = (nestedModuleData, checked) => {
  const allPermissions = []
  Object.values(nestedModuleData).forEach(perms => {
    if (Array.isArray(perms)) {
      allPermissions.push(...perms)
    }
  })
  if (checked) {
    form.value.permissions = [...new Set([...form.value.permissions, ...allPermissions])]
  } else {
    form.value.permissions = form.value.permissions.filter(p => !allPermissions.includes(p))
  }
}

// Sub-module helpers
const isSubModuleSelected = (permissions) => {
  if (!Array.isArray(permissions) || permissions.length === 0) return false
  return permissions.every(p => form.value.permissions.includes(p))
}

const isSubModuleIndeterminate = (permissions) => {
  if (!Array.isArray(permissions) || permissions.length === 0) return false
  const selectedCount = permissions.filter(p => form.value.permissions.includes(p)).length
  return selectedCount > 0 && selectedCount < permissions.length
}

const toggleSubModule = (permissions, checked) => {
  if (!Array.isArray(permissions)) return
  if (checked) {
    form.value.permissions = [...new Set([...form.value.permissions, ...permissions])]
  } else {
    form.value.permissions = form.value.permissions.filter(p => !permissions.includes(p))
  }
}

const toggleModuleExpand = (moduleName) => {
  if (expandedModules.value.includes(moduleName)) {
    expandedModules.value = expandedModules.value.filter(m => m !== moduleName)
  } else {
    expandedModules.value.push(moduleName)
  }
}

const selectAllPermissions = () => {
  const allPermissions = []
  Object.values(permissionStructure.value).forEach(moduleData => {
    allPermissions.push(...getAllPermissionsInModule(moduleData))
  })
  form.value.permissions = [...new Set(allPermissions)]
}

const clearAllPermissions = () => {
  form.value.permissions = []
}

const formatPermissionName = (permission) => {
  // Ensure permission is a string
  const permStr = typeof permission === 'string' ? permission : String(permission)
  const parts = permStr.split('.')
  const action = parts[parts.length - 1]
  return action.charAt(0).toUpperCase() + action.slice(1)
}

const goBack = () => {
  router.push('/roles')
}

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true
    await fetchPermissions()
    await fetchRole(route.params.id)
  } else {
    await fetchPermissions()
  }
})
</script>
