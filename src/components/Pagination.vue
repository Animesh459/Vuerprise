
<template>
  <div class="flex items-center gap-4 text-xs font-bold text-slate-500">
    <span class="uppercase tracking-widest">1-6 off 6</span>
    <div class="flex bg-slate-900/50 rounded-lg p-1 gap-1 border border-slate-800">
      <button class="p-1.5 hover:bg-slate-800 rounded-md transition-colors"><ChevronLeftIcon :size="14" /></button>
      <button class="px-3 py-1 bg-slate-800 rounded-md text-white border border-slate-700">1</button>
      <button class="px-3 py-1 bg-slate-800 rounded-md text-white border border-slate-700">2</button>
      <button class="px-3 py-1 bg-slate-800 rounded-md text-white border border-slate-700">3</button>
      <button class="p-1.5 hover:bg-slate-800 rounded-md transition-colors"><ChevronRightIcon :size="14" /></button>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronLeftIcon, ChevronRightIcon
} from 'lucide-vue-next'
</script>
