import { decode } from 'polyline'

const getDirectionsFromApi = async (fromLatLng, toLatLng) => {
	const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${fromLatLng.join(',')};${toLatLng.join(',')}.json?geometries=polyline&alternatives=false&steps=true&overview=full&access_token=pk.eyJ1IjoibXdhc3NsZXIiLCJhIjoiY2tzZ3g1ZmZ0MW84MDJ2bnZheHhpdDVqMyJ9.RZX9Op7ZzyxD6jolIxUFoA`
	let key = '_geometry' + fromLatLng.join('|') + toLatLng.join('|')
	if (!localStorage.getItem(key)) {
		const response = await fetch(url)
		const jsonBody = await response.json()  
		const route = jsonBody.routes[0].geometry
		
		localStorage.setItem(key, route)
		return decode(route)

	} else {
		return new Promise( (res, reg) => {			
			res(decode(localStorage.getItem(key)))
		})		
	}
}

export async function makePolyline(edge, graph) {
	const toNode = edge.to(graph)
	const fromNode = edge.from(graph)	
	return await getDirectionsFromApi(
		[fromNode.properties.lon, fromNode.properties.lat],
		[toNode.properties.lon, toNode.properties.lat])
}