import React, { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import {MapContext} from './Map'

function _MapMarker(props) {
  
  const [marker, setMarker] = useState(null)
  
  useEffect(() => {
    let glMarker
    const popup = new mapboxgl.Popup({ 
      offset: 25,
      closeButton: false,
      closeOnClick: false 
    }).setText(`${props.title}`)

    if (props.renderMarker) {
      var el = document.createElement('div')
      el.innerHTML = props.renderMarker()
      el.className = 'marker'
      glMarker = new mapboxgl.Marker(el)
    } else {
      glMarker = new mapboxgl.Marker()
    }

    const markerDiv = glMarker.getElement()
    markerDiv.addEventListener('mouseenter', () => glMarker.togglePopup());
    markerDiv.addEventListener('mouseleave', () => glMarker.togglePopup())

    setMarker( glMarker
                .setLngLat([props.lon, props.lat])
                .setPopup(popup))
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
