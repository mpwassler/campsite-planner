const fetch = require('node-fetch')
const url = require('url')
import Lodging from '../models/Lodging'

const baseUrl = `https://ridb.recreation.gov/api/v1/facilities/`

function setSearchURL(params) {
  let url = new URL(baseUrl)
  
  // Mapbox's directions matrix can handle at
  // most 25 items at once. So these -1 for 
  // the activity is 24
  url.searchParams.set('limit', params.limit || 20)

  url.searchParams.set('offset', 0)
  url.searchParams.set('full', true)
  url.searchParams.set('activity', "CAMPING")
  url.searchParams.set('latitude', params.latitude)
  url.searchParams.set('longitude', params.longitude)
  url.searchParams.set('radius', params.radius || 20.0)
  url.searchParams.set('apikey', process.env.RECGOV_KEY)
  return url
}

export async function search(params) {
  const url = setSearchURL(params)  
  const response = await fetch(url)
  const jsonBody = await response.json()  
  return jsonBody.RECDATA.map(campground => {
    return new Lodging({
      lat: campground.FacilityLatitude,
      lon: campground.FacilityLongitude,
      name: campground.FacilityName,
      thirdPartyId: campground.FacilityID
    })
  })
}


export default {
  search
}
