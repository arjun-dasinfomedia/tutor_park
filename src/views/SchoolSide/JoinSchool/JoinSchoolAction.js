import {
	VERIFIED_SCHOOL,
	ADD_SCHOOL,
	JOIN_SCHOOL,
} from '../../../redux/actions/types'
import RestClientServices from '../../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Join School Events
export const joinMySchool = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(JOIN_SCHOOL, data).then((responseJson) => {
			if (responseJson.data.error) {
				dispatch(alertActions.error(responseJson.data.message.toString()));
				toast.error(responseJson.data.message.toString())
				// dispatch(alertActions.error("not stored"));
				// toast.error("not stored")
				return false;
			}
			else {
				dispatch(alertActions.success(responseJson.data.message.toString()));
				toast.success(responseJson.data.message.toString())
				dispatch({
					type: JOIN_SCHOOL,
				})
				// dispatch(getSchoolList())
			}
		});
	} catch (err) {
		console.log(err)
	}
}

// Add New School
export const storeMySchool = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(ADD_SCHOOL, data).then((responseJson) => {
			if (responseJson.data.error) {
				dispatch(alertActions.error(responseJson.data.message.toString()));
				toast.error(responseJson.data.message.toString())
				// dispatch(alertActions.error("not stored"));
				// toast.error("not stored")
				return false;
			}
			else {
				dispatch(alertActions.success(responseJson.data.message.toString()));
				toast.success(responseJson.data.message.toString())
				dispatch({
					type: ADD_SCHOOL,
				})
				dispatch(getSchoolList())
			}
		});
	} catch (err) {
		console.log(err)
	}
}

//  Verified School List
export const getSchoolList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(VERIFIED_SCHOOL,).then((responseJson) => {

			if (responseJson.data.error === false) {
				dispatch({
					type: VERIFIED_SCHOOL,
					schoolList: responseJson.data.data,
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