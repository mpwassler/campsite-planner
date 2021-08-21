// A custom version of degree centrality to use the node weights as
// a fallback when number of connections is equal
import { Graph, Node, matchLodging } from "../../../graph/graph"

describe('matchLodging', () => {
  test('matches the node with the most connections', () => {
    let graph = new Graph()

    const activityOne = new Node("activity 1", {
      type: 'activity'
    })

    const activityTwo = new Node("activity 2", {
      type: 'activity'
    })

    const atlanta = new Node("atlanta", {
      type: 'campsite'
    })

    const chicago = new Node("chicago", {
      type: 'campsite'
    })

    const cincinnati = new Node("cincinnati", {
      type: 'campsite'
    })

    const stlouis = new Node("stlouis", {
      type: 'campsite'
    })

    graph.addNode(activityOne)
    graph.addNode(atlanta)
    graph.addNode(chicago)
    graph.addNode(cincinnati)
    
    graph.addNode(activityTwo)
    graph.addNode(atlanta)
    graph.addNode(stlouis)

    graph.addEdge(activityOne.name, atlanta.name, 1)
    graph.addEdge(activityOne.name, chicago.name, 1)
    graph.addEdge(activityOne.name, cincinnati.name, 1)

    graph.addEdge(activityTwo.name, atlanta.name, 1)
    graph.addEdge(activityTwo.name, stlouis.name, 1)

    expect(matchLodging(graph)).toEqual([ atlanta ])
  })

  test('will sort by weight when there is only one edge', () => {
    let graph = new Graph()

    const activityOne = new Node("activity 1", {
      type: 'activity'
    })

    const atlanta = new Node("atlanta", {
      type: 'campsite'
    })

    const chicago = new Node("chicago", {
      type: 'campsite'
    })

    graph.addNode(activityOne)
    graph.addNode(atlanta)
    graph.addNode(chicago)

    graph.addEdge(activityOne.name, atlanta.name, 5)
    graph.addEdge(activityOne.name, chicago.name, 1)

    expect(matchLodging(graph)).toEqual([ chicago ])
  })

  test('returns multiple when needed', () => {
    let graph = new Graph()

    const activityOne = new Node("activity 1", {
      type: 'activity'
    })

    const activityTwo = new Node("activity 2", {
      type: 'activity'
    })

    const activityThree = new Node("activity 3", {
      type: 'activity'
    })

    const atlanta = new Node("atlanta", {
      type: 'campsite'
    })

    const chicago = new Node("chicago", {
      type: 'campsite'
    })

    const cincinnati = new Node("cincinnati", {
      type: 'campsite'
    })

    const stlouis = new Node("stlouis", {
      type: 'campsite'
    })

    graph.addNode(activityOne)
    graph.addNode(atlanta)
    graph.addNode(chicago)
    graph.addNode(cincinnati)
    
    graph.addNode(activityTwo)
    graph.addNode(atlanta)
    graph.addNode(stlouis)

    graph.addNode(activityThree)

    graph.addEdge(activityOne.name, atlanta.name, 1)
    graph.addEdge(activityOne.name, chicago.name, 1)
    graph.addEdge(activityOne.name, cincinnati.name, 1)

    graph.addEdge(activityTwo.name, atlanta.name, 1)

    graph.addEdge(activityThree.name, stlouis.name, 1)

    expect(matchLodging(graph)).toEqual([ atlanta, stlouis ])

  })
})
