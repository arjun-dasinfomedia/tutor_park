import {
	ALL_SETTING_POINT,
	ADD_SETTING_POINT,
	RESTRIVE_REZORPAY_SETTINGS,
	STORE_REZORPAY_SETTINGS,
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Store RazorPay Settings
export const storeRazorPaySettings = (data) => async (dispatch) => {

	try {
		const response = await RestClientServices.postWithData(STORE_REZORPAY_SETTINGS, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: STORE_REZORPAY_SETTINGS,
			})
			dispatch(getRazorPaySettings())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// Retrive Razor Pay Settings
export const getRazorPaySettings = () => async (dispatch) => {

	try {
		const response = await RestClientServices.getAll(RESTRIVE_REZORPAY_SETTINGS,).then((responseJson) => {

			if (responseJson.data.error === false) {

				dispatch({
					type: RESTRIVE_REZORPAY_SETTINGS,
					rezorPayList: responseJson.data.data,
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

// get All Settings Point
export const getMyAllPointsList = () => async (dispatch) => {

	try {
		const response = await RestClientServices.getAll(ALL_SETTING_POINT,).then((responseJson) => {

			if (responseJson.data.error === false) {
				dispatch({
					type: ALL_SETTING_POINT,
					tutorPoint: responseJson.data.data.tutor_point,
					studentPoint: responseJson.data.data.student_point,
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

// store Setting Points
export const storeSettingPoint = (data) => async (dispatch) => {

	try {
		const response = await RestClientServices.postWithData(ADD_SETTING_POINT, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: ADD_SETTING_POINT,
			})
			dispatch(getMyAllPointsList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}
