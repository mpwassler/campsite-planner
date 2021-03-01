import { useState } from 'react'
import DataTable from './ui/DataTable'

import ActivityMap from './ActivityMap'

export default function ActivityWidget(props) {

  let { activities } = props

  function MapDisplay({activities, lodgings}) {
    if (activities && activities.length > 0) {
       return (<ActivityMap activities={activities} lodgings={lodgings} />)
    } else {
      return (
        <div> Add activities to see them on the map</div>
      )
    }
  }

  if (activities && activities.length == 0) {
    return (
      <section className="block">
        <button onClick={props.handleAddTrail} className="button is-small">Add Some Activities</button>
      </section>
    )
  } else {
    return (
      <section className="block">
        <div className="columns">
          <div className="column">
            <div className="box map-side-bar">
              <section>
                <div className="level">
                  <div className="level-left">
                    <h2>
                      Activities
                    </h2>
                  </div>
                  <div className="level-right">
                    <button onClick={props.handleAddTrail} className="button is-small">Add</button>
                  </div>
                </div>
              </section>
              <section >
                <DataTable columns={['title']} data={props.activities} />
                {props.children}
              </section>
            </div>
          </div>
          <div className="column is-two-thirds">
            {MapDisplay(props)}
          </div>
        </div>
      </section>
    )
  }


}
