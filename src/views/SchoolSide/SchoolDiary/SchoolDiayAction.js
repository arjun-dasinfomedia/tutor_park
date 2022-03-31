import {
	SCHOOL_DIARY_LIST,
	SUBJECT_BY_DIVISION,
	ADD_DIARY,
	VIEW_DIARY_BY_DATE,
	UPDATE_SCHOOL_DIARY,
	VIEW_SCHOOL_DIARY,
	POST_TO_TIMELINE,
	SHARED_DIARY_TO_MESSAGE,
	CHAT_STUDENT_LIST,
} from '../../../redux/actions/types'
import RestClientServices from '../../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Share Diary With Friend
export const shareWithFriendDiary = (data) => async (dispatch) => {
	try {
		// console.log(data)
		const response = await RestClientServices.postWithData(SHARED_DIARY_TO_MESSAGE, data).then((responseJson) => {
			if (responseJson.data.error == false) {
				dispatch(alertActions.success(responseJson.data.message.toString()));
				toast.success(responseJson.data.message.toString())
				dispatch({
					type: SHARED_DIARY_TO_MESSAGE,
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

// Friend List
export const shareDiaryWithFriendList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(CHAT_STUDENT_LIST)
		if (response.data.error === false) {
			dispatch({
				type: CHAT_STUDENT_LIST,
				sharedWithFriend: response.data.data,
			})
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		// console.log(err)
	}
}

// Diary Post to Timeline
export const diaryPostToTimeline = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(POST_TO_TIMELINE, data)

		if (response.data.error == false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: POST_TO_TIMELINE,
				// data: response.data.data,
			})
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}
	} catch (err) {
		console.log(err)
	}
}

// View School Diary
export const viewSchoolDiary = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(VIEW_SCHOOL_DIARY, data)

		if (response.data.error == false) {

			dispatch({
				type: VIEW_SCHOOL_DIARY,
				viewDiary: response.data.data,
			})
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}
	} catch (err) {
		console.log(err)
	}
}

// update School Diary
export const updateSchoolDiary = (data) => async (dispatch) => {

	try {

		const response = await RestClientServices.postWithData(UPDATE_SCHOOL_DIARY, data)
		if (response.data.error == false) {

			dispatch({
				type: UPDATE_SCHOOL_DIARY,
				diaryEditStatus: response.data.error,
			})
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch(getSchoolDiryList())
			if (response.data.error === false) {
				dispatch({
					type: UPDATE_SCHOOL_DIARY,
					diaryEditStatus: 'sucess',
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

//  View School Diary By Date
export const viewSchoolDiaryByDate = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(VIEW_DIARY_BY_DATE, data)

		if (response.data.error == false) {

			dispatch({
				type: VIEW_DIARY_BY_DATE,
				viewSchoolDiary: response.data.data,
			})
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}
	} catch (err) {
		console.log(err)
	}
}

// store Timeline Function
export const addSchoolDiary = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(ADD_DIARY, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: ADD_DIARY,
			})
			dispatch(getSchoolDiryList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}


// Division Subject List
export const divisionSubjectList = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(SUBJECT_BY_DIVISION, data);
		if (response.data.error === false) {
			dispatch({
				type: SUBJECT_BY_DIVISION,
				subjectDivisionList: response.data.data,
			});
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString());
		}
	} catch (err) {
		console.log(err);
	}
};

// get All School Diary List
export const getSchoolDiryList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(SCHOOL_DIARY_LIST,).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: SCHOOL_DIARY_LIST,
					schoolDiaryList: responseJson.data.data,
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