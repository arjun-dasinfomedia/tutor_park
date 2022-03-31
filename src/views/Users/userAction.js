import {
	GET_ALL_USER_LIST,
	ADD_USER,
	DELETE_USER,
	SCHOOL_STUDET_LIST,
	UPDATE_OTHER_USER,
	UPDATE_USER,
	SCHOOL_DROPDOWN,
	SCHOOL_CLASS_BY_SYLLABUS,
	SCHOOL_DIVISION_BY_CLASS,
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// School Class By Syllabus
export const schoolClassBySyllabus = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(SCHOOL_CLASS_BY_SYLLABUS, data).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: SCHOOL_CLASS_BY_SYLLABUS,
					schoolClassList: responseJson.data.data,
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

// School Division By Class
export const schoolDivisionByClass = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(SCHOOL_DIVISION_BY_CLASS, data).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: SCHOOL_DIVISION_BY_CLASS,
					schoolDivisionList: responseJson.data.data,
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

// Update For School Users
export const updateOtherUser = (data) => async (dispatch) => {

	try {

		const response = await RestClientServices.postWithData(UPDATE_OTHER_USER, data)
		if (response.data.error == false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: UPDATE_OTHER_USER,
				userEditStatusSchool: response.data.error,
			})
			dispatch(schoolTutorList())
			if (response.data.error === false) {
				dispatch({
					type: UPDATE_OTHER_USER,
					userEditStatusSchool: 'sucessschool',
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

// Update Tutor park User
export const updateUser = (data) => async (dispatch) => {

	try {

		const response = await RestClientServices.postWithData(UPDATE_USER, data)
		if (response.data.error == false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: UPDATE_USER,
				userEditStatus: response.data.error,
			})
			dispatch(getUserList())
			if (response.data.error === false) {
				dispatch({
					type: UPDATE_USER,
					userEditStatus: 'sucess',
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

// Get User List
export const getUserList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(GET_ALL_USER_LIST,).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: GET_ALL_USER_LIST,
					userList: responseJson.data.data,
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

// get user Data for Dropdown
export const getSchoolDropDown = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(SCHOOL_DROPDOWN).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: SCHOOL_DROPDOWN,
					schoolListDropDown: responseJson.data.data,
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

// get School data For Dropdown
export const getUserDropDown = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(SCHOOL_STUDET_LIST,data).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: SCHOOL_STUDET_LIST,
					userListDropDown: responseJson.data.data,
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

// store User
export const storeUser = (data) => async (dispatch) => {

	try {
		const response = await RestClientServices.postWithData(ADD_USER, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: ADD_USER,
			})
			dispatch(getUserList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// User Delete
export const deleteUser = (data) => async (dispatch) => {

	try {
		const response = await RestClientServices.postWithData(DELETE_USER, data)

		if (response.data.error == false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: DELETE_USER,
			})
			dispatch(getUserList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

