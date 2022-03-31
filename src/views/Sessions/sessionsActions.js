import {
  ALL_SESSION,
  COMPLETED_SESSION,
  COMPLETE_SESSION,
  UPCOMING_SESSION,
  STUDENT_ATTENDANCE,
  ATTENDANCE,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Upcoming session List
export const upcomingSessionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(UPCOMING_SESSION);
    if (response.data.error === false) {
      dispatch({
        type: UPCOMING_SESSION,
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

// All Session List
export const allSessionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(ALL_SESSION);
    if (response.data.error === false) {
      dispatch({
        type: ALL_SESSION,
        allsessiondata: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Completed Session List
export const completedSessionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(COMPLETED_SESSION);
    if (response.data.error === false) {
      dispatch({
        type: COMPLETED_SESSION,
        completesessiondata: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// update sessionCompleted status
export const updateSessionCompletedStatus = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      COMPLETE_SESSION,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: COMPLETE_SESSION,
      });
      dispatch(upcomingSessionList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

/*Student List Get  */
export const studentattendanceList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      STUDENT_ATTENDANCE,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: STUDENT_ATTENDANCE,
        attendancelist: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

/*Add Attendance and Update  */
export const addattendance = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ATTENDANCE, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ATTENDANCE,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
