import {
  ATTEND_EVENT,
  DELETE_MY_EVENT,
  EVENT_INVITATION,
  GET_ALL_EVENTS,
  GET_UPCOMMING_EVENTS,
  LIBRARY_POST_ON_TIMELINE,
  SAVE_CALENDAR_EVENT,
  STORE_MY_EVENT,
  STUDENT_LIST
} from '../../redux/actions/types'

// ** Initial State
const initialState = {
  allEventsList: [],
  upcommingEventsList: [],
  friendData: [],
}

const EventReducer = (state = initialState, action) => {

  switch (action.type) {

    // get All Events
    case GET_ALL_EVENTS:
      return { ...state, allEventsList: action.allEventsList }

    // get Upcoming List
    case GET_UPCOMMING_EVENTS:
      return { ...state, upcommingEventsList: action.upcommingEventsList }

    // Add Event
    case STORE_MY_EVENT:
      return { ...state }

    // Attend Event
    case ATTEND_EVENT:
      return { ...state }

    // Save To Calendar Event
    case SAVE_CALENDAR_EVENT:
      return { ...state }

    // Delete Event
    case DELETE_MY_EVENT:
      return { ...state }

    // Send Invitation
    case EVENT_INVITATION:
      return { ...state, }

    // Student list
    case STUDENT_LIST:
      return { ...state, friendData: action.friendData }

    // Post To Timeline
    case LIBRARY_POST_ON_TIMELINE:
      return { ...state }
    default:
      return { ...state }
  }
}
export default EventReducer
