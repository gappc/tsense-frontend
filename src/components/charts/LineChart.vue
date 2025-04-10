<template>
  <div>
    <button @click="resetZoom">Reset Zoom</button>
    <Line ref="chartRef" :plugins="[Zoom]" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import Zoom from 'chartjs-plugin-zoom'
import { ref, toRefs } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LinearScale, TimeScale, PointElement, LineElement)

const props = defineProps<{
  chartData: ChartData<'line'>
}>()

const { chartData } = toRefs(props)

// Reference for the chart instance
const chartRef = ref<{ chart: ChartJS | null }>({ chart: null })

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          day: 'yyyy-MM-dd',
        },
      },
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
}

const resetZoom = () => {
  if (chartRef.value?.chart) {
    chartRef.value.chart.resetZoom()
  }
}
</script>
