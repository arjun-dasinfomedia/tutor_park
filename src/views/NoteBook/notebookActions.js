import {
  NOTEBOOK_DELETE,
  NOTEBOOK_LIST,
  NOTEBOOK_STORE,
  NOTEBOOK_UPDATE,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// NoteBook Store
export const retrieveNoteBookStore = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      NOTEBOOK_STORE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: NOTEBOOK_STORE,
        });
        dispatch(retrieveNoteBookList());
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const noteBookUpdate = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      NOTEBOOK_UPDATE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: NOTEBOOK_UPDATE,
          NotebookEditStatus: responseJson.data.error,
        });
        dispatch(retrieveNoteBookList());
        dispatch({
          type: NOTEBOOK_UPDATE,
          NotebookEditStatus: "",
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

// NoteBook List
export const retrieveNoteBookList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(NOTEBOOK_LIST).then(
      (responseJson) => {
        if (responseJson.data.error === false) {
          dispatch({
            type: NOTEBOOK_LIST,
            data: responseJson.data.data,
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

export const deleteNoteBook = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      NOTEBOOK_DELETE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: NOTEBOOK_DELETE,
          DeleteNoteBookStatus: responseJson.data.error
        });
        dispatch(retrieveNoteBookList());
        dispatch({
          type: NOTEBOOK_DELETE,
          DeleteNoteBookStatus: "",
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
