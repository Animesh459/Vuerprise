<template>
  <div class="min-h-screen bg-[#0D121C] bg-[image:radial-gradient(at_left_top,rgba(22,189,202,0.15),transparent_50%)] flex items-center justify-center p-4 sm:p-6" style="background-color: #0D121C;">

    <div
        class="w-full max-w-md p-8 sm:p-10 rounded-3xl backdrop-filter backdrop-blur-md
             bg-gray-900/40 border border-gray-700/50 relative
             shadow-2xl shadow-black/80"
    >
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold mb-2 text-[#0284C7]">

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
                   bg-gray-800/80 border-gray-700/60 text-white focus:border-[#0284C7]
                   placeholder-gray-500
                   focus:outline-none
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
                   focus:outline-none focus:border-[#0284C7]
                   transition duration-200 ease-in-out"
          />
        </div>

        <div class="flex items-center justify-between text-sm">
          <CustomCheckbox id="terms-check" >
            Remember Me
          </CustomCheckbox>

          <a href="#" class="text-[#0284C7]  transition duration-200">
            Forgot Password?
          </a>
        </div>

        <button
            type="submit"
            class="w-full py-3 rounded-xl text-lg font-bold text-white shadow-xl
                 bg-[#0284C7]
                 transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none
                 "
        >
          Login
        </button>
      </form>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomCheckbox from "@/components/CustomCheckbox.vue";

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