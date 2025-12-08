<template>
  <div  class="min-h-screen font-dm bg-[#0D121C]">
    <Header />
    <main class="px-6 py-4 bg-[#070B11] pt-[140px]">
      <router-view />
    </main>
  </div>
</template>

<script setup>
  import Header from './components/Header.vue'
</script>
