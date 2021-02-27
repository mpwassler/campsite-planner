import {execute} from '../../db/Repository'

export default async function handler(req, res) {
  const { method } = req

  switch(method) {
    case "POST":
      await execute(`
        MATCH (n)
        DETACH DELETE n
      `)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)

  }

}
