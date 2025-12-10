<template>
  <div class="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10">

    <div class="flex items-start justify-between">
      <h3 class="text-sm text-gray-300">{{ title }}</h3>

      <span
          v-if="positive !== undefined"
          :class="positive ? 'text-green-400' : 'text-red-400'"
          class="text-xs font-semibold"
      >
        {{ positive ? '+12.45%' : '-12.45%' }}
      </span>
    </div>

    <p class="text-2xl font-bold mt-2 text-white">{{ value }}</p>
    <p class="text-xs text-gray-400 mt-1">{{ sub }}</p>

  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    sub: String,
    positive: Boolean
  }
}
</script>
