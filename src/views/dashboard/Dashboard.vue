<template>
  <div class="  text-gray-100 ">

    <!-- Top Summary Grid -->
    <div class="grid grid-cols-4 gap-6">
      <SummaryCard title="Delivery" :items="[
        { label: 'New', value: 0 },
        { label: 'Processed', value: 0 },
      ]" borderClass="border-blue-500" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17H6v-4h13v4h-2M12 4v9h7" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 17L3 6h10v11H4z" />
    </svg>' />

      <SummaryCard title="Payment" :items="[
        { label: 'Waiting', value: 0 },
        { label: 'Promo', value: 0 },
      ]" borderClass="border-green-500" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>' />

      <SummaryCard title="Items Uploaded" :items="[
        { label: 'This Month', value: 0 },
        { label: 'Last Month', value: 0 },
      ]" borderClass="border-yellow-500" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>' />

      <SummaryCard title="Response" :items="[
        { label: 'Cancellation', value: 2 },
        { label: 'Return', value: 4 },
      ]" borderClass="border-red-500" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>' />
    </div>

    <div class="mt-10 grid grid-cols-3 gap-6">

      <div class="col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10">
        <h2 class="text-lg font-semibold mb-4">Selling</h2>
        <div class=" flex items-center justify-center text-gray-500 text-sm">
          <SalesChart />
        </div>
      </div>

      <div class="space-y-5">

        <StatsCard title="Today Order Amt" value="$0" sub="Yesterday: $0" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    </svg>'/>

        <StatsCard title="Today Homepage Visits" value="38" sub="Last Month: 2795" positive percentage="5.2" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>'/>

        <StatsCard title="AVG. Items Price" value="$0" sub="Yesterday AVG: $0" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    </svg>'/>

      </div>
    </div>

    <div class="mt-8 grid grid-cols-3 gap-6">
      <StatsCard title="AVG. Order Amount" value="$0" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    </svg>'/>
      <StatsCard title="Total Pending Order" value="$0" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>'/>
      <StatsCard title="Total Sale Amount" value="$0" icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    </svg>'/>
    </div>

  </div>
</template>

<script>
import SummaryCard from './SummaryCard.vue'
import StatsCard from './StatsCard.vue'
import SalesChart from "@/views/dashboard/SalesChart.vue";

export default {
  components: {SalesChart, SummaryCard, StatsCard }
}
</script>
