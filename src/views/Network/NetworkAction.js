import {
  FRIEND_LIST,
  REQUEST_LIST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  BLOCK_REQUEST,
  SPAM_REQUEST,
  VIEW_USER_DETAILS,
  USER_INVITE,
  STUDENT_LIST,
  REQUEST_SEND,
  MY_STUDENT_LIST,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// get Friend List
export const friendList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(FRIEND_LIST, data);
    if (response.data.error === false) {
      dispatch({
        type: FRIEND_LIST,
        friendListData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Request List
export const requestList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(REQUEST_LIST);
    if (response.data.error === false) {
      dispatch({
        type: REQUEST_LIST,
        requestListData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Accept Request
export const acceptRequest = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      ACCEPT_REQUEST,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ACCEPT_REQUEST,
      });
      dispatch(requestList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Reject a Request
export const rejectRequest = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      REJECT_REQUEST,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: REJECT_REQUEST,
      });
      dispatch(requestList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Block Request
export const blockRequest = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(BLOCK_REQUEST, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: BLOCK_REQUEST,
      });
      dispatch(requestList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Spam Request
export const spamRequest = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(SPAM_REQUEST, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: SPAM_REQUEST,
      });
      dispatch(requestList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Invite User
export const inviteUser = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(USER_INVITE, data);

    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: USER_INVITE,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// View User Details
export const viewUserDetails = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      VIEW_USER_DETAILS,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: VIEW_USER_DETAILS,
        viewUserData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

export const friendData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(STUDENT_LIST);
    if (response.data.error === false) {
      dispatch({
        type: STUDENT_LIST,
        friendData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Send Request
export const sendRequest = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(REQUEST_SEND, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: REQUEST_SEND,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(requestList());
  } catch (err) {
    console.log(err);
  }
};

// My Student Data
export const myStudentData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(MY_STUDENT_LIST);
    if (response.data.error === false) {
      dispatch({
        type: MY_STUDENT_LIST,
        myStudent: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
