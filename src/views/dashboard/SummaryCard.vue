<template>
  <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">

    <h3 class="text-sm font-medium text-gray-300 mb-4">
      {{ title }}
    </h3>

    <div class="grid grid-cols-2 gap-4">
      <div
          v-for="(item, i) in items"
          :key="i"
          class="flex flex-col items-center py-2 bg-white/5 rounded-lg border border-white/10"
      >
        <span class="text-xl font-semibold text-white">{{ item.value }}</span>
        <span class="text-xs text-gray-400 mt-1">{{ item.label }}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    title: String,
    items: Array
  }
}
</script>
