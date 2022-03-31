import {
  GET_ALL_ACCESSRIGHTS,
  GET_MODULE_LIST,
  ACCESSRIGHTS_UPDATE,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

/* Role List Api */
export const getAllAccessRights = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_ACCESSRIGHTS);
    dispatch({
      type: GET_ALL_ACCESSRIGHTS,
      accessrightData: response.data.data,
    });
  } catch (err) {
    // console.log(err);
  }
};

/* Modul List Api */
export const getModules = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_MODULE_LIST);
    dispatch({
      type: GET_MODULE_LIST,
      moduleData: response.data.data,
    });
  } catch (err) {
    // console.log(err);
  }
};

/* Update Data Api */
export const updateaccessRights = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      ACCESSRIGHTS_UPDATE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ACCESSRIGHTS_UPDATE,
        permissions: response.data.error,
      });
      dispatch(getAllAccessRights());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err);
  }
};
