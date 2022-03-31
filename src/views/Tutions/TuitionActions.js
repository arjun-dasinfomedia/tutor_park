import {
  ADD_FEEDBACK,
  ADD_STUDENTS_IN_TUITION,
  DELETE_MY_TUITION,
  FIND_TUTIONS_STUDENT,
  GET_ALL_TUTIONS_STUDENT,
  GET_ALL_TUTIONS_TUTOR,
  GET_STUDENT_LIST_TO_ASSIGN_IN_TUTITION,
  STORE_MY_TUITION,
  SUBSCRIBED_STUDENT_LIST,
  SUBSCRIBE_TUITION,
  UNSUBSCRIBE_TUITION,
  VIEW_USER_DETAILS,
  DIRECT_MESSAGE,
  GET_RAZORPAY_SETTINGS,
  UPDATE_MY_TUITION,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// update Tution Function
export const updateTuition = (data) => async (dispatch) => {

  try {

    const response = await RestClientServices.postWithData(UPDATE_MY_TUITION, data)
    if (response.data.error == false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: UPDATE_MY_TUITION,
        tuitionEditStatus: response.data.error,
      })
      dispatch(getTutorAllTutionList())
      if (response.data.error === false) {
        dispatch({
          type: UPDATE_MY_TUITION,
          tuitionEditStatus: 'sucess',
        })
      }
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}

// Get Student All Tuition List
export const getStudentAllTutionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(
      GET_ALL_TUTIONS_STUDENT
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: GET_ALL_TUTIONS_STUDENT,
          allListStudent: responseJson.data.data,
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

// getTutorAllTutionList
export const getTutorAllTutionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithoutData(
      GET_ALL_TUTIONS_TUTOR
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: GET_ALL_TUTIONS_TUTOR,
          allListTutor: responseJson.data.data,
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

// getFindAllTutionList
export const getFindAllTutionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(FIND_TUTIONS_STUDENT).then(
      (responseJson) => {
        if (responseJson.data.error == false) {
          dispatch({
            type: FIND_TUTIONS_STUDENT,
            findListStudent: responseJson.data.data,
          });
        } else {
          dispatch(alertActions.error(responseJson.data.message.toString()));
          toast.error(responseJson.data.message.toString());
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// getRazorPaySettings
export const getRazorPaySettings = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_RAZORPAY_SETTINGS).then(
      (responseJson) => {
        if (responseJson.data.error == false) {
          dispatch({
            type: GET_RAZORPAY_SETTINGS,
            razorpaySettings: responseJson.data.data,
          });
        } else {
          dispatch(alertActions.error(responseJson.data.message.toString()));
          toast.error(responseJson.data.message.toString());
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// Store MY Tuition
export const storeMyTuition = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      STORE_MY_TUITION,
      data
    ).then((responseJson) => {
      if (responseJson.data.error) {

        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());

        // return false;
      } else {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: STORE_MY_TUITION,
          addTuitionStatus: responseJson.data.data,
        });
        dispatch(getTutorAllTutionList());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// delete My tuition
export const deleteMyTuition = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      DELETE_MY_TUITION,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: DELETE_MY_TUITION,
        });
        dispatch(getTutorAllTutionList());
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// get Student list in your tuition
export const getStudentListToAssignInTuition = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      GET_STUDENT_LIST_TO_ASSIGN_IN_TUTITION,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: GET_STUDENT_LIST_TO_ASSIGN_IN_TUTITION,
          studentListToAddInTution: responseJson.data.data,
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

// getSubscribed tuition list
export const getSubscribedStudentList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      SUBSCRIBED_STUDENT_LIST,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: SUBSCRIBED_STUDENT_LIST,
          subscribedStudentList: responseJson.data.data,
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

// subscribed tuition
export const subscribeTuition = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      SUBSCRIBE_TUITION,
      data
    );

    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: SUBSCRIBE_TUITION,
      });
      dispatch(getFindAllTutionList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// unscubscribe tuition
export const unsubscribeTuition = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      UNSUBSCRIBE_TUITION,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: UNSUBSCRIBE_TUITION,
      });
      dispatch(getStudentAllTutionList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// view User Details
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

// Add Student in tuition
export const addStudentsInTuition = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      ADD_STUDENTS_IN_TUITION,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: ADD_STUDENTS_IN_TUITION,
        });
        dispatch(getTutorAllTutionList())
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// add Feedback
export const feedBackAdd = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_FEEDBACK, data);
    if (response.data.error == false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_FEEDBACK,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Tutor Direct Message
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
