const fetch = require('node-fetch')
const url = require('url')
import Lodging from '../models/Lodging'

const milesToMeters = (miles) => {
  return miles / 1609.344
}

const baseUrl = (lat, lon, radius) => ([
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
    `?location=${lat},${lon}`,
    `&radius=50000`,
    `&type=campground,lodging`,
    `&key=${process.env.GOOGLE_PLACES_KEY}`,
].join(""))

function setSearchURL(params) {
  return baseUrl(params.latitude, params.longitude, params.radius || 20.0)
}

const makeRequest = async (params) => {
  const url = setSearchURL(params)  
  const response = await fetch(url)
  return response.json()
}

export async function search(params) {  
  const jsonBody = await makeRequest(params)
  return jsonBody.results.map(place => {
    return new Lodging({
      lat: place.geometry.location.lat,
      lon: place.geometry.location.lng,
      name: place.name,
      thirdPartyId: place.place_id
    })
  }).slice(0, 20)
}


export default {
  search
}
