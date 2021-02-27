
export default class Activity {

  static EnitiyMapping = `
    {
      title: $title,
      lat: $lat,
      lon: $lon
    }
  `

  static EnitiyName = 'Activity'


  constructor(attributes) {
    this.EnitiyName = this.constructor.EnitiyName
    this.EnitiyMapping = this.constructor.EnitiyMapping
    let attrs = attributes || {}


    this.title = attrs.title
    this.lat   = attrs.lat
    this.lon   = attrs.lon
    this.id   = attrs.id
  }

  toProperties() {
    let json = {
      title: this.title,
      lat: this.lat,
      lon: this.lon,
    }
    if(this.id) json['id'] = this.id
    return json
  }
}
