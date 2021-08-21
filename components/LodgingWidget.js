import { useState } from 'react'
import LodgingCard from './LodgingCard'

export default function LodgingWidget(props) {
  const {
    lodgings,
    graph
  } = props
  return (
    <div className="lodgings columns">
        {!!lodgings && lodgings.map((lodging, cnt) => {
          return (
            <LodgingCard lodging={lodging} graph={graph} key={cnt} cnt={cnt} />
          )
        })}
    </div>
  )
}
