import {
	SCHOOL_PLATFORM,
	SCHOOL_VERIFY,
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// Verify The School
export const verifySchool = (data) => async (dispatch) => {
    try {

        const response = await RestClientServices.postWithData(SCHOOL_VERIFY, data)
        if (response.data.error === false) {

            dispatch(alertActions.success(response.data.message.toString()));

            toast.success(response.data.message.toString())
            dispatch({
                type: SCHOOL_VERIFY,
                // resetPasswordStatus: response.data.error,
            })
			dispatch(getSchoolList())
        } else {

            dispatch(alertActions.error(response.data.message.toString()));
            toast.error(response.data.message.toString())
        }
    } catch (err) {
        console.log(err)
    }
}

// School List
export const getSchoolList = () => async (dispatch) => {
	try {
		const response = await RestClientServices.getAll(SCHOOL_PLATFORM,).then((responseJson) => {

			if (responseJson.data.error === false) {
				dispatch({
					type: SCHOOL_PLATFORM,
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