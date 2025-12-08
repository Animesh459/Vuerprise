<template>
  <div :class="currentTheme" class="min-h-screen **font-dm**">
    <Header :toggleTheme="toggleTheme" />
    <main class="px-6 py-4 ">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import { useTheme } from './components/themeswitch/useTheme.js'

const { currentTheme, toggleTheme } = useTheme()
</script>