import {
  QUESTION_ADD,
  QUESTION_DELETE,
  QUESTION_LIST,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Question List
export const questionList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(QUESTION_LIST, data).then(
      (responseJson) => {
        if (responseJson.data.error === false) {
          dispatch({
            type: QUESTION_LIST,
            questionData: responseJson.data.data,
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

// Question Delete
export const questionDelete = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      QUESTION_DELETE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: QUESTION_DELETE,
        });
        dispatch(questionList());
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};

// Question Add
export const questionAdd = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      QUESTION_ADD,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: QUESTION_ADD,
        });
        dispatch(questionList());
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};
