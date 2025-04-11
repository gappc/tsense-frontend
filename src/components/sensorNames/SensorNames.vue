<template>
  <div>
    <div class="flex items-center gap-3">
      <span>Sensor Names</span>
      <button
        class="flex size-6 cursor-pointer items-center justify-center rounded border bg-gray-500 text-white hover:bg-gray-600"
        @click="showNames = !showNames"
      >
        {{ showNames ? '-' : '+' }}
      </button>
    </div>
    <ul v-if="showNames && loaded && error == null">
      <li
        v-for="(name, mac) in sensorNames"
        class="p-2"
        :style="`background: ${macToHexColor(mac)}`"
        :key="mac"
      >
        <span>{{ name }} ({{ mac }})</span>
      </li>
    </ul>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">
      <p>{{ error }}</p>
      <p>Try refreshing the page.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { macToHexColor } from '@/utils/colorUtils'
import { ref } from 'vue'
import { useLoadSensorNames } from './useLoadSensorNames'

const { sensorNames, loading, loaded, error } = useLoadSensorNames()

const showNames = ref(false)
</script>
