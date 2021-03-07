import { Graph } from "../../graph/graph.js"

test('can add a node', () => {
  let graph = new Graph()

  graph.addNode("node 1")

  expect(graph.nodes.length).toBe(1)
  expect(graph.nodes[0]).toBe("node 1")
})


test('can add an edge between nodes', () => {
  let graph = new Graph()

  graph.addNode("node 1")
  graph.addNode("node 2")

  graph.addEdge("node 1", "node 2")

  expect(graph.edges.length).toBe(2)
})

test('can add weight to edges', () => {
  let graph = new Graph()

  graph.addNode("node 1")
  graph.addNode("node 2")

  graph.addEdge("node 1", "node 2", 1000)

  let edge = graph.edges[0]

  expect(edge.weight).toBe(1000)
})

test('can get the edgs of a node', () => {
  let graph = new Graph()

  graph.addNode("node 1")
  graph.addNode("node 2")
  graph.addNode("node 3")
  graph.addNode("node 4")

  graph.addEdge("node 1", "node 2", 10)
  graph.addEdge("node 1", "node 4", 20)
  graph.addEdge("node 1", "node 3", 15)
  graph.addEdge("node 2", "node 4", 25)
  graph.addEdge("node 2", "node 3", 35)
  graph.addEdge("node 4", "node 3", 30)

  let edges = graph.getEdges("node 2")

  expect(edges.length).toBe(3)
  expect(edges.map(e => e.weight)).toEqual([10, 25, 35])
})

test('can represent the graph as a matrix', () => {
  let graph = new Graph()

  graph.addNode("milwake")
  graph.addNode("Chiago")
  graph.addNode("Indianapolis")
  graph.addNode("Atlanta")

  graph.addEdge("milwake", "Chiago", 10)
  graph.addEdge("milwake", "Atlanta", 20)
  graph.addEdge("milwake", "Indianapolis", 15)
  graph.addEdge("Chiago", "Atlanta", 25)
  graph.addEdge("Chiago", "Indianapolis", 35)
  graph.addEdge("Atlanta", "Indianapolis", 30)

  expect(graph.toMatrix()).toEqual([
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0],
  ])
})


test('can create a graph from a matrix', () => {
  let graph = Graph.fromMatrix([
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
  ], ["Milwake", "Chiago", "Indianapolis", "Atlanta"])

  let edges = graph.getEdges("Milwake")

  expect(edges.length).toBe(3)
  expect(edges.map(e => e.weight)).toEqual([10, 15, 20])
  expect(graph.nodes).toEqual(["Milwake", "Chiago", "Indianapolis", "Atlanta"])
})
