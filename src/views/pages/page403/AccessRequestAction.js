import RestClientServices from "../../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";
import { REQUEST_ACCESSRIGHT } from "src/redux/actions/types";

export const requestForAccessRights = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      REQUEST_ACCESSRIGHT,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch({
          type: REQUEST_ACCESSRIGHT,
        });
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};
