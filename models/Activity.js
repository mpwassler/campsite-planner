import {Node} from '../graph/graph'

export default class Activity extends Node {
  constructor(properties = {}) {
    super(properties.name, {
      type: 'activity',
      properties: {
        ...properties
      }
    })
    this.name = properties.name
    this.lat  = properties.lat
    this.lon  = properties.lon
    this.id   = properties.id
  }

  toProperties() {
    return {
      name: this.name,
      lat: this.lat,
      lon: this.lon,
    }
  }
}
