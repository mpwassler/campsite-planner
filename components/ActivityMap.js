import MapMarker from './map/Marker'
import Map from './map/Map'

const buildLodgingMarker = (color) => {
  return `
    <svg class="lodging-marker" width="219px" height="289px" viewBox="0 0 219 289" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <radialGradient cx="50%" cy="55.816474%" fx="50%" fy="55.816474%" r="291.048177%" gradientTransform="translate(0.500000,0.558165),scale(0.203390,1.000000),scale(1.000000,0.235736),translate(-0.500000,-0.558165)" id="radialGradient-1">
                <stop stop-color="#000000" stop-opacity="0.222316576" offset="0%"></stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"></stop>
            </radialGradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group-2" transform="translate(5.000000, 5.000000)">
                <ellipse id="Oval-Copy-4" fill="url(#radialGradient-1)" cx="105.5" cy="278" rx="29.5" ry="6"></ellipse>
                <path d="M6.41720439,140.637956 C2.26651664,129.376241 2.4158453e-13,117.202807 2.4158453e-13,104.5 C2.4158453e-13,104.409025 0.000116251992,104.318078 0.000348615528,104.227158 C0.000116292255,104.144891 1.44757333e-14,104.062664 1.42108547e-14,103.980469 C1.34476294e-14,103.731207 0.0025046431,103.482793 0.00749658824,103.235228 C0.685073745,46.1042582 47.2084236,0 104.5,0 C161.781183,0 208.298046,46.087532 208.99213,103.204137 C208.997371,103.461981 209,103.720756 209,103.980469 C209,104.063388 208.999886,104.146337 208.999657,104.229315 C208.999886,104.319522 209,104.409748 209,104.5 C209,115.927114 207.165859,126.925842 203.775912,137.217849 C184.460015,203.214585 117.524499,273.051576 104.5,272.683594 C91.7314433,272.322843 27.149846,204.84509 6.41720439,140.637956 Z" id="Combined-Shape" stroke="#FBFBFB" stroke-width="10" fill="${color}"></path>
                <circle id="Oval-Copy-2" fill="#FBFBFB" cx="104" cy="105" r="92"></circle>
                <polygon id="Rectangle" fill="${color}" points="74 78 138.419314 78 162.018379 131.316406 97.5990651 131.316406"></polygon>
                <polygon id="Rectangle" fill="${color}" points="74.3548284 84 78.8509862 93.1774142 63.4293353 131.63515 56 131.63515"></polygon>
            </g>
        </g>
    </svg>

  `
}

export default function ActivityMap(props) {

  let { activities, lodgings } = props

  return (
    <Map>
      {activities.map( activity => {
        return <MapMarker
                    renderMarker={() => (`
                      <img width="45" src="/icons/activity-marker.svg" />
                    `)}
                    key={activity.id}
                    lon={activity.lon}
                    lat={activity.lat}/>
      })}

    {!!lodgings && lodgings.map( lodging => {
        return <MapMarker
                    renderMarker={() => (buildLodgingMarker(lodging.color))}
                    key={lodging.lon}
                    lon={lodging.lon}
                    lat={lodging.lat}/>
      })}
    </Map>
  )
}
