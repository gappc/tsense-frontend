<template>
  <div>
    <LineChart v-if="loaded && error == null" :chartData="chartData" />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">
      <p>{{ error }}</p>
      <p>Try refreshing the page.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadSensorMeasurements } from '@/components/sensorMeasurements/useLoadSensorMeasurements'
import LineChart from '../charts/LineChart.vue'

const { chartData, loading, loaded, error } = useLoadSensorMeasurements()
</script>
