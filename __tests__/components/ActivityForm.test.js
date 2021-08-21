import React from 'react'
import {render, fireEvent, waitFor, screen, act} from '@testing-library/react'
import '@testing-library/jest-dom'
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

const mockPost = {
  postForm(activity) {
    return new Promise((res, rej) => {
      res()
    })
  },
  handleCreate(response) {

  }
}

describe("<ActivityForm />", () => {
  test("posts the corrct data and clears fields on complete", async () => {
    const props = mockPost
    const spy = jest.spyOn(props, 'postForm')
    const ActivityForm = require("../../components/ActivityForm").default
    const {getByLabelText, getByRole} = render(<ActivityForm {...props} />)
    
    await act(async () => {
      const nameInput = await getByLabelText("Title")
      const latInput = await getByLabelText("Latitude")
      const lonInput = await getByLabelText("Longitude")     
      const button = await getByRole('button', {name: "Save changes"})

      fireEvent.change(nameInput, { target: { value: 'Alpine Canyon' } })
      fireEvent.change(latInput, { target: { value: '43.4463064' } })
      fireEvent.change(lonInput, { target: { value: '-111.3061403' } })     
      fireEvent.click(button)
    })
      
    expect(spy).toHaveBeenCalledWith({
      name: 'Alpine Canyon',
      lat: '43.4463064',
      lon: '-111.3061403'
    })

    await act(async () => {
      const nameInput = await getByLabelText("Title")
      expect(nameInput.value).toBe("") 
    })
    
  })
})