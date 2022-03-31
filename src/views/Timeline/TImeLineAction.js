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
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// get OtherTimeLine List Function
export const getOtherTimeLineList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(GET_OTHER_ALL_TIMELINE).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: GET_OTHER_ALL_TIMELINE,
					otherTimeLineList: responseJson.data.data,
				});
			}
			else {
				dispatch(alertActions.error(responseJson.data.message.toString()));
				toast.error(responseJson.data.message.toString())
			}
		});
	} catch (err) {
		console.log(err)
	}

};

// get My TimeLine List
export const getMyTimeLineList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(GET_MY_ALL_TIMELINE).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: GET_MY_ALL_TIMELINE,
					myTimeLineList: responseJson.data.data,
				});
			}
			else {
				dispatch(alertActions.error(responseJson.data.message.toString()));
				toast.error(responseJson.data.message.toString())
			}
		});
	} catch (err) {
		console.log(err)
	}

};

// store Timeline Function
export const storeTimeLine = (data) => async (dispatch) => {
	
	try {
		const response = await RestClientServices.postWithData(ADD_TIMELINE, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: ADD_TIMELINE,
			})
			dispatch(getMyTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// delete timeline Function
export const deleteTimeLine = (data) => async (dispatch) => {
	try {
		
		const response = await RestClientServices.postWithData(DELETE_TIMELINE, data)

		if (response.data.error == false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: DELETE_TIMELINE,
			})
			dispatch(getMyTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// update Timeline Function
export const updateTimeLine = (data) => async (dispatch) => {
	
	try {

		const response = await RestClientServices.postWithData(UPDATE_TIMELINE, data)
		if (response.data.error == false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: UPDATE_TIMELINE,
				timelineEditStatus: response.data.error,
			})
			dispatch(getMyTimeLineList())
			if (response.data.error === false) {
				dispatch({
					type: UPDATE_TIMELINE,
					timelineEditStatus: 'sucess',
				})
			}
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// like Timeline Function
export const likeTimeLine = (data) => async (dispatch) => {
	

	try {
		
		const response = await RestClientServices.postWithData(LIKE_TIMELINE, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: LIKE_TIMELINE,
			})
			dispatch(getMyTimeLineList())
			dispatch(getOtherTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// dislike Timeline Function
export const disLikeTimeLine = (data) => async (dispatch) => {
	
	
	try {
		
		const response = await RestClientServices.postWithData(DISLIKE_TIMELINE, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: DISLIKE_TIMELINE,
			})
			dispatch(getMyTimeLineList())
			dispatch(getOtherTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}
		
	} catch (err) {
		console.log(err)
	}
}

// Favourite Timeline Function
export const favouriteTimeLine = (data) => async (dispatch) => {
	
	
	try {
		
		const response = await RestClientServices.postWithData(FAVOURITE_TIMELINE, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: FAVOURITE_TIMELINE,
			})
			dispatch(getMyTimeLineList())
			dispatch(getOtherTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// Abuse Timeline Function
export const abuseTimeLine = (data) => async (dispatch) => {
	
	
	try {
		const response = await RestClientServices.postWithData(ABUSE_TIMELINE, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: ABUSE_TIMELINE,
			})
			dispatch(getOtherTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// store Timeline Function
export const addCommentTimeLine = (data) => async (dispatch) => {
	

	try {
		const response = await RestClientServices.postWithData(COMMENT_TIMELINE, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: COMMENT_TIMELINE,
			})
			dispatch(getMyTimeLineList())
			dispatch(getOtherTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// Repost Timeline Function

export const repostTimeLine = (data) => async (dispatch) => {
	
	
	try {
		
		const response = await RestClientServices.postWithData(REPOST_TIMELINE, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: REPOST_TIMELINE,
			})
			dispatch(getOtherTimeLineList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}