import {assignColor} from '../lib/colorpicker'

export default class Lodging {

  static EnitiyMapping = `
    {
      name: $name,
      lat: $lat,
      lon: $lon,
      thirdPartyId: $thirdPartyId
    }
  `

  static EnitiyName = 'Lodging'

  constructor(attributes) {
    this.EnitiyName = this.constructor.EnitiyName
    this.EnitiyMapping = this.constructor.EnitiyMapping

    this.name = attributes.name
    this.lat   = attributes.lat
    this.lon   = attributes.lon
    this.thirdPartyId = attributes.thirdPartyId
    this.color = assignColor()
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
