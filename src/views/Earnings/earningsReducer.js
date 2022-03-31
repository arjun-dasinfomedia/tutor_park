import {
  TUTOR_EARNINGS,
  SCHOOL_DROPDOWN,
  USERLIST_DROPDOWN,
  ADD_INVOICE,
  INVOICE_LIST,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  earningsData: [],
  schoolListDropDown: [],
  userListDropDown: [],
  invoiceData: [],
};

const earnings = (state = initialState, action) => {
  switch (action.type) {
    case SCHOOL_DROPDOWN:
      return { ...state, schoolListDropDown: action.schoolListDropDown };
    case TUTOR_EARNINGS:
      return { ...state, earningsData: action.earningsData };
    case USERLIST_DROPDOWN:
      return { ...state, userListDropDown: action.userListDropDown };
    case ADD_INVOICE:
      return { ...state };
    case INVOICE_LIST:
      return { ...state, invoiceData: action.invoiceData };
    default:
      return { ...state };
  }
};
export default earnings;
