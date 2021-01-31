import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import ActivityForm from '../components/ActivityForm'
import DataTable from '../components/ui/DataTable'
import Map from '../components/ui/Map'



export default function Home() {

  const [state, setState] = useState({
    trailModalOpen: false,
    trails: []
  })

  const handleAddTrail = (evt) => {
    setState({
      ...state,
      trailModalOpen: ! state.trailModalOpen
    })
  }

  const handleNewActivity = (activity) => {
    debugger
    setState({
      ...state,
      trails: state.trails.concat(activity),
      trailModalOpen: false
    })

  }

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className="container">
        <div className="columns">
          <div className="column">
            <section className="section">
              <h1 className="title">
                Activities
              </h1>
              <p className="subtitle">
                <button onClick={handleAddTrail} className="button">Add</button>
              </p>
            </section>
            <section className="section">
              <DataTable columns={['title']} data={state.trails} />
            </section>


          </div>
          <div className="column is-two-thirds">
            <Map />
          </div>

        </div>

      </main>

      <div className={`modal ${state.trailModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">New Activity</p>
            <button className="delete" aria-label="close" onClick={handleAddTrail}></button>
          </header>
          <section className="modal-card-body">
            <ActivityForm handleNewActivity={handleNewActivity} />
          </section>
        </div>
      </div>

      <footer>

      </footer>
    </div>
  )
}
