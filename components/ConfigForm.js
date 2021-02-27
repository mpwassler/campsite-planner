import { useState } from 'react'
import TextField from './form/TextField'
import ResetButton from './ResetButton'

export default function ConfigForm(props) {

  const [distance, setDistance] = useState(0)

  const configHasUpdated = () => {
    if (distance == 0) return

    props.onConfigUpdate({
      distance
    })
  }

  const updateDistance = (evt) => {
    const value = parseInt(evt.target.value)
    setDistance(value)
    configHasUpdated()

  }
  return (
    <section className="block pb1 mt-5">
      <div className="box">
        <div className="level">
          <div class="level-left">
            <h2>Trip Configuration</h2>
          </div>
          <div className="level-right">
            <ResetButton />
          </div>
        </div>

        <div className="columns">
          <div className="column is-half">
            <div class="field">
              <label class="label is-small">Distance willing to travel to activities</label>
              <div class="control">
                <div class="select is-small">
                  <select value={distance} onChange={updateDistance}>
                    <option value="0">-- Choose --</option>
                    <option value="900">15 minutes</option>
                    <option value="1800">30 minutes</option>
                    <option value="2700">45 minutes</option>
                    <option value="3600">1 hour</option>
                    <option value="5400">1 hour 30 minutes</option>
                    <option value="7200">2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/*<div className="columns">
          <div className="column is-two-thirds">
              <div className="field is-horizontal">
                <label className="label field-label">Starting Location: </label>
                <div className="control field-body">
                  <input className="input" type="text" placeholder="Text input" />
                </div>
              </div>
          </div>
          <div className="column"></div>
        </div>*/}
        {/*<div className="columns">
          <div className="column is-two-thirds">
            <div className="field is-horizontal">
              <label className="label field-label">Ending Location: </label>
              <div className="control field-body">
                <input className="input" type="text" placeholder="Text input" />
              </div>
            </div>
          </div>
          </div>
           <div className="column"></div>*/}
      </div>
    </section>
  )
}
