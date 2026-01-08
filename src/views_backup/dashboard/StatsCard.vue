<template>
  <div class="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 flex items-center gap-x-4">

    <div v-if="icon" v-html="icon" class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0"></div>

    <div class="flex-grow">
        <h3 class="text-sm text-gray-300">{{ title }}</h3>
        <p class="text-2xl font-bold text-white">{{ value }}</p>
        <p class="text-xs text-gray-400">{{ sub }}</p>
    </div>

    <div
        v-if="positive !== undefined"
        :class="positive ? 'text-green-400' : 'text-red-400'"
        class="text-xs font-semibold flex items-center"
    >
        <svg v-if="positive" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span>{{ percentage }}%</span>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    sub: String,
    positive: Boolean,
    icon: String,
    percentage: {
        type: String,
        default: "12.45"
    }
  }
}
</script>
