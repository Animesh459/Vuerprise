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
              <span class="text-white font-bold text-xl">M</span>
            </div>
          </div>
          <!-- Updated text colors for white background -->
          <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</h1>
          <p class="text-gray-500 text-center text-sm">Sign in to continue to your account</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Input -->
          <div>
            <!-- Updated label color for white background -->
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
                id="email"
                v-model="email"
                type="email"
                placeholder="admin@example.com"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600  transition-all"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600  transition-all"
            />
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <BaseCheckbox label="Remember me" />
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
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
import { ref } from 'vue'
import BaseCheckbox from "@/components/form/BaseCheckbox.vue";

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return

  loading.value = true

  // Simulate API call
  setTimeout(() => {
    console.log('Login attempt:', { email: email.value, rememberMe: rememberMe.value })
    loading.value = false
    alert('Login successful! (Demo)')
  }, 1500)
}
</script>

<style scoped>
/* Smooth transitions */
input, button {
  transition: all 0.3s ease;
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
