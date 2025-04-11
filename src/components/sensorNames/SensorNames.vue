<template>
  <div>
    <div>
      <span>Sensor Names</span>
      <button @click="showNames = !showNames">
        {{ showNames ? 'Hide' : 'Show' }} Sensor Names
      </button>
    </div>
    <ul v-if="showNames && loaded && error == null">
      <li v-for="(name, mac) in sensorNames" :key="mac">{{ name }} ({{ mac }})</li>
    </ul>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">
      <p>{{ error }}</p>
      <p>Try refreshing the page.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoadSensorNames } from './useLoadSensorNames'

const { sensorNames, loading, loaded, error } = useLoadSensorNames()

const showNames = ref(false)
</script>
