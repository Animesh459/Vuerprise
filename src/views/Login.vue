<template>
  <div class="min-h-screen flex items-center justify-center p-4 sm:p-6" style="background-color: #0D121C;">

    <div
        class="w-full max-w-md p-8 sm:p-10 rounded-3xl backdrop-filter backdrop-blur-md
             bg-gray-900/40 border border-gray-700/50 relative
             shadow-2xl shadow-black/80"
    >
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold mb-2"
            style="background-image: linear-gradient(90deg, #6366F1, #8B5CF6, #C084FC);
                   -webkit-background-clip: text;
                   -webkit-text-fill-color: transparent;">
          Welcome Back
        </h1>
        <p class="text-gray-400 text-sm">Sign in to continue to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">

        <div class="relative">
          <input
              type="email"
              id="email-login"
              placeholder="Email Address"
              v-model="loginData.email"
              required
              class="w-full px-5 py-3 border rounded-xl shadow-lg
                   bg-gray-800/80 border-gray-700/60 text-white
                   placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition duration-200 ease-in-out"
          />
        </div>

        <div class="relative">
          <input
              type="password"
              id="password-login"
              placeholder="Password"
              v-model="loginData.password"
              required
              class="w-full px-5 py-3 border rounded-xl shadow-lg
                   bg-gray-800/80 border-gray-700/60 text-white
                   placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition duration-200 ease-in-out"
          />
        </div>

        <div class="flex items-center justify-between text-sm">

          <label class="flex items-center cursor-pointer text-gray-400 hover:text-white transition">
            <input type="checkbox" v-model="loginData.remember" class="hidden" id="remember-me" />
            <div
                class="w-4 h-4 mr-2 rounded border-2 flex items-center justify-center flex-shrink-0
                     transition duration-200 ease-in-out"
                :class="loginData.remember ? 'border-indigo-500 bg-indigo-500' : 'border-gray-600'"
            >
              <svg
                  class="w-3 h-3 text-white transform transition-transform duration-200"
                  :class="{ 'scale-100 opacity-100': loginData.remember, 'scale-0 opacity-0': !loginData.remember }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            Remember Me
          </label>

          <a href="#" class="text-indigo-400 hover:text-indigo-300 transition duration-200">
            Forgot Password?
          </a>
        </div>

        <button
            type="submit"
            class="w-full py-3 rounded-xl text-lg font-bold text-white shadow-xl
                 bg-gradient-to-r from-indigo-600 to-purple-600
                 hover:from-indigo-700 hover:to-purple-700
                 transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none
                 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>

      <div class="mt-8 text-center text-gray-400 text-sm">
        Don't have an account?
        <a href="#" class="text-indigo-400 hover:text-indigo-300 transition duration-200 underline">
          Sign up
        </a>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loginData = ref({
  email: '',
  password: '',
  remember: false,
});

const handleLogin = () => {
  // Replace with actual login logic
  console.log('Attempting login:', loginData.value);
  alert('Login attempted! Check console for data.');
};
</script>