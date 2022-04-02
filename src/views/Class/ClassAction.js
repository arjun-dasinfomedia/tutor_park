import {
  CLASS_LIST,
  DELETE_CLASSES,
  VIEW_CLASSES,
  CLASS_STORE,
  UPDATE_CLASS,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

/* List Class Api */
export const getClassList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(CLASS_LIST, data);
    if (response.data.error === false) {
      dispatch({
        type: CLASS_LIST,
        classData: response.data.data
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }
  }
  catch (err) {
    // console.log(err);
  }
};

/* Add Class Api */
export const classStore = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(CLASS_STORE, data)
    // console.log(response.data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: CLASS_STORE,
      })
      dispatch(getClassList())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }
  } catch (err) {
    // console.log(err)
  }
}

/* Delete Class Api */
export const deleteClasses = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      DELETE_CLASSES, data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: DELETE_CLASSES,
      })
      dispatch(getClassList())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }
  } catch (err) {
    // console.log(err);
  }
};

/* View Class Api */
export const viewClasses = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      VIEW_CLASSES, data
    );
    if (response.data.error === false) {
      dispatch({
        type: VIEW_CLASSES,
        classviewData: response.data.data,
      })
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }
  } catch (err) {
    // console.log(err);
  }
};

/* Update Class Api */
export const updateClass = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(UPDATE_CLASS, data)
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: UPDATE_CLASS,
        classUpdate: response.data.error,
      })
      dispatch(getClassList())
      if (response.data.error === false) {
        dispatch({
          type: UPDATE_CLASS,
          classUpdate: 'sucess',
        })
      }
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    // console.log(err)
  }

}
