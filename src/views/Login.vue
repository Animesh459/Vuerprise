<template>
  <!-- Updated gradient background to light colors for white theme -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center p-4">
    <!-- Main Container -->
    <div class="w-full max-w-md">
      <!-- Updated card styling for white theme with subtle shadows -->
      <div class="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">

        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-black to-gray-800 hover:from-gray-900 hover:to-black rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-xl">VE</span>
            </div>
          </div>
          <!-- Updated text colors for white background -->
          <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</h1>
          <p class="text-gray-500 text-center text-sm">Sign in to continue to your account</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- General Error Message - Only shown if no field errors -->
          <transition name="fade">
            <div v-if="shouldShowGeneralError" class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-sm font-semibold text-red-800">{{ generalError }}</p>
                <p class="text-xs text-red-600 mt-1">Please try again or contact support if the issue persists.</p>
              </div>
            </div>
          </transition>

          <!-- Email Input -->
          <BaseInput
            v-model="email"
            type="email"
            label="Email Address"
            placeholder="admin@example.com"
            required
            :error="fieldErrors.email"
            @input="handleEmailInput"
            @blur="validateEmail"
          />

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                  id="password"
                  v-model="password"
                  @input="handlePasswordInput"
                  @blur="validatePassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  :class="{
                    'border-red-500': fieldErrors.password,
                    'border-border': !fieldErrors.password
                  }"
                  class="h-9 w-full border rounded-xl bg-white pl-4 pr-12 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-blue-600 focus:outline-none"
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <small v-if="fieldErrors.password" class="text-red-500 text-xs mt-1 block">{{ fieldErrors.password }}</small>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <BaseCheckbox v-model="rememberMe" label="Remember me" />
            <!-- <a href="#" class="text-sm text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a> -->
          </div>

          <!-- Submit Button -->
          <button
              type="submit"
              :disabled="loading"
              class="btn-primary-new w-full"
          >
            <span v-if="!loading">Sign In to Admin</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Signing in...
            </span>
          </button>
        </form>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseCheckbox from "@/components/form/BaseCheckbox.vue"

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const generalError = ref('')
const fieldErrors = ref({})

// Load saved email on mount if "Remember Me" was checked
onMounted(() => {
  const savedEmail = localStorage.getItem('rememberedEmail')
  const wasRemembered = localStorage.getItem('rememberMe')
  
  if (savedEmail && wasRemembered === 'true') {
    email.value = savedEmail
    rememberMe.value = true
  }
})

// Client-side validation
const validateEmail = () => {
  if (!email.value) {
    fieldErrors.value.email = 'Email is required'
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    fieldErrors.value.email = 'Please enter a valid email address'
    return false
  }
  
  delete fieldErrors.value.email
  return true
}

const validatePassword = () => {
  if (!password.value) {
    fieldErrors.value.password = 'Password is required'
    return false
  }
  
  if (password.value.length < 6) {
    fieldErrors.value.password = 'Password must be at least 6 characters'
    return false
  }
  
  delete fieldErrors.value.password
  return true
}

const validateForm = () => {
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  return isEmailValid && isPasswordValid
}

// Only show general error if there are no field-specific errors
const shouldShowGeneralError = computed(() => {
  return generalError.value && Object.keys(fieldErrors.value).length === 0
})

const handleLogin = async () => {
  // Clear previous errors
  generalError.value = ''
  fieldErrors.value = {}
  
  // Validate form before sending request
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const result = await login(email.value, password.value)

    if (result.success) {
      // Handle Remember Me
      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', email.value)
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberMe')
      }
      
      router.push('/')
    } else {
      // Check if we have field-specific errors from API
      if (result.errors && Object.keys(result.errors).length > 0) {
        fieldErrors.value = result.errors
      } else {
        // Only show general error if no field errors
        generalError.value = result.message
      }
    }
  } catch (error) {
    generalError.value = 'An unexpected error occurred. Please try again.'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// Clear field error on input
const handleEmailInput = () => {
  if (fieldErrors.value.email) {
    delete fieldErrors.value.email
    fieldErrors.value = { ...fieldErrors.value }
  }
  if (generalError.value) {
    generalError.value = ''
  }
}

const handlePasswordInput = () => {
  if (fieldErrors.value.password) {
    delete fieldErrors.value.password
    fieldErrors.value = { ...fieldErrors.value }
  }
  if (generalError.value) {
    generalError.value = ''
  }
}
</script>

<style scoped>
/* Smooth transitions */
input, button {
  transition: all 0.3s ease;
}

/* Fade transition for error messages */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar */
input::-webkit-scrollbar {
  width: 6px;
}

input::-webkit-scrollbar-track {
  background: rgba(229, 231, 235, 0.5);
}

input::-webkit-scrollbar-thumb {
  background: rgba(209, 213, 219, 0.8);
  border-radius: 3px;
}
</style>
