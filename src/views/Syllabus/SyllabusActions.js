import { 
	GET_ALL_SYLLABUS_LIST_ADMIN, 
	DELETE_SYLLABUS, 
	STORE_SYLLABUS, 
	UPDATE_SYLLABUS 
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Syllabus list 
export const getSyllabusList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(GET_ALL_SYLLABUS_LIST_ADMIN).then((responseJson) => {
			if (responseJson.data.error === false) {
				dispatch({
					type: GET_ALL_SYLLABUS_LIST_ADMIN,
					syllabusList: responseJson.data.data,
				})
			}
			else {
				dispatch(alertActions.error(responseJson.data.message.toString()));
				toast.error(responseJson.data.message.toString())
			}
		});
	} catch (err) {
		console.log(err)
	}
}

// Syllabus Delete
export const deleteSyallbus = (data) => async (dispatch) => {
	try {

		const response = await RestClientServices.postWithData(DELETE_SYLLABUS, data)

		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: DELETE_SYLLABUS,
			})
			dispatch(getSyllabusList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

// Store Syllabus
export const storeSyllabus = (data) => async (dispatch) => {

	try {
		const response = await RestClientServices.postWithData(STORE_SYLLABUS, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: STORE_SYLLABUS,
			})
			dispatch(getSyllabusList())
		} else {
			dispatch(alertActions.error(response.data.message.toString()));
			toast.error(response.data.message.toString())
		}

	} catch (err) {
		console.log(err)
	}
}

//   update Syllabus
export const updateSyllabus = (data) => async (dispatch) => {

	try {
		
		const response = await RestClientServices.postWithData(UPDATE_SYLLABUS, data)
		if (response.data.error === false) {
			dispatch(alertActions.success(response.data.message.toString()));
			toast.success(response.data.message.toString())
			dispatch({
				type: UPDATE_SYLLABUS,
				syllabusEditStatus: response.data.error,
			})
			dispatch(getSyllabusList())
			if (response.data.error === false) {
				dispatch({
					type: UPDATE_SYLLABUS,
					syllabusEditStatus: '',
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