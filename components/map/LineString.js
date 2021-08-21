import React, { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import {MapContext} from './Map'

const source = (coordinates) => {
  let coords = coordinates.map((c) => {    
    return [c[1], c[0]]
  })
  return {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': coords
      }
    }
  }
}

const layer = (name) => {
  return {
    'id': name,
    'type': 'line',
    'source': name,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#5bd9a3',
      'line-width': 8,
      'line-opacity': 0.35
    }
  }
}

const clear = (map, name) => {
  map.removeLayer(name).removeSource(name)
}

const drawOnMap = (map, name, route) => {  
  const mapLayer = map.getLayer(name)
  const mapSource = map.getSource(name)

  if(typeof mapLayer !== 'undefined' || typeof mapSource !== 'undefined') {
    clear(map, name)
  }
  map.addSource(name, source(route))
  map.addLayer(layer(name))
}

const mapEffect = (name, route, map) => {
  return () => {    
    if(map && route) {
      drawOnMap(map, name, route)    
    }

    return function cleanup() {
      if(name) {
        clear(map, name)
      } 
    }
  }
}

function _LineString({name, route, map}) {
  useEffect(mapEffect(name, route, map))
  return null
}


export default function LineString(props) {
  return (
    <MapContext.Consumer>
      { map => (<_LineString {...props} map={map} />)}
    </MapContext.Consumer>
  )
}
