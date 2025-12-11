<template>
  <div class="  text-gray-100 ">

    <!-- Top Summary Grid -->
    <div class="grid grid-cols-4 gap-6">
      <SummaryCard title="Delivery" :items="[
        { label: 'New', value: 0 },
        { label: 'Processed', value: 0 },
        {borderClass: 'border-blue-500'}
      ]" />

      <SummaryCard title="Payment" :items="[
        { label: 'Waiting', value: 0 },
        { label: 'Promo', value: 0 },
        {borderClass: 'border-green-500' }
      ]" />

      <SummaryCard title="Items Uploaded" :items="[
        { label: 'This Month', value: 0 },
        { label: 'Last Month', value: 0 },
        {borderClass: 'border-yellow-500' }
      ]" />

      <SummaryCard title="Response" :items="[
        { label: 'Cancellation', value: 2 },
        { label: 'Return', value: 4 },
        { borderClass: 'border-red-500' }
      ]" />
    </div>

    <div class="mt-10 grid grid-cols-3 gap-6">

      <div class="col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10">
        <h2 class="text-lg font-semibold mb-4">Selling</h2>
        <div class=" flex items-center justify-center text-gray-500 text-sm">
          <SalesChart />
        </div>
      </div>

      <div class="space-y-5">

        <StatsCard title="Today Order Amt" value="$0" sub="Yesterday: $0" />

        <StatsCard title="Today Homepage Visits" value="38" sub="Last Month: 2795" positive />

        <StatsCard title="AVG. Items Price" value="$0" sub="Yesterday AVG: $0" />

      </div>
    </div>

    <div class="mt-8 grid grid-cols-3 gap-6">
      <StatsCard title="AVG. Order Amount" value="$0" />
      <StatsCard title="Total Pending Order" value="$0" />
      <StatsCard title="Total Sale Amount" value="$0" />
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
