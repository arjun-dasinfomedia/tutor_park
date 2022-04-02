import {
  GET_ALL_LEVEL_LIST_ADMIN,
  STORE_LEVEL,
  DELETE_LEVEL,
  UPDATE_LEVEL,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// List for levels
export const getLevelList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(
      GET_ALL_LEVEL_LIST_ADMIN
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch({
          type: GET_ALL_LEVEL_LIST_ADMIN,
          levelList: responseJson.data.data,
        });
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};

// Store Level
export const storeLevel = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(STORE_LEVEL, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: STORE_LEVEL,
      });
      dispatch(getLevelList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

//  Syllabus Delete
export const deleteLevel = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(DELETE_LEVEL, data);

    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: DELETE_LEVEL,
      });
      dispatch(getLevelList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

//  update level
export const updateLevel = (data) => async (dispatch) => {
  // return false;
  try {
    const response = await RestClientServices.postWithData(UPDATE_LEVEL, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: UPDATE_LEVEL,
        LevelEditStatus: response.data.error,
      });
      dispatch(getLevelList());
      if (response.data.error === false) {
        dispatch({
          type: UPDATE_LEVEL,
          LevelEditStatus: "",
        });
      }
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};
