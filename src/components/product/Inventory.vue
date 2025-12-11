<template>
  <div class="pt-10 border-t border-gray-800 mt-10" >
    <div class="">
      <h1 class="text-xl font-bold text-white mb-2">Colors & Inventory</h1>
      <header class="flex justify-between items-center mb-6">
        <div class="relative w-1/3">
          <input
              type="text"
              placeholder="Search colors, variants..."
              class="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#0284C7] transition duration-200"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <div class="flex space-x-4">
          <button class="px-5 py-2 text-sm font-medium text-white bg-[#0284C7] rounded-lg shadow-lg shadow-[#0284C7]/50 hover:bg-sky-700 transition duration-200">
            Add New Color
          </button>
          <button class="px-5 py-2 text-sm font-medium text-red-400 border border-red-400 rounded-lg hover:bg-red-400 hover:text-white transition duration-200">
            X Close Color Panel
          </button>
        </div>
      </header>

      <div class="grid grid-cols-4 gap-4 mb-6">
        <CustomCheckbox id="beige-dust-green" label="Beige/Dust Green" :isChecked="filters.beigeDustGreen" @toggle="filters.beigeDustGreen = !filters.beigeDustGreen" />
        <CustomCheckbox id="cream-red" label="Cream/Red" :isChecked="filters.creamRed" @toggle="filters.creamRed = !filters.creamRed" />
        <CustomCheckbox id="dark-green-red" label="Dark Green/Red" :isChecked="filters.darkGreenRed" @toggle="filters.darkGreenRed = !filters.darkGreenRed" />
        <CustomCheckbox id="denim-red" label="Denim/Red" :isChecked="filters.denimRed" @toggle="filters.denimRed = !filters.denimRed" />
      </div>

      <div class="flex justify-between items-center mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <div class="flex space-x-4">
          <div class="flex items-center text-sm font-medium text-gray-200 border border-green-500 rounded-full py-1 px-3 bg-green-900/50">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Green
          </div>
          <div class="flex items-center text-sm font-medium text-gray-200 border border-gray-400 rounded-full py-1 px-3 bg-gray-600/50">
            Ivory
          </div>
        </div>
        <div class="flex items-center text-sm text-gray-400">
          <span class="mr-4">1-6 off 6</span>
          <div class="flex space-x-2">
            <button class="p-2 border border-gray-700 text-gray-400 rounded-md hover:bg-gray-700 transition duration-200" disabled>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <span class="px-3 py-1 bg-gray-700 text-gray-200 rounded-md">1</span>
            <button class="p-2 border border-gray-700 text-gray-400 rounded-md hover:bg-gray-700 transition duration-200" disabled>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <h2 class="text-xl font-semibold text-gray-100 mb-2">Inventory Management</h2>
      <p class="text-sm text-gray-400 mb-6">Manage stock levels for each color variant</p>

      <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <table class="min-w-full divide-y divide-gray-700">
          <thead class="bg-gray-700/50">
          <tr>
            <th v-for="header in tableHeaders" :key="header.key" scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                :class="{'w-1/6': header.key === 'color', 'w-auto text-center': header.key !== 'color' && header.key !== 'action'}"
            >
              {{ header.label }}
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
          <tr v-for="item in inventory" :key="item.color" class="hover:bg-gray-700 transition duration-150">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              {{ item.color }}
            </td>
            <td class="px-3 py-2 text-center">
              <input type="number" v-model.number="item.physicalQty" class="w-20 bg-gray-900 border border-gray-700 text-center text-gray-200 rounded-md p-1 focus:border-[#0284C7] focus:ring-0 transition duration-150" min="0">
            </td>
            <td class="px-3 py-2 text-center">
              <div class="flex items-center justify-center space-x-2">
                <span class="text-sm text-sky-400 font-bold">{{ item.incomingQty }}</span>
                <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
            </td>
            <td class="px-3 py-2 text-center">
              <div class="flex items-center justify-center space-x-2">
                <span class="text-sm text-amber-400 font-bold">{{ item.outgoingQty }}</span>
                <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </td>
            <td class="px-3 py-2 text-center">
              <div class="flex items-center justify-center space-x-2">
                <span class="text-sm text-red-400 font-bold">{{ item.projectedQty }}</span>
                <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </td>
            <td class="px-3 py-2 text-center">
              <select v-model="item.stockStatus" class="bg-gray-900 border border-gray-700 text-gray-200 rounded-md p-1.5 focus:border-[#0284C7] focus:ring-0 transition duration-150">
                <option v-for="status in stockStatuses" :key="status" :value="status">{{ status }}</option>
              </select>
            </td>
            <td class="px-3 py-2 text-center">
              <input type="number" v-model.number="item.reorderLevel" class="w-20 bg-gray-900 border border-gray-700 text-center text-gray-200 rounded-md p-1 focus:border-[#0284C7] focus:ring-0 transition duration-150" min="0">
            </td>
            <td class="px-3 py-2 text-center">
              <input type="text" v-model="item.expectedArrival" class="w-24 bg-gray-900 border border-gray-700 text-center text-gray-200 rounded-md p-1 focus:border-[#0284C7] focus:ring-0 transition duration-150" placeholder="YYYY-MM-DD">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
              <button @click="deleteItem(item.color)" class="text-red-500 hover:text-red-400 transition duration-150">
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-8 grid grid-cols-4 gap-6">
        <div v-for="card in summaryCards" :key="card.title" class="p-5 bg-gray-800 rounded-lg shadow-xl border-t-4" :class="card.borderClass">
          <p class="text-3xl font-bold text-gray-100">{{ card.value }}</p>
          <p class="text-sm text-gray-400 mt-1">{{ card.title }}</p>
        </div>
      </div>

      <footer class="mt-8 flex justify-between items-center pt-6 border-t border-gray-700">
        <button class="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-600 rounded-lg hover:bg-gray-700 transition duration-200">
          Back To List
        </button>
        <div class="flex space-x-4">
          <button class="px-4 py-2 text-sm font-medium text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 transition duration-200">
            Previous
          </button>
          <button class="px-4 py-2 text-sm font-medium text-white bg-[#0284C7] rounded-lg hover:bg-sky-700 transition duration-200">
            Next
          </button>
        </div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CustomCheckbox from "@/components/CustomCheckbox.vue";


