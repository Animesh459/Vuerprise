<template>

  <!-- Welcome Section -->
  <div class=" common-card">
    <div class="flex items-start justify-between mb-8 ">
      <div>
        <h1 class="text-3xl font-semibold italic mb-1">Welcome, Mello user 👋</h1>
        <p class="text-default-text-primary data-[theme=bw]:text-bw-text-primary">Good to see you boss!</p>
      </div>
      <button class="flex items-center gap-2 bg-default-button-primary-bg data-[theme=bw]:bg-bw-button-primary-bg hover:bg-default-button-primary-bg data-[theme=bw]:hover:bg-bw-button-primary-bg text-white px-5 py-2.5 rounded-full font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Create Item
      </button>
    </div>
    <CustomTable :headers="tableHeaders" :data="tableData">

      <template #cell-status="{ item }">
        <span
            :class="{
            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
            'btn-success': item.status === 'Complete',
            'btn-primary': item.status === 'In Progress',
            'btn-danger': item.status === 'Blocked',
          }"
        >
          {{ item.status }}
        </span>
      </template>

      <template #cell-actions="{ item }">
        <button  class="btn-secondary">
          View
        </button>
      </template>
    </CustomTable>
  </div>

</template>


<script setup>
    import Table from "@/components/Table.vue";
    import CustomTable from "@/components/CustomTable.vue";
    import {ref} from "vue";

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

</script>

