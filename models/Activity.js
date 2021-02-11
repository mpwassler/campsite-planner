
export default class Activity {

  constructor(attributes) {
    this.EnitiyName = 'Activity'

    this.EnitiyMapping = `
      {
        title: $title,
        lat: $lat,
        lon: $lon
      }
    `

    this.title = attributes.title
    this.lat   = attributes.lat
    this.lon   = attributes.lon
  }

  toProperties() {
    return {
      title: this.title,
      lat: this.lat,
      lon: this.lon,
    }
  }
}
