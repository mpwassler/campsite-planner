import React, { useRef, useEffect, useState, createContext } from 'react'
import mapboxgl from 'mapbox-gl'
import '../../styles/Map.module.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

export const MapContext = createContext(null)

const boundsMatch = (a, b) => {
  if(!a || !b) return false
  return (
    a._sw.lng == b._sw.lng &&
    a._sw.lat == b._sw.lat &&
    a._ne.lng == b._ne.lng &&
    a._ne.lat == b._ne.lat
    )
}

const Map = (props) => {
  const mapContainerRef = useRef(null)

  const [lng, setLng] = useState(5)
  const [lat, setLat] = useState(34)
  const [zoom, setZoom] = useState(1.5)
  const [mapObj, setMapObj] = useState(null)
  const [bounds, setBounds] = useState(null)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })

    setMapObj(map)

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4))
      setLat(map.getCenter().lat.toFixed(4))
      setZoom(map.getZoom().toFixed(2))
    })

    // Clean up on unmount
    return () => map.remove()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(!props.children) return

    let children = React.Children.toArray(props.children)
    if(children.length < 1) return

    let newBounds = new mapboxgl.LngLatBounds(children[0].props, children[0].props)
    let coords = children.forEach((child) => {
      newBounds.extend([child.props.lon, child.props.lat])
    })
    if(!boundsMatch(newBounds, bounds)) {
      setBounds(newBounds)
    }
  })

  useEffect(() => {
    if(mapObj && bounds) {
      mapObj.fitBounds(bounds, {padding: {left: 100, bottom: 100, right: 100, top: 100}, animate: false})
    }

  }, [bounds])

  return (
    <div className="map">
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container box' ref={mapContainerRef} />

      <MapContext.Provider value={mapObj}>
        {props.children}
      </MapContext.Provider>
    </div>
  )
}

export default Map
