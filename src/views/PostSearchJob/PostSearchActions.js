import {
  POST_SEARCH_JOB_LIST,
  POST_SEARCH_JOB_STORE,
  DIRECT_MESSAGE,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Add New Post And Job
export const storePostAndSearchJob = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      POST_SEARCH_JOB_STORE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: POST_SEARCH_JOB_STORE,
      });
      dispatch(getPostJobList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Get Post and Job list
export const getPostJobList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithoutData(
      POST_SEARCH_JOB_LIST
    );
    if (response.data.error === false) {
      dispatch({
        type: POST_SEARCH_JOB_LIST,
        data: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Direct Message a Tutor
export const tutorDirectMessage = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      DIRECT_MESSAGE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));

      toast.success(response.data.message.toString());
      dispatch({
        type: DIRECT_MESSAGE,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
