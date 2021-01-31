import Activity from '../../modals/Activity'
import {save, list} from '../../db/Repository'

function index(req, res) {

}

function create(req, res) {
  const { body } = req
  console.log(body)

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
