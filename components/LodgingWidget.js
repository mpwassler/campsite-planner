import { useState } from 'react'

export default function LodgingWidget(props) {

  let lodgings = props.lodgings

  return (
    <div className="section">
    {!!lodgings && lodgings.map(lodging => {
      return (
        <div className="card">
          <div className="card-content">
            <div className="content">
              {lodging.name}
            </div>
          </div>
        </div>
      )
    })}
    </div>
  )
}
