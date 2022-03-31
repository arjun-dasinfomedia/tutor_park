import {
  ADD_USER,
  DELETE_USER,
  USERLIST_DROPDOWN,
  UPDATE_OTHER_USER,
  SCHOOL_DROPDOWN,
  SCHOOL_STUDET_LIST,
  SCHOOL_CLASS_BY_SYLLABUS,
  SCHOOL_DIVISION_BY_CLASS
} from '../../../redux/actions/types'
import RestClientServices from '../../../redux/actions/restClient/client'
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Division value from Class list
export const schoolDivisionByClass = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(SCHOOL_DIVISION_BY_CLASS, data).then((responseJson) => {

      if (responseJson.data.error == false) {
        dispatch({
          type: SCHOOL_DIVISION_BY_CLASS,
          schoolDivisionList: responseJson.data.data,
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

// Class Value by syllabus list
export const schoolClassBySyllabus = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(SCHOOL_CLASS_BY_SYLLABUS, data).then((responseJson) => {

      if (responseJson.data.error == false) {
        dispatch({
          type: SCHOOL_CLASS_BY_SYLLABUS,
          schoolClassList: responseJson.data.data,
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

// School Student List
export const schoolStudentList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(SCHOOL_STUDET_LIST, data).then((responseJson) => {

      if (responseJson.data.error == false) {
        dispatch({
          type: SCHOOL_STUDET_LIST,
          schoolStudentData: responseJson.data.data,
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

// Update School Student
export const updateOtherUser = (data) => async (dispatch) => {
  // return false;
  try {

    const response = await RestClientServices.postWithData(UPDATE_OTHER_USER, data)
    if (response.data.error == false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: UPDATE_OTHER_USER,
        userEditStatus: response.data.error,
      })
      dispatch(schoolStudentList({ role: "school-student" }))
      if (response.data.error === false) {
        dispatch({
          type: UPDATE_OTHER_USER,
          userEditStatus: '',
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

// get user Data for Dropdown
export const getSchoolDropDown = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(SCHOOL_DROPDOWN).then((responseJson) => {

      if (responseJson.data.error == false) {
        dispatch({
          type: SCHOOL_DROPDOWN,
          schoolListDropDown: responseJson.data.data,
        });
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// get School data For Dropdown
export const getUserDropDown = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(USERLIST_DROPDOWN).then((responseJson) => {

      if (responseJson.data.error == false) {
        dispatch({
          type: USERLIST_DROPDOWN,
          userListDropDown: responseJson.data.data,
        });
      }
      else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString())
      }
    });
  } catch (err) {
    console.log(err)
  }
};

// store User
export const storeUser = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(ADD_USER, data)
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: ADD_USER,
      })
      dispatch(schoolStudentList({ role: "school-student" }))
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}

// User Delete
export const deleteUser = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(DELETE_USER, data)

    if (response.data.error == false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: DELETE_USER,
      })
      dispatch(schoolStudentList({ role: "school-student" }))
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}
