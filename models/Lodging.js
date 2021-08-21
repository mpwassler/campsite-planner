const EnitiyMapping = `
    {
      name: $name,
      lat: $lat,
      lon: $lon,
      thirdPartyId: $thirdPartyId
    }
  `
const EnitiyName = 'Lodging'

export default class Lodging {

  constructor(attributes) {
    this.EnitiyName = EnitiyName
    this.EnitiyMapping = EnitiyMapping

    this.name = attributes.name
    this.lat   = attributes.lat
    this.lon   = attributes.lon
    this.thirdPartyId = attributes.thirdPartyId
    this.color = "#008b8b"   
  }

  get activities() {
    return this.activites
  }

  set activities(activities) {
    this.activites = activities
  }

  toProperties() {
    return {
      name: this.name,
      lat: this.lat,
      lon: this.lon,
      thirdPartyId: this.thirdPartyId
    }
  }
}
