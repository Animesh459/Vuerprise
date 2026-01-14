<template>
  <div class="flex  text-black">

    <main class="flex-1 overflow-y-auto">
      <section class="flex flex-col  pb-4">
        <div class="flex justify-between items-end mb-1">
          <h1 class="text-3xl font-bold tracking-tighter ">Welcome, Mello User</h1>
          <p class="text-xs font-mono text-zinc-500 uppercase tracking-widest">LAST SYNC: {{ currentTime }}</p>
        </div>
        <p class="text-sm text-text-muted-light mt-1">
          Good to see you boss! System status: Nominal.
        </p>
      </section>
      <!-- Content -->
      <div class="common-card-new space-y-4">


        <!-- Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            v-for="metric in mainMetrics"
            :key="metric.label"
            :title="metric.label"
            :value="metric.value"
            :icon="metric.iconName"
            :color="metric.color"
            :trend="{ value: `${metric.trend > 0 ? '+' : ''}${metric.trend}%`, positive: metric.trend > 0 }"
          />
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 p-6 border border-zinc-200 bg-white rounded-xl flex flex-col">
            <div class="flex justify-between items-center mb-8">
              <div>
                <h3 class="text-sm font-bold uppercase tracking-widest">Revenue Overview</h3>
                <p class="text-xs text-zinc-500">Weekly performance data</p>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 bg-blue-600"></span>
                  <span class="text-xs text-zinc-500 uppercase">Sales</span>
                </div>
                <div class="flex items-center gap-1.5 ml-4">
                  <span class="w-2 h-2 bg-blue-100 border border-blue-200"></span>
                  <span class="text-xs text-zinc-500 uppercase">Target</span>
                </div>
              </div>
            </div>

            <div class="flex-1 min-h-[300px] flex items-end gap-2 px-2 pb-6 relative">
              <div class="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none">
                <div v-for="i in 5" :key="i" class="w-full border-t border-zinc-100 border-dashed"></div>
              </div>
              <div v-for="(day, idx) in salesData" :key="idx" class="flex-1 flex flex-col items-center gap-2 group relative z-10">
                <div class="w-full flex items-end justify-center gap-1 h-[200px]">
                  <div class="w-full bg-blue-100 transition-all duration-500 group-hover:bg-blue-200" :style="{ height: `${day.target}%` }"></div>
                  <div class="w-full bg-blue-600 transition-all duration-500 group-hover:bg-blue-500" :style="{ height: `${day.actual}%` }"></div>
                </div>
                <span class="text-xs font-mono text-zinc-500 uppercase">{{ day.name }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <StatsCard
              v-for="metric in sideMetrics"
              :key="metric.title"
              :title="metric.title"
              :value="metric.value"
              :icon="metric.iconName"
              :color="metric.color"
              :trend="{ value: metric.percent + '%', positive: metric.isPositive }"
            />
          </div>
        </div>

        <!-- Bottom Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            v-for="item in bottomMetrics"
            :key="item.label"
            :title="item.label"
            :value="item.value"
            :icon="item.iconName"
            :color="item.color"
            :trend="{ value: item.change + '%', positive: item.change.startsWith('+') }"
          />
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
import StatsCard from './StatsCard.vue'

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
  { label: 'Delivery', value: '1,240', subValue: 'Processed', icon: Truck, iconName: 'truck', color: 'primary', trend: 12 },
  { label: 'Payment', value: '$42.5k', subValue: 'Waiting', icon: CreditCard, iconName: 'credit-card', color: 'warning', trend: -5 },
  { label: 'Items Uploaded', value: '892', subValue: 'This Month', icon: Package, iconName: 'package', color: 'success', trend: 24 },
  { label: 'Response Rate', value: '98.2%', subValue: 'Cancellation', icon: Inbox, iconName: 'inbox', color: 'info', trend: 2 }
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
  { title: 'Today Order Amt', value: '$12,450', percent: '12.4', isPositive: true, iconName: 'shopping-cart', color: 'success' },
  { title: 'Homepage Visits', value: '48,291', percent: '5.2', isPositive: true, iconName: 'users', color: 'primary' },
  { title: 'Avg. Item Price', value: '$84.20', percent: '2.1', isPositive: false, iconName: 'currency-dollar', color: 'danger' }
]

const bottomMetrics = [
  { label: 'Avg. Order Amount', value: '$240.00', change: '+12.45', icon: DollarSign, iconName: 'currency-dollar', color: 'success' },
  { label: 'Total Pending Order', value: '42', change: '-2.10', icon: Clock, iconName: 'clock', color: 'warning' },
  { label: 'Total Sale Amount', value: '$1.2M', change: '+18.50', icon: TrendingUp, iconName: 'trending-up', color: 'primary' }
]
</script>