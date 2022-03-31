import {
    SCHOOL_COLLABORATION,
    SCHOOL_VERIFY
} from '../../redux/actions/types'
import RestClientServices from '../../redux/actions/restClient/client'
import { alertActions } from 'src/redux/actions/alertMessage';
import { toast } from 'react-toastify';

// get School List
export const getSchoolList = () => async (dispatch) => {
    try {
        const response = await RestClientServices.getAll(SCHOOL_COLLABORATION,).then((responseJson) => {

            if (responseJson.data.error == false) {
                dispatch({
                    type: SCHOOL_COLLABORATION,
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