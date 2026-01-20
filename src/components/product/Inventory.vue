<script setup>
import {
  LayersIcon, SearchIcon, PlusIcon, ChevronDownIcon, CheckIcon,
  ChevronLeftIcon, ChevronRightIcon, ZapIcon, ArrowDownCircleIcon,
  AlertCircleIcon, CalendarIcon, BoxIcon, ActivityIcon, AlertTriangleIcon, Search
} from 'lucide-vue-next'
import { ref } from 'vue'
import Pagination from "@/components/Pagination.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseCheckbox from "@/components/form/BaseCheckbox.vue";

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
  <div class="flex flex-col gap-6 mb-8 p-4 bg-white  transition-colors common-card-new group">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4 flex-1">
        <h1 class="text-lg items-center flex gap-1 font-bold text-gray-900">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center">
            <LayersIcon class="text-amber-400" :size="24" />
          </div>
          Colors & Inventory
        </h1>
        <div class="relative flex-1 w-full">
          <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <BaseInput customClass="pl-8" />
        </div>
      </div>
      <div class="flex gap-3">
        <button class="btn-primary-new flex gap-1 items-center">
          <PlusIcon :size="16" /> Add New Color
        </button>
        <button class="btn-secondary-new">
          X Close Color Panel
        </button>
      </div>
    </div>

    <!-- Color Selection Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">

      <div class="flex border-zinc-200 border p-2">
        <BaseCheckbox label="Beige/Dust Green" customClass="border-zinc-200 border p-2"
        />
      </div>
      <div class="flex border-zinc-200 border p-2">
        <BaseCheckbox label="Cream/Red" customClass="border-zinc-200 border p-2"
        />
      </div>
      <div class="flex border-zinc-200 border p-2">
        <BaseCheckbox label="Dark Green/Red" customClass="border-zinc-200 border p-2"
        />
      </div>
      <div class="flex border-zinc-200 border p-2">
        <BaseCheckbox label="Denim-Red" customClass="border-zinc-200 border p-2"
        />
      </div>
      <div class="flex border-zinc-200 border p-2">
        <BaseCheckbox label="Green" customClass="border-zinc-200 border p-2"
        />
      </div>
      <div class="flex border-zinc-200 border p-2">
        <BaseCheckbox label="Ivory" customClass="border-zinc-200 border p-2"
        />
      </div>

    </div>

    <div class="common-card-new">
      <h3 class="text-lg font-bold text-gray-900 mb-1">Inventory Management</h3>
      <p class="text-sm text-gray-700 mb-6">Manage stock levels for each color variant</p>

      <!-- Table -->
      <div class="table-container">
        <table class="table">
          <thead>
          <tr class="">
            <th class="">Color</th>
            <th class="">Physical qty</th>
            <th class="">Incoming qty</th>
            <th class="">Outgoing qty</th>
            <th class="">Projected qty</th>
            <th class="">Stock status</th>
            <th class="">Reorder level</th>
            <th class="">Expected arrival</th>
            <th class="">Action</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          <tr class="">
            <td class="">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <span class="font-medium text-gray-900">GREEN</span>
            </td>
            <td class="">0</td>
            <td class=""><span class="text-blue-600 font-semibold">0</span></td>
            <td class=""><span class="text-orange-600 font-semibold">0</span></td>
            <td class=""><span class="text-red-600 font-semibold">0</span></td>
            <td class=""><span class="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded">OUT OF STOCK</span></td>
            <td class="">0</td>
            <td class=" text-gray-400">yyyy-mm-dd</td>
            <td class=""><span class="text-red-600 font-semibold cursor-pointer hover:text-red-700">DELETE</span></td>
          </tr>
          <tr class="hover:bg-gray-50 transition border-b border-gray-100">
            <td class="">
              <div class="w-3 h-3 rounded-full bg-yellow-200"></div>
              <span class="font-medium text-gray-900">IVORY</span>
            </td>
            <td class="">0</td>
            <td class=""><span class="text-blue-600 font-semibold">0</span></td>
            <td class=""><span class="text-orange-600 font-semibold">0</span></td>
            <td class=""><span class="text-red-600 font-semibold">0</span></td>
            <td class=""><span class="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded">OUT OF STOCK</span></td>
            <td class="">0</td>
            <td class=" text-gray-400">yyyy-mm-dd</td>
            <td class=""><span class="text-red-600 font-semibold cursor-pointer hover:text-red-700">DELETE</span></td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-4 gap-6 mt-8">
        <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-600">TOTAL COLORS</h4>
            <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">2</p>
        </div>

        <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-green-50 to-white">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-600">TOTAL PHYSICAL STOCK</h4>
            <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">0</p>
        </div>

        <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-600">TOTAL PROJECTED STOCK</h4>
            <div class="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">0</p>
        </div>

        <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-red-50 to-white">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-600">NEED REORDER</h4>
            <div class="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">2</p>
        </div>
      </div>
    </div>
  </div>
</template>
