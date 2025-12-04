<template>
  <div class="bg-[#232a3b] rounded-xl p-6">
    <div class="flex items-center gap-2 mb-6">
      <h2 class="text-lg font-semibold">Edens Created This Week</h2>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </div>

    <!-- Table -->
    <table class="w-full">
      <thead>
      <tr class="text-gray-500 text-xs uppercase tracking-wider">
        <th class="text-left pb-4 font-medium">Name</th>
        <th class="text-left pb-4 font-medium">Group</th>
        <th class="text-left pb-4 font-medium">Status</th>
        <th class="text-left pb-4 font-medium">Due Date</th>
        <th class="text-left pb-4 font-medium">Complete</th>
        <th class="pb-4"></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, index) in tableData"
          :key="index"
          class="border-t border-gray-700/50"
      >
        <td class="py-5 pr-4">
          <span class="text-sm text-gray-200">{{ item.name }}</span>
        </td>
        <td class="py-5 pr-4">
          <span class="text-sm text-gray-400">{{ item.group }}</span>
        </td>
        <td class="py-5 pr-4">
            <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(item.status)"
            >
              {{ item.status }}
            </span>
        </td>
        <td class="py-5 pr-4">
          <span class="text-sm text-gray-400">{{ item.dueDate }}</span>
        </td>
        <td class="py-5 pr-4">
          <span class="text-sm text-gray-400">{{ item.complete }}</span>
        </td>
        <td class="py-5">
          <button class="flex items-center gap-1 text-gray-400 hover:text-white text-sm bg-[#2d3548] px-4 py-2 rounded-lg transition-colors">
            Remind All
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  tableData: Array,
  getStatusClass: Function,
})
</script>