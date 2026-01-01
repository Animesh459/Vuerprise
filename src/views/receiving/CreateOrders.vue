

<template>
  <div class="">
          <!-- Form Section -->
          <div class="common-card">
            <h2 class="text-xl font-bold mb-6">Order Details</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <!-- Vendor -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-400 mb-1">Vendor</label>
                <div class="relative">
                  <select class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                    <option>Select Vendor</option>
                    <option>Vendor A</option>
                    <option>Vendor B</option>
                  </select>
                  <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
                </div>
              </div>
              <!-- Arrival Date -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-400 mb-1">
                  Arrival Date
                </label>
                <input v-model="form.arrivalDate" type="date" class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none">
              </div>

              <!-- Create New Vendor Button -->
              <div class="flex items-end">
                <button class="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105">
                  Create New Vendor
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Shipping Method -->
              <div>
                <label class="block text-sm font-semibold text-zinc-300 mb-2">
                  Shipping Method
                </label>
                <select v-model="form.shippingMethod" class="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all">
                  <option>Sea Freight / Air</option>
                  <option>Ground</option>
                </select>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-semibold text-zinc-300 mb-2">
                  Status
                </label>
                <select v-model="form.status" class="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all">
                  <option>Draft</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Received</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="common-card">
            <div class="p-6 border-b border-zinc-800">
              <h2 class="text-lg font-bold">Order Items</h2>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                <tr class="bg-zinc-900/50 border-b border-zinc-800">
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">SKU</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Style</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Item</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Color</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Size</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Quantity</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Unit Cost</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider"></th>
                </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800">
                <tr v-for="(item, index) in items" :key="index" class="hover:bg-zinc-900/30 transition-colors">
                  <td class="px-6 py-4 text-sm text-zinc-300">{{ item.sku }}</td>
                  <td class="px-6 py-4 text-sm text-zinc-300">{{ item.style }}</td>
                  <td class="px-6 py-4 text-sm text-zinc-300">{{ item.item }}</td>
                  <td class="px-6 py-4 text-sm text-zinc-300">{{ item.color }}</td>
                  <td class="px-6 py-4 text-sm text-zinc-300">{{ item.size }}</td>
                  <td class="px-6 py-4 text-sm text-zinc-300">{{ item.quantity }}</td>
                  <td class="px-6 py-4 text-sm text-cyan-400 font-semibold">${{ item.cost }}</td>
                  <td class="px-6 py-4 text-sm">
                    <button @click="removeItem(index)" class="text-red-400 hover:text-red-300 transition-colors font-medium">
                      Remove
                    </button>
                  </td>
                </tr>
                <tr v-if="items.length === 0" class="hover:bg-zinc-900/30 transition-colors">
                  <td colspan="8" class="px-6 py-8 text-center text-zinc-500">No items added yet</td>
                </tr>
                </tbody>
              </table>
            </div>

            <div class="px-6 py-4 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
              <button @click="addItem" class="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                + Add New Item
              </button>
              <div class="text-right">
                <p class="text-zinc-400 text-sm">Total Items: <span class="text-cyan-400 font-bold">{{ items.length }}</span></p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 mt-8 justify-end">
            <button class="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              Cancel
            </button>
            <button @click="createPO" class="btn-common">
              Create PO
            </button>
          </div>
        </div>
</template>

<script setup>
import { ref } from 'vue'
import {ChevronDownIcon} from "lucide-vue-next";

const form = ref({
  vendor: '',
  arrivalDate: '',
  shippingMethod: 'Sea Freight / Air',
  status: 'Draft'
})

const items = ref([
  { sku: 'SKU001', style: 'Winter', item: 'Jacket', color: 'Black', size: 'M', quantity: 100, cost: '45.99' },
  { sku: 'SKU002', style: 'Winter', item: 'Jacket', color: 'Navy', size: 'L', quantity: 75, cost: '45.99' },
  { sku: 'SKU003', style: 'Winter', item: 'Jacket', color: 'Grey', size: 'XL', quantity: 50, cost: '45.99' }
])

const addItem = () => {
  items.value.push({
    sku: '',
    style: '',
    item: '',
    color: '',
    size: '',
    quantity: 0,
    cost: '0.00'
  })
}

const removeItem = (index) => {
  items.value.splice(index, 1)
}

const createPO = () => {
  console.log('Creating PO with data:', { form: form.value, items: items.value })
  alert('Purchase Order created successfully!')
}
</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}
</style>