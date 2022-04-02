import {
  ADD_STUDENT_IN_CLASS_SECTION,
  ADD_SUBJECT_TEACHER,
  CREATE_SCHOOL_CLASS,
  ENABLE_DISABLE_USER,
  GET_ALL_CLASS_TUTOR,
  LIST_ATTENDANCE,
  GET_ALL_STUDENT_TEACHER_LIST,
  GET_USER_TO_ADD_TEACHER,
  REQUEST_FOR_ACCESS_CLASS,
  REMOVE_STUDENT_IN_CLASS_SECTION,
  SCHOOL_DIVISION_LIST,
  TAKE_ATTENDANCE,
  ADD_SUBJECT_LEADER,
  STORE_SECTION_TIMETABLE,
  TIME_TABLE_LIST
} from "../../../redux/actions/types";
import RestClientServices from "../../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Add Subject Leader
export const addSubjectLeader = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_SUBJECT_LEADER, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_SUBJECT_LEADER,

      });
      dispatch(schoolClassList())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Requset For Access a Class
export const RequsetAccessClass = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(REQUEST_FOR_ACCESS_CLASS, data);
    if (response.data.error === false) {
      dispatch({
        type: REQUEST_FOR_ACCESS_CLASS,

      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Taken Attendace List By Date
export const TakeAttendanceListByDate = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(LIST_ATTENDANCE, data);
    if (response.data.error === false) {
      dispatch({
        type: LIST_ATTENDANCE,
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

// Take Attendace
export const TakeAttendanceList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(TAKE_ATTENDANCE, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: TAKE_ATTENDANCE,
      });
      dispatch(schoolClassList())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

/* School Class wise division List Api */
export const schoolClassList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(SCHOOL_DIVISION_LIST, data).then((responseJson) => {

      if (responseJson.data.error === false) {
        dispatch({
          type: SCHOOL_DIVISION_LIST,
          schoolClassData: responseJson.data.data,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// School Class wise division create API
export const schoolClassStore = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(CREATE_SCHOOL_CLASS, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: CREATE_SCHOOL_CLASS,
        })
        dispatch(schoolClassList())
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Get all school wise tutor list API
export const getAllTutorList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(GET_ALL_CLASS_TUTOR, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch({
          type: GET_ALL_CLASS_TUTOR,
          allTutorList: responseJson.data.data,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Add subjet & teacher Class and division wise API
export const subjectTeacherStore = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(ADD_SUBJECT_TEACHER, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: ADD_SUBJECT_TEACHER,
        })
        dispatch(schoolClassList())
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}


/* Get all School User Student/Teacher List */
export const schoolStudentTeacherList = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(GET_ALL_STUDENT_TEACHER_LIST, data).then((responseJson) => {

      if (responseJson.data.error === false) {
        dispatch({
          type: GET_ALL_STUDENT_TEACHER_LIST,
          allStudentTeacherList: responseJson.data.data,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

/* add Student In Class Section*/
export const addStudentInClassSection = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(ADD_STUDENT_IN_CLASS_SECTION, data).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: ADD_STUDENT_IN_CLASS_SECTION,
        })
        dispatch(schoolClassList())
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

/* Remove Student In Class Section*/
export const removeStudentInClassSection = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(REMOVE_STUDENT_IN_CLASS_SECTION, data).then((responseJson) => {

      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: REMOVE_STUDENT_IN_CLASS_SECTION,
        })
        dispatch(schoolClassList())
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

/* enable disable user */
export const enableDisableStudent = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(ENABLE_DISABLE_USER, data).then((responseJson) => {

      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: ENABLE_DISABLE_USER,
        })
        dispatch(schoolClassList())
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// store section timetable in database
export const storeTimetable = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(STORE_SECTION_TIMETABLE, data).then((responseJson) => {

      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString())
        dispatch({
          type: STORE_SECTION_TIMETABLE,
        })
        dispatch(schoolClassList())
        dispatch(timeTableList({division_id : data.division_id}))
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}

// Time Table List
export const timeTableList = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(TIME_TABLE_LIST, data).then((responseJson) => {

      if (responseJson.data.error === false) {
        dispatch({
          type: TIME_TABLE_LIST,
          timeList: responseJson.data.data,
        })
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    // console.log(err)
  }
}