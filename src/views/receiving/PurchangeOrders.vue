<script setup>
import { ref } from 'vue';
import {
  ZapIcon, ArrowDownCircleIcon, AlertCircleIcon,
  ChevronDownIcon, TrashIcon, EditIcon, CalendarIcon
} from 'lucide-vue-next';
import Pagination from "@/components/Pagination.vue";

// Headers mapped directly from the screenshot
const tableHeaders = [
  'PO Number', 'Vendor', 'Dates', 'Shipping', 'Status', 'SKU / Item', 'Color/Size', 'Qty', 'Cost (FOB)', 'Actions'
];

const inventoryData = ref([
  {
    poNumber: 'PO-CHN-00125',
    vendor: 'Guangzhou Fashion',
    orderDate: 'yyyy-mm-dd',
    arrivalDate: 'yyyy-mm-dd',
    shipping: 'Sea Freight',
    status: 'Confirmed',
    sku: 'TS-MEN-101-BLK-M',
    item: 'Men T Shirt',
    color: 'Black',
    size: 'm',
    quantity: 300,
    unitCost: 3,
    totalCost: 900
  },
  {
    poNumber: '',
    vendor: '',
    orderDate: '',
    arrivalDate: '',
    shipping: '',
    status: '',
    sku: 'HD-WOM-205-WHT-L',
    item: 'Women Hoodie',
    color: 'White',
    size: 'l',
    quantity: 400,
    unitCost: 5,
    totalCost: 2000
  },
  {
    poNumber: 'PO-CHN-00126',
    vendor: 'JK Fashion',
    orderDate: 'n/a',
    arrivalDate: 'yyyy-mm-dd',
    shipping: 'Air',
    status: 'Draft',
    sku: 'JK-101-M-BLK',
    item: 'Women Top',
    color: 'Yellow',
    size: 'l',
    quantity: 500,
    unitCost: 7,
    totalCost: 3500
  },
  {
    poNumber: 'PO-CHN-00127',
    vendor: 'Shanghai Co',
    orderDate: 'yyyy-mm-dd',
    arrivalDate: 'yyyy-mm-dd',
    shipping: 'Sea Freight',
    status: 'Shipped',
    sku: 'SKU-000123',
    item: 'Gown',
    color: 'White',
    size: 's',
    quantity: 100,
    unitCost: 6,
    totalCost: 600
  }
]);

const statusColor = (status) => {
  switch(status) {
    case 'Confirmed': return 'text-emerald-400';
    case 'Shipped': return 'text-cyan-400';
    case 'Draft': return 'text-amber-400';
    default: return 'text-slate-500';
  }
};

const deleteRow = (index) => {
  inventoryData.value.splice(index, 1);
};
</script>

<template>
  <div class="common-card">
    <h1 class="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-8">
      Purchase Orders
    </h1>
    <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
      <table class="w-full text-left border-collapse min-w-[1200px]">
        <thead>
        <tr class="border-b border-slate-800 bg-slate-900/40">
          <th v-for="header in tableHeaders" :key="header" class="px-4 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            {{ header }}
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/50">
        <tr v-for="(row, index) in inventoryData" :key="index" class="group hover:bg-slate-900/50 transition-colors">
          <td class="px-4 py-4 font-mono text-xs text-cyan-500">{{ row.poNumber }}</td>
          <td class="px-4 py-4 text-xs font-bold text-slate-200">{{ row.vendor }}</td>

          <td class="px-4 py-4">
            <div class="flex flex-col gap-1 text-[10px] font-mono text-slate-500">
              <span>Ord: {{ row.orderDate }}</span>
              <span>Arr: {{ row.arrivalDate }}</span>
            </div>
          </td>

          <td class="px-4 py-4 text-xs text-slate-400">{{ row.shipping }}</td>

          <td class="px-4 py-4">
          <span v-if="row.status" :class="statusColor(row.status)" class="text-[10px] font-black uppercase tracking-tighter px-2 py-1 bg-slate-900 rounded-md border border-slate-800">
            {{ row.status }}
          </span>
          </td>

          <td class="px-4 py-4">
            <div class="flex flex-col">
              <span class="text-[11px] font-mono text-slate-300">{{ row.sku }}</span>
              <span class="text-[10px] text-slate-500">{{ row.item }}</span>
            </div>
          </td>

          <td class="px-4 py-4">
            <div class="flex gap-2 items-center">
              <span class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">{{ row.color }}</span>
              <span class="text-xs font-bold text-cyan-400 uppercase">{{ row.size }}</span>
            </div>
          </td>

          <td class="px-4 py-4 text-sm font-bold text-slate-200">{{ row.quantity }}</td>

          <td class="px-4 py-4">
            <div class="flex flex-col">
              <span class="text-xs text-emerald-400">${{ row.totalCost }}</span>
              <span class="text-[9px] text-slate-500">Unit: ${{ row.unitCost }}</span>
            </div>
          </td>

          <td class="px-4 py-4">
            <div class="flex items-center gap-1">
              <button class="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-white transition-all">
                <EditIcon :size="14" />
              </button>
              <button @click="deleteRow(index)" class="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-rose-500 transition-all">
                <TrashIcon :size="14" />
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-end justify-end pt-4">
      <Pagination />
    </div>
<!--    <Pagination />-->
  </div>

</template>