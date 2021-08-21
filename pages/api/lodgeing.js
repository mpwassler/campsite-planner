import Lodging from '../../models/Lodging'


const util = require('util')

let logNumber = 1

function debug(data) {
  console.log(`LOG: ${logNumber}`)
  console.log(util.inspect(data, {showHidden: false, depth: null}))
  logNumber += 1
}

const getBestCampground = async (activityNames) => {
  // let activitesWithLodging = []
  // let result = await execute(`
  //   MATCH (a)-[r:ROAD]->(l)
  //   WHERE a.title IN ${JSON.stringify(Array.from(activityNames))}
  //   RETURN distinct l,
  //                   COLLECT(a) as acivities,
  //                   COLLECT(a.title) as acivitiesAcountedFor,
  //                   COLLECT(r.distance) as distances,
  //                   AVG(r.distance) as averageTimeTo,
  //                   COUNT(a)

  //   ORDER BY SIZE(acivities) DESC,
  //             averageTimeTo
  //   LIMIT 1
  // `)

  // let enitities = result.records.map(r => {
  //   let [data, activities, acivitiesAcountedFor, distances] = r._fields
  //   // console.log(activities, distances)

  //   let relations = {}

  //   for (var i = 0; i < activities.length; i++) {
  //     relations[acivitiesAcountedFor[i]] = distances[i]
  //   }

  //   activitesWithLodging = acivitiesAcountedFor

  //   let lodging = new Lodging({ ...data.properties, id: data.identity.low })
  //   lodging.activities = relations
  //   return lodging
  // })

  // return {entity: enitities[0], activitesWithLodging}
}

function parseResult(result) {
  return result.records[0]._fields[0]
}

async function index(req, res) {

  // let lodgings = []

  // let names = await execute(`
  //   MATCH (n:Activity)
  //   WHERE (n)-->(:Lodging)
  //   RETURN COLLECT(n.title)
  // `)

  // let activityNames = new Set(parseResult(names))

  // let {entity, activitesWithLodging} = await getBestCampground(activityNames)

  // lodgings.push(entity)

  // let activitiesAccountedFor = new Set(activitesWithLodging)

  // let remainingActivies = new Set([...activityNames].filter(x => !activitiesAccountedFor.has(x)))


  // while (remainingActivies.size > 0) {
  //   let {entity, activitesWithLodging} = await getBestCampground(remainingActivies)
  //   let activitiesAccountedFor = new Set(activitesWithLodging)
  //   remainingActivies = new Set([...remainingActivies].filter(x => !activitiesAccountedFor.has(x)))
  //   lodgings.push(entity)
  // }

  // res.status(200).json(lodgings)
}


export default function handler(req, res) {
  const { method } = req

  switch(method) {
    case "GET": index(req, res)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)

  }

}
