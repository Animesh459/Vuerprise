<template>
  <nav class="px-8 border-b border-default-border-primary data-[theme=bw]:border-bw-border-primary">
    <ul class="flex gap-8">
      <li
          v-for="tab in tabs"
          :key="tab"
          class="py-4 cursor-pointer text-sm"
          :class="activeTab === tab ? 'text-default-button-primary-text data-[theme=bw]:text-bw-button-primary-text border-b-2 border-default-button-primary-text data-[theme=bw]:border-bw-button-primary-text' : 'text-default-text-primary data-[theme=bw]:text-bw-text-primary hover:text-white'"
          @click="$emit('update:activeTab', tab)"
      >
        {{ tab }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  tabs: Array,
  activeTab: String,
})

defineEmits(['update:activeTab'])
</script>