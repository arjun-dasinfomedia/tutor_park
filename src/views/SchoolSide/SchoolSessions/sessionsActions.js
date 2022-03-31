import {
  SCHOOL_ALL_SESSION,
  SCHOOL_COMPLETED_SESSION,
  // COMPLETE_SESSION,
  SCHOOL_UPCOMING_SESSION,
  STUDENT_ATTENDANCE,
  ATTENDANCE,
} from "../../../redux/actions/types";
import RestClientServices from "../../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

export const upcomingSessionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(SCHOOL_UPCOMING_SESSION);
    if (response.data.error === false) {
      dispatch({
        type: SCHOOL_UPCOMING_SESSION,
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

export const allSessionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(SCHOOL_ALL_SESSION);
    if (response.data.error === false) {
      dispatch({
        type: SCHOOL_ALL_SESSION,
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

export const completedSessionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(SCHOOL_COMPLETED_SESSION);
    if (response.data.error === false) {
      dispatch({
        type: SCHOOL_COMPLETED_SESSION,
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

// export const updateSessionCompletedStatus = (data) => async (dispatch) => {
//   try {
//     const response = await RestClientServices.postWithData(
//       COMPLETE_SESSION,
//       data
//     );
//     if (response.data.error === false) {
//       dispatch({
//         type: COMPLETE_SESSION,
//       });
//       dispatch(upcomingSessionList());
//     } else {
//       dispatch(alertActions.error(response.data.message.toString()));
//       toast.error(response.data.message.toString());
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

/*Student List Get  */
export const studentattendanceList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(STUDENT_ATTENDANCE,data);
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
