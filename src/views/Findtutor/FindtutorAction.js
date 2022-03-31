import {
  FIND_TUTOR_LIST_USING_FILTER,
  GET_ALL_FINDTUTOR,
  VIEW_USER_DETAILS,
  DIRECT_MESSAGE,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Tutor List
export const tutorList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_FINDTUTOR);
    if (response.data.error === false) {
      dispatch({
        type: GET_ALL_FINDTUTOR,
        data: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// View Tutor Details
export const viewTutorDetails = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      VIEW_USER_DETAILS,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: VIEW_USER_DETAILS,
        viewTutorData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// retrive Tutor List Using Filter
export const retrieveTutorListUsingFilter = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      FIND_TUTOR_LIST_USING_FILTER,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: FIND_TUTOR_LIST_USING_FILTER,
        data: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// Direct Message To Tutor
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
