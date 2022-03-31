import React from 'react'
import UpcomingEvent from './UpcomingEvent'
import AllEvent from './AllEvent'
import EventHistory from './EventHistory'


const EventsContainer = (Data) => {

	switch (Data.Data) {

		// Upcoming Page
		case 'UpcomingEvent':
			return (
				<div>
					<UpcomingEvent SearchData={Data.searchKeyword} />
				</div>
			)
			
		// All Event Page
		case 'AllEvent':
			return (
				<div>
					<AllEvent SearchData={Data.searchKeyword} />
				</div>
			)

		// Event History Page
		case 'EventHistory':
			return (
				<div>
					<EventHistory />
				</div>
			)
			
		// Default Page
		default:
			return (
				<div>
					<AllEvent SearchData={Data.SearchAll} />
				</div>
			)
			break;
	}
}
export default EventsContainer
