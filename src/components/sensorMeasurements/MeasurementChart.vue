<template>
  <div>
    <ButtonCustom @click="resetZoom">Reset Zoom</ButtonCustom>
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
import ButtonCustom from '../buttons/ButtonCustom.vue'
import type { MeasurementType } from './types'

ChartJS.register(Title, Tooltip, Legend, LinearScale, TimeScale, PointElement, LineElement)

const props = defineProps<{
  chartData: ChartData<'line'>
  measurementType: MeasurementType
}>()

const { chartData, measurementType } = toRefs(props)

// Reference for the chart instance
const chartRef = ref<{ chart: ChartJS | null }>({ chart: null })

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      type: 'time',
      title: {
        display: true,
        text: 'Date',
      },
      time: {
        unit: 'day',
        displayFormats: {
          day: 'yyyy-MM-dd',
        },
      },
    },
    y: {
      type: 'linear',
      title: {
        display: true,
        text: measurementType.value === 'temp' ? 'Temperature (°C)' : 'Humidity (%)',
      },
      beginAtZero: true,
      ticks: {
        callback: (value) => value + (measurementType.value === 'temp' ? ' °C' : ' %'),
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          return measurementType.value === 'temp'
            ? `Temperature: ${context.parsed.y.toFixed(1)}°C`
            : `Humidity: ${context.parsed.y.toFixed(0)}%`
        },
      },
    },
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
