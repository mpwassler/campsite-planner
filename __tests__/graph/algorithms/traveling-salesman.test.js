import { Graph, Node, TSP } from "../../../graph/graph"

test('can get the shortest path through all nodes', () => {
  let graph = new Graph()

  graph.addNode(new Node("node 1"))
  graph.addNode(new Node("node 2"))
  graph.addNode(new Node("node 3"))
  graph.addNode(new Node("node 4"))

  graph.addEdge("node 1", "node 2", 10)
  graph.addEdge("node 1", "node 4", 20)
  graph.addEdge("node 1", "node 3", 15)
  graph.addEdge("node 2", "node 4", 25)
  graph.addEdge("node 2", "node 3", 35)
  graph.addEdge("node 4", "node 3", 30)

  expect(TSP(graph, "node 1")).toEqual([
    'node 1',
    'node 2',
    'node 4',
    'node 3',
    'node 1'
  ])
})
