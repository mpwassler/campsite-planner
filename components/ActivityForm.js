import { useState, useEffect } from 'react'
import Activity from '../models/Activity'
import TextField from './form/TextField'

const defaultState = {
  name: '',
  lat: '',
  lon: ''
}

export default function ActivityForm(props) {

  const [state, setState] = useState({...defaultState})

  const postData = async (data) => {
    return fetch('/api/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()
    let activityProps = new Activity(state).toProperties()
    let response
    if(props.postForm) {
      response = await props.postForm(activityProps)
    } else {
      response = await postData(activityProps)
    }
    
    setState(defaultState)
    props.handleCreate(response)
  }


  const handleFormChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField label={"Title"} onChange={handleFormChange} value={state.name} name={"name"} placeholder={"title"} />
      <TextField label={"Latitude"} onChange={handleFormChange} value={state.lat} name={"lat"} placeholder={"Lat"} />
      <TextField label={"Longitude"} onChange={handleFormChange} value={state.lon} name={"lon"} placeholder={"Lon"} />
      <button role="button" name="submit" type="submit" className="button is-success">Save changes</button>
    </form>
  )

}
