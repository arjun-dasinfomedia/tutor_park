import { USER_EXPENSES, INVOICE_FILTER } from "../../redux/actions/types";

// ** Initial State
const initialState = {
  expenseData: [],
  invoiceData: [],
};

const payment = (state = initialState, action) => {
  switch (action.type) {

    // Expenses list
    case USER_EXPENSES:
      return { ...state, expenseData: action.expenseData };

      // Invoice List
    case INVOICE_FILTER:
      return { ...state, invoiceData: action.invoiceData };

      // Default Page
    default:
      return { ...state };
  }
};
export default payment;
