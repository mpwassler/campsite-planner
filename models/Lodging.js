
export default class Lodging {

  constructor(attributes) {
    this.EnitiyName = 'Lodging'

    this.EnitiyMapping = `
      {
        name: $name,
        lat: $lat,
        lon: $lon,
        thirdPartyId: $thirdPartyId
      }
    `

    this.name = attributes.name
    this.lat   = attributes.lat
    this.lon   = attributes.lon
    this.thirdPartyId = attributes.thirdPartyId
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
