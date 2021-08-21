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
  let url = new URL(baseUrl + urlString)
  url.searchParams.set('annotations','distance,duration')
  url.searchParams.set('sources',0)
  url.searchParams.set('access_token', 'pk.eyJ1IjoibXdhc3NsZXIiLCJhIjoiY2tzZ3g1ZmZ0MW84MDJ2bnZheHhpdDVqMyJ9.RZX9Op7ZzyxD6jolIxUFoA')
  const response = await fetch(url)
  const jsonBody = await response.json()  
  let { distances, durations } = jsonBody
  return { distances, durations }
}


export default {
  getRouteData
}
