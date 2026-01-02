<template>
  <div class="p-6 border border-border bg-white hover:border-zinc-700 transition-colors group">
    <div class="flex justify-between items-start mb-4">
      <div class="p-2 bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
        <component :is="icon" class="w-4 h-4 text-black group-hover:text-black" />
      </div>
      <div v-if="trend" class="flex items-center gap-1 text-[10px] font-mono" :class="trend > 0 ? 'text-black' : 'text-black'">
        <span>{{ trend > 0 ? '+' : '' }}{{ trend }}%</span>
        <TrendingUp v-if="trend > 0" class="w-3 h-3" />
        <TrendingDown v-else class="w-3 h-3" />
      </div>
    </div>
    <p class="text-xs font-medium text-black uppercase tracking-widest mb-1">{{ label }}</p>
    <div class="flex items-baseline gap-2">
      <h3 class="text-2xl font-bold tracking-tight">{{ value }}</h3>
      <span v-if="subValue" class="text-[10px] text-black font-mono">{{ subValue }}</span>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

defineProps({
  label: String,
  value: String,
  subValue: String,
  icon: Object,
  trend: Number
})
</script>
