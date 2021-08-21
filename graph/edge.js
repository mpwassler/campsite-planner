export default class Edge {
  constructor(nodeA, nodeB, weight) {
    this.fromNode  = nodeA
    this.toNode    = nodeB
    this.weight    = weight
  }

  from(graph) {
    return graph.node(this.fromNode)
  }

  to(graph) {
    return graph.node(this.toNode)  
  }

  toJson() {
    return { 
      from: this.fromNode, 
      to: this.toNode,
      weight: this.weight
    }
  }
}