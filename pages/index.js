import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import ConfigForm from '../components/ConfigForm'
import ActivityWidget from '../components/ActivityWidget'
import ActivityForm from '../components/ActivityForm'
import Modal from '../components/ui/Modal'

const defaultLatitude = null
const defaultLongitude = null

export default function Home() {
  const [config, setConfig] = useState({
    start: [defaultLatitude, defaultLongitude],
    end: [defaultLatitude, defaultLongitude]
  })
  const [activities, setActivities] = useState([])
  const [activityModalOpen, setActivityModalOpen] = useState(false)

  const toggleActivityModal = (evt) => {
    setActivityModalOpen(!activityModalOpen)
  }

  const handleNewActivity = (activity) => {
    debugger
    setActivities(activities.concat(activity))
    setActivityModalOpen(false)
  }

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className="container">
        <ConfigForm />
        <ActivityWidget trails={activities} handleAddTrail={toggleActivityModal} />
      </main>

      <Modal onCloseRequest={toggleActivityModal} title={"New Activity"} isOpen={activityModalOpen} >
        <ActivityForm handleNewActivity={handleNewActivity} />
      </Modal>

      <footer>

      </footer>
    </div>
  )
}
