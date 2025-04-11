<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex">
      <ButtonCustom
        class="rounded-r-none"
        :class="[{ 'opacity-50': measurementType !== 'temp' }]"
        @click="measurementType = 'temp'"
      >
        Temperature
      </ButtonCustom>
      <ButtonCustom
        class="rounded-l-none"
        :class="[{ 'opacity-50': measurementType !== 'hum' }]"
        @click="measurementType = 'hum'"
      >
        Humidity
      </ButtonCustom>
    </div>
    <MeasurementChart
      v-if="loaded && error == null"
      class="w-full pl-8"
      :chartData="data"
      :measurement-type="measurementType"
    />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">
      <p>{{ error }}</p>
      <p>Try refreshing the page.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadSensorMeasurements } from '@/components/sensorMeasurements/useLoadSensorMeasurements'
import type { ChartData } from 'chart.js'
import { computed, ref } from 'vue'
import ButtonCustom from '../buttons/ButtonCustom.vue'
import MeasurementChart from './MeasurementChart.vue'
import type { MeasurementType } from './types'

const measurementType = ref<MeasurementType>('temp')

const { chartData, loading, loaded, error } = useLoadSensorMeasurements()

const data = computed<ChartData<'line'>>(() => {
  if (measurementType.value === 'temp') {
    return {
      datasets: chartData.value.datasets.filter((dataset) => dataset.label?.startsWith('temp')),
    }
  } else {
    return {
      datasets: chartData.value.datasets.filter((dataset) => dataset.label?.startsWith('hum')),
    }
  }
})
</script>
