

<template>
  <div class="common-card">

    <div class="relative">
      <div class="">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
              Welcome, Mello user
            </h1>
            <p class="text-slate-400 text-lg">Good to see you boss!</p>
          </div>
          <button class="group relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:shadow-xl">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Item
          </button>
        </div>

      </div>

      <div class="">
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/30">
          <h2 class="text-2xl font-bold text-slate-100 mb-6">Projects</h2>
          <CustomTable :headers="tableHeaders" :data="tableData">
            <template #cell-status="{ item }">
              <div class="flex items-center gap-2">
                <div :class="{
                  'w-2 h-2 rounded-full': true,
                  'bg-emerald-500 animate-pulse': item.status === 'Complete',
                  'bg-amber-500 animate-pulse': item.status === 'In Progress',
                  'bg-red-500 animate-pulse': item.status === 'Blocked',
                }"></div>
                <span :class="{
                  'px-3 py-1 inline-flex text-xs font-semibold rounded-full transition-all duration-300': true,
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30': item.status === 'Complete',
                  'bg-amber-500/20 text-amber-300 border border-amber-500/30': item.status === 'In Progress',
                  'bg-red-500/20 text-red-300 border border-red-500/30': item.status === 'Blocked',
                }">
                  {{ item.status }}
                </span>
              </div>
            </template>

            <template #cell-owner="{ item }">
              <div class="flex items-center gap-3">
                <div :class="{
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white': true,
                  'bg-gradient-to-br from-pink-500 to-rose-600': item.owner === 'Alice',
                  'bg-gradient-to-br from-blue-500 to-cyan-600': item.owner === 'Bob',
                  'bg-gradient-to-br from-purple-500 to-indigo-600': item.owner === 'Charlie',
                  'bg-gradient-to-br from-green-500 to-emerald-600': item.owner === 'Dave',
                }">
                  {{ item.owner.charAt(0) }}
                </div>
                <span class="text-slate-300">{{ item.owner }}</span>
              </div>
            </template>

            <template #cell-actions="{ item }">
              <button class="group relative px-4 py-2 text-sm font-medium text-cyan-300 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/80">
                View
                <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </button>
            </template>
          </CustomTable>


          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 pt-12">
            <div v-for="stat in stats" :key="stat.label" class="group p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/80 transition-all duration-300">
              <p class="text-slate-400 text-sm mb-1">{{ stat.label }}</p>
              <p class="text-2xl font-bold text-slate-100">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CustomTable from '@/components/CustomTable.vue';

const tableHeaders = ref([
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Project Title' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]);

const tableData = ref([
  { id: 101, title: 'API Refactor', owner: 'Alice', status: 'Complete' },
  { id: 102, title: 'UX Redesign', owner: 'Bob', status: 'In Progress' },
  { id: 103, title: 'DB Migration', owner: 'Charlie', status: 'Blocked' },
  { id: 104, title: 'New Feature X', owner: 'Dave', status: 'In Progress' },
]);

const stats = computed(() => [
  { label: 'Total Projects', value: tableData.value.length },
  { label: 'Complete', value: tableData.value.filter(p => p.status === 'Complete').length },
  { label: 'In Progress', value: tableData.value.filter(p => p.status === 'In Progress').length },
  { label: 'Blocked', value: tableData.value.filter(p => p.status === 'Blocked').length },
]);
</script>

<style scoped>


</style>
