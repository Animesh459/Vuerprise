<template>
  <div  class="flex min-h-screen flex-col bg-[#f9fafb] font-sans selection:bg-foreground selection:text-background">
    <Header v-if="!shouldHideHeader" />
    <main
          class="px-6 py-4 min-w-[1300px]"
          :class="{
        'pt-[40px]': !shouldHideHeader,
        '!p-0': shouldHideHeader
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

const shouldHideHeader = computed(() => {
  return route.meta.hideHeader === true
})
</script>
