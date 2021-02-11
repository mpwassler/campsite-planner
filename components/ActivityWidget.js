import { useState } from 'react'
import DataTable from './ui/DataTable'
import Map from './ui/Map'

export default function ActivityWidget(props) {

  return (
    <div className="columns">
      <div className="column">
        <section className="section">
          <h1 className="title">
            Activities
          </h1>
          <p className="subtitle">
            <button onClick={props.handleAddTrail} className="button">Add</button>
          </p>
        </section>
        <section className="section">
          <DataTable columns={['title']} data={props.trails} />
        </section>
      </div>
      <div className="column is-two-thirds">
        <Map />
      </div>
    </div>
  )
}
