const fetch = require('node-fetch')
const url = require('url')

const baseUrl = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/`

export async function getRouteData(coordinates) {
  let urlString = coordinates.reduce( (carry, cord, cnt) => {
    if(cnt == coordinates.length -1 ) {
      return carry + `${cord.lon},${cord.lat}`
    } else {
      return carry + `${cord.lon},${cord.lat};`
    }
  }, '')
  console.log(urlString)
  let url = new URL(baseUrl + urlString)

  url.searchParams.set('annotations','distance,duration')
  url.searchParams.set('sources',0)
  url.searchParams.set('access_token', 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA')
  const response = await fetch(url)
  const jsonBody = await response.json()
  let { distances, durations } = jsonBody
  return { distances, durations }
}


export default {
  getRouteData
}
