const fetch = require('node-fetch')
const url = require('url')
import Lodging from '../models/Lodging'

const baseUrl = `https://ridb.recreation.gov/api/v1/facilities/`

function setSearchURL(params) {
  let url = new URL(baseUrl)
  url.searchParams.set('limit', params.limit || 50)
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
  console.log(url)
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
