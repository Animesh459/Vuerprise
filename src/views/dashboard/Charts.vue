<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Revenue Chart -->
    <div class="lg:col-span-2 p-6 border border-zinc-800 bg-black flex flex-col">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h3 class="text-sm font-bold uppercase tracking-widest">Revenue Overview</h3>
          <p class="text-xs text-zinc-500">Weekly performance data</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 bg-white"></span>
            <span class="text-[10px] text-zinc-400 uppercase">Sales</span>
          </div>
          <div class="flex items-center gap-1.5 ml-4">
            <span class="w-2 h-2 bg-zinc-800 border border-zinc-700"></span>
            <span class="text-[10px] text-zinc-400 uppercase">Target</span>
          </div>
        </div>
      </div>

      <div class="flex-1 min-h-[300px] flex items-end gap-2 px-2 pb-6 relative">
        <!-- Grid Lines -->
        <div class="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none">
          <div v-for="i in 5" :key="i" class="w-full border-t border-zinc-900 border-dashed"></div>
        </div>

        <!-- Bars -->
        <div v-for="(day, idx) in salesData" :key="idx" class="flex-1 flex flex-col items-center gap-2 group relative z-10">
          <div class="w-full flex items-end justify-center gap-1 h-[200px]">
            <div
                class="w-full bg-zinc-800 transition-all duration-500 group-hover:bg-zinc-700"
                :style="{ height: `${day.target}%` }"
            ></div>
            <div
                class="w-full bg-white transition-all duration-500 group-hover:opacity-80"
                :style="{ height: `${day.actual}%` }"
            ></div>
          </div>
          <span class="text-[10px] font-mono text-zinc-500 uppercase">{{ day.name }}</span>
        </div>
      </div>
    </div>

    <!-- Right Column Metrics -->
    <div class="space-y-6">
      <div v-for="metric in sideMetrics" :key="metric.title" class="p-6 border border-zinc-800 bg-black group hover:bg-zinc-950 transition-colors">
        <div class="flex justify-between items-center mb-4">
          <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{{ metric.title }}</span>
          <span class="text-[10px] font-mono" :class="metric.isPositive ? 'text-white' : 'text-zinc-600'">
            {{ metric.isPositive ? '↑' : '↓' }} {{ metric.percent }}%
          </span>
        </div>
        <div class="flex justify-between items-end">
          <h4 class="text-3xl font-bold tracking-tighter">{{ metric.value }}</h4>
          <div class="h-8 w-24 flex items-end gap-0.5">
            <div
                v-for="i in 12"
                :key="i"
                class="flex-1 bg-zinc-800"
                :style="{ height: `${Math.random() * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const salesData = [
  { name: 'Mon', actual: 45, target: 60 },
  { name: 'Tue', actual: 52, target: 55 },
  { name: 'Wed', actual: 88, target: 70 },
  { name: 'Thu', actual: 65, target: 75 },
  { name: 'Fri', actual: 95, target: 80 },
  { name: 'Sat', actual: 40, target: 50 },
  { name: 'Sun', actual: 30, target: 45 },
]

const sideMetrics = [
  { title: 'Today Order Amt', value: '$12,450', percent: '12.4', isPositive: true },
  { title: 'Homepage Visits', value: '48,291', percent: '5.2', isPositive: true },
  { title: 'Avg. Item Price', value: '$84.20', percent: '2.1', isPositive: false },
]
</script>
