<template>
  <div class="min-h-screen bg-[#1a1f2e] text-white font-sans">
    <Header />
    <main class="px-6 py-4 ">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>