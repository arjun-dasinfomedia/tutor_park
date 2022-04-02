import {
  DELETE_TEXTBOOKS,
  EDIT_TEXTBOOKS,
  GET_ALL_SUBJECT_LIST,
  GET_ALL_TEXTBOOKS,
  GET_FILTERED_TEXTBOOKS,
  TEXTBOOK_STORE,
  UPDATE_TEXTBOOK,
  VIEW_TEXTBOOKS,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// get all TextBook
export const retrieveTextBooks = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_TEXTBOOKS);

    if (response.data.error === false) {
      dispatch({
        type: GET_ALL_TEXTBOOKS,
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

// retrive textbook using filter
export const retrieveTextBooksUsingFilter = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      GET_FILTERED_TEXTBOOKS,
      data
    );

    if (response.data.error === false) {
      dispatch({
        type: GET_FILTERED_TEXTBOOKS,
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

// store TextBook
export const storeTextBooks = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      TEXTBOOK_STORE,
      data
    );

    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: TEXTBOOK_STORE,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }

    dispatch(retrieveTextBooks());
  } catch (err) {
    console.log(err);
  }
};

// update TextBook
export const updateTextBooks = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      UPDATE_TEXTBOOK,
      data
    );

    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: UPDATE_TEXTBOOK,
        TextbookEditStatus: response.data.error,
      });
      dispatch(retrieveTextBooks());
      if (response.data.error === false) {
        dispatch({
          type: UPDATE_TEXTBOOK,
          TextbookEditStatus: "sucess",
        });
      }
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// View TextBook
export const viewTextBooks = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      VIEW_TEXTBOOKS,
      data
    );

    if (response.data.error === false) {
      dispatch({
        type: VIEW_TEXTBOOKS,
        selectedTextbook: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Subject List Data
export const subjectListData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_SUBJECT_LIST);

    if (response.data.error === false) {
      dispatch({
        type: GET_ALL_SUBJECT_LIST,
        subjectList: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// delete TextBook
export const deleteTextBook = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      DELETE_TEXTBOOKS,
      data
    );

    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: DELETE_TEXTBOOKS,
      });
      dispatch(retrieveTextBooks());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
