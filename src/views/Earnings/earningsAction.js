import {
  TUTOR_EARNINGS,
  SCHOOL_DROPDOWN,
  USERLIST_DROPDOWN,
  ADD_INVOICE,
  INVOICE_LIST,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Add New Invoice
export const addInvoice = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      ADD_INVOICE,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch(alertActions.success(responseJson.data.message.toString()));
        toast.success(responseJson.data.message.toString());
        dispatch({
          type: ADD_INVOICE,
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

// Get School Dropdown
export const getSchoolDropDown = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(SCHOOL_DROPDOWN).then(
      (responseJson) => {
        if (responseJson.data.error === false) {
          dispatch({
            type: SCHOOL_DROPDOWN,
            schoolListDropDown: responseJson.data.data,
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

// get user dropdown
export const getUserDropDown = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(USERLIST_DROPDOWN).then(
      (responseJson) => {
        if (responseJson.data.error === false) {
          dispatch({
            type: USERLIST_DROPDOWN,
            userListDropDown: responseJson.data.data,
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

// Earning list
export const earningsList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(TUTOR_EARNINGS, data);
    if (response.data.error === false) {
      dispatch({
        type: TUTOR_EARNINGS,
        earningsData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// Invoice list
export const invoiceList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(INVOICE_LIST, data);
    if (response.data.error === false) {
      dispatch({
        type: INVOICE_LIST,
        invoiceData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};
