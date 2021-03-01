import React, { useState, useEffect } from 'react'
import { Marker } from 'mapbox-gl'
import {MapContext} from './Map'

function _MapMarker(props) {
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    if (props.renderMarker) {
      var el = document.createElement('div')
      el.innerHTML = props.renderMarker()
      el.className = 'marker'
      setMarker(new Marker(el).setLngLat([props.lon, props.lat]))
    } else {
      setMarker(new Marker().setLngLat([props.lon, props.lat]))
    }
  },[])

  useEffect(() => {
    if(props.map && marker) {
      marker.addTo(props.map)
    }
    return function cleanup() {
      if(marker) marker.remove()
    }
  })

  return null
}


export default function MapMarker(props) {
  return (
    <MapContext.Consumer>
      { map => {
        return <_MapMarker {...props} map={map} />
      }}
    </MapContext.Consumer>
  )
}
