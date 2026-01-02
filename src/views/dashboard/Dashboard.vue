<template>
  <div class="flex min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">

    <main class="flex-1 overflow-y-auto">

      <!-- Content -->
      <div class="space-y-8">
        <section>
          <div class="flex justify-between items-end mb-1">
            <h1 class="text-4xl font-bold tracking-tighter uppercase">Welcome, Mello User</h1>
            <p class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">LAST SYNC: {{ currentTime }}</p>
          </div>
          <p class="text-xs font-medium text-zinc-400 uppercase tracking-widest">
            Good to see you boss! System status: Nominal.
          </p>
        </section>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="metric in mainMetrics" :key="metric.label" class="p-6 border border-zinc-200 bg-white hover:border-zinc-400 transition-colors group">
            <div class="flex justify-between items-start mb-4">
              <div class="p-2 bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
                <component :is="metric.icon" class="w-4 h-4 text-zinc-400 group-hover:text-black" />
              </div>
              <div :class="['flex items-center gap-1 text-[10px] font-mono', metric.trend > 0 ? 'text-black' : 'text-zinc-400']">
                <span>{{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%</span>
                <TrendingUp v-if="metric.trend > 0" class="w-3 h-3" />
                <TrendingDown v-else class="w-3 h-3" />
              </div>
            </div>
            <p class="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">{{ metric.label }}</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold tracking-tight">{{ metric.value }}</h3>
              <span class="text-[10px] text-zinc-600 font-mono">{{ metric.subValue }}</span>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 p-6 border border-zinc-200 bg-white flex flex-col">
            <div class="flex justify-between items-center mb-8">
              <div>
                <h3 class="text-sm font-bold uppercase tracking-widest">Revenue Overview</h3>
                <p class="text-xs text-zinc-500">Weekly performance data</p>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 bg-black"></span>
                  <span class="text-[10px] text-zinc-500 uppercase">Sales</span>
                </div>
                <div class="flex items-center gap-1.5 ml-4">
                  <span class="w-2 h-2 bg-zinc-100 border border-zinc-200"></span>
                  <span class="text-[10px] text-zinc-500 uppercase">Target</span>
                </div>
              </div>
            </div>

            <div class="flex-1 min-h-[300px] flex items-end gap-2 px-2 pb-6 relative">
              <div class="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none">
                <div v-for="i in 5" :key="i" class="w-full border-t border-zinc-100 border-dashed"></div>
              </div>
              <div v-for="(day, idx) in salesData" :key="idx" class="flex-1 flex flex-col items-center gap-2 group relative z-10">
                <div class="w-full flex items-end justify-center gap-1 h-[200px]">
                  <div class="w-full bg-zinc-100 transition-all duration-500 group-hover:bg-zinc-200" :style="{ height: `${day.target}%` }"></div>
                  <div class="w-full bg-black transition-all duration-500 group-hover:opacity-80" :style="{ height: `${day.actual}%` }"></div>
                </div>
                <span class="text-[10px] font-mono text-zinc-500 uppercase">{{ day.name }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="metric in sideMetrics" :key="metric.title" class="p-6 border border-zinc-200 bg-white group hover:bg-zinc-50 transition-colors">
              <div class="flex justify-between items-center mb-4">
                <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{{ metric.title }}</span>
                <span :class="['text-[10px] font-mono', metric.isPositive ? 'text-black' : 'text-zinc-400']">
                  {{ metric.isPositive ? '↑' : '↓' }} {{ metric.percent }}%
                </span>
              </div>
              <div class="flex justify-between items-end">
                <h4 class="text-3xl font-bold tracking-tighter">{{ metric.value }}</h4>
                <div class="h-8 w-24 flex items-end gap-0.5">
                  <div v-for="i in 12" :key="i" class="flex-1 bg-zinc-100" :style="{ height: `${Math.random() * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="item in bottomMetrics" :key="item.label" class="p-6 border border-zinc-200 bg-white flex items-center justify-between group cursor-pointer hover:border-zinc-400 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 border border-zinc-200 flex items-center justify-center bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
                <component :is="item.icon" class="w-4 h-4 text-zinc-400 group-hover:text-black" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{{ item.label }}</p>
                <p class="text-xl font-bold tracking-tight">{{ item.value }}</p>
              </div>
            </div>
            <div class="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400">{{ item.change }}%</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  LayoutDashboard, ShoppingBag, Users, BarChart3, FileText, Settings,
  Package, CreditCard, Truck, Inbox, Search, TrendingUp, TrendingDown,
  DollarSign, Clock
} from 'lucide-vue-next'

const currentTime = ref('')
let timer

onMounted(() => {
  currentTime.value = new Date().toLocaleTimeString()
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

const navigation = [
  {
    title: 'Core',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, active: true },
      { name: 'Inventory', icon: Package, active: false },
      { name: 'Orders', icon: ShoppingBag, active: false }
    ]
  },
  {
    title: 'Management',
    items: [
      { name: 'Customers', icon: Users, active: false },
      { name: 'Payments', icon: CreditCard, active: false },
      { name: 'Shipping', icon: Truck, active: false }
    ]
  },
  {
    title: 'Reports',
    items: [
      { name: 'Analytics', icon: BarChart3, active: false },
      { name: 'Invoices', icon: FileText, active: false },
      { name: 'Messages', icon: Inbox, active: false }
    ]
  }
]

const mainMetrics = [
  { label: 'Delivery', value: '1,240', subValue: 'Processed', icon: Truck, trend: 12 },
  { label: 'Payment', value: '$42.5k', subValue: 'Waiting', icon: CreditCard, trend: -5 },
  { label: 'Items Uploaded', value: '892', subValue: 'This Month', icon: Package, trend: 24 },
  { label: 'Response Rate', value: '98.2%', subValue: 'Cancellation', icon: Inbox, trend: 2 }
]

const salesData = [
  { name: 'Mon', actual: 45, target: 60 },
  { name: 'Tue', actual: 52, target: 55 },
  { name: 'Wed', actual: 88, target: 70 },
  { name: 'Thu', actual: 65, target: 75 },
  { name: 'Fri', actual: 95, target: 80 },
  { name: 'Sat', actual: 40, target: 50 },
  { name: 'Sun', actual: 30, target: 45 }
]

const sideMetrics = [
  { title: 'Today Order Amt', value: '$12,450', percent: '12.4', isPositive: true },
  { title: 'Homepage Visits', value: '48,291', percent: '5.2', isPositive: true },
  { title: 'Avg. Item Price', value: '$84.20', percent: '2.1', isPositive: false }
]

const bottomMetrics = [
  { label: 'Avg. Order Amount', value: '$240.00', change: '+12.45', icon: DollarSign },
  { label: 'Total Pending Order', value: '42', change: '-2.10', icon: Clock },
  { label: 'Total Sale Amount', value: '$1.2M', change: '+18.50', icon: TrendingUp }
]
</script>