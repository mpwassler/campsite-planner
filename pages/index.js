import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import ConfigForm from '../components/ConfigForm'
import ActivityWidget from '../components/ActivityWidget'
import LodgingWidget from '../components/LodgingWidget'
import ActivityForm from '../components/ActivityForm'
import Modal from '../components/ui/Modal'

const defaultLatitude = null
const defaultLongitude = null

const getUrl = async (url) => {
  const response = await fetch(url)
  const jsonBody = await response.json()
  return jsonBody
}

const getActivities = () => {
  return getUrl('/api/activity')
}

const getLodging = () => {
  return getUrl('/api/lodgeing')
}

export default function Home(props) {
  const [config, setConfig] = useState({
    allowedDistance: 0
  })
  const [activities, setActivities] = useState([])
  const [lodgings, setLodgings] = useState([])
  const [activityModalOpen, setActivityModalOpen] = useState(false)

  useEffect( async () => {
     let activities = await getActivities()
     setActivities(activities)
   }, [])

  const toggleActivityModal = (evt) => {
    setActivityModalOpen(!activityModalOpen)
  }

  const handleNewActivity = async (activity) => {
    setActivities(await getActivities())
    setActivityModalOpen(false)
  }

  const loadLodgings = async () => {
    let lodgingData = await getLodging()
    setLodgings(lodgingData)
  }

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className="container">
        <ConfigForm onConfigUpdate={setConfig} />
        <ActivityWidget lodgings={lodgings} activities={activities} handleAddTrail={toggleActivityModal}>
          { activities.length > 0 &&
            <button className="button is-small" onClick={loadLodgings}>Find Campgrounds</button>
          }
        </ActivityWidget>
        <LodgingWidget lodgings={lodgings} />
      </main>

      <Modal onCloseRequest={toggleActivityModal} title={"New Activity"} isOpen={activityModalOpen} >
        <ActivityForm handleCreate={handleNewActivity} />
      </Modal>

      <footer>

      </footer>
    </div>
  )
}
