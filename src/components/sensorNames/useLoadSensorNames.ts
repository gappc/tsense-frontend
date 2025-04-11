import { ref } from 'vue'

export const useLoadSensorNames = () => {
  const sensorNames = ref<Record<string, string>>({})

  const loading = ref(true)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  fetch('https://tsense.gappc.net/api/config/sensor_names', {
    credentials: 'include',
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response
    })

    .then((response) => response.json())
    .then((data: Record<string, string>) => (sensorNames.value = data))
    .catch((error) => {
      const message = `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`
      error.value = message
    })
    .finally(() => {
      loading.value = false
      loaded.value = true
    })

  return { sensorNames, loading, loaded, error }
}
