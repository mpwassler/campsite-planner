import Activity from '../../models/Activity'
import {save, list, relation} from '../../db/Repository'
import RIDB from '../../services/ridb'
import {getRouteData} from '../../services/directions'

async function index(req, res) {

  let results = await list(Activity)

  res.status(200).json(results)
}

async function create(req, res) {
  const { body } = req

   let activity = new Activity(body)

   let campsites = await RIDB.search({
     latitude: activity.lat,
     longitude: activity.lon
   })

   await save(activity)


   let matrix = await getRouteData([activity].concat(campsites))

   for (var i = 0; i < campsites.length; i++) {
     let distance = matrix.distances[0][i + 1]
     let duration = matrix.durations[0][i + 1]
     let campsite = campsites[i]

     await save(campsite)
     await relation("ROAD", activity, campsite, duration)

     // console.log(campsite, distance, duration)
   }

   // console.log(matrix)

   res.status(200).end(`ok`)
   // .json(result)
}

export default function handler(req, res) {
  const { method } = req

  switch(method) {
    case "GET": index(req, res)
      break
    case "POST": create(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)

  }

}
