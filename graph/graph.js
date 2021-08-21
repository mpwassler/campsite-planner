import TSP from './algorithms/traveling-salesman'
import matchLodging from './algorithms/match-lodging'
import Node from './node'
import Edge from './edge'

class Graph {

  constructor() {
    this._nodes = {}
    this._nodeProps = {}
  }

  node(nodeName) {
    return this._nodeProps[nodeName]
  }

  delete(nodeName) {
    // construct a new graph minus the
    // node to be deleted and 
    // references to it
    const data = this.toJson()
    const mergedGraph = new Graph()
    data.nodes.forEach(n => {
      if (n.name != nodeName) {
        mergedGraph.addNode(new Node(n.name, n))
      }
    })
    data.edges.forEach(e => {
      if(e.to != nodeName && e.from != nodeName) {
        mergedGraph.addEdge(e.from, e.to, e.weight)
      }
    })
  
    return mergedGraph
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

  addNode(node) {
    this._nodes[node.name] = []
    this._nodeProps[node.name] = node
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

  filterNodes(filterFn) {
    return Object.values(this._nodeProps)
      .filter(filterFn)
  }

  merge(newGraph) {
    const mergedGraph = new Graph()
    Object.values(this._nodeProps)
      .forEach(n => mergedGraph.addNode(new Node(n.name, n)))
    const graphData = newGraph.toJson()
    graphData.nodes.forEach(n => mergedGraph.addNode(new Node(n.name, n)))
    graphData.edges.forEach(e => mergedGraph.addEdge(e.from, e.to, e.weight))
    this.edges.forEach(e => mergedGraph.addEdge(e.fromNode, e.toNode, e.weight))
    return mergedGraph
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

  toJson() {
    return {
      nodes: Object.values(this._nodeProps).map(n => n.toJson()),
      edges: this.edges.map(e => e.toJson())
    }
  }

  static fromMatrix(matrix, names) {
    let graph = new Graph()
    names.forEach(name => graph.addNode(new Node(name)))
    matrix.forEach( (row, index) => {
      let node = graph.nodes[index]
      for (var i = 0; i < row.length; i++) {
        graph.addEdge(node, graph.nodes[i], row[i])
      }
    })
    return graph
  }

  static fromJson(data) {
    const newGraph = new Graph()
    data.nodes.forEach(n => newGraph.addNode(new Node(n.name, n)))
    data.edges.forEach(e => {
      newGraph.addEdge(e.from, e.to, e.weight)
    })
    return newGraph
  }
}

export {
  Graph,
  Node,
  TSP,
  matchLodging
}
