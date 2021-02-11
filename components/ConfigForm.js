import { useState } from 'react'
import TextField from './form/TextField'

export default function ConfigForm(props) {
  return (
    <div className="box">

      <div className="columns">
        <div className="column is-two-thirds">
            <div className="field is-horizontal">
              <label className="label field-label">Starting Location: </label>
              <div className="control field-body">
                <input className="input" type="text" placeholder="Text input" />
              </div>
            </div>
        </div>
        <div className="column">

        </div>
      </div>
      <div className="columns">
        <div className="column is-two-thirds">
          <div className="field is-horizontal">
            <label className="label field-label">Ending Location: </label>
            <div className="control field-body">
              <input className="input" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
        </div>
         <div className="column"></div>
    </div>
  )
}
