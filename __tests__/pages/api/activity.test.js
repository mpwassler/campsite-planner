import { testApiHandler } from 'next-test-api-route-handler'
import handler, { config } from '../../../pages/api/activity.js'
import responseGraph from '../../fixture/one-activity-many-campsite-graph.js'

import { setupServer } from 'msw/node'
import { rest } from 'msw'

import fs from 'fs'

let rawdata = fs.readFileSync('./__tests__/fixture/recgov.json');
let recgovData = JSON.parse(rawdata);

let mapboxRawdata = fs.readFileSync('./__tests__/fixture/mapbox-distance-matrix-one-to-many.json');
let mapboxData = JSON.parse(mapboxRawdata);

export const handlers = [
  rest.get('https://ridb.recreation.gov/api/v1/facilities/', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json(recgovData),
    )
  }),

  rest.get('https://api.mapbox.com/directions-matrix/v1/mapbox/driving/-110.6058014,43.8431892;-110.6668715,43.6163233;-110.6710516,44.1059239;-110.6403078,43.9046609;-110.3528,43.8242;-110.9188889,43.7566667;-110.6152045,43.8407684;-110.9513889,43.7575;-110.348,43.82;-110.641324,43.905642;-110.6884271,44.0040604', (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.status(200, 'Mocked status'),
      ctx.json(mapboxData),
    )
  }),
]

// 2. Define request handlers and response resolvers.
const server = setupServer(...handlers)

beforeAll(() => server.listen({
  onUnhandledRequest: 'bypass'
}))
// 
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

const activityData = {
  name: 'grand teton national park',
  lat: 43.8431892,
  lon: -110.6058014
}

handler.config = config

describe("POST handler", () => {
  test("it returns a graph of the activity and nearby campsites", async () => {   
    await testApiHandler({
      handler,
      url: '/api/activity',
      test: async ({ fetch }) => {         
         const res = await fetch({
           method: 'POST',
           headers: {
             'content-type': 'application/json' // Must use correct content type
           },
           body: JSON.stringify(activityData)
         })
         // const res = await fetch({ method: 'POST', body: 'data'  })
         expect(await res.json()).toStrictEqual(responseGraph)
         server.close()
      }
    })
    expect.assertions(1)
  })
})