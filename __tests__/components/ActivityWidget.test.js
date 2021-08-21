import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

const activities = [
	{ 
	  name: 'grand teton national park', 
	  type: 'activity',
	  properties: {
	    lat: 43.8431892,
	    lon: -110.6058014,
	    name: "grand teton national park"
	  }
	}
]

const lodgings = []

const toggleActivityModal = () => {}

describe("<ActivityWidget />", () => {
	
	jest.doMock('mapbox-gl', () => ({  
	  Marker: jest.fn().mockReturnValue({
	  	setLngLat: jest.fn()
	  }),
	  Map: jest.fn(() => ({
	    addControl: jest.fn(),
	    fitBounds: jest.fn(),
	    on: jest.fn(),
	    remove: jest.fn()
	  })),
	  LngLatBounds: jest.fn().mockReturnValue({	  	    
    	_ne: {lng: 0, lat: 0},
		_sw: {lng: 0, lat: 0},	  		
	  	extend: jest.fn()
	  }),
	  NavigationControl: jest.fn()
	}))

	test("displays the added activities", () => {
		const ActivityWidget = require("../../components/ActivityWidget").default
		render(
			<ActivityWidget 
				lodgings={lodgings} 
				activities={activities} 
				handleAddTrail={toggleActivityModal} />
		)

		 expect(screen.getByText('grand teton national park'))
		 	.toHaveTextContent('grand teton national park')
	})
})