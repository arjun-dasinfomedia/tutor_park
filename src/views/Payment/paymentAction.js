import { USER_EXPENSES, INVOICE_FILTER } from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";


// expense List
export const expenseList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(USER_EXPENSES, data);
    dispatch({
      type: USER_EXPENSES,
      expenseData: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Invoice List
export const invoiceList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      INVOICE_FILTER,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch({
          type: INVOICE_FILTER,
          invoiceData: responseJson.data.data,
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
