import MapMarker from './map/Marker'
import Map from './map/Map'

export default function ActivityMap(props) {

  let { activities } = props

  return (
    <Map>
      {activities.map( activity => {
        return <MapMarker
                    key={activity.id}
                    lon={activity.lon}
                    lat={activity.lat}/>
      })}
    </Map>
  )
}
