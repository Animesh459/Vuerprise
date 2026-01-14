<template>
  <div :class="['bg-white/5 backdrop-blur-xl rounded-xl p-5 border-t-4', borderClass || 'border-white/10']">

    <div class="flex items-center gap-x-2 mb-4">
      <div v-if="icon" v-html="icon"></div>
      <h3 class="text-sm font-medium text-gray-300">
        {{ title }}
      </h3>
    </div>

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
    items: Array,
    borderClass: String,
    icon: String,
  }
}
</script>
