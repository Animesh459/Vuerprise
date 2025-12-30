<template>
  <div class="min-h-screen bg-[#0D121C] bg-[image:radial-gradient(at_left_top,rgba(22,189,202,0.15),transparent_50%)] flex items-center justify-center p-4 sm:p-6" style="background-color: #0D121C;">
    <!-- Animated background gradient blobs for modern appeal -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    <!-- Main login card with glassmorphism effect -->
    <div class="relative z-10 w-full max-w-md">
      <div class="group">
        <!-- Gradient border effect -->
        <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-800 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <!-- Card content -->
        <div class="relative bg-slate-950/80 backdrop-blur-2xl border border-slate-800/50 rounded-2xl px-8 py-12 space-y-8">
          <!-- Header section with logo and greeting -->
          <div class="text-center space-y-3">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-xl">
              <svg class="w-8 h-8" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color: #22D3EE; stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: #3B82F6; stop-opacity: 1" />
                  </linearGradient>
                </defs>
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="url(#logo-gradient)"/>
              </svg>
            </div>
            <h1 class="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-800 bg-clip-text">
              Welcome Back
            </h1>
            <p class="text-slate-400 text-sm">Sign in to continue to your account</p>
          </div>

          <!-- Form fields with animated focus states -->
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email field -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition duration-300 blur"></div>
              <input
                  v-model="email"
                  type="email"
                  placeholder="Email address"
                  class="relative w-full px-5 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition duration-300"
              />
            </div>

            <!-- Password field -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition duration-300 blur"></div>
              <div class="relative">
                <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Password"
                    class="relative w-full px-5 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition duration-300"
                />
                <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition duration-300"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember me and forgot password options -->
            <div class="flex items-center justify-between text-sm">
              <CustomCheckbox
                  id="news-check"
                  label="Remember me"
                  v-model="formData.newsletter"
              />
              <a href="#" class="text-cyan-400 hover:text-cyan-300 font-medium transition duration-300">
                Forgot password?
              </a>
            </div>

            <!-- Sign in button with gradient and hover effects -->
            <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 rounded-lg font-semibold text-white transition duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center gap-2"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomCheckbox from "@/components/CustomCheckbox.vue";

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  // Simulate login request
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  console.log('Login attempt with:', { email: email.value, rememberMe: rememberMe.value })
}

const formData = ref({
  newsletter: false,
  terms: true,
});
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.animate-pulse {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
