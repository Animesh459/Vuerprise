
<template>
<!--  <div class="flex items-center gap-4 text-xs font-bold text-slate-500">-->
<!--    <span class="uppercase tracking-widest">1-6 off 6</span>-->
<!--    <div class="flex bg-slate-900/50 rounded-lg p-1 gap-1 border border-slate-800">-->
<!--      <button class="p-1.5 hover:bg-slate-800 rounded-md transition-colors"><ChevronLeftIcon :size="14" /></button>-->
<!--      <button class="px-3 py-1 bg-slate-800 rounded-md text-white border border-slate-700">1</button>-->
<!--      <button class="px-3 py-1 bg-slate-800 rounded-md text-white border border-slate-700">2</button>-->
<!--      <button class="px-3 py-1 bg-slate-800 rounded-md text-white border border-slate-700">3</button>-->
<!--      <button class="p-1.5 hover:bg-slate-800 rounded-md transition-colors"><ChevronRightIcon :size="14" /></button>-->
<!--    </div>-->
<!--  </div>-->

  <!-- Pagination -->
  <div class="mt-6 flex flex-col items-center justify-between gap-6 border-t border-border pt-6 sm:flex-row">
    <p class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">1-18 of 50 Results</p>
    <div class="flex items-center gap-1">
      <button class="h-9 border border-neutral-200 px-4 text-[10px] font-black uppercase hover:border-black transition-colors">Prev</button>
      <button class="h-9 w-9 bg-black text-[10px] font-black text-white">1</button>
      <button class="h-9 w-9 border border-neutral-200 text-[10px] font-black hover:border-black transition-colors">2</button>
      <button class="h-9 w-9 border border-neutral-200 text-[10px] font-black hover:border-black transition-colors">3</button>
      <button class="h-9 border border-neutral-200 px-4 text-[10px] font-black uppercase hover:border-black transition-colors">Next</button>
    </div>
  </div>

</template>

<script setup>
import {
  ChevronLeftIcon, ChevronRightIcon
} from 'lucide-vue-next'
</script>
