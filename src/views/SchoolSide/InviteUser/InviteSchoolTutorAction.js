
import { USER_INVITE } from "../../../redux/actions/types";
import RestClientServices from "../../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

export const inviteUser = (data) => async (dispatch) => {
    try {
        const response = await RestClientServices.postWithData(USER_INVITE, data)

        if (response.data.error === false) {
            dispatch(alertActions.success(response.data.message.toString()));
            toast.success(response.data.message.toString())
            dispatch({
                type: USER_INVITE,
            })
        } else {
            dispatch(alertActions.error(response.data.message.toString()));
            toast.error(response.data.message.toString())
        }

    } catch (err) {
        console.log(err)
    }
}