import { 
	GET_ALL_SUBJECT_LIST_ADMIN, 
	STORE_SUBJECT, 
	DELETE_SUBJECT,
	UPDATE_SUBJECT, 
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Subject List
export const getSubjectList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(GET_ALL_SUBJECT_LIST_ADMIN,).then((responseJson) => {

			if (responseJson.data.error === false) {
				dispatch({
					type: GET_ALL_SUBJECT_LIST_ADMIN,
					subjectList: responseJson.data.data,
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

// store Subject
export const storeSubject = (data) => async (dispatch) => {

	// return false;
	try {
		const response = await RestClientServices.postWithData(STORE_SUBJECT, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: STORE_SUBJECT,
			})
			dispatch(getSubjectList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// Subject Delete
export const deleteSubject = (data) => async (dispatch) => {
	try {

		// console.log(data)
		// return false;
		const response = await RestClientServices.postWithData(DELETE_SUBJECT, data)

		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: DELETE_SUBJECT,
			})
			dispatch(getSubjectList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

//   update Subject
export const updateSubject = (data) => async (dispatch) => {
	try {

		const response = await RestClientServices.postWithData(UPDATE_SUBJECT, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: UPDATE_SUBJECT,
				subjectEditStatus: response.data.error,
			})
			dispatch(getSubjectList())
			if (response.data.error === false) {
				dispatch({
					type: UPDATE_SUBJECT,
					subjectEditStatus: 'sucess',
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
