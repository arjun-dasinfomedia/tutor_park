import {
  ADD_ANSWER,
  ADD_FEEDBACK,
  ADD_QUESTION,
  BEST_ANSWER,
  DELETE_QUESTION,
  GET_ALL_QA,
  GET_FILTERED_QUESTIONS,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Get Question List
export const getAllQuestionList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_QA);
    if (response.data.error === false) {
      dispatch({
        type: GET_ALL_QA,
        List: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Add Answers
export const addAnswers = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_ANSWER, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_ANSWER,
      });
      dispatch(getAllFilteredQuestionsList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Get Questionlist Using Filter
export const getAllFilteredQuestionsList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      GET_FILTERED_QUESTIONS,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: GET_FILTERED_QUESTIONS,
        List: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Add Question
export const addQuestion = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_QUESTION, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_QUESTION,
      });
      dispatch(getAllQuestionList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Set As Best Answer
export const bestAnswer = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(BEST_ANSWER, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: BEST_ANSWER,
      });
      dispatch(getAllQuestionList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Add FeedBack
export const feedBackAdd = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_FEEDBACK, data);
    if (response.data.error === false) {
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

// Delete A Question
export const deleteQuestion = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      DELETE_QUESTION,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: DELETE_QUESTION,
      });
      dispatch(getAllQuestionList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
