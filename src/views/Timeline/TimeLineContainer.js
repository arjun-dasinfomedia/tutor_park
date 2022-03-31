import React from 'react'
import TimeLineList from './TimelineList'
import OtherTimeLine from './OtherTimeLineList'


const TimeLineContainer = (Data) => {

	switch (Data.Data) {

		// My Time Line Page
		case 'MyTimeline':
			return (
				<div>
					<TimeLineList searchData={Data.searchData} />
				</div>
			)

		// Other Timneline Page
		case 'OtherTimeline':
			return (
				<div>
					<OtherTimeLine searchData={Data.searchData} />
				</div>
			)

		// Default Page
		default:
			return (
				<div>
					<TimeLineList searchData={Data.searchData} />
				</div>
			)
			break;
	}
}
export default TimeLineContainer
