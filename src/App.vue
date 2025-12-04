<template>
  <div class="min-h-screen bg-[#1a1f2e] text-white font-sans">
    <Header />
    <Nav :tabs="tabs" v-model:activeTab="activeTab" />

    <!-- Main Content -->
    <main class="px-8 py-8">
      <Welcome />
      <EdensTable :table-data="tableData" :get-status-class="getStatusClass" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Welcome from './components/Welcome.vue'
import EdensTable from './components/EdensTable.vue'

const tabs = ['Home', 'Members', 'Audit Log', 'Billing', 'Configurations', 'Notifications']
const activeTab = ref('Home')

const tableData = [
  {
    name: "Eden's Product Design Process and UX Flow",
    group: 'Designers',
    status: 'In Progress',
    dueDate: '01/07/2021',
    complete: '24%'
  },
  {
    name: 'Atlas: Personal Blog Template Publishing Process',
    group: 'Developers',
    status: 'In Complete',
    dueDate: '02/07/2021',
    complete: '32%'
  },
  {
    name: 'Chameleon: E-commerce Mobile App Template',
    group: 'Management',
    status: 'Completed',
    dueDate: '03/07/2021',
    complete: '40%'
  },
  {
    name: "Eden's Product Design Process and UX Flow",
    group: 'Social Media',
    status: 'Follow Me',
    dueDate: '04/07/2021',
    complete: '48%'
  }
]

const getStatusClass = (status) => {
  const classes = {
    'In Progress': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'In Complete': 'bg-teal-500/20 text-teal-400 border border-teal-500/30',
    'Completed': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'Follow Me': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
  }
  return classes[status] || 'bg-gray-500/20 text-gray-400'
}
</script>