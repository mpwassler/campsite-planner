import Activity from '../../models/Activity'
import {Graph, Node} from '../../graph/graph'
import RIDB from '../../services/ridb'
import GooglePlaces from '../../services/google-places'
import {getRouteData} from '../../services/directions'

function getCampsitesNear(activity) {
  return GooglePlaces.search({
    latitude: activity.lat,
    longitude: activity.lon
  })
}

function makeNode(campsite) {
  return new Node(campsite.name, {
    type: 'campsite',
    properties: {
      name: campsite.name,
      lat:  campsite.lat,
      lon:  campsite.lon
    }
  })
}

function buildGraphEdges(activity, matrix, campsites) {
  const graph = new Graph()
  graph.addNode(activity)
  for (var i = 0; i < campsites.length; i++) {
    const durationInMins = Math.round((matrix.durations[0][i + 1] / 60) * 100) / 100
    graph.addNode(makeNode(campsites[i]))
    
    if(durationInMins <= 45) {
      graph.addEdge(activity.name, campsites[i].name, durationInMins)
    }
  }
  return graph
}

async function create({ body }, res) {    
  const activity = new Activity(body)  
  const campsites = await getCampsitesNear(activity)
  const matrix = await getRouteData([activity].concat(campsites))
  const graph = buildGraphEdges(activity, matrix, campsites) 
  res.status(200).json(graph.toJson())
}

export default function handler(req, res) {
  const { method } = req
  switch(method) {
    case "POST": create(req, res)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
