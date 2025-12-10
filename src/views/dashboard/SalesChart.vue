<template>
  <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-full">
    <apexchart
        height="250"
        type="line"
        :options="chartOptions"
        :series="series"
    />
  </div>
</template>

<script>
import ApexChart from "vue3-apexcharts";

export default {
  components: { apexchart: ApexChart },

  data() {
    return {
      series: [
        {
          name: "Sales",
          data: [10, 25, 18, 40, 55, 42, 60]
        }
      ],

      chartOptions: {
        chart: {
          toolbar: { show: false },
          foreColor: "#CBD5E1",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800
          }
        },
        stroke: {
          curve: "smooth",
          width: 3
        },
        grid: {
          borderColor: "rgba(255,255,255,0.1)"
        },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          labels: {
            style: { colors: "#94A3B8" }
          }
        },
        yaxis: {
          labels: {
            style: { colors: "#94A3B8" }
          }
        },
        colors: ["#38BDF8"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        }
      }
    };
  }
};
</script>
