<template>
  <main class="flex flex-col gap-4 p-4">
    <SensorNames />
    <SensorMeasurements />
  </main>
</template>

<script setup lang="ts">
import SensorMeasurements from '@/components/sensorMeasurements/SensorMeasurements.vue'
import SensorNames from '@/components/sensorNames/SensorNames.vue'
</script>
