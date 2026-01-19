<template>
  <div  class="flex min-h-screen flex-col bg-[#f9fafb] font-sans selection:bg-foreground selection:text-background">
    <Header v-if="shouldShowHeader" />
    <main
          class="px-6 py-4 min-w-[1300px]"
          :class="{
        'pt-[40px]': shouldShowHeader,
        '!p-0': !shouldShowHeader
      }"
    >
      <div class="main-wrapper-inner min-h-[calc(100vh-160px)]">
        <router-view />
      </div>
    </main>
    
    <!-- Toast Notifications -->
    <Toast />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Toast from './components/Toast.vue'

const route = useRoute()

const shouldShowHeader = computed(() => {
  // Don't show header on routes with hideHeader meta
  if (route.meta.hideHeader === true) {
    return false
  }
  
  // Don't show header if user is not authenticated
  const token = localStorage.getItem('authToken')
  if (!token) {
    return false
  }
  
  return true
})
</script>
