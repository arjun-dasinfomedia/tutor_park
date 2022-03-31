import {
  LIST_ASSIGNMENT,
  NOT_ATTEMPTED_STUDENT,
  ASSIGNMENT_STUDENT,
  ASSIGNMENT_PUBLISH,
  STUDENT_SUBMITTED_ASSIGNMENT,
  STUDENT_ASSIGNMENT_SUBMIT,
  ATTEMPT_VIEW_STUDENT,
  FILTER_QUESTION_LIST,
  VIEW_SUBMIT_ASSIGNMENT,
  ADD_ASSIGNMENT,
  STUDENT_SUBMIT_ASSIGNMENT,
  TUTOR_EVALUATE_ASSIGNMENT,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// get The Assignment List
export const getAssignmetList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(LIST_ASSIGNMENT).then(
      (responseJson) => {
        if (responseJson.data.error == false) {
          dispatch({
            type: LIST_ASSIGNMENT,
            assignmentList: responseJson.data.data,
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

// not attempted Student list
export const getNotAttemptedStudentAssignmetList =
  (data) => async (dispatch) => {
    try {
      const response = await RestClientServices.postWithData(
        NOT_ATTEMPTED_STUDENT,
        data
      );
      if (response.data.error === false) {
        dispatch({
          type: NOT_ATTEMPTED_STUDENT,
          NotAttemptedStudent: response.data.data,
        });
      } else {
        dispatch(alertActions.error(response.data.message.toString()));
        toast.error(response.data.message.toString());
      }
    } catch (err) {
      // console.log(err)
    }
  };

// Add new Assignment
export const submittAssignment = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      STUDENT_SUBMIT_ASSIGNMENT,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: STUDENT_SUBMIT_ASSIGNMENT,
      });
      dispatch(getAssignmetList())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// evaluate assignment by tutor
export const evaluateAssignment = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(
      TUTOR_EVALUATE_ASSIGNMENT,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: TUTOR_EVALUATE_ASSIGNMENT,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(getViewSubmittedAssignment({student_assignment_id: data.student_assignment_id}));
  } catch (err) {
    // console.log(err)
  }
};

// assignment list for submitted assignment by student for tutor side
export const getViewSubmittedAssignment = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      VIEW_SUBMIT_ASSIGNMENT,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: VIEW_SUBMIT_ASSIGNMENT,
        viewSubmittedAssignment: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// assignment list for submitted assignment by student for student side
export const getStudentSubmittedAssignment = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      STUDENT_SUBMITTED_ASSIGNMENT,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: STUDENT_SUBMITTED_ASSIGNMENT,
        studentSubmittedAssignment: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// Student list for publish the assignment
export const getAssignmentStudentList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      ASSIGNMENT_STUDENT,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: ASSIGNMENT_STUDENT,
        publishStudentList: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// publish Assignment for student
export const publishAssignmentStudent = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      ASSIGNMENT_PUBLISH,
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
          type: ASSIGNMENT_PUBLISH,
        });
        dispatch(getAssignmetList());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};

// Filter Question List
export const filterQuestionList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      FILTER_QUESTION_LIST,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: FILTER_QUESTION_LIST,
          filterQuestionData: responseJson.data.data,
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

// Student View Assignment list
export const StudentViewAssignmentList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      STUDENT_ASSIGNMENT_SUBMIT,
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
          type: STUDENT_ASSIGNMENT_SUBMIT,
        });
        dispatch(getAssignmetList());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};

// view Attempted Assignment List
export const viewAttemptAssignmentStudent = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      ATTEMPT_VIEW_STUDENT,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: ATTEMPT_VIEW_STUDENT,
        attemptViewStudent: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// Create New Assignment
export const addAssignment = (data) => async (dispatch) => {

  try {
    const response = await RestClientServices.postWithData(
      ADD_ASSIGNMENT,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_ASSIGNMENT,
        assignmentStatus: "sucess"
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};
