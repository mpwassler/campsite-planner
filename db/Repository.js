const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://neo4j", neo4j.auth.basic("neo4j", "test"))



// MATCH (a)-[r:ROAD]->(l)
// RETURN l, COLLECT(a.title) as acivities, COLLECT(r) as roads, AVG(r.distance), COUNT(a)
// ORDER BY SIZE(acivities) DESC LIMIT 10

async function connect(query, options) {
  const session = driver.session()

  try {
    let result
    if (options) {
      result = await session.run( query, options)
    } else {
      result = await session.run( query)
    }

    return result
  } finally {
    await session.close()
  }
}

export async function save(entity) {
  let query = `MERGE (a:${entity.EnitiyName} ${entity.EnitiyMapping}) RETURN a`
  let result = await connect(query, entity.toProperties())
  return result
}

export async function relation(name, entityA, entityB, distance) {
  console.log(entityA, entityB)
  let query = `
    MATCH (a:${entityA.EnitiyName} {title: "${entityA.title}" })
    MATCH (b:${entityB.EnitiyName} {name: "${entityB.name}" })
    MERGE (a)-[r:${name} {distance: ${distance}}]->(b)
  `
  let result = await connect(query)
  return result
}

export function update() {

}

export function find() {

}

export function destroy() {

}

export function execute(query) {
  return connect(query)
}

export async function list(entity, limit = 100) {
  let query = `MATCH (n:${entity.EnitiyName}) RETURN n LIMIT ${limit}`
  let result = await connect(query)
  return result
}
