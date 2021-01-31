const neo4j = require('neo4j-driver')

const driver = neo4j.driver(uri, neo4j.auth.basic("neo4j", "test"))
const session = driver.session()

async function connect(query, options) {
  try {
    const result = await session.run(
      query,
      options
    )

    return result
  } finally {
    await session.close()
  }
}

function save() {

}

function update() {

}

function find() {

}

function destroy() {

}

function list() {

}

export default {
  save,
  update,
  find,
  destroy,
  list
}
