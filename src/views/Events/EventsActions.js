import { 
  ATTEND_EVENT, 
  DELETE_MY_EVENT, 
  EVENT_INVITATION, 
  GET_ALL_EVENTS, 
  LIBRARY_POST_ON_TIMELINE, 
  SAVE_CALENDAR_EVENT, 
  STORE_MY_EVENT, 
  STUDENT_LIST 
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Event List
export const getAllMyEventsList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(GET_ALL_EVENTS, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        
        dispatch({
          type: GET_ALL_EVENTS,
          allEventsList: responseJson.data.data,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// getUpcoming Event List
export const getUpcommingEventsList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(GET_ALL_EVENTS, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        
        dispatch({
          type: GET_ALL_EVENTS,
          allEventsList: responseJson.data.data,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Attend Event
export const attendEventAction = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ATTEND_EVENT, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: ATTEND_EVENT,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Save To Calendar Events
export const saveEventOnCalendarAction = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(SAVE_CALENDAR_EVENT, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: SAVE_CALENDAR_EVENT,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Add Event
export const storeMyEvents = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(STORE_MY_EVENT, data).then((responseJson) => {
      if (responseJson.data.error) {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
        return false;
      }
      else {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: STORE_MY_EVENT,
        })
        dispatch(getAllMyEventsList({type:'list'}))
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Delete Event
export const deleteMyEvent = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(DELETE_MY_EVENT, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: DELETE_MY_EVENT,
        })
        dispatch(getAllMyEventsList({type: "list"}))
      }
      
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Inviation For Student
export const friendData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(STUDENT_LIST)
    if(response.data.error === false) {
      dispatch({
        type: STUDENT_LIST,
        friendData : response.data.data,
      })
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }
    
  } catch (err) {
    console.log(err)
  }
}

// Send Invitation For Student
export const sendInvitations = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(EVENT_INVITATION, data)
    if(response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: EVENT_INVITATION,
      })
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }
  } catch (err) {
    // console.log(err)
  }
}

// Post To timeline
export const postLibraryItemOnTimeline = (data) => async (dispatch) => {
	try {
		// console.log(data)
		const response = await RestClientServices.postWithData(LIBRARY_POST_ON_TIMELINE, data).then((responseJson) => {
			if (responseJson.data.error === false) {
				dispatch(alertActions.success(responseJson.data.message.toString()));
				toast.success(responseJson.data.message.toString())
				dispatch({
					type: LIBRARY_POST_ON_TIMELINE,
				})
			}

			else {
				dispatch(alertActions.error(responseJson.data.message.toString()));
				toast.error(responseJson.data.message.toString())
			}
		});
	} catch (err) {
		// console.log(err)
	}
}