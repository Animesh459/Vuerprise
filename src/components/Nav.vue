<template>
  <nav class="px-8 border-b border-gray-700/50">
    <ul class="flex gap-8">
      <li
          v-for="tab in tabs"
          :key="tab"
          class="py-4 cursor-pointer text-sm"
          :class="activeTab === tab ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-gray-200'"
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