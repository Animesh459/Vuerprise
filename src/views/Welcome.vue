

<template>
  <div class="common-card">

    <div class="relative">
      <div class="">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 class="text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
              Welcome, Mello user
            </h1>
            <p class="text-slate-400 text-lg">Good to see you boss!</p>
          </div>
          <button class="group relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:shadow-xl">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Item
          </button>
        </div>

      </div>

      <Dashboard/>
    </div>

  </div>
</template>

<script setup>

import Dashboard from "@/views/dashboard/Dashboard.vue";

</script>

