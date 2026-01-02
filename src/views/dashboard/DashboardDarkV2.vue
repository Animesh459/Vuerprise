<template>
  <div class="flex min-h-screen bg-black font-sans text-white selection:bg-white selection:text-black">
    <!-- Integrating the Sidebar component -->
    <Sidebar />

    <main class="flex-1 overflow-y-auto">
      <!-- Header / Top Bar -->
      <header class="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-500">Overview / Dashboard</h2>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative group">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input
                type="text"
                placeholder="Command + K to search..."
                class="bg-zinc-900 border border-zinc-800 h-9 pl-9 pr-4 text-[10px] uppercase font-bold tracking-tight w-64 focus:outline-none focus:border-zinc-700 transition-all"
            />
          </div>
          <div class="flex items-center gap-2 border-l border-zinc-800 pl-6">
            <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Live</span>
          </div>
        </div>
      </header>


      <div class="p-8 space-y-8 max-w-[1600px] mx-auto">
        <!-- Welcome Section -->
        <section>
          <div class="flex justify-between items-end mb-1">
            <h1 class="text-4xl font-bold tracking-tighter uppercase">Welcome, Mello User</h1>
            <p class="text-[10px] font-mono text-zinc-500">LAST SYNC: {{ currentTime }}</p>
          </div>
          <p class="text-xs font-medium text-zinc-400 uppercase tracking-widest">Good to see you boss! System status: Nominal.</p>
        </section>

        <!-- Top Stat Cards (Horizontal Row) -->
        <!-- Using the MetricCard component for the top statistics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
              label="Delivery"
              value="1,240"
              subValue="Processed"
              :icon="Truck"
              :trend="12"
          />
          <MetricCard
              label="Payment"
              value="$42.5k"
              subValue="Waiting"
              :icon="CreditCard"
              :trend="-5"
          />
          <MetricCard
              label="Items Uploaded"
              value="892"
              subValue="This Month"
              :icon="Package"
              :trend="24"
          />
          <MetricCard
              label="Response Rate"
              value="98.2%"
              subValue="Cancellation"
              :icon="Inbox"
              :trend="2"
          />
        </div>

        <!-- Main Chart & Side Metrics Grid -->
        <!-- Integrating the Charts component which contains the main revenue graph -->
        <Charts />

        <!-- Bottom Detail Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="item in bottomMetrics" :key="item.label" class="p-6 border border-zinc-800 bg-black flex items-center justify-between group cursor-pointer hover:border-zinc-600 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 border border-zinc-800 flex items-center justify-center bg-zinc-950 group-hover:bg-zinc-900 transition-colors">
                <component :is="item.icon" class="w-4 h-4 text-zinc-500 group-hover:text-white" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">{{ item.label }}</p>
                <p class="text-xl font-bold tracking-tight">{{ item.value }}</p>
              </div>
            </div>
            <div class="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400">
              {{ item.change }}%
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Search,
  Truck,
  CreditCard,
  Package,
  Inbox,
  DollarSign,
  Clock,
  TrendingUp
} from 'lucide-vue-next'
import Sidebar from './Sidebar.vue'
import MetricCard from './MetricCard.vue'
import Charts from './Charts.vue'

const currentTime = ref(new Date().toLocaleTimeString())

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)
})

const bottomMetrics = [
  { label: 'Avg. Order Amount', value: '$240.00', change: '+12.45', icon: DollarSign },
  { label: 'Total Pending Order', value: '42', change: '-2.10', icon: Clock },
  { label: 'Total Sale Amount', value: '$1.2M', change: '+18.50', icon: TrendingUp }
]
</script>
