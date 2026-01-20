<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

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

    <!-- Tab Content -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <!-- Basic Info Tab -->
      <div v-if="activeTab === 'basic'" class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
        
        <form @submit.prevent="updateProfile" class="space-y-4 max-w-2xl">
          <BaseInput
            v-model="profileForm.name"
            label="Full Name"
            placeholder="Enter your full name"
            required
            :error="profileErrors.name?.[0]"
          />

          <BaseInput
            v-model="profileForm.email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
            :error="profileErrors.email?.[0]"
          />

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              :disabled="profileLoading"
              class="btn-primary-new"
            >
              {{ profileLoading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Password Tab -->
      <div v-if="activeTab === 'password'" class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
        
        <form @submit.prevent="updatePassword" class="space-y-4 max-w-2xl">
          <BaseInput
            v-model="passwordForm.current_password"
            type="password"
            label="Current Password"
            placeholder="Enter current password"
            required
            :error="passwordErrors.current_password?.[0]"
          />

          <BaseInput
            v-model="passwordForm.password"
            type="password"
            label="New Password"
            placeholder="Enter new password"
            required
            :error="passwordErrors.password?.[0]"
          />

          <BaseInput
            v-model="passwordForm.password_confirmation"
            type="password"
            label="Confirm New Password"
            placeholder="Confirm new password"
            required
            :error="passwordErrors.password_confirmation?.[0]"
          />

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              :disabled="passwordLoading"
              class="btn-primary-new"
            >
              {{ passwordLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Profile Image Tab -->
      <div v-if="activeTab === 'image'" class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Profile Image</h2>
        
        <div class="max-w-2xl space-y-6">
          <!-- Current Image -->
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Current Image</p>
            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                v-if="previewUrl || user?.profile_image"
                :src="previewUrl || user.profile_image"
                :alt="user?.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-black to-gray-800 text-white text-4xl font-bold"
              >
                {{ (user?.name || 'U').charAt(0).toUpperCase() }}
              </div>
            </div>
          </div>

          <!-- Upload New Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload New Image
            </label>
            <div class="flex items-center gap-4">
              <label
                class="px-6 py-2.5 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg cursor-pointer transition-colors"
              >
                Choose File
                <input
                  type="file"
                  @change="handleImageChange"
                  accept="image/*"
                  class="hidden"
                />
              </label>
              <span v-if="selectedImage" class="text-sm text-gray-600">{{ selectedImage.name }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
            <small v-if="imageErrors.image" class="text-red-500 text-xs mt-1 block">{{ imageErrors.image[0] }}</small>
          </div>

          <div v-if="selectedImage" class="flex gap-3">
            <button
              @click="uploadImage"
              :disabled="imageLoading"
              class="btn-primary-new"
            >
              {{ imageLoading ? 'Uploading...' : 'Upload Image' }}
            </button>
            <button
              @click="cancelUpload"
              class="btn-secondary-new"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { userService } from '@/services'
import { useToast } from '@/composables/useToast'
import BaseInput from '@/components/form/BaseInput.vue'

const { user, fetchUser } = useAuth()
const toast = useToast()

const activeTab = ref('basic')
const tabs = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'password', label: 'Password' },
  { id: 'image', label: 'Profile Image' },
]

// Profile form
const profileForm = ref({
  name: '',
  email: '',
})
const profileErrors = ref({})
const profileLoading = ref(false)

// Password form
const passwordForm = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
})
const passwordErrors = ref({})
const passwordLoading = ref(false)

// Image upload
const selectedImage = ref(null)
const previewUrl = ref(null)
const imageErrors = ref({})
const imageLoading = ref(false)

onMounted(async () => {
  if (user.value) {
    profileForm.value.name = user.value.name
    profileForm.value.email = user.value.email
  }
})

const updateProfile = async () => {
  profileLoading.value = true
  profileErrors.value = {}

  try {
    await userService.updateProfile(profileForm.value)
    await fetchUser()
    toast.success('Profile updated successfully!')
  } catch (error) {
    if (error.response?.data?.errors) {
      profileErrors.value = error.response.data.errors
    } else {
      toast.error('Failed to update profile')
    }
  } finally {
    profileLoading.value = false
  }
}

const updatePassword = async () => {
  passwordLoading.value = true
  passwordErrors.value = {}

  try {
    await userService.updatePassword(passwordForm.value)
    passwordForm.value = {
      current_password: '',
      password: '',
      password_confirmation: '',
    }
    toast.success('Password updated successfully!')
  } catch (error) {
    if (error.response?.data?.errors) {
      passwordErrors.value = error.response.data.errors
    } else {
      toast.error('Failed to update password')
    }
  } finally {
    passwordLoading.value = false
  }
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = file
    previewUrl.value = URL.createObjectURL(file)
    imageErrors.value = {}
  }
}

const cancelUpload = () => {
  selectedImage.value = null
  previewUrl.value = null
}

const uploadImage = async () => {
  if (!selectedImage.value) return

  imageLoading.value = true
  imageErrors.value = {}

  const formData = new FormData()
  formData.append('image', selectedImage.value)

  try {
    await userService.uploadProfileImage(formData)
    await fetchUser()
    selectedImage.value = null
    previewUrl.value = null
    toast.success('Profile image updated successfully!')
  } catch (error) {
    if (error.response?.data?.errors) {
      imageErrors.value = error.response.data.errors
    } else {
      toast.error('Failed to upload image')
    }
  } finally {
    imageLoading.value = false
  }
}
</script>
