<template>
  <div class="bg-default-table-row-even-bg data-[theme=bw]:bg-bw-table-row-even-bg rounded-xl p-6">
    <div class="flex items-center gap-2 mb-6">
      <h2 class="text-lg font-semibold text-default-text-primary data-[theme=bw]:text-bw-text-primary">Edens Created This Week</h2>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-default-text-primary data-[theme=bw]:text-bw-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </div>

    <!-- Table -->
    <table class="w-full">
      <thead>
      <tr class="text-default-table-header-text data-[theme=bw]:text-bw-table-header-text text-xs uppercase tracking-wider">
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
          class=""
      >
        <td class="py-5 pr-4">
          <span class="text-sm text-default-text-primary data-[theme=bw]:text-bw-text-primary">{{ item.name }}</span>
        </td>
        <td class="py-5 pr-4">
          <span class="text-sm text-default-text-primary data-[theme=bw]:text-bw-text-primary">{{ item.group }}</span>
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
          <span class="text-sm text-default-text-primary data-[theme=bw]:text-bw-text-primary">{{ item.dueDate }}</span>
        </td>
        <td class="py-5 pr-4">
          <span class="text-sm text-default-text-primary data-[theme=bw]:text-bw-text-primary">{{ item.complete }}</span>
        </td>
        <td class="py-5">
          <button class="flex items-center gap-1 text-default-button-secondary-text data-[theme=bw]:text-bw-button-secondary-text hover:text-white text-sm bg-default-button-secondary-bg data-[theme=bw]:bg-bw-button-secondary-bg px-4 py-2 rounded-lg transition-colors">
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
const tableData = [
  {
    name: "Eden's Product Design Process and UX Flow",
    group: "Designers",
    status: "In Progress",
    dueDate: "01/07/2021",
    complete: "24%"
  },
  {
    name: "Atlas: Personal Blog Template Publishing Process",
    group: "Developers",
    status: "In Complete",
    dueDate: "02/07/2021",
    complete: "32%"
  },
  {
    name: "Chameleon: E-commerce Mobile App Template",
    group: "Management",
    status: "Completed",
    dueDate: "03/07/2021",
    complete: "40%"
  },
  {
    name: "Eden's Product Design Process and UX Flow",
    group: "Social Media",
    status: "Follow Me",
    dueDate: "04/07/2021",
    complete: "48%"
  }
]

const getStatusClass = (status) => {
  const classes = {
    'In Progress': 'bg-gray-700/20 text-gray-400 border border-gray-500',
    'In Complete': 'bg-gray-700/20 text-gray-400 border border-gray-500',
    'Completed': 'bg-gray-700/20 text-gray-400 border border-gray-500',
    'Follow Me': 'bg-gray-700/20 text-gray-400 border border-gray-500'
  }
  return classes[status] || 'bg-gray-700/20 text-gray-400'
}
</script>