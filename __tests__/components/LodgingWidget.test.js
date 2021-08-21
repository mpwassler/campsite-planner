import React from 'react'
import {render, fireEvent, waitFor, screen, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Node } from '../../graph/graph'
// import { setupServer } from 'msw/node'
// import { rest } from 'msw'

// export const handlers = [
  // Handles a POST /login request
//   rest.post('/api/activity', (req, res, ctx) => {
//     return res(
//       ctx.status(200, 'Mocked status'),
//       ctx.json({}),
//     )
//   })
// ]

// 2. Define request handlers and response resolvers.
// const server = setupServer(...handlers)

// beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
// afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
// afterAll(() => server.close())

const mockProps = {
  lodgings: [

    new Node("Chalk Creek Canyon", {
      type: "campsite",
      properties: {
        name: "Chalk Creek Canyon", 
        lat: 38.717417, 
        lon: -106.199444
      }
    }),

    new Node("Twin Peaks Campground", {
      type: "campsite",
      properties: {
        name: "Twin Peaks Campground", 
        lat: 39.06753798, 
        lon: -106.4213927
      }
    })

  ]
}

describe("<LodgingWidget />", () => {
  test("displays each lodging node passed to it", async () => {
    const props = mockProps
    // const spy = jest.spyOn(props, 'postForm')
    const LodgingWidget = require("../../components/LodgingWidget").default
    const { getByText } = render(<LodgingWidget {...props} />)

    expect(getByText('Chalk Creek Canyon'))
      .toHaveTextContent('Chalk Creek Canyon')

    expect(getByText('Twin Peaks Campground'))
      .toHaveTextContent('Twin Peaks Campground')
    
  })
})