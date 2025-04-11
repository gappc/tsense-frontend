import type { ChartData, ChartDataset, Point } from 'chart.js'
import { ref } from 'vue'

interface Measurement {
  mac: string
  t: number
  h: number
  timestamp: string
}

export const useLoadSensorMeasurements = () => {
  const chartData = ref<ChartData<'line'>>({
    datasets: [],
  })

  const loading = ref(true)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  fetch('https://tsense.gappc.net/api/measurements?limit=2000', {
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
    .then((data: { measurements: Measurement[] }) => {
      const datasets: ChartDataset<'line'>[] = data.measurements.reduce(
        (acc: ChartDataset<'line'>[], measurement) => {
          const existingDataset = acc.find((dataset) => dataset.label === measurement.mac)
          if (existingDataset) {
            existingDataset.data.push(toTemperaturePoint(measurement))
          } else {
            const color = macToHexColor(measurement.mac)
            acc.push({
              label: measurement.mac,
              backgroundColor: color,
              borderColor: color,
              data: [toTemperaturePoint(measurement)],
              borderWidth: 1,
              borderDash: [2, 2],
            })
          }
          return acc
        },
        [],
      )

      chartData.value = {
        ...chartData.value,
        datasets,
      }
    })
    .catch((error) => {
      const message = `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`
      error.value = message
    })
    .finally(() => {
      loading.value = false
      loaded.value = true
    })

  return { chartData, loading, loaded, error }
}

const toTemperaturePoint = (measurement: Measurement): Point => ({
  x: new Date(measurement.timestamp).getTime(),
  y: measurement.t,
})

const macToRGB = (mac: string) => {
  const hex = mac.replace(/[:-]/g, '').toLowerCase()

  // Convert pairs to byte values
  const bytes = []
  for (let i = 0; i < 12; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16))
  }

  // Mix all 6 bytes into R, G, B by summing alternate bytes
  const r = (bytes[0] + bytes[3]) % 256
  const g = (bytes[1] + bytes[4]) % 256
  const b = (bytes[2] + bytes[5]) % 256

  return { r, g, b }
}

const macToHexColor = (mac: string) => {
  const { r, g, b } = macToRGB(mac)
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
