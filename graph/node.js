export default class Node {
  constructor(name, opts = {}) {
    this.name  = name
    this.type  = opts.type || null
    this.properties = opts.properties || null
  }

  edges(graph) {
    return graph.getEdges(this.name)
  }

  edgeCount(graph) {
    console.log(this.name)
    this.edges(graph).length
  }

  filerEdges(filterFc) {
    return this.edges().filter(filterFc)
  }

  toJson() {
    let json = { name: this.name }
    this.type ? json["type"] = this.type : json
    this.properties ? json["properties"] = this.properties : json
    return json
  }
}