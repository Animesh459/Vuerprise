<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form @submit.prevent="saveSettings" class="space-y-6">
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
            <span v-if="!loading">Save Settings</span>
            <span v-else class="flex items-center gap-2">
              <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Saving...
            </span>
          </button>
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { settingsService } from '@/services'
import { useToast } from '@/composables/useToast'
import ErrorMessage from '@/components/ErrorMessage.vue'

const toast = useToast()

const form = ref({
  site_name: '',
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

const saveSettings = async () => {
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
    
    currentLogo.value = settings.logo || currentLogo.value
    selectedLogo.value = null
    logoPreview.value = null
    
    toast.success('Settings saved successfully!')
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      toast.error('Failed to save settings')
    }
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  selectedLogo.value = null
  logoPreview.value = null
  errors.value = {}
}
</script>
