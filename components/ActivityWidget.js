import { useState } from 'react'
import DataTable from './ui/DataTable'

import ActivityMap from './ActivityMap'

export default function ActivityWidget(props) {

  function MapDisplay(activities) {
    if (activities && activities.length > 0) {
       return (<ActivityMap activities={activities} />)
    } else {
      return (
        <div> Add activities to see them on the map</div>
      )
    }
  }

  return (
    <section className="block">
      <div className="columns">
        <div className="column">
          <div className="box map-side-bar">
            <section>
              <h2>
                Activities
              </h2>
              <p className="subtitle">
                <button onClick={props.handleAddTrail} className="button is-small">Add</button>
              </p>
            </section>
            <section >
              <DataTable columns={['title']} data={props.activities} />
              {props.children}
            </section>
          </div>
        </div>
        <div className="column is-two-thirds">
          {MapDisplay(props.activities)}
        </div>
      </div>
    </section>
  )
}
