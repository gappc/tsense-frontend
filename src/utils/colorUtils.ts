export const macToRGB = (mac: string) => {
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

export const macToHexColor = (mac: string) => {
  const { r, g, b } = macToRGB(mac)
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