// --- STATE MANAGEMENT ---

const filters = ref({
  beigeDustGreen: false,
  creamRed: false,
  darkGreenRed: false,
  denimRed: false,
});

const stockStatuses = ['In Stock', 'Out of Stock', 'Low Stock', 'On Order'];

const inventory = ref([
  {
    color: 'Green',
    physicalQty: 0,
    incomingQty: 0,
    outgoingQty: 0,
    projectedQty: 0,
    stockStatus: 'Out of Stock',
    reorderLevel: 0,
    expectedArrival: 'YYYY-MM-DD'
  },
  {
    color: 'Ivory',
    physicalQty: 0,
    incomingQty: 0,
    outgoingQty: 0,
    projectedQty: 0,
    stockStatus: 'Out of Stock',
    reorderLevel: 0,
    expectedArrival: 'YYYY-MM-DD'
  },
  // Add more items here if needed
]);

const tableHeaders = [
  { key: 'color', label: 'Color' },
  { key: 'physicalQty', label: 'Physical Qty' },
  { key: 'incomingQty', label: 'Incoming Qty' },
  { key: 'outgoingQty', label: 'Outgoing Qty' },
  { key: 'projectedQty', label: 'Projected Qty' },
  { key: 'stockStatus', label: 'Stock Status' },
  { key: 'reorderLevel', label: 'Reorder Level' },
  { key: 'expectedArrival', label: 'Expected Arrival' },
  { key: 'action', label: 'Action' },
];

// --- COMPUTED VALUES ---

const totalColors = computed(() => inventory.value.length);
const totalPhysicalStock = computed(() => inventory.value.reduce((sum, item) => sum + (item.physicalQty || 0), 0));
const totalProjectedStock = computed(() => inventory.value.reduce((sum, item) => sum + (item.projectedQty || 0), 0));
const needReorder = computed(() => inventory.value.filter(item => item.stockStatus === 'Out of Stock' || (item.physicalQty < item.reorderLevel)).length);

const summaryCards = computed(() => [
  { title: 'Total Colors', value: totalColors.value, borderClass: 'border-blue-500' },
  { title: 'Total Physical Stock', value: totalPhysicalStock.value, borderClass: 'border-green-500' },
  { title: 'Total Projected Stock', value: totalProjectedStock.value, borderClass: 'border-yellow-500' },
  { title: 'Need Reorder', value: needReorder.value, borderClass: 'border-red-500' },
]);

// --- METHODS ---

const deleteItem = (color) => {
  inventory.value = inventory.value.filter(item => item.color !== color);
};
</script>