import { useState } from 'react'
import Activity from '../models/Activity'
import TextField from './form/TextField'

const defaultState = {
  title: '',
  lat: '',
  lon: ''
}

export default function ActivityForm(props) {

  const [state, setState] = useState(defaultState)

  const handleFormSubmit = (evt) => {
    evt.preventDefault()

    let activity = new Activity(state)
    props.handleNewActivity(activity)
    resetDefaults()
  }

  const resetDefaults = () => {
     setState(defaultState)
  }

  const handleFormChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField label={"Title"} onChange={handleFormChange} value={state.title} name={"title"} placeholder={"title"} />
      <TextField label={"Latitude"} onChange={handleFormChange} value={state.lat} name={"lat"} placeholder={"Lat"} />
      <TextField label={"Longitude"} onChange={handleFormChange} value={state.lon} name={"lon"} placeholder={"Lon"} />
      <button type="submit" className="button is-success">Save changes</button>
    </form>
  )

}
