<template>
  <div  class="flex min-h-screen flex-col bg-background font-sans selection:bg-foreground selection:text-background">
    <Header v-if="!shouldHideHeader" />
    <main
          class="px-6 py-4"
          :class="{
        'pt-[40px]': !shouldHideHeader,
        '!p-0': shouldHideHeader
      }"

    >
      <div class="main-wrapper-inner min-h-[calc(100vh-160px)]">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

    </main>
  </div>
</template>

<script setup>
  import Header from './components/Header.vue'

  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();
  // Computed property checks if the current route has the hideHeader flag set to true
  const shouldHideHeader = computed(() => {
    return route.meta.hideHeader === true;
  });
</script>
