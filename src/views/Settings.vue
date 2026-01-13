<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors'
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <!-- General Settings Tab -->
      <div v-if="activeTab === 'general'">
        <form @submit.prevent="saveGeneral" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">General Information</h2>
          
          <!-- Site Name -->
          <div>
            <label for="site_name" class="block text-sm font-medium text-gray-700 mb-2">
              Site Name <span class="text-red-500">*</span>
            </label>
            <input
              id="site_name"
              v-model="form.site_name"
              type="text"
              placeholder="Enter site name"
              :class="{
                'border-red-300 bg-red-50': errors.site_name,
                'border-gray-200': !errors.site_name
              }"
              class="w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
            />
            <ErrorMessage :error="errors.site_name" />
          </div>

          <!-- Current Logo -->
          <div v-if="currentLogo">
            <p class="text-sm font-medium text-gray-700 mb-3">Current Logo</p>
            <div class="inline-block p-4 bg-gray-50 rounded-lg border border-gray-200">
              <img
                :src="currentLogo"
                alt="Site Logo"
                class="h-16 w-auto object-contain"
              />
            </div>
          </div>

          <!-- Upload Logo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload New Logo
            </label>
            <div class="flex items-center gap-4">
              <label
                class="px-6 py-2.5 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg cursor-pointer transition-colors"
              >
                Choose File
                <input
                  type="file"
                  @change="handleLogoChange"
                  accept="image/*"
                  class="hidden"
                />
              </label>
              <span v-if="selectedLogo" class="text-sm text-gray-600">{{ selectedLogo.name }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-2">PNG or SVG recommended. Max 2MB.</p>
            <ErrorMessage :error="errors.logo" />
          </div>

          <!-- Preview New Logo -->
          <div v-if="logoPreview" class="space-y-2">
            <p class="text-sm font-medium text-gray-700">Preview</p>
            <div class="inline-block p-4 bg-gray-50 rounded-lg border-2 border-blue-200">
              <img
                :src="logoPreview"
                alt="Logo Preview"
                class="h-16 w-auto object-contain"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
            >
              <span v-if="!loading">Save General Settings</span>
              <span v-else class="flex items-center gap-2">
                <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Saving...
              </span>
            </button>
            <button
              type="button"
              @click="resetGeneralForm"
              class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <!-- Inventory Settings Tab -->
      <div v-if="activeTab === 'inventory'">
        <form @submit.prevent="saveInventory" class="space-y-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Inventory Management</h2>
          <p class="text-sm text-gray-600 mb-6">Configure stock thresholds for automatic status calculation</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Low Stock Quantity -->
            <div>
              <label for="low_stock_qty" class="block text-sm font-medium text-gray-700 mb-2">
                Low Stock Quantity (Critical Threshold) <span class="text-red-500">*</span>
              </label>
              <input
                id="low_stock_qty"
                v-model.number="form.low_stock_qty"
                type="number"
                min="0"
                placeholder="e.g., 10"
                :class="{
                  'border-red-300 bg-red-50': errors.low_stock_qty,
                  'border-gray-200': !errors.low_stock_qty
                }"
                class="w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
              />
              <p class="text-xs text-gray-500 mt-1">Products with projected qty ≤ this value will be marked as "Critical"</p>
              <ErrorMessage :error="errors.low_stock_qty" />
            </div>

            <!-- Reorder Quantity -->
            <div>
              <label for="reorder_qty" class="block text-sm font-medium text-gray-700 mb-2">
                Reorder Quantity Threshold <span class="text-red-500">*</span>
              </label>
              <input
                id="reorder_qty"
                v-model.number="form.reorder_qty"
                type="number"
                min="0"
                placeholder="e.g., 50"
                :class="{
                  'border-red-300 bg-red-50': errors.reorder_qty,
                  'border-gray-200': !errors.reorder_qty
                }"
                class="w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:border-gray-700 transition-all"
              />
              <p class="text-xs text-gray-500 mt-1">Products with projected qty ≤ this value will be marked as "Reorder"</p>
              <ErrorMessage :error="errors.reorder_qty" />
            </div>
          </div>

          <!-- Stock Status Legend -->
          <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm font-medium text-blue-900 mb-2">Stock Status Calculation:</p>
            <ul class="text-xs text-blue-800 space-y-1">
              <li><span class="font-semibold">Safe:</span> Projected qty > Reorder Threshold</li>
              <li><span class="font-semibold">Reorder:</span> Projected qty ≤ Reorder Threshold</li>
              <li><span class="font-semibold">Critical:</span> Projected qty ≤ Low Stock Threshold</li>
              <li><span class="font-semibold">Out of Stock:</span> Projected qty ≤ 0</li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
            >
              <span v-if="!loading">Save Inventory Settings</span>
              <span v-else class="flex items-center gap-2">
                <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Saving...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { settingsService } from '@/services'
import { useToast } from '@/composables/useToast'
import ErrorMessage from '@/components/ErrorMessage.vue'

const toast = useToast()

const activeTab = ref('general')
const tabs = [
  { id: 'general', label: 'General' },
  { id: 'inventory', label: 'Inventory Settings' },
]

const form = ref({
  site_name: '',
  low_stock_qty: 10,
  reorder_qty: 50,
})
const selectedLogo = ref(null)
const logoPreview = ref(null)
const currentLogo = ref(null)
const errors = ref({})
const loading = ref(false)

onMounted(async () => {
  try {
    const response = await settingsService.getSettings()
    const settings = response.data.data || response.data
    form.value.site_name = settings.site_name || ''
    form.value.low_stock_qty = settings.low_stock_qty || 10
    form.value.reorder_qty = settings.reorder_qty || 50
    currentLogo.value = settings.logo || null
  } catch (error) {
    console.error('Failed to load settings:', error)
  }
})

const handleLogoChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedLogo.value = file
    errors.value = {}

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveGeneral = async () => {
  loading.value = true
  errors.value = {}

  const formData = new FormData()
  formData.append('site_name', form.value.site_name)
  
  if (selectedLogo.value) {
    formData.append('logo', selectedLogo.value)
  }

  try {
    const response = await settingsService.updateSettings(formData)
    const settings = response.data.data || response.data
    
    // Update form with saved values (others might allow reactivity from backend feedback if needed)
    currentLogo.value = settings.logo || currentLogo.value
    selectedLogo.value = null
    logoPreview.value = null
    
    toast.success('General settings saved successfully!')
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error('Failed to save general settings')
    }
  } finally {
    loading.value = false
  }
}

const saveInventory = async () => {
  loading.value = true
  errors.value = {}

  const formData = new FormData()
  formData.append('low_stock_qty', form.value.low_stock_qty)
  formData.append('reorder_qty', form.value.reorder_qty)

  try {
    const response = await settingsService.updateSettings(formData)
    const settings = response.data.data || response.data
    
    form.value.low_stock_qty = settings.low_stock_qty || form.value.low_stock_qty
    form.value.reorder_qty = settings.reorder_qty || form.value.reorder_qty
    
    toast.success('Inventory settings saved successfully!')
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error('Failed to save inventory settings')
    }
  } finally {
    loading.value = false
  }
}

const resetGeneralForm = () => {
  selectedLogo.value = null
  logoPreview.value = null
  errors.value = {}
}
</script>
