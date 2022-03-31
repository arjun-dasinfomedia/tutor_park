import {
	POINTS_HISTORY,
	POINTS_TRANSFER,
	USER_DROPDOWN,
	BUY_POINT
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Point History List
export const getPointList = () => async (dispatch) => {

	try {
		const response = await RestClientServices.getAll(POINTS_HISTORY,).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: POINTS_HISTORY,
					pointsList: responseJson.data.data,
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

// for User drop down 
export const userDropdown = () => async (dispatch) => {

	try {
		const response = await RestClientServices.getAll(USER_DROPDOWN,).then((responseJson) => {

			if (responseJson.data.error == false) {
				dispatch({
					type: USER_DROPDOWN,
					userDropdownlist: responseJson.data.data,
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

// Transfer Points
export const pointTransfer = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(POINTS_TRANSFER, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: POINTS_TRANSFER,
			})
			dispatch(getPointList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// Buy A Points
export const getBuyPoints = (data) => async (dispatch) => {
	try {
		const response = await RestClientServices.postWithData(BUY_POINT, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: BUY_POINT,
			})
			dispatch(getPointList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}