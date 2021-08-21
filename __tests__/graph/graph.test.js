import { Graph, Node } from "../../graph/graph.js"

describe(".addNode", () => {
  test('add a node', () => {
    let graph = new Graph()

    graph.addNode(new Node("node 1"))

    expect(graph.nodes.length).toBe(1)
    expect(graph.nodes[0]).toBe("node 1")
  })  
})

describe(".addEdge", () => {
  test('add an edge between nodes', () => {
    let graph = new Graph()

    graph.addNode(new Node("node 1"))
    graph.addNode(new Node("node 2"))

    graph.addEdge("node 1", "node 2")

    expect(graph.edges.length).toBe(2)
  })

  test('add weight to edges', () => {
    let graph = new Graph()

    graph.addNode(new Node("node 1"))
    graph.addNode(new Node("node 2"))

    graph.addEdge("node 1", "node 2", 1000)

    let edge = graph.edges[0]

    expect(edge.weight).toBe(1000)
  })
})

describe(".getEdges", () => {
  test('get the edgs of a node', () => {
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

    let edges = graph.getEdges("node 2")

    expect(edges.length).toBe(3)
    expect(edges.map(e => e.weight)).toEqual([10, 25, 35])
  })  
})

describe(".toMatrix", () => {
  test('represent the graph as a matrix', () => {
    let graph = new Graph()

    graph.addNode(new Node("milwake"))
    graph.addNode(new Node("Chiago"))
    graph.addNode(new Node("Indianapolis"))
    graph.addNode(new Node("Atlanta"))

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
})

describe("Graph.fromMatrix", () => {
  test('create a graph from a matrix', () => {
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
})

describe(".filterNodes", () => {
  test('filter nodes by type', () => {

    const indy = new Node("Indianapolis", { type: 'activity'})
    const atlanta = new Node("Atlanta", { type: 'activity'})
    
    const graph = new Graph()
    graph.addNode(new Node("Milwake",      { type: 'campsite'}))
    graph.addNode(new Node("Chiago",       { type: 'campsite'}))
    graph.addNode(indy)
    graph.addNode(atlanta)

    
    expect(graph.filterNodes(n => n.type == 'activity'))
      .toEqual([indy, atlanta])
  }) 
})

describe(".merge", () => {
  test('combines two graphs', () => {
    let graphA = Graph.fromMatrix([
      [0, 10, 15, 20],
      [10, 0, 35, 25],
      [15, 35, 0, 30],
      [20, 25, 30, 0]
    ], ["Milwake", "Chiago", "Indianapolis", "Atlanta"])

    let graphB = new Graph()
    graphB.addNode(new Node("Asheville"))
    graphB.addNode(new Node("Atlanta"))
    graphB.addNode(new Node("Indianapolis"))
    graphB.addNode(new Node("Milwake"))
    graphB.addEdge("Asheville", "Atlanta", 12)
    graphB.addEdge("Indianapolis", "Milwake", 15)

    expect(graphA.merge(graphB).toJson()).toEqual({
      nodes: [
        { name: 'Milwake' },
        { name: 'Chiago' },
        { name: 'Indianapolis' },
        { name: 'Atlanta' },
        { name: 'Asheville' }
      ],
      edges: [
        { from: 'Milwake', to: 'Indianapolis', weight: 15 },
        { from: 'Milwake', to: 'Chiago', weight: 10 },
        { from: 'Milwake', to: 'Atlanta', weight: 20 },
        { from: 'Chiago', to: 'Milwake', weight: 10 },
        { from: 'Chiago', to: 'Indianapolis', weight: 35 },
        { from: 'Chiago', to: 'Atlanta', weight: 25 },
        { from: 'Indianapolis', to: 'Milwake', weight: 15 },
        { from: 'Indianapolis', to: 'Chiago', weight: 35 },
        { from: 'Indianapolis', to: 'Atlanta', weight: 30 },
        { from: 'Atlanta', to: 'Asheville', weight: 12 },
        { from: 'Atlanta', to: 'Milwake', weight: 20 },
        { from: 'Atlanta', to: 'Chiago', weight: 25 },
        { from: 'Atlanta', to: 'Indianapolis', weight: 30 },
        { from: 'Asheville', to: 'Atlanta', weight: 12 }
      ]
    })
  })
})

describe(".toJson", () => {
  test('renders a json necodable format of the graph', () => {
    let graph = Graph.fromMatrix([
      [0, 10, 15, 20],
      [10, 0, 35, 25],
      [15, 35, 0, 30],
      [20, 25, 30, 0]
    ], ["Milwake", "Chiago", "Indianapolis", "Atlanta"])

    expect(graph.toJson()).toEqual({
      nodes: [
        { name: 'Milwake' },
        { name: 'Chiago' },
        { name: 'Indianapolis' },
        { name: 'Atlanta' }
      ],
      edges: [
        { from: 'Milwake', to: 'Chiago', weight: 10 },
        { from: 'Milwake', to: 'Indianapolis', weight: 15 },
        { from: 'Milwake', to: 'Atlanta', weight: 20 },
        { from: 'Chiago', to: 'Milwake', weight: 10 },
        { from: 'Chiago', to: 'Indianapolis', weight: 35 },
        { from: 'Chiago', to: 'Atlanta', weight: 25 },
        { from: 'Indianapolis', to: 'Milwake', weight: 15 },
        { from: 'Indianapolis', to: 'Chiago', weight: 35 },
        { from: 'Indianapolis', to: 'Atlanta', weight: 30 },
        { from: 'Atlanta', to: 'Milwake', weight: 20 },
        { from: 'Atlanta', to: 'Chiago', weight: 25 },
        { from: 'Atlanta', to: 'Indianapolis', weight: 30 }
      ]
    })
  }) 
})

describe("Graph.fromJson", () => {
  test('build a graph from the json format', () => {
    const data = {
      nodes: [
        { name: 'Milwake' },
        { name: 'Chiago' },
        { name: 'Indianapolis' },
        { name: 'Atlanta' }
      ],
      edges: [
        { from: 'Milwake', to: 'Chiago', weight: 10 },
        { from: 'Milwake', to: 'Indianapolis', weight: 15 },
        { from: 'Milwake', to: 'Atlanta', weight: 20 },
        { from: 'Chiago', to: 'Milwake', weight: 10 },
        { from: 'Chiago', to: 'Indianapolis', weight: 35 },
        { from: 'Chiago', to: 'Atlanta', weight: 25 },
        { from: 'Indianapolis', to: 'Milwake', weight: 15 },
        { from: 'Indianapolis', to: 'Chiago', weight: 35 },
        { from: 'Indianapolis', to: 'Atlanta', weight: 30 },
        { from: 'Atlanta', to: 'Milwake', weight: 20 },
        { from: 'Atlanta', to: 'Chiago', weight: 25 },
        { from: 'Atlanta', to: 'Indianapolis', weight: 30 }
      ]
    }

    const graph = Graph.fromJson(data)

    expect(graph.toMatrix()).toEqual([
      [0, 10, 15, 20],
      [10, 0, 35, 25],
      [15, 35, 0, 30],
      [20, 25, 30, 0],
    ])

  })
})