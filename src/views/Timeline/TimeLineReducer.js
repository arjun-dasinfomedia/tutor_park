import {
	GET_OTHER_ALL_TIMELINE,
	ADD_TIMELINE,
	DELETE_TIMELINE,
	UPDATE_TIMELINE,
	LIKE_TIMELINE,
	DISLIKE_TIMELINE,
	FAVOURITE_TIMELINE,
	ABUSE_TIMELINE,
	COMMENT_TIMELINE,
	GET_MY_ALL_TIMELINE,
	REPOST_TIMELINE
} from '../../redux/actions/types'

// ** Initial State
const initialState = {
	otherTimeLineList: [],
	timelineEditStatus: '',
	myTimeLineList: [],
}

const TimeLine = (state = initialState, action) => {

	switch (action.type) {

		// List other Timeline
		case GET_OTHER_ALL_TIMELINE:
			return { ...state, otherTimeLineList: action.otherTimeLineList }

		// List my Timeline
		case GET_MY_ALL_TIMELINE:
			return { ...state, myTimeLineList: action.myTimeLineList }

		// add Timeline
		case ADD_TIMELINE:
			return { ...state }

		// add Comment Timeline
		case COMMENT_TIMELINE:
			return { ...state }

		// Delete Timeline
		case DELETE_TIMELINE:
			return { ...state }

		// like Timeline Post
		case LIKE_TIMELINE:
			return { ...state }

		// dislike Timeline Post
		case DISLIKE_TIMELINE:
			return { ...state }

		// favourite Timeline Post
		case FAVOURITE_TIMELINE:
			return { ...state }

		// abuse Timeline Post
		case ABUSE_TIMELINE:
			return { ...state }

		// Repost Timeline Post
		case REPOST_TIMELINE:
			return { ...state }

		// Update Timeline
		case UPDATE_TIMELINE:
			return { ...state, timelineEditStatus: action.timelineEditStatus }

		// default
		default:
			return { ...state }
	}
}
export default TimeLine
