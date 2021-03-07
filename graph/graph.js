import TSP from './algorithms/traveling-salesman'

class Edge {
  constructor(nodeA, nodeB, weight) {
    this.fromNode  = nodeA
    this.toNode    = nodeB
    this.weight    = weight
  }
}

class Graph {

  constructor() {
    this._nodes = {}
  }

  get nodes() {
    return Object.keys(this._nodes)
  }

  get edges() {
    let edges = []
    Object.keys(this._nodes).forEach( n => {
      edges.push(...this._nodes[n])
    })
    return edges
  }

  addNode(label) {
    this._nodes[label] = []
  }

  addEdge(nodeA, nodeB, weight) {
    if(nodeA == nodeB) return

    if (!this.hasEdge(nodeA, nodeB)) {
      this._nodes[nodeA].push(new Edge(nodeA, nodeB, weight))
    }

    if (!this.hasEdge(nodeB, nodeA)) {
      this._nodes[nodeB].push(new Edge(nodeB, nodeA, weight))
    }

  }

  hasEdge(nodeA, nodeB) {
    return !!this.edges.find((edge) => {
      return edge.fromNode == nodeA && edge.toNode == nodeB
    })
  }

  getEdges(node) {
    return this._nodes[node]
  }

  toMatrix() {
    return this.nodes.map(n => {
      let edges = this.getEdges(n)
      let selfEdge = new Edge(n, n, 0)
      edges.push(selfEdge)

      return edges.sort( (a, b) => {
        let aIndex = this.nodes.indexOf(a.toNode)
        let bIndex = this.nodes.indexOf(b.toNode)
        return aIndex - bIndex
      }).map(e => e.weight)
    })
  }

  static fromMatrix(matrix, names) {
    let graph = new Graph()
    names.forEach(name => graph.addNode(name))
    matrix.forEach( (row, index) => {
      let node = graph.nodes[index]
      for (var i = 0; i < row.length; i++) {
        graph.addEdge(node, graph.nodes[i], row[i])
      }
    })
    return graph
  }
}

export {
  Graph,
  TSP
}
