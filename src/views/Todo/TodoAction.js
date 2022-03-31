import {
  ADD_TODO,
  MARK_AS_COMPLETE,
  MARK_AS_INCOMPLETE,
  TODO_DELETE,
  TODO_LIST,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// To do list
export const todoList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(TODO_LIST);
    if (response.data.error === false) {
      dispatch({
        type: TODO_LIST,
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

// Add to Todo
export const addTodo = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_TODO, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_TODO,
      });
      dispatch(todoList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete Todo
export const deleteTodo = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(TODO_DELETE, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: TODO_DELETE,
      });
      dispatch(todoList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// Complete Todo
export const completeTodo = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      MARK_AS_COMPLETE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: MARK_AS_COMPLETE,
      });
      dispatch(todoList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

// uncomplete Todo
export const uncompleteTodo = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      MARK_AS_INCOMPLETE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: MARK_AS_INCOMPLETE,
      });
      dispatch(todoList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
