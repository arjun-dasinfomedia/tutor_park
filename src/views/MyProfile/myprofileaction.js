import {
  GEOTAG_UPDATE,
  UPDATE_HIDE_AREA,
  UPDATE_PROFILE,
  USER_DATA,
  UPDATE_OTHER_USER,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { getUserData } from "../../utility/utils";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

export const updateOtherUser = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      UPDATE_OTHER_USER,
      data
    );
    if (response.data.error == false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: UPDATE_OTHER_USER,
        userEditStatusSchool: response.data.error,
      });
      dispatch(schoolTutorList());
      if (response.data.error === false) {
        dispatch({
          type: UPDATE_OTHER_USER,
          userEditStatusSchool: "",
        });
      }
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
export const userdetails = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      USER_DATA,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: USER_DATA,
          userdetailsData: responseJson.data.data,
          userExtraDetails: responseJson.data.data.user_details,
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

export const updateUserProfile = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      UPDATE_PROFILE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: UPDATE_PROFILE,
          userdetailsData: responseJson.data.data,
          userExtraDetails: responseJson.data.data.user_details,
        });

        localStorage.removeItem("userData");
        localStorage.setItem(
          "userData",
          JSON.stringify(responseJson.data.data)
        );
        dispatch(userdetails({ email: getUserData().email }));
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const storeGeotagDetailsUpdate = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      GEOTAG_UPDATE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: GEOTAG_UPDATE,
          userdetailsData: responseJson.data.data,
          userExtraDetails: responseJson.data.data.user_details,
        });

        localStorage.removeItem("userData");
        localStorage.setItem(
          "userData",
          JSON.stringify(responseJson.data.data)
        );
        dispatch(userdetails({ email: getUserData().email }));
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const hideArea = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      UPDATE_HIDE_AREA,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: UPDATE_HIDE_AREA,
        });
        dispatch(userdetails({ email: getUserData().email }));
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};
