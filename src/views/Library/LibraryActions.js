import {
  DELETE_MY_LIBRARY,
  FILTER_MY_LIBRARY,
  GET_ALL_LIBRARY,
  STORE_MY_LIBRARY,
  UPDATE_MY_LIBRARY,
  COMMENT_LIBRARY,
  LIBRARY_POST_ON_TIMELINE,
  SHARED_ME_LIBRARY,
  CHAT_STUDENT_LIST,
  SHARED_LIBRARY,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Get My All Library List
export const getAllMyLibraryList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_LIBRARY).then(
      (responseJson) => {
        if (responseJson.data.error == false) {
          dispatch({
            type: GET_ALL_LIBRARY,
            allLibraryList: responseJson.data.data,
          });
        } else {
          dispatch(alertActions.error(responseJson.data.message.toString()));
          toast.error(responseJson.data.message.toString());
        }
      }
    );
  } catch (err) {
    // console.log(err)
  }
};

// Get All Share With me library list
export const getShareLibraryList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(SHARED_ME_LIBRARY).then(
      (responseJson) => {
        if (responseJson.data.error == false) {
          dispatch({
            type: SHARED_ME_LIBRARY,
            shareLibraryList: responseJson.data.data,
          });
        } else {
          dispatch(alertActions.error(responseJson.data.message.toString()));
          toast.error(responseJson.data.message.toString());
        }
      }
    );
  } catch (err) {
    // console.log(err)
  }
};

// get Filter Library List
export const getFilterLibraryList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      FILTER_MY_LIBRARY,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: FILTER_MY_LIBRARY,
          allLibraryList: responseJson.data.data,
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

// Store a new Library
export const storeMyLibrary = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      STORE_MY_LIBRARY,
      data
    ).then((responseJson) => {
      if (responseJson.data.error) {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
        return false;
      } else {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: STORE_MY_LIBRARY,
        });
        dispatch(getAllMyLibraryList());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Add commnets on Library
export const addLibraryComments = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      COMMENT_LIBRARY,
      data
    ).then((responseJson) => {
      if (responseJson.data.error) {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
        return false;
      } else {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: COMMENT_LIBRARY,
        });
        dispatch(getAllMyLibraryList());
      }
    });
  } catch (err) {1
    // console.log(err)
  }
};

// Delete Library
export const deleteMyLibrary = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      DELETE_MY_LIBRARY,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: DELETE_MY_LIBRARY,
        });
        dispatch(getAllMyLibraryList());
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};

// Post Library in timeline
export const postLibraryItemOnTimeline = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      LIBRARY_POST_ON_TIMELINE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: LIBRARY_POST_ON_TIMELINE,
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

// Share Library With Friends
export const shareWithFriendLibrary = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      SHARED_LIBRARY,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: SHARED_LIBRARY,
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

// Update Library
export const updateMyLibrary = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      UPDATE_MY_LIBRARY,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: UPDATE_MY_LIBRARY,
          libraryEditStatus: responseJson.data.error,
        });

        dispatch(getAllMyLibraryList());
        if (responseJson.data.error === false) {
          dispatch({
            type: UPDATE_MY_LIBRARY,
            libraryEditStatus: "sucess",
          });
        }
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};

// Friend List For Share Library
export const shareLibraryWithFriend = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(CHAT_STUDENT_LIST);
    if (response.data.error === false) {
      dispatch({
        type: CHAT_STUDENT_LIST,
        sharedWithFriend: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};
