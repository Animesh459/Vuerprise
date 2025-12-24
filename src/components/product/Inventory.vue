<script setup>
import {
  LayersIcon, SearchIcon, PlusIcon, ChevronDownIcon, CheckIcon,
  ChevronLeftIcon, ChevronRightIcon, ZapIcon, ArrowDownCircleIcon,
  AlertCircleIcon, CalendarIcon, BoxIcon, ActivityIcon, AlertTriangleIcon
} from 'lucide-vue-next'
import { ref } from 'vue'

const colorVariants = ref([
  { name: 'Beige/Dust Green', selected: true },
  { name: 'Cream/Red', selected: false },
  { name: 'Dark Green/Red', selected: false },
  { name: 'Denim-Red', selected: false },
  { name: 'Green', selected: true },
  { name: 'Ivory', selected: true },
])

const tableHeaders = [
  'Color', 'Physical Qty', 'Incoming Qty', 'Outgoing Qty', 'Projected Qty', 'Stock Status', 'Reorder Level', 'Expected Arrival', 'Action'
]

const inventoryData = ref([
  { color: 'Green', physical: 0, incoming: 0, outgoing: 0, projected: 0, status: 'Out of Stock', reorder: 0 },
  { color: 'Ivory', physical: 0, incoming: 0, outgoing: 0, projected: 0, status: 'Out of Stock', reorder: 0 },
])


const stats = [
  {
    label: 'Total Colors',
    value: '2',
    icon: BoxIcon,
    colorClass: 'bg-blue-500 w-full',
    textClass: 'text-blue-400',
    borderColorClass: 'border-blue-500/20'
  },
  {
    label: 'Total Physical Stock',
    value: '0',
    icon: ZapIcon,
    colorClass: 'bg-green-500 w-full',
    textClass: 'text-green-400',
    borderColorClass: 'border-green-500/20'
  },
  {
    label: 'Total Projected Stock',
    value: '0',
    icon: ActivityIcon,
    colorClass: 'bg-amber-500 w-full',
    textClass: 'text-amber-400',
    borderColorClass: 'border-amber-500/20'
  },
  {
    label: 'Need Reorder',
    value: '2',
    icon: AlertTriangleIcon,
    colorClass: 'bg-rose-500 w-full',
    textClass: 'text-rose-400',
    borderColorClass: 'border-rose-500/20'
  },
]

</script>

<template>
  <div class="common-card flex flex-col gap-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4 flex-1">
        <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <LayersIcon class="text-amber-400" :size="24" />
          Colors & Inventory
        </h1>
        <div class="relative max-w-xl group">
          <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" :size="18" />
          <input
              type="text"
              placeholder="Search colors, variants, stock codes..."
              class="w-full bg-slate-950 border rounded-md border-slate-800 pl-12 pr-4 py-3 text-sm focus:border-cyan-500/50 focus:bg-slate-950 transition-all outline-none shadow-inner shadow-black/40"
          />
        </div>
      </div>
      <div class="flex gap-3">
        <button class="btn-common">
          <PlusIcon :size="16" /> Add New Color
        </button>
        <button class="btn-danger-transparent">
          X Close Color Panel
        </button>
      </div>
    </div>

    <!-- Color Selection Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
      <label v-for="color in colorVariants" :key="color.name" class="flex items-center gap-3 p-3 bg-slate-900/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-all group">
        <div class="relative flex items-center">
          <input type="checkbox" v-model="color.selected" class="peer sr-only" />
          <div class="w-5 h-5 border-2 border-slate-700 rounded-md peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all flex items-center justify-center">
            <CheckIcon v-if="color.selected" :size="14" class="text-white" />
          </div>
        </div>
        <span class="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors tracking-wide uppercase">{{ color.name }}</span>
      </label>
    </div>

    <!-- Inventory Table -->
    <div class="space-y-4 pt-4">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h2 class="text-xl font-bold text-white tracking-tight uppercase">Inventory Management</h2>
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Manage stock levels for each color variant</p>
        </div>
        <div class="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span class="uppercase tracking-widest">1-6 off 6</span>
          <div class="flex bg-slate-900/50 rounded-lg p-1 border border-slate-800">
            <button class="p-1.5 hover:bg-slate-800 rounded-md transition-colors"><ChevronLeftIcon :size="14" /></button>
            <button class="px-3 py-1 bg-slate-800 rounded-md text-white border border-slate-700">1</button>
            <button class="p-1.5 hover:bg-slate-800 rounded-md transition-colors"><ChevronRightIcon :size="14" /></button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-md shadow-2xl">
        <table class="w-full text-left border-collapse min-w-[1000px]">
          <thead>
          <tr class="border-b border-slate-800 bg-slate-900/40">
            <th v-for="header in tableHeaders" :key="header" class="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/50">
          <tr v-for="row in inventoryData" :key="row.color" class="group hover:bg-slate-800/20 transition-colors">
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-white uppercase tracking-wider">{{ row.color }}</span>
            </td>
            <td class="px-6 py-4">
              <input type="text" v-model="row.physical" class="w-20 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-center font-bold focus:border-cyan-500/50 outline-none transition-all" />
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 text-cyan-400 font-black text-sm">{{ row.incoming }} <ZapIcon :size="14" class="animate-pulse" /></div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 text-amber-400 font-black text-sm">{{ row.outgoing }} <ArrowDownCircleIcon :size="14" /></div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 text-rose-400 font-black text-sm">{{ row.projected }} <AlertCircleIcon :size="14" /></div>
            </td>
            <td class="px-6 py-4">
              <div class="relative min-w-[140px]">
                <select v-model="row.status" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-slate-400 appearance-none outline-none focus:border-cyan-500/50 transition-all uppercase tracking-widest cursor-pointer">
                  <option>Out of Stock</option>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                </select>
                <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" :size="12" />
              </div>
            </td>
            <td class="px-6 py-4 text-center">
              <input type="text" v-model="row.reorder" class="w-16 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-center font-bold outline-none" />
            </td>
            <td class="px-6 py-4">
              <div class="relative">
                <input type="text" placeholder="YYYY-MM-DD" class="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-slate-500 outline-none focus:border-cyan-500/50 transition-all" />
                <CalendarIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" :size="14" />
              </div>
            </td>
            <td class="px-6 py-4 text-center">
              <button class="text-rose-500/50 hover:text-rose-500 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-110 active:scale-95">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
          v-for="stat in stats"
          :key="stat.label"
          class="group relative overflow-hidden bg-slate-900/40 rounded-3xl border border-slate-800 p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-300"
      >
        <div :class="['absolute bottom-0 left-0 h-1 transition-all duration-500 group-hover:h-full group-hover:opacity-5', stat.colorClass]"></div>
        <div class="flex items-center justify-between mb-4">
          <div :class="['p-3 rounded-2xl border bg-slate-950 shadow-inner', stat.borderColorClass]">
            <component :is="stat.icon" :size="20" :class="stat.textClass" />
          </div>
          <div class="text-2xl font-black text-white group-hover:scale-110 transition-transform">{{ stat.value }}</div>
        </div>
        <p class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>
