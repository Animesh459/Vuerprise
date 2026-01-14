<template>
  <aside class="w-64 border-r border-zinc-800 flex flex-col bg-black text-white h-screen sticky top-0">
    <div class="p-6">
      <div class="flex items-center gap-2 group cursor-pointer">
        <div class="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
          <div class="w-4 h-4 bg-black rotate-45"></div>
        </div>
        <span class="text-xl font-bold tracking-tighter uppercase">Mello.</span>
      </div>
    </div>

    <nav class="flex-1 px-4 space-y-1 overflow-y-auto">
      <div v-for="(group, idx) in navigation" :key="idx" class="pb-6">
        <p class="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-3 px-2">
          {{ group.title }}
        </p>
        <div class="space-y-0.5">
          <a
              v-for="item in group.items"
              :key="item.name"
              href="#"
              class="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-sm"
              :class="item.active ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'"
          >
            <component :is="item.icon" class="w-4 h-4" />
            {{ item.name }}
          </a>
        </div>
      </div>
    </nav>

    <div class="p-4 border-t border-zinc-800">
      <div class="flex items-center gap-3 px-2 py-3">
        <div class="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
<!--          <img src="/placeholder.svg?height=32&width=32" alt="Avatar" />-->
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">Mello User</p>
          <p class="text-xs text-zinc-500 truncate">boss@mello.inc</p>
        </div>
        <Settings class="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />
      </div>
    </div>
  </aside>
</template>

<script setup>
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  FileText,
  Settings,
  Package,
  CreditCard,
  Truck,
  Inbox
} from 'lucide-vue-next'

const navigation = [
  {
    title: 'Core',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, active: true },
      { name: 'Inventory', icon: Package, active: false },
      { name: 'Orders', icon: ShoppingBag, active: false },
    ]
  },
  {
    title: 'Management',
    items: [
      { name: 'Customers', icon: Users, active: false },
      { name: 'Payments', icon: CreditCard, active: false },
      { name: 'Shipping', icon: Truck, active: false },
    ]
  },
  {
    title: 'Reports',
    items: [
      { name: 'Analytics', icon: BarChart3, active: false },
      { name: 'Invoices', icon: FileText, active: false },
      { name: 'Messages', icon: Inbox, active: false },
    ]
  }
]
</script>
