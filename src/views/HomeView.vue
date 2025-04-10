<template>
  <main>
    <LineChart v-if="loaded && error == null" :chartData="chartData" />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">
      <p>{{ error }}</p>
      <p>Try refreshing the page.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import LineChart from '@/components/charts/LineChart.vue'
import { useLoadData } from './useLoadData'

const { chartData, loading, loaded, error } = useLoadData()
</script>
